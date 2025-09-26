module Option.OrderingInGroups exposing (suite)

import DropdownItemEventListeners exposing (DropdownItemEventListeners)
import DropdownOptions
import Expect
import GroupedDropdownOptions
import Html exposing (Html)
import Option exposing (Option(..), newSelectedOption, setGroupWithString, test_newFancyOptionWithMaybeCleanString)
import OptionGroup exposing (OptionGroup)
import OptionList
import OptionValue
import SelectionMode exposing (defaultSelectionConfig)
import Test exposing (Test, describe, test)


screwDriver =
    test_newFancyOptionWithMaybeCleanString "Screw Driver" Nothing
        |> setGroupWithString "Hand Tool"


wrench =
    test_newFancyOptionWithMaybeCleanString "Wrench" Nothing
        |> setGroupWithString "Hand Tool"


hammer =
    test_newFancyOptionWithMaybeCleanString "Hammer" Nothing
        |> setGroupWithString "Hand Tool"


chisel =
    test_newFancyOptionWithMaybeCleanString "Chisel" Nothing
        |> setGroupWithString "Hand Tool"


multiMeter =
    test_newFancyOptionWithMaybeCleanString "Multi Meter" Nothing
        |> setGroupWithString "Electronic Instrument"


signalTester =
    test_newFancyOptionWithMaybeCleanString "Signal Tester" Nothing
        |> setGroupWithString "Electronic Instrument"


drill =
    test_newFancyOptionWithMaybeCleanString "Drill" Nothing
        |> setGroupWithString "Power Tool"


sawZaw =
    test_newFancyOptionWithMaybeCleanString "Saw Zaw" Nothing
        |> setGroupWithString "Power Tool"


tools =
    OptionList.FancyOptionList
        [ screwDriver
        , drill
        , multiMeter
        , sawZaw
        , wrench
        , hammer
        , chisel
        , signalTester
        ]


optionGroupToDebuggingString : OptionGroup -> String
optionGroupToDebuggingString optionGroup =
    OptionGroup.toString optionGroup



-- Mock event listeners for testing HTML rendering


mockEventListeners : DropdownItemEventListeners String
mockEventListeners =
    { mouseOverMsgConstructor = \_ -> "mouseOver"
    , mouseOutMsgConstructor = \_ -> "mouseOut"
    , mouseDownMsgConstructor = \_ -> "mouseDown"
    , mouseUpMsgConstructor = \_ -> "mouseUp"
    , noOpMsgConstructor = "noOp"
    }


suite : Test
suite =
    describe "When we have a sorted list of options"
        [ test "keep them in order but group them by their option groups" <|
            \_ ->
                Expect.equalLists
                    (GroupedDropdownOptions.groupOptionsInOrder (DropdownOptions.test_fromOptions tools)
                        |> GroupedDropdownOptions.test_DropdownOptionsGroupToStringAndOptions
                    )
                    ([ ( OptionGroup.new "Hand Tool", [ screwDriver ] )
                     , ( OptionGroup.new "Power Tool", [ drill ] )
                     , ( OptionGroup.new "Electronic Instrument", [ multiMeter ] )
                     , ( OptionGroup.new "Power Tool", [ sawZaw ] )
                     , ( OptionGroup.new "Hand Tool", [ wrench, hammer, chisel ] )
                     , ( OptionGroup.new "Electronic Instrument", [ signalTester ] )
                     ]
                        |> List.map
                            (\( optionGroup, options ) ->
                                ( optionGroupToDebuggingString optionGroup
                                , List.map Option.test_optionToDebuggingString options
                                )
                            )
                    )
        , test "hide optgroup headers when all options in the group are selected" <|
            \_ ->
                let
                    selectedScrewDriver =
                        newSelectedOption 0 "Screw Driver" Nothing |> setGroupWithString "Hand Tool"

                    selectedWrench =
                        newSelectedOption 1 "Wrench" Nothing |> setGroupWithString "Hand Tool"

                    selectedHammer =
                        newSelectedOption 2 "Hammer" Nothing |> setGroupWithString "Hand Tool"

                    selectedChisel =
                        newSelectedOption 3 "Chisel" Nothing |> setGroupWithString "Hand Tool"

                    unselectedDrill =
                        drill

                    unselectedSawZaw =
                        sawZaw

                    allOptions =
                        OptionList.FancyOptionList
                            [ selectedScrewDriver
                            , unselectedDrill
                            , selectedWrench
                            , unselectedSawZaw
                            , selectedHammer
                            , selectedChisel
                            ]

                    unselectedOnlyOptions =
                        DropdownOptions.figureOutWhichOptionsToShowInTheDropdownThatAreNotSelected
                            defaultSelectionConfig
                            allOptions

                    renderedHtml =
                        GroupedDropdownOptions.groupOptionsInOrder unselectedOnlyOptions
                            |> GroupedDropdownOptions.optionGroupsToHtml mockEventListeners defaultSelectionConfig

                    elementCount =
                        List.length renderedHtml
                in
                Expect.equal 3 elementCount
        ]

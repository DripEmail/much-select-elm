module Option.ReplacingOptions exposing (suite)

import Expect
import Option exposing (test_newFancyOptionWithMaybeCleanString)
import OptionList exposing (OptionList(..))
import OutputStyle
import SelectionMode
import Test exposing (Test, describe, test)


futureCop =
    test_newFancyOptionWithMaybeCleanString "Future Cop!" Nothing


theMidnight =
    test_newFancyOptionWithMaybeCleanString "The Midnight" Nothing


thirdEyeBlind =
    test_newFancyOptionWithMaybeCleanString "Third Eye Blind" Nothing


selectionConfig =
    SelectionMode.defaultSelectionConfig
        |> SelectionMode.setAllowCustomOptionsWithBool False Nothing
        |> SelectionMode.setSelectedItemStaysInPlaceWithBool True


multiSelectSelectionConfig =
    SelectionMode.defaultSelectionConfig
        |> SelectionMode.setSelectionMode SelectionMode.MultiSelect
        |> SelectionMode.setAllowCustomOptionsWithBool False Nothing
        |> SelectionMode.setSelectedItemStaysInPlaceWithBool True


suite : Test
suite =
    describe "Replacing options"
        [ describe "in multi select mode "
            [ test "should not include options that were there before" <|
                \_ ->
                    Expect.equalLists
                        [ futureCop, theMidnight ]
                        (OptionList.replaceOptions
                            multiSelectSelectionConfig
                            (FancyOptionList [ thirdEyeBlind, futureCop ])
                            (FancyOptionList [ futureCop, theMidnight ])
                            |> OptionList.getOptions
                        )
            , test "should preserver selected options" <|
                \_ ->
                    Expect.equalLists
                        [ futureCop, Option.select 0 theMidnight ]
                        (OptionList.replaceOptions
                            multiSelectSelectionConfig
                            (FancyOptionList [ thirdEyeBlind, futureCop ])
                            (FancyOptionList [ futureCop, Option.select 0 theMidnight ])
                            |> OptionList.getOptions
                        )
            , test "should preserver selected options even if the selected value is not in the new list of options" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            multiSelectSelectionConfig
                            (FancyOptionList [ Option.select 0 thirdEyeBlind, futureCop ])
                            (FancyOptionList [ futureCop, theMidnight ])
                            |> OptionList.getOptions
                        )
                        [ futureCop, theMidnight, Option.select 0 thirdEyeBlind ]
            , test "should preserver selected order of the options" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            multiSelectSelectionConfig
                            (FancyOptionList [ Option.select 1 thirdEyeBlind, futureCop, Option.select 0 theMidnight ])
                            (FancyOptionList [ Option.select 1 thirdEyeBlind, futureCop, Option.select 0 theMidnight ])
                            |> OptionList.getOptions
                        )
                        [ Option.select 1 thirdEyeBlind, futureCop, Option.select 0 theMidnight ]
            , test "merging the 2 lists of options should preserver selected order of the options" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.mergeTwoListsOfOptionsPreservingSelectedOptions
                            SelectionMode.MultiSelect
                            OutputStyle.SelectedItemStaysInPlace
                            (FancyOptionList [ Option.select 1 thirdEyeBlind, futureCop, Option.select 0 theMidnight ])
                            (FancyOptionList [ Option.select 1 thirdEyeBlind, futureCop, Option.select 0 theMidnight ])
                            |> OptionList.getOptions
                        )
                        [ Option.select 1 thirdEyeBlind, futureCop, Option.select 0 theMidnight ]
            ]
        , describe "in single select mode"
            [ test "should preserver a single selected item in the new list of options" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            selectionConfig
                            (FancyOptionList [ futureCop, theMidnight ])
                            (FancyOptionList [ Option.select 0 thirdEyeBlind, futureCop ])
                            |> OptionList.getOptions
                        )
                        [ Option.select 0 thirdEyeBlind, futureCop ]
            , test "should preserver a single selected item in the old list of options" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            selectionConfig
                            (FancyOptionList [ Option.select 0 thirdEyeBlind, theMidnight ])
                            (FancyOptionList [ thirdEyeBlind, futureCop ])
                            |> OptionList.getOptions
                        )
                        [ Option.select 0 thirdEyeBlind, futureCop ]
            , test "should preserver a single selected item when the selected item is in both the old and new list" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            selectionConfig
                            (FancyOptionList [ Option.select 0 thirdEyeBlind, theMidnight ])
                            (FancyOptionList [ Option.select 0 thirdEyeBlind, futureCop ])
                            |> OptionList.getOptions
                        )
                        [ Option.select 0 thirdEyeBlind, futureCop ]
            , test "should preserver a single selected item when the selected item is NOT in the new list" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            selectionConfig
                            (FancyOptionList [ Option.select 0 thirdEyeBlind, theMidnight ])
                            (FancyOptionList [ futureCop ])
                            |> OptionList.getOptions
                        )
                        [ futureCop, Option.select 0 thirdEyeBlind ]
            , test "should preserver a single selected item when different items are selected in the old and new list, favoring the new selected option" <|
                \_ ->
                    Expect.equalLists
                        (OptionList.replaceOptions
                            selectionConfig
                            (FancyOptionList [ Option.select 0 thirdEyeBlind, theMidnight ])
                            (FancyOptionList [ Option.select 0 futureCop ])
                            |> OptionList.getOptions
                        )
                        [ Option.select 0 futureCop ]
            ]
        ]

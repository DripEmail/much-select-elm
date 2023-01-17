module Attributes.OutputStyle exposing (suite)

import Expect
import Json.Decode
import Json.Encode
import MuchSelect exposing (Flags)
import ProgramTest exposing (expectLastEffect, start)
import SimulatedEffect.Cmd
import SimulatedEffect.Ports
import Test exposing (Test, describe, test)


element =
    ProgramTest.createElement
        { init = MuchSelect.init
        , update = MuchSelect.update
        , view = MuchSelect.view
        }


simulateEffects : MuchSelect.Effect -> ProgramTest.SimulatedEffect MuchSelect.Msg
simulateEffects effect =
    case effect of
        MuchSelect.Batch effects ->
            effects
                |> List.map simulateEffects
                |> SimulatedEffect.Cmd.batch

        _ ->
            SimulatedEffect.Cmd.none


simulateSub : MuchSelect.Model -> ProgramTest.SimulatedSub MuchSelect.Msg
simulateSub _ =
    SimulatedEffect.Ports.subscribe "outputStyleChangedReceiver"
        Json.Decode.string
        MuchSelect.OutputStyleChanged


flagsDatalistSingle : Flags
flagsDatalistSingle =
    { isEventsOnly = False
    , selectedValue = ""
    , selectedValueEncoding = Nothing
    , placeholder = ( True, "" )
    , customOptionHint = Nothing
    , allowMultiSelect = False
    , outputStyle = "datalist"
    , enableMultiSelectSingleItemRemoval = False
    , optionsJson = ""
    , optionSort = ""
    , loading = False
    , maxDropdownItems = Just "2"
    , disabled = False
    , allowCustomOptions = False
    , selectedItemStaysInPlace = True
    , searchStringMinimumLength = Nothing
    , showDropdownFooter = False
    , transformationAndValidationJson = ""
    }


flagsCustomHtmlSingle : Flags
flagsCustomHtmlSingle =
    { isEventsOnly = False
    , selectedValue = ""
    , selectedValueEncoding = Nothing
    , placeholder = ( True, "" )
    , customOptionHint = Nothing
    , allowMultiSelect = False
    , outputStyle = "custom-html"
    , enableMultiSelectSingleItemRemoval = False
    , optionsJson = ""
    , optionSort = ""
    , loading = False
    , maxDropdownItems = Just "2"
    , disabled = False
    , allowCustomOptions = False
    , selectedItemStaysInPlace = True
    , searchStringMinimumLength = Nothing
    , showDropdownFooter = False
    , transformationAndValidationJson = ""
    }


suite : Test
suite =
    describe "Changing the output style"
        [ test "to custom-html should result in an effect to fetch the options from the DOM" <|
            \() ->
                element
                    |> ProgramTest.withSimulatedEffects simulateEffects
                    |> ProgramTest.withSimulatedSubscriptions simulateSub
                    |> start flagsDatalistSingle
                    |> ProgramTest.simulateIncomingPort
                        "outputStyleChangedReceiver"
                        (Json.Encode.string "custom-html")
                    |> expectLastEffect
                        (\effect ->
                            case effect of
                                MuchSelect.Batch batchEffects ->
                                    if List.member MuchSelect.FetchOptionsFromDom batchEffects then
                                        Expect.pass

                                    else
                                        Expect.fail "We should be fetching options from the DOM."

                                _ ->
                                    Expect.fail "We should be fetching options from the DOM."
                        )
        , test "to datalist should result in an effect to fetch the options from the DOM" <|
            \() ->
                element
                    |> ProgramTest.withSimulatedEffects simulateEffects
                    |> ProgramTest.withSimulatedSubscriptions simulateSub
                    |> start flagsCustomHtmlSingle
                    |> ProgramTest.simulateIncomingPort
                        "outputStyleChangedReceiver"
                        (Json.Encode.string "datalist")
                    |> expectLastEffect
                        (\effect ->
                            case effect of
                                MuchSelect.Batch batchEffects ->
                                    if List.member MuchSelect.FetchOptionsFromDom batchEffects then
                                        Expect.pass

                                    else
                                        Expect.fail "We should be fetching options from the DOM."

                                _ ->
                                    Expect.fail "We should be fetching options from the DOM."
                        )
        , test "an invalid value should result in an error" <|
            \() ->
                element
                    |> ProgramTest.withSimulatedEffects simulateEffects
                    |> ProgramTest.withSimulatedSubscriptions simulateSub
                    |> start flagsDatalistSingle
                    |> ProgramTest.simulateIncomingPort
                        "outputStyleChangedReceiver"
                        (Json.Encode.string "bogus")
                    |> expectLastEffect
                        (\effect ->
                            case effect of
                                MuchSelect.ReportErrorMessage _ ->
                                    Expect.pass

                                _ ->
                                    Expect.fail "We should be fetching options from the DOM."
                        )
        ]

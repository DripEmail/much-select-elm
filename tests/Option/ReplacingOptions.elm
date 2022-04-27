module Option.ReplacingOptions exposing (suite)

import Expect
import Option
import OptionsUtilities exposing (replaceOptions)
import SelectionMode
import Test exposing (Test, describe, test)


futureCop =
    Option.newOption "Future Cop!" Nothing


theMidnight =
    Option.newOption "The Midnight" Nothing


thirdEyeBlind =
    Option.newOption "Third Eye Blind" Nothing


selectionMode =
    SelectionMode.SingleSelect
        SelectionMode.NoCustomOptions
        SelectionMode.SelectedItemStaysInPlace
        SelectionMode.CustomHtml


suite : Test
suite =
    describe "Replacing options"
        [ describe "in multi select mode "
            [ test "should not include options that were there before" <|
                \_ ->
                    Expect.equalLists
                        [ futureCop, theMidnight ]
                        (replaceOptions
                            selectionMode
                            [ thirdEyeBlind, futureCop ]
                            [ futureCop, theMidnight ]
                        )
            , test "should preserver selected options" <|
                \_ ->
                    Expect.equalLists
                        [ futureCop, Option.selectOption 0 theMidnight ]
                        (replaceOptions
                            selectionMode
                            [ thirdEyeBlind, futureCop ]
                            [ futureCop, Option.selectOption 0 theMidnight ]
                        )
            , test "should preserver selected options even if the selected value is not in the new list of options" <|
                \_ ->
                    Expect.equalLists
                        (replaceOptions
                            selectionMode
                            [ Option.selectOption 0 thirdEyeBlind, futureCop ]
                            [ futureCop, theMidnight ]
                        )
                        [ futureCop, theMidnight, Option.selectOption 0 thirdEyeBlind ]
            ]
        , describe "in single select mode"
            [ test "should preserver a single selected item in the new list of options" <|
                \_ ->
                    Expect.equalLists
                        (replaceOptions
                            selectionMode
                            [ futureCop, theMidnight ]
                            [ Option.selectOption 0 thirdEyeBlind, futureCop ]
                        )
                        [ Option.selectOption 0 thirdEyeBlind, futureCop ]
            , test "should preserver a single selected item in the old list of options" <|
                \_ ->
                    Expect.equalLists
                        (replaceOptions
                            selectionMode
                            [ Option.selectOption 0 thirdEyeBlind, theMidnight ]
                            [ thirdEyeBlind, futureCop ]
                        )
                        [ Option.selectOption 0 thirdEyeBlind, futureCop ]
            , test "should preserver a single selected item when the selected item is in both the old and new list" <|
                \_ ->
                    Expect.equalLists
                        (replaceOptions
                            selectionMode
                            [ Option.selectOption 0 thirdEyeBlind, theMidnight ]
                            [ Option.selectOption 0 thirdEyeBlind, futureCop ]
                        )
                        [ Option.selectOption 0 thirdEyeBlind, futureCop ]
            , test "should preserver a single selected item when the selected item is NOT in the new list" <|
                \_ ->
                    Expect.equalLists
                        (replaceOptions
                            selectionMode
                            [ Option.selectOption 0 thirdEyeBlind, theMidnight ]
                            [ futureCop ]
                        )
                        [ futureCop, Option.selectOption 0 thirdEyeBlind ]
            , test "should preserver a single selected item when different items are selected in the old and new list, favoring the new selected option" <|
                \_ ->
                    Expect.equalLists
                        (replaceOptions
                            selectionMode
                            [ Option.selectOption 0 thirdEyeBlind, theMidnight ]
                            [ Option.selectOption 0 futureCop ]
                        )
                        [ Option.selectOption 0 futureCop ]
            ]
        ]

module Option.Highlighting exposing (suite)

import Expect
import Option
import OptionsUtilities exposing (moveHighlightedOptionDown, moveHighlightedOptionUp)
import SelectionMode
import Test exposing (Test, describe, test)


suite : Test
suite =
    describe "Change the highlighted option"
        [ describe "by moving the highlighted option down"
            [ test "but if no option is already highlighted, highlight the first (top) option" <|
                \_ ->
                    let
                        options =
                            [ Option.newOption "one" Nothing
                            , Option.newOption "two" Nothing
                            , Option.newOption "three" Nothing
                            ]
                    in
                    Expect.equal
                        (moveHighlightedOptionDown SelectionMode.defaultSelectionConfig options options)
                        [ Option.newOption "one" Nothing |> Option.highlightOption
                        , Option.newOption "two" Nothing
                        , Option.newOption "three" Nothing
                        ]
            , test "highlight the next highlightable option, not skipping over the selected option" <|
                \_ ->
                    let
                        options =
                            [ Option.newOption "one" Nothing |> Option.highlightOption
                            , Option.newOption "two" Nothing |> Option.selectOption 0
                            , Option.newOption "three" Nothing
                            ]
                    in
                    Expect.equal
                        (moveHighlightedOptionDown SelectionMode.defaultSelectionConfig options options)
                        [ Option.newOption "one" Nothing
                        , Option.newOption "two" Nothing |> Option.selectOption 0 |> Option.highlightOption
                        , Option.newOption "three" Nothing
                        ]
            , test "highlight the next highlightable option, skipping over disabled options" <|
                \_ ->
                    let
                        options =
                            [ Option.newOption "one" Nothing |> Option.highlightOption
                            , Option.newDisabledOption "two" Nothing
                            , Option.newDisabledOption "three" Nothing
                            , Option.newOption "four" Nothing
                            ]
                    in
                    Expect.equal
                        (moveHighlightedOptionDown SelectionMode.defaultSelectionConfig options options)
                        [ Option.newOption "one" Nothing
                        , Option.newDisabledOption "two" Nothing
                        , Option.newDisabledOption "three" Nothing
                        , Option.newOption "four" Nothing |> Option.highlightOption
                        ]
            ]
        , describe "by moving the highlighted option up"
            [ test "but if no option is already highlighted, highlight the first (top) option" <|
                \_ ->
                    let
                        options =
                            [ Option.newOption "one" Nothing
                            , Option.newOption "two" Nothing
                            , Option.newOption "three" Nothing
                            ]
                    in
                    Expect.equal
                        (moveHighlightedOptionUp SelectionMode.defaultSelectionConfig options options)
                        [ Option.newOption "one" Nothing |> Option.highlightOption
                        , Option.newOption "two" Nothing
                        , Option.newOption "three" Nothing
                        ]
            , test "highlight the previous highlightable option, not skipping over the selected option" <|
                \_ ->
                    let
                        options =
                            [ Option.newOption "one" Nothing
                            , Option.newOption "two" Nothing |> Option.selectOption 0
                            , Option.newOption "three" Nothing |> Option.highlightOption
                            ]
                    in
                    Expect.equal
                        (moveHighlightedOptionUp SelectionMode.defaultSelectionConfig options options)
                        [ Option.newOption "one" Nothing
                        , Option.newOption "two" Nothing |> Option.selectOption 0 |> Option.highlightOption
                        , Option.newOption "three" Nothing
                        ]
            , test "highlight the previous highlightable option, skipping over disabled options" <|
                \_ ->
                    let
                        options =
                            [ Option.newOption "one" Nothing
                            , Option.newDisabledOption "two" Nothing
                            , Option.newDisabledOption "three" Nothing
                            , Option.newOption "four" Nothing |> Option.highlightOption
                            ]
                    in
                    Expect.equal
                        (moveHighlightedOptionUp SelectionMode.defaultSelectionConfig options options)
                        [ Option.newOption "one" Nothing |> Option.highlightOption
                        , Option.newDisabledOption "two" Nothing
                        , Option.newDisabledOption "three" Nothing
                        , Option.newOption "four" Nothing
                        ]
            , test "highlight the previous highlightable option in the middle of a long list" <|
                \_ ->
                    let
                        options =
                            [ Option.newOption "one" Nothing
                            , Option.newOption "two" Nothing
                            , Option.newOption "three" Nothing |> Option.highlightOption
                            , Option.newOption "four" Nothing
                            , Option.newOption "five" Nothing
                            ]
                    in
                    Expect.equal
                        (moveHighlightedOptionUp SelectionMode.defaultSelectionConfig options options)
                        [ Option.newOption "one" Nothing
                        , Option.newOption "two" Nothing |> Option.highlightOption
                        , Option.newOption "three" Nothing
                        , Option.newOption "four" Nothing
                        , Option.newOption "five" Nothing
                        ]
            ]
        ]

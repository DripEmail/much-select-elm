module FilteringOptions.OptionSearcher exposing (suite)

import Expect
import Main exposing (figureOutWhichOptionsToShow)
import Option exposing (filterOptionsToShowInDropdown)
import OptionSearcher exposing (doesSearchStringFindNothing)
import OptionSorting exposing (sortOptionsBySearchFilterTotalScore)
import PositiveInt
import SelectionMode
import Test exposing (Test, describe, test)


selectionMode =
    SelectionMode.SingleSelect SelectionMode.NoCustomOptions SelectionMode.SelectedItemStaysInPlace


minervaryaPentali =
    Option.newOption "Minervarya pentali" Nothing
        |> Option.setGroupWithString "Frog"


paedophryneAmauensis =
    Option.newOption "Paedophryne Amauensis" Nothing
        |> Option.setGroupWithString "Frog"


glassFrog =
    Option.newOption "Glass Frog" Nothing
        |> Option.setGroupWithString "Frog"


venezuelaPebbleToad =
    Option.newOption "Venezuela Pebble Toad" Nothing
        |> Option.setGroupWithString "Frog"


dinar =
    Option.newOption "Dinar" Nothing
        |> Option.setGroupWithString "Money"


ouguiya =
    Option.newOption "Ougyiya" Nothing
        |> Option.setGroupWithString "Money"


pound =
    Option.newOption "Pound" Nothing
        |> Option.setGroupWithString "Money"


frogs =
    [ minervaryaPentali, venezuelaPebbleToad, paedophryneAmauensis, glassFrog ]


monnies =
    [ dinar, ouguiya, pound ]


suite : Test
suite =
    describe "Filtering Search Results"
        [ describe "by option group"
            [ test "if some of the search string matches the group" <|
                \_ ->
                    Expect.equal
                        (OptionSearcher.updateOptions selectionMode Nothing "frog" (frogs ++ monnies)
                            |> figureOutWhichOptionsToShow (PositiveInt.new 10)
                            |> List.length
                        )
                        4
            , test "if some of the search string matches the group we should make sure the dropdown contains just the options that should be there" <|
                \_ ->
                    Expect.equal
                        (OptionSearcher.updateOptions selectionMode Nothing "frog" (frogs ++ monnies)
                            |> figureOutWhichOptionsToShow (PositiveInt.new 10)
                            |> doesSearchStringFindNothing "frog" (PositiveInt.new 10)
                        )
                        False
            , test "if some of the search string matches a group and a option the option should be first" <|
                \_ ->
                    Expect.equal
                        (OptionSearcher.updateOptions selectionMode Nothing "frog" (frogs ++ monnies)
                            |> sortOptionsBySearchFilterTotalScore
                            |> figureOutWhichOptionsToShow (PositiveInt.new 10)
                            |> List.head
                            |> Maybe.map Option.getOptionValueAsString
                        )
                        (Just "Glass Frog")
            , test "if some of the search string matches a label that option should be first" <|
                \_ ->
                    Expect.equal
                        (OptionSearcher.updateOptions selectionMode Nothing "pent" (frogs ++ monnies)
                            |> sortOptionsBySearchFilterTotalScore
                            |> figureOutWhichOptionsToShow (PositiveInt.new 10)
                            |> List.head
                            |> Maybe.map Option.getOptionValueAsString
                        )
                        (Just "Minervarya pentali")
            , test "if some of the search string matches a label that option should be first even if it's not the first option in the list" <|
                \_ ->
                    Expect.equal
                        (OptionSearcher.updateOptions selectionMode Nothing "yiya" (frogs ++ monnies)
                            |> sortOptionsBySearchFilterTotalScore
                            |> figureOutWhichOptionsToShow (PositiveInt.new 10)
                            |> List.head
                            |> Maybe.map Option.getOptionValueAsString
                        )
                        (Just "Ougyiya")
            ]
        ]

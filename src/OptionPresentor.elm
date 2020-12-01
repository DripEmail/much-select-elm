module OptionPresentor exposing
    ( OptionPresenter
    , hasDescription
    , highlightMarkup
    , indexInsideMatch
    , prepareOptionsForPresentation
    , simpleMatch
    , tokenize
    )

import Fuzzy exposing (Result, match)
import Html exposing (Html, span, text)
import Html.Attributes exposing (class)
import List.Extra
import Option
    exposing
        ( Option
        , OptionDescription
        , OptionDisplay
        , OptionGroup
        , OptionLabel
        , OptionValue
        )
import Stack


type alias OptionPresenter msg =
    { display : OptionDisplay
    , label : OptionLabel
    , value : OptionValue
    , group : OptionGroup
    , description : OptionDescription
    , searchResult : Maybe OptionSearchResult
    , totalScore : Int
    , labelMarkup : Html msg
    , descriptionMarkup : Html msg
    }


hasDescription : OptionPresenter msg -> Bool
hasDescription optionPresenter =
    Option.optionDescriptionToBool optionPresenter.description


type alias OptionSearchResult =
    { labelMatch : Result
    , descriptionMatch : Result
    }


type alias HighlightResult =
    { highlightStack : Stack.Stack Char
    , plainStack : Stack.Stack Char
    , result : Result
    , textTokens : List ( Bool, String )
    , hay : String
    }


indexInsideMatch : Result -> Int -> Bool
indexInsideMatch result index =
    result.matches
        |> List.filter
            (\match ->
                let
                    matchIndex =
                        index - match.offset
                in
                List.member matchIndex match.keys
            )
        |> List.isEmpty
        |> not


tokenizeHelper : Int -> Char -> HighlightResult -> HighlightResult
tokenizeHelper index char highlightResult =
    let
        theEnd =
            index == String.length highlightResult.hay - 1
    in
    if indexInsideMatch highlightResult.result index then
        case Stack.top highlightResult.plainStack of
            Just _ ->
                let
                    prevText =
                        ( False, highlightResult.plainStack |> Stack.toList |> List.reverse |> String.fromList )
                in
                { highlightResult
                    | textTokens = List.append highlightResult.textTokens [ prevText ]
                    , highlightStack = Stack.push char highlightResult.highlightStack
                    , plainStack = Stack.initialise
                }

            Nothing ->
                if theEnd then
                    let
                        currentHighlight =
                            ( True
                            , highlightResult.highlightStack
                                |> Stack.toList
                                |> List.append [ char ]
                                |> List.reverse
                                |> String.fromList
                            )
                    in
                    { highlightResult
                        | textTokens = List.append highlightResult.textTokens [ currentHighlight ]
                        , highlightStack = Stack.initialise
                    }

                else
                    { highlightResult | highlightStack = Stack.push char highlightResult.highlightStack }

    else
        case Stack.top highlightResult.highlightStack of
            Just _ ->
                if theEnd then
                    let
                        prevHighlight =
                            ( True
                            , highlightResult.highlightStack
                                |> Stack.toList
                                |> List.reverse
                                |> String.fromList
                            )
                    in
                    { highlightResult
                        | textTokens =
                            List.append highlightResult.textTokens
                                [ prevHighlight
                                , ( False, String.fromChar char )
                                ]
                    }

                else
                    let
                        prevHighlight =
                            ( True
                            , highlightResult.highlightStack
                                |> Stack.toList
                                |> List.reverse
                                |> String.fromList
                            )
                    in
                    { highlightResult
                        | textTokens =
                            List.append highlightResult.textTokens
                                [ prevHighlight
                                ]
                        , highlightStack = Stack.initialise
                        , plainStack = Stack.push char highlightResult.plainStack
                    }

            Nothing ->
                if theEnd then
                    let
                        prevText =
                            ( False
                            , highlightResult.plainStack
                                |> Stack.toList
                                |> List.append [ char ]
                                |> List.reverse
                                |> String.fromList
                            )
                    in
                    { highlightResult
                        | textTokens = List.append highlightResult.textTokens [ prevText ]
                        , plainStack = Stack.initialise
                    }

                else
                    { highlightResult
                        | plainStack = Stack.push char highlightResult.plainStack
                        , highlightStack = Stack.initialise
                    }


tokenize : String -> Result -> List ( Bool, String )
tokenize hay result =
    List.Extra.indexedFoldl
        tokenizeHelper
        { highlightStack = Stack.initialise
        , plainStack = Stack.initialise
        , result = result
        , textTokens = []
        , hay = hay
        }
        (String.toList hay)
        |> .textTokens


tokensToHtml : List ( Bool, String ) -> List (Html msg)
tokensToHtml list =
    List.map
        (\( highlighted, string ) ->
            if highlighted then
                span [ class "highlight" ] [ text string ]

            else
                text string
        )
        list


highlightMarkup : String -> Result -> Html msg
highlightMarkup hay result =
    span [] (tokensToHtml (tokenize hay result))


prepareOptionsForPresentation : String -> List Option -> List (OptionPresenter msg)
prepareOptionsForPresentation searchString options =
    options
        |> List.map
            (\option ->
                let
                    searchResult =
                        search searchString option

                    totalScore =
                        searchResult.labelMatch.score + searchResult.descriptionMatch.score
                in
                { display = Option.getOptionDisplay option
                , label = Option.getOptionLabel option
                , value = Option.getOptionValue option
                , group = Option.getOptionGroup option
                , description = Option.getOptionDescription option
                , searchResult = Just searchResult
                , totalScore = totalScore
                , labelMarkup = highlightMarkup (Option.getOptionLabel option |> Option.optionLabelToString) searchResult.labelMatch
                , descriptionMarkup = highlightMarkup (Option.getOptionDescription option |> Option.optionDescriptionToString) searchResult.descriptionMatch
                }
            )
        |> List.sortBy .totalScore


simpleMatch : String -> String -> Result
simpleMatch needle hay =
    match [] [ " " ] needle hay


search : String -> Option -> OptionSearchResult
search string option =
    { labelMatch =
        simpleMatch
            (string |> String.toLower)
            (option
                |> Option.getOptionLabel
                |> Option.optionLabelToString
                |> String.toLower
            )
    , descriptionMatch =
        simpleMatch
            (string |> String.toLower)
            (option
                |> Option.getOptionDescription
                |> Option.optionDescriptionToString
                |> String.toLower
            )
    }

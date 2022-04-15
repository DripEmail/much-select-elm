module OptionSearchFilter exposing
    ( OptionSearchFilter
    , OptionSearchResult
    , descriptionHandicap
    , getLowScore
    , groupHandicap
    , impossiblyLowScore
    , lowScoreCutOff
    , new
    )

import Fuzzy exposing (Result)


type alias OptionSearchFilter =
    { totalScore : Int
    , bestScore : Int
    , searchResult : OptionSearchResult
    , labelTokens : List ( Bool, String )
    , descriptionTokens : List ( Bool, String )
    , groupTokens : List ( Bool, String )
    }


type alias OptionSearchResult =
    { labelMatch : Result
    , descriptionMatch : Result
    , groupMatch : Result
    }


impossiblyLowScore : number
impossiblyLowScore =
    1000000


new : Int -> Int -> OptionSearchResult -> List ( Bool, String ) -> List ( Bool, String ) -> List ( Bool, String ) -> OptionSearchFilter
new totalScore bestScore searchResult labelTokens descriptionTokens groupTokens =
    { totalScore = totalScore
    , bestScore = bestScore
    , searchResult = searchResult
    , labelTokens = labelTokens
    , descriptionTokens = descriptionTokens
    , groupTokens = groupTokens
    }


getLowScore : OptionSearchResult -> Int
getLowScore optionSearchResult =
    List.minimum
        [ optionSearchResult.labelMatch.score
        , descriptionHandicap optionSearchResult.descriptionMatch.score
        , groupHandicap optionSearchResult.groupMatch.score
        ]
        |> Maybe.withDefault
            impossiblyLowScore


lowScoreCutOff : Int -> Int
lowScoreCutOff score =
    if score == 0 then
        10

    else if score <= 10 then
        100

    else if score <= 100 then
        1000

    else if score <= 1000 then
        10000

    else
        impossiblyLowScore


descriptionHandicap : Int -> Int
descriptionHandicap score =
    if score < 5 then
        5

    else
        floor (toFloat score * 1.25)


groupHandicap : Int -> Int
groupHandicap score =
    if score < 10 then
        10

    else
        floor (toFloat score * 1.5)

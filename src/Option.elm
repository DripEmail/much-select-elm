module Option exposing
    ( Option(..)
    , OptionDescription
    , OptionDisplay(..)
    , OptionGroup
    , OptionValue
    , addAdditionalOptionsToOptionList
    , addAdditionalOptionsToOptionListWithAutoSortRank
    , addAndSelectOptionsInOptionsListByString
    , clearAnyUnselectedCustomOptions
    , customSelectedOptions
    , decoder
    , deselectAllButTheFirstSelectedOptionInList
    , deselectAllOptionsInOptionsList
    , deselectAllSelectedHighlightedOptions
    , deselectEveryOptionExceptOptionsInList
    , deselectLastSelectedOption
    , deselectOption
    , deselectOptionInListByOptionValue
    , deselectOptions
    , emptyOptionGroup
    , encode
    , filterOptionsToShowInDropdown
    , filterOptionsToShowInDropdownBySearchScore
    , findHighestAutoSortRank
    , findHighlightedOrSelectedOptionIndex
    , findOptionByOptionValue
    , getMaybeOptionSearchFilter
    , getOptionDescription
    , getOptionDisplay
    , getOptionGroup
    , getOptionLabel
    , getOptionValue
    , getOptionValueAsString
    , hasSelectedHighlightedOptions
    , hasSelectedOption
    , highlightFirstOptionInList
    , highlightOption
    , highlightOptionInList
    , highlightOptionInListByValue
    , isEmptyOption
    , isOptionInListOfOptionsByValue
    , isOptionValueInListOfOptionsByValue
    , merge2Options
    , mergeTwoListsOfOptionsPreservingSelectedOptions
    , moveHighlightedOptionDown
    , moveHighlightedOptionUp
    , newCustomOption
    , newDisabledOption
    , newOption
    , newSelectedOption
    , optionDescriptionToBool
    , optionDescriptionToSearchString
    , optionDescriptionToString
    , optionGroupToSearchString
    , optionGroupToString
    , optionToValueLabelTuple
    , optionsDecoder
    , optionsValues
    , removeHighlightOptionInList
    , removeOptionsFromOptionList
    , removeUnselectedCustomOptions
    , replaceOptions
    , selectHighlightedOption
    , selectOption
    , selectOptionInList
    , selectOptionInListByOptionValue
    , selectOptionsInList
    , selectOptionsInOptionsListByString
    , selectSingleOptionInList
    , selectSingleOptionInListByString
    , selectedOptions
    , selectedOptionsToTuple
    , setDescriptionWithString
    , setGroupWithString
    , setLabelWithString
    , setMaybeSortRank
    , setOptionSearchFilter
    , setSelectedOptionInNewOptions
    , stringToOptionValue
    , toggleSelectedHighlightByOptionValue
    , unhighlightSelectedOptions
    , updateOrAddCustomOption
    )

import Json.Decode
import Json.Encode
import List.Extra
import Maybe.Extra
import OptionLabel exposing (OptionLabel(..), labelDecoder, optionLabelToSearchString, optionLabelToString)
import OptionSearchFilter exposing (OptionSearchFilter, OptionSearchResult, getLowScore, impossiblyLowScore, lowScoreCutOff)
import SelectionMode exposing (SelectedItemPlacementMode(..), SelectionMode(..))
import SortRank exposing (SortRank(..))


type Option
    = Option OptionDisplay OptionLabel OptionValue OptionDescription OptionGroup (Maybe OptionSearchFilter)
    | CustomOption OptionDisplay OptionLabel OptionValue (Maybe OptionSearchFilter)
    | EmptyOption OptionDisplay OptionLabel


getOptionLabel : Option -> OptionLabel
getOptionLabel option =
    case option of
        Option _ label _ _ _ _ ->
            label

        CustomOption _ label _ _ ->
            label

        EmptyOption _ label ->
            label


type OptionDisplay
    = OptionShown
    | OptionHidden
    | OptionSelected Int
    | OptionSelectedHighlighted Int
    | OptionHighlighted
    | OptionDisabled


type OptionValue
    = OptionValue String
    | EmptyOptionValue


optionValueToString : OptionValue -> String
optionValueToString optionValue =
    case optionValue of
        OptionValue valueString ->
            valueString

        EmptyOptionValue ->
            ""


stringToOptionValue : String -> OptionValue
stringToOptionValue string =
    OptionValue string


type OptionDescription
    = OptionDescription String (Maybe String)
    | NoDescription


optionDescriptionToString : OptionDescription -> String
optionDescriptionToString optionDescription =
    case optionDescription of
        OptionDescription string _ ->
            string

        NoDescription ->
            ""


optionDescriptionToSearchString : OptionDescription -> String
optionDescriptionToSearchString optionDescription =
    case optionDescription of
        OptionDescription description maybeCleanDescription ->
            case maybeCleanDescription of
                Just cleanDescription ->
                    cleanDescription

                Nothing ->
                    String.toLower description

        NoDescription ->
            ""


optionDescriptionToBool : OptionDescription -> Bool
optionDescriptionToBool optionDescription =
    case optionDescription of
        OptionDescription _ _ ->
            True

        NoDescription ->
            False


type OptionGroup
    = OptionGroup String
    | NoOptionGroup


emptyOptionGroup : OptionGroup
emptyOptionGroup =
    NoOptionGroup


getOptionGroup : Option -> OptionGroup
getOptionGroup option =
    case option of
        Option _ _ _ _ optionGroup _ ->
            optionGroup

        CustomOption _ _ _ _ ->
            NoOptionGroup

        EmptyOption _ _ ->
            NoOptionGroup


newOption : String -> Maybe String -> Option
newOption value maybeCleanLabel =
    case value of
        "" ->
            EmptyOption OptionShown (OptionLabel.newWithCleanLabel "" maybeCleanLabel)

        _ ->
            Option
                OptionShown
                (OptionLabel.newWithCleanLabel value maybeCleanLabel)
                (OptionValue value)
                NoDescription
                NoOptionGroup
                Nothing


newCustomOption : String -> Maybe String -> Option
newCustomOption value maybeCleanLabel =
    CustomOption
        OptionShown
        (OptionLabel.newWithCleanLabel value maybeCleanLabel)
        (OptionValue value)
        Nothing


setLabelWithString : String -> Maybe String -> Option -> Option
setLabelWithString string maybeCleanString option =
    case option of
        Option optionDisplay _ optionValue description group search ->
            Option
                optionDisplay
                (OptionLabel.newWithCleanLabel string maybeCleanString)
                optionValue
                description
                group
                search

        CustomOption optionDisplay _ _ search ->
            CustomOption
                optionDisplay
                (OptionLabel.newWithCleanLabel string maybeCleanString)
                (OptionValue string)
                search

        EmptyOption optionDisplay _ ->
            EmptyOption optionDisplay (OptionLabel.newWithCleanLabel string maybeCleanString)


setLabel : OptionLabel -> Option -> Option
setLabel label option =
    case option of
        Option optionDisplay _ optionValue description group search ->
            Option
                optionDisplay
                label
                optionValue
                description
                group
                search

        CustomOption optionDisplay _ _ search ->
            CustomOption
                optionDisplay
                label
                (OptionValue (optionLabelToString label))
                search

        EmptyOption optionDisplay _ ->
            EmptyOption optionDisplay
                label


setDescriptionWithString : String -> Option -> Option
setDescriptionWithString string option =
    case option of
        Option optionDisplay label optionValue _ group search ->
            Option optionDisplay
                label
                optionValue
                (OptionDescription string Nothing)
                group
                search

        CustomOption optionDisplay optionLabel optionValue search ->
            CustomOption
                optionDisplay
                optionLabel
                optionValue
                search

        EmptyOption optionDisplay optionLabel ->
            EmptyOption optionDisplay optionLabel


setDescription : OptionDescription -> Option -> Option
setDescription description option =
    case option of
        Option optionDisplay label optionValue _ group search ->
            Option optionDisplay
                label
                optionValue
                description
                group
                search

        CustomOption optionDisplay optionLabel optionValue search ->
            CustomOption
                optionDisplay
                optionLabel
                optionValue
                search

        EmptyOption optionDisplay optionLabel ->
            EmptyOption optionDisplay optionLabel


setGroup : OptionGroup -> Option -> Option
setGroup optionGroup option =
    case option of
        Option optionDisplay label optionValue description _ search ->
            Option optionDisplay
                label
                optionValue
                description
                optionGroup
                search

        CustomOption optionDisplay optionLabel optionValue search ->
            CustomOption optionDisplay
                optionLabel
                optionValue
                search

        EmptyOption optionDisplay optionLabel ->
            EmptyOption optionDisplay optionLabel


setGroupWithString : String -> Option -> Option
setGroupWithString string option =
    case option of
        Option optionDisplay label optionValue description _ search ->
            Option optionDisplay
                label
                optionValue
                description
                (OptionGroup string)
                search

        CustomOption optionDisplay optionLabel optionValue search ->
            CustomOption optionDisplay
                optionLabel
                optionValue
                search

        EmptyOption optionDisplay optionLabel ->
            EmptyOption optionDisplay optionLabel


setOptionDisplay : OptionDisplay -> Option -> Option
setOptionDisplay optionDisplay option =
    case option of
        Option _ optionLabel optionValue optionDescription optionGroup search ->
            Option
                optionDisplay
                optionLabel
                optionValue
                optionDescription
                optionGroup
                search

        CustomOption _ optionLabel optionValue search ->
            CustomOption optionDisplay
                optionLabel
                optionValue
                search

        EmptyOption _ optionLabel ->
            EmptyOption optionDisplay optionLabel


setOptionSearchFilter : Maybe OptionSearchFilter -> Option -> Option
setOptionSearchFilter maybeOptionSearchFilter option =
    case option of
        Option optionDisplay optionLabel optionValue optionDescription optionGroup _ ->
            Option
                optionDisplay
                optionLabel
                optionValue
                optionDescription
                optionGroup
                maybeOptionSearchFilter

        CustomOption optionDisplay optionLabel optionValue _ ->
            CustomOption
                optionDisplay
                optionLabel
                optionValue
                maybeOptionSearchFilter

        EmptyOption optionDisplay optionLabel ->
            EmptyOption
                optionDisplay
                optionLabel


setMaybeSortRank : Maybe SortRank -> Option -> Option
setMaybeSortRank maybeSortRank option =
    setLabel (option |> getOptionLabel |> OptionLabel.setMaybeSortRank maybeSortRank) option


newSelectedOption : Int -> String -> Maybe String -> Option
newSelectedOption index string maybeCleanLabel =
    Option (OptionSelected index)
        (OptionLabel.newWithCleanLabel string maybeCleanLabel)
        (OptionValue string)
        NoDescription
        NoOptionGroup
        Nothing


newDisabledOption : String -> Maybe String -> Option
newDisabledOption string maybeCleanLabel =
    Option OptionDisabled
        (OptionLabel.newWithCleanLabel string maybeCleanLabel)
        (OptionValue string)
        NoDescription
        NoOptionGroup
        Nothing


isOptionSelected : Option -> Bool
isOptionSelected option =
    let
        isOptionDisplaySelected optionDisplay =
            case optionDisplay of
                OptionShown ->
                    False

                OptionHidden ->
                    False

                OptionSelected _ ->
                    True

                OptionSelectedHighlighted _ ->
                    True

                OptionHighlighted ->
                    False

                OptionDisabled ->
                    False
    in
    case option of
        Option optionDisplay _ _ _ _ _ ->
            isOptionDisplaySelected optionDisplay

        CustomOption optionDisplay _ _ _ ->
            isOptionDisplaySelected optionDisplay

        EmptyOption optionDisplay _ ->
            isOptionDisplaySelected optionDisplay


getOptionDisplay : Option -> OptionDisplay
getOptionDisplay option =
    case option of
        Option display _ _ _ _ _ ->
            display

        CustomOption display _ _ _ ->
            display

        EmptyOption display _ ->
            display


getOptionSelectedIndex : Option -> Int
getOptionSelectedIndex option =
    case option of
        Option optionDisplay _ _ _ _ _ ->
            optionDisplayToSelectedIndex optionDisplay

        CustomOption optionDisplay _ _ _ ->
            optionDisplayToSelectedIndex optionDisplay

        EmptyOption optionDisplay _ ->
            optionDisplayToSelectedIndex optionDisplay


setOptionSelectedIndex : Int -> Option -> Option
setOptionSelectedIndex selectedIndex option =
    case option of
        Option optionDisplay _ _ _ _ _ ->
            setOptionDisplay (setOptionDisplaySelectedIndex selectedIndex optionDisplay) option

        CustomOption optionDisplay _ _ _ ->
            setOptionDisplay (setOptionDisplaySelectedIndex selectedIndex optionDisplay) option

        EmptyOption optionDisplay _ ->
            setOptionDisplay (setOptionDisplaySelectedIndex selectedIndex optionDisplay) option


setOptionDisplaySelectedIndex : Int -> OptionDisplay -> OptionDisplay
setOptionDisplaySelectedIndex selectedIndex optionDisplay =
    case optionDisplay of
        OptionShown ->
            optionDisplay

        OptionHidden ->
            optionDisplay

        OptionSelected _ ->
            OptionSelected selectedIndex

        OptionSelectedHighlighted _ ->
            OptionSelectedHighlighted selectedIndex

        OptionHighlighted ->
            optionDisplay

        OptionDisabled ->
            optionDisplay


optionDisplayToSelectedIndex : OptionDisplay -> Int
optionDisplayToSelectedIndex optionDisplay =
    case optionDisplay of
        OptionShown ->
            -1

        OptionHidden ->
            -1

        OptionSelected int ->
            int

        OptionSelectedHighlighted int ->
            int

        OptionHighlighted ->
            -1

        OptionDisabled ->
            -1


getOptionValue : Option -> OptionValue
getOptionValue option =
    case option of
        Option _ _ value _ _ _ ->
            value

        CustomOption _ _ value _ ->
            value

        EmptyOption _ _ ->
            EmptyOptionValue


getOptionValueAsString : Option -> String
getOptionValueAsString option =
    case option |> getOptionValue of
        OptionValue string ->
            string

        EmptyOptionValue ->
            ""


optionGroupToString : OptionGroup -> String
optionGroupToString optionGroup =
    case optionGroup of
        OptionGroup string ->
            string

        NoOptionGroup ->
            ""


optionGroupToSearchString : OptionGroup -> String
optionGroupToSearchString optionGroup =
    case optionGroup of
        OptionGroup string ->
            String.toLower string

        NoOptionGroup ->
            ""


getOptionDescription : Option -> OptionDescription
getOptionDescription option =
    case option of
        Option _ _ _ optionDescription _ _ ->
            optionDescription

        CustomOption _ _ _ _ ->
            NoDescription

        EmptyOption _ _ ->
            NoDescription


getMaybeOptionSearchFilter : Option -> Maybe OptionSearchFilter
getMaybeOptionSearchFilter option =
    case option of
        Option _ _ _ _ _ maybeOptionSearchFilter ->
            maybeOptionSearchFilter

        CustomOption _ _ _ maybeOptionSearchFilter ->
            maybeOptionSearchFilter

        EmptyOption _ _ ->
            Nothing


selectedOptionsToTuple : List Option -> List ( String, String )
selectedOptionsToTuple options =
    options |> selectedOptions |> List.map optionToValueLabelTuple


optionsValues : List Option -> List String
optionsValues options =
    List.map getOptionValueAsString options



{- This takes a list of string and a list of options.
   Then it selects any matching options (looking at values of the options).

   It also deselects any options that are NOT in the the list of string.
-}


selectOptionsInOptionsListByString : List String -> List Option -> List Option
selectOptionsInOptionsListByString strings options =
    let
        optionsToSelect =
            List.filter (isOptionValueInListOfStrings strings) options
    in
    selectOptionsInList optionsToSelect options
        |> deselectEveryOptionExceptOptionsInList optionsToSelect


addAndSelectOptionsInOptionsListByString : List String -> List Option -> List Option
addAndSelectOptionsInOptionsListByString strings options =
    let
        helper : Int -> List String -> List Option -> List Option
        helper index valueStrings options_ =
            case valueStrings of
                [] ->
                    options_

                [ valueString ] ->
                    if optionListContainsOptionWithValueString valueString options_ then
                        selectOptionInListByValueStringWithIndex index valueString options_

                    else
                        options_ ++ [ newSelectedOption index valueString Nothing ]

                valueString :: restOfValueStrings ->
                    if optionListContainsOptionWithValueString valueString options_ then
                        helper (index + 1) restOfValueStrings (selectOptionInListByValueStringWithIndex index valueString options_)

                    else
                        helper (index + 1) restOfValueStrings (options_ ++ [ newSelectedOption index valueString Nothing ])
    in
    helper 0 strings options


setSelectedOptionInNewOptions : List Option -> List Option -> List Option
setSelectedOptionInNewOptions oldOptions newOptions =
    let
        oldSelectedOption : List Option
        oldSelectedOption =
            oldOptions |> selectedOptions

        newSelectedOptions : List Option
        newSelectedOptions =
            List.filter (\newOption_ -> optionListContainsOptionWithValue newOption_ oldSelectedOption) newOptions
    in
    selectOptionsInListWithIndex newSelectedOptions newOptions


merge2Options : Option -> Option -> Option
merge2Options optionA optionB =
    let
        optionLabel =
            orOptionLabel optionA optionB

        optionDescription =
            orOptionDescriptions optionA optionB

        optionGroup =
            orOptionGroup optionA optionB

        selectedIndex =
            orSelectedIndex optionA optionB
    in
    optionA
        |> setDescription optionDescription
        |> setLabel optionLabel
        |> setGroup optionGroup
        |> setOptionSelectedIndex selectedIndex


{-| This function is a little strange but here's what it does. It takes 2 lists of option.
First it looks to see if any option values the second list match any option values in the first list
If they do it takes the label, description, and group from the option in second list and uses it to update
the option in the first list.

Then it concatenates the 2 lists together and filters them by unique option value, dropping identical
values later in the list.

The idea here is that the label, description, and group can be updated for existing option and new options
can be added at the same time.

One place this comes up is when we have an initial value for a MuchSelect, and then later the "full" list of options
comes in, including the extra stuff (like label, description, and group).
|

-}
mergeTwoListsOfOptionsPreservingSelectedOptions : SelectedItemPlacementMode -> List Option -> List Option -> List Option
mergeTwoListsOfOptionsPreservingSelectedOptions selectedItemPlacementMode optionsA optionsB =
    let
        updatedOptionsA =
            List.map
                (\optionA ->
                    case findOptionByOptionValue (getOptionValue optionA) optionsB of
                        Just optionB ->
                            merge2Options optionA optionB

                        Nothing ->
                            optionA
                )
                optionsA

        updatedOptionsB =
            List.map
                (\optionB ->
                    case findOptionByOptionValue (getOptionValue optionB) optionsA of
                        Just optionA ->
                            merge2Options optionA optionB

                        Nothing ->
                            optionB
                )
                optionsB

        superList =
            case selectedItemPlacementMode of
                SelectedItemStaysInPlace ->
                    updatedOptionsB ++ updatedOptionsA

                SelectedItemMovesToTheTop ->
                    updatedOptionsA
                        ++ updatedOptionsB

        newOptions =
            List.Extra.uniqueBy getOptionValueAsString superList
    in
    setSelectedOptionInNewOptions superList newOptions


replaceOptions : SelectedItemPlacementMode -> List Option -> List Option -> List Option
replaceOptions selectedItemPlacementMode oldOptions newOptions =
    let
        oldSelectedOptions =
            selectedOptions oldOptions
    in
    mergeTwoListsOfOptionsPreservingSelectedOptions
        selectedItemPlacementMode
        oldSelectedOptions
        newOptions


isOptionValueEqualToOptionLabel : Option -> Bool
isOptionValueEqualToOptionLabel option =
    let
        optionValueString =
            option
                |> getOptionValueAsString

        optionLabelString =
            option
                |> getOptionLabel
                |> optionLabelToString
    in
    optionValueString == optionLabelString


{-| A utility helper, the idea is that an option's label is going to match it's value by default.

If a label does not match the value then it's probably a label that's been set and it something we should
preserver (all else being equal).

TODO: Perhaps this could be addresses with types. Maybe there should be an option label variation that specifies it's a default label.

-}
orOptionLabel : Option -> Option -> OptionLabel
orOptionLabel optionA optionB =
    if isOptionValueEqualToOptionLabel optionA then
        if isOptionValueEqualToOptionLabel optionB then
            getOptionLabel optionA

        else
            getOptionLabel optionB

    else
        getOptionLabel optionA


orOptionDescriptions : Option -> Option -> OptionDescription
orOptionDescriptions optionA optionB =
    let
        optionDescriptionA =
            getOptionDescription optionA

        optionDescriptionB =
            getOptionDescription optionB
    in
    case optionDescriptionA of
        OptionDescription _ _ ->
            optionDescriptionA

        NoDescription ->
            case optionDescriptionB of
                OptionDescription _ _ ->
                    optionDescriptionB

                NoDescription ->
                    optionDescriptionB


orOptionGroup : Option -> Option -> OptionGroup
orOptionGroup optionA optionB =
    case getOptionGroup optionA of
        OptionGroup _ ->
            getOptionGroup optionA

        NoOptionGroup ->
            case getOptionGroup optionB of
                OptionGroup _ ->
                    getOptionGroup optionB

                NoOptionGroup ->
                    getOptionGroup optionA


orSelectedIndex : Option -> Option -> Int
orSelectedIndex optionA optionB =
    if getOptionSelectedIndex optionA == getOptionSelectedIndex optionB then
        getOptionSelectedIndex optionA

    else if getOptionSelectedIndex optionA > getOptionSelectedIndex optionB then
        getOptionSelectedIndex optionA

    else
        getOptionSelectedIndex optionB


deselectAllOptionsInOptionsList : List Option -> List Option
deselectAllOptionsInOptionsList options =
    List.map
        deselectOption
        options


isOptionValueInListOfStrings : List String -> Option -> Bool
isOptionValueInListOfStrings possibleValues option =
    List.any (\possibleValue -> getOptionValueAsString option == possibleValue) possibleValues


isOptionValueInListOfOptionsByValue : OptionValue -> List Option -> Bool
isOptionValueInListOfOptionsByValue optionValue options =
    List.any (\option -> (option |> getOptionValue |> optionValueToString) == (optionValue |> optionValueToString)) options


isOptionInListOfOptionsByValue : Option -> List Option -> Bool
isOptionInListOfOptionsByValue option options =
    isOptionValueInListOfOptionsByValue (getOptionValue option) options


findOptionByOptionValue : OptionValue -> List Option -> Maybe Option
findOptionByOptionValue optionValue options =
    List.Extra.find (\option -> (option |> getOptionValue) == optionValue) options


findOptionByOptionUsingOptionValue : Option -> List Option -> Maybe Option
findOptionByOptionUsingOptionValue option options =
    findOptionByOptionValue (getOptionValue option) options


optionValuesEqual : Option -> OptionValue -> Bool
optionValuesEqual option optionValue =
    getOptionValue option == optionValue


updateOrAddCustomOption : Maybe String -> String -> List Option -> List Option
updateOrAddCustomOption maybeCustomOptionHint searchString options =
    let
        -- If we have an exact match with an existing option don't show the custom
        --  option.
        showAddOption =
            options
                |> List.any
                    (\option_ ->
                        (option_
                            |> getOptionLabel
                            |> optionLabelToSearchString
                        )
                            == String.toLower searchString
                            && not (isCustomOption option_)
                    )
                |> not

        optionsWithoutUnselectedCustomOptions =
            List.filter
                (\option_ ->
                    case option_ of
                        CustomOption optionDisplay _ _ _ ->
                            -- If a custom option is selected we want to make sure it stays in the list of options.
                            case optionDisplay of
                                OptionShown ->
                                    False

                                OptionHidden ->
                                    False

                                OptionSelected _ ->
                                    True

                                OptionSelectedHighlighted _ ->
                                    True

                                OptionHighlighted ->
                                    False

                                OptionDisabled ->
                                    True

                        Option _ _ _ _ _ _ ->
                            True

                        EmptyOption _ _ ->
                            True
                )
                options

        label =
            case maybeCustomOptionHint of
                Just customOptionHint ->
                    let
                        parts =
                            String.split "{{}}" customOptionHint
                    in
                    case parts of
                        [] ->
                            "Add " ++ searchString ++ "…"

                        [ _ ] ->
                            customOptionHint ++ searchString

                        first :: second :: _ ->
                            first ++ searchString ++ second

                Nothing ->
                    "Add " ++ searchString ++ "…"
    in
    if showAddOption then
        [ CustomOption
            OptionShown
            (OptionLabel.newWithCleanLabel label Nothing)
            (OptionValue searchString)
            Nothing
        ]
            ++ optionsWithoutUnselectedCustomOptions

    else
        optionsWithoutUnselectedCustomOptions


findHighlightedOptionIndex : List Option -> Maybe Int
findHighlightedOptionIndex options =
    List.Extra.findIndex (\option -> isOptionHighlighted option) options


findSelectedOptionIndex : List Option -> Maybe Int
findSelectedOptionIndex options =
    List.Extra.findIndex (\option -> isOptionSelected option) options


findHighlightedOrSelectedOptionIndex : List Option -> Maybe Int
findHighlightedOrSelectedOptionIndex options =
    case findHighlightedOptionIndex options of
        Just index ->
            Just index

        Nothing ->
            findSelectedOptionIndex options


filterOptionsToShowInDropdown : List Option -> List Option
filterOptionsToShowInDropdown =
    filterOptionsToShowInDropdownByOptionDisplay >> filterOptionsToShowInDropdownBySearchScore


filterOptionsToShowInDropdownByOptionDisplay : List Option -> List Option
filterOptionsToShowInDropdownByOptionDisplay =
    List.filter
        (\option ->
            case getOptionDisplay option of
                OptionShown ->
                    True

                OptionHidden ->
                    False

                OptionSelected _ ->
                    True

                OptionSelectedHighlighted _ ->
                    True

                OptionHighlighted ->
                    True

                OptionDisabled ->
                    True
        )


filterOptionsToShowInDropdownBySearchScore : List Option -> List Option
filterOptionsToShowInDropdownBySearchScore options =
    case findLowestSearchScore options of
        Just lowScore ->
            List.filter (isOptionBelowScore (lowScoreCutOff lowScore)) options

        Nothing ->
            options


findLowestSearchScore : List Option -> Maybe Int
findLowestSearchScore options =
    let
        lowSore =
            options
                |> List.filter (\option -> not (isCustomOption option))
                |> optionSearchResults
                |> List.foldl
                    (\searchResult lowScore ->
                        if getLowScore searchResult < lowScore then
                            getLowScore searchResult

                        else
                            lowScore
                    )
                    impossiblyLowScore
    in
    if lowSore == impossiblyLowScore then
        Nothing

    else
        Just lowSore


optionSearchResults : List Option -> List OptionSearchResult
optionSearchResults options =
    options
        |> List.map getMaybeOptionSearchFilter
        |> Maybe.Extra.values
        |> List.map .searchResult


isOptionBelowScore : Int -> Option -> Bool
isOptionBelowScore score option =
    case getMaybeOptionSearchFilter option of
        Just optionSearchFilter ->
            score >= getLowScore optionSearchFilter.searchResult

        Nothing ->
            False


highlightOptionInList : Option -> List Option -> List Option
highlightOptionInList option options =
    List.map
        (\option_ ->
            if option == option_ then
                highlightOption option_

            else
                removeHighlightOption option_
        )
        options


highlightFirstOptionInList : List Option -> List Option
highlightFirstOptionInList options =
    case List.head options of
        Just firstOption ->
            highlightOptionInList firstOption options

        Nothing ->
            options


highlightOptionInListByValue : OptionValue -> List Option -> List Option
highlightOptionInListByValue value options =
    List.map
        (\option_ ->
            if optionValuesEqual option_ value then
                highlightOption option_

            else
                removeHighlightOption option_
        )
        options


removeHighlightOptionInList : OptionValue -> List Option -> List Option
removeHighlightOptionInList value options =
    List.map
        (\option_ ->
            if optionValuesEqual option_ value then
                removeHighlightOption option_

            else
                option_
        )
        options


findClosestHighlightableOptionGoingUp : Int -> List Option -> Maybe Option
findClosestHighlightableOptionGoingUp index options =
    List.Extra.splitAt index options
        |> Tuple.first
        |> List.reverse
        |> List.Extra.find optionIsHighlightable


moveHighlightedOptionUp : List Option -> List Option
moveHighlightedOptionUp options =
    let
        maybeHigherSibling =
            options
                |> findHighlightedOrSelectedOptionIndex
                |> Maybe.andThen (\index -> findClosestHighlightableOptionGoingUp index options)
    in
    case maybeHigherSibling of
        Just option ->
            highlightOptionInList option options

        Nothing ->
            case List.head options of
                Just firstOption ->
                    highlightOptionInList firstOption options

                Nothing ->
                    options


findClosestHighlightableOptionGoingDown : Int -> List Option -> Maybe Option
findClosestHighlightableOptionGoingDown index options =
    List.Extra.splitAt index options
        |> Tuple.second
        |> List.Extra.find optionIsHighlightable


moveHighlightedOptionDown : List Option -> List Option
moveHighlightedOptionDown options =
    let
        maybeLowerSibling =
            options
                |> findHighlightedOrSelectedOptionIndex
                |> Maybe.andThen (\index -> findClosestHighlightableOptionGoingDown index options)
    in
    case maybeLowerSibling of
        Just option ->
            highlightOptionInList option options

        Nothing ->
            case List.head options of
                Just firstOption ->
                    highlightOptionInList firstOption options

                Nothing ->
                    options


selectOptionInList : Option -> List Option -> List Option
selectOptionInList option options =
    selectOptionInListByOptionValue (getOptionValue option) options


selectOptionInListWithIndex : Option -> List Option -> List Option
selectOptionInListWithIndex optionToSelect options =
    let
        notLessThanZero i =
            if i < 0 then
                0

            else
                0

        selectionIndex =
            getOptionSelectedIndex optionToSelect
                |> notLessThanZero

        optionValue =
            getOptionValue optionToSelect
    in
    selectOptionInListByOptionValueWithIndex selectionIndex optionValue options



{- Take a list of options to select and select them all.

   If there are other options that are also selected, leave them as selected.
-}


selectOptionsInList : List Option -> List Option -> List Option
selectOptionsInList optionsToSelect options =
    let
        helper : List Option -> Option -> ( List Option, List Option )
        helper newOptions optionToSelect =
            ( selectOptionInList optionToSelect newOptions, [] )
    in
    List.Extra.mapAccuml helper options optionsToSelect
        |> Tuple.first


selectOptionsInListWithIndex : List Option -> List Option -> List Option
selectOptionsInListWithIndex optionsToSelect options =
    let
        helper : List Option -> Option -> ( List Option, List Option )
        helper newOptions optionToSelect =
            ( selectOptionInListWithIndex optionToSelect newOptions, [] )
    in
    List.Extra.mapAccuml helper options optionsToSelect
        |> Tuple.first



{- This is kind of a strange one it takes a list of options to leave selected and deselects all the rest. -}


deselectEveryOptionExceptOptionsInList : List Option -> List Option -> List Option
deselectEveryOptionExceptOptionsInList optionsNotToDeselect options =
    List.map
        (\option ->
            let
                test : Option -> Bool
                test optionNotToDeselect =
                    optionValuesEqual optionNotToDeselect (getOptionValue option)
            in
            if List.any test optionsNotToDeselect then
                option

            else
                deselectOption option
        )
        options


deselectAllButTheFirstSelectedOptionInList : List Option -> List Option
deselectAllButTheFirstSelectedOptionInList options =
    case List.head (selectedOptions options) of
        Just oneOptionToLeaveSelected ->
            selectSingleOptionInList (getOptionValue oneOptionToLeaveSelected) options

        Nothing ->
            options



{- Look through the list of options, if we find one that matches the given option value
   then select it and return a new list of options with the found option selected.

   If we do not find the option value return the same list of options.
-}


selectOptionInListByOptionValue : OptionValue -> List Option -> List Option
selectOptionInListByOptionValue value options =
    let
        nextSelectedIndex =
            List.foldl
                (\selectedOption highestIndex ->
                    if getOptionSelectedIndex selectedOption > highestIndex then
                        getOptionSelectedIndex selectedOption

                    else
                        highestIndex
                )
                -1
                options
                + 1
    in
    List.map
        (\option_ ->
            if optionValuesEqual option_ value then
                case option_ of
                    Option _ _ _ _ _ _ ->
                        selectOption nextSelectedIndex option_

                    CustomOption _ _ _ _ ->
                        case value of
                            OptionValue valueStr ->
                                selectOption nextSelectedIndex option_
                                    |> setLabelWithString valueStr Nothing

                            EmptyOptionValue ->
                                selectOption nextSelectedIndex option_

                    EmptyOption _ _ ->
                        selectOption nextSelectedIndex option_

            else if isOptionSelected option_ then
                option_

            else
                removeHighlightOption option_
        )
        options


selectOptionInListByOptionValueWithIndex : Int -> OptionValue -> List Option -> List Option
selectOptionInListByOptionValueWithIndex index value options =
    List.map
        (\option_ ->
            if optionValuesEqual option_ value then
                case option_ of
                    Option _ _ _ _ _ _ ->
                        selectOption index option_

                    CustomOption _ _ _ _ ->
                        case value of
                            OptionValue valueStr ->
                                selectOption index option_
                                    |> setLabelWithString valueStr Nothing

                            EmptyOptionValue ->
                                selectOption index option_

                    EmptyOption _ _ ->
                        selectOption index option_

            else if isOptionSelected option_ then
                option_

            else
                removeHighlightOption option_
        )
        options


selectOptionInListByValueStringWithIndex : Int -> String -> List Option -> List Option
selectOptionInListByValueStringWithIndex index valueString options =
    selectOptionInListByOptionValueWithIndex index (OptionValue valueString) options


deselectOptionInListByOptionValue : OptionValue -> List Option -> List Option
deselectOptionInListByOptionValue value options =
    List.map
        (\option_ ->
            if optionValuesEqual option_ value then
                deselectOption option_

            else
                option_
        )
        options


selectHighlightedOption : SelectionMode -> List Option -> List Option
selectHighlightedOption selectionMode options =
    options
        |> List.filter
            (\option ->
                isOptionHighlighted option
            )
        |> List.head
        |> (\maybeOption ->
                case maybeOption of
                    Just option ->
                        case option of
                            Option _ _ value _ _ _ ->
                                case selectionMode of
                                    MultiSelect _ _ ->
                                        selectOptionInListByOptionValue value options
                                            |> clearAnyUnselectedCustomOptions

                                    SingleSelect _ _ _ ->
                                        selectSingleOptionInList value options

                            CustomOption _ _ value _ ->
                                case selectionMode of
                                    MultiSelect _ _ ->
                                        selectOptionInListByOptionValue value options

                                    SingleSelect _ _ _ ->
                                        selectSingleOptionInList value options

                            EmptyOption _ _ ->
                                case selectionMode of
                                    MultiSelect _ _ ->
                                        selectEmptyOption options

                                    SingleSelect _ _ _ ->
                                        selectEmptyOption options

                    Nothing ->
                        options
           )


selectSingleOptionInList : OptionValue -> List Option -> List Option
selectSingleOptionInList value options =
    options
        |> List.map
            (\option_ ->
                if optionValuesEqual option_ value then
                    case option_ of
                        Option _ _ _ _ _ _ ->
                            selectOption 0 option_

                        CustomOption _ _ optionValue _ ->
                            case optionValue of
                                OptionValue valueStr ->
                                    selectOption 0 option_ |> setLabelWithString valueStr Nothing

                                EmptyOptionValue ->
                                    selectOption 0 option_

                        EmptyOption _ _ ->
                            selectOption 0 option_

                else
                    deselectOption option_
            )


selectSingleOptionInListByString : String -> List Option -> List Option
selectSingleOptionInListByString string options =
    selectSingleOptionInList (stringToOptionValue string) options


selectEmptyOption : List Option -> List Option
selectEmptyOption options =
    options
        |> List.map
            (\option_ ->
                case option_ of
                    Option _ _ _ _ _ _ ->
                        deselectOption option_

                    CustomOption _ _ _ _ ->
                        deselectOption option_

                    EmptyOption _ _ ->
                        selectOption 0 option_
            )


clearAnyUnselectedCustomOptions : List Option -> List Option
clearAnyUnselectedCustomOptions options =
    List.filter (\option -> not (isCustomOption option && not (isOptionSelected option))) options


addAdditionalOptionsToOptionList : List Option -> List Option -> List Option
addAdditionalOptionsToOptionList currentOptions newOptions =
    let
        currentOptionsWithUpdates =
            List.map
                (\currentOption ->
                    case findOptionByOptionUsingOptionValue currentOption newOptions of
                        Just newOption_ ->
                            merge2Options currentOption newOption_

                        Nothing ->
                            currentOption
                )
                currentOptions

        reallyNewOptions : List Option
        reallyNewOptions =
            List.filter (\newOption_ -> not (isOptionInListOfOptionsByValue newOption_ currentOptions)) newOptions
    in
    reallyNewOptions ++ currentOptionsWithUpdates


addAdditionalOptionsToOptionListWithAutoSortRank : List Option -> List Option -> List Option
addAdditionalOptionsToOptionListWithAutoSortRank currentOptions newOptions =
    let
        nextHighestAutoSortRank : Int
        nextHighestAutoSortRank =
            findHighestAutoSortRank currentOptions + 1
    in
    List.indexedMap
        (\index option ->
            let
                maybeNewSortRank : Maybe SortRank
                maybeNewSortRank =
                    SortRank.newMaybeAutoSortRank (nextHighestAutoSortRank + index)

                optionLabel : OptionLabel
                optionLabel =
                    getOptionLabel option

                updatedOptionLabel : OptionLabel
                updatedOptionLabel =
                    case maybeNewSortRank of
                        Just newSortRank ->
                            OptionLabel.setSortRank newSortRank optionLabel

                        Nothing ->
                            optionLabel
            in
            setLabel updatedOptionLabel option
        )
        newOptions
        |> addAdditionalOptionsToOptionList currentOptions


findHighestAutoSortRank : List Option -> Int
findHighestAutoSortRank options =
    List.foldr
        (\option currentMax ->
            max
                (option
                    |> getOptionLabel
                    |> OptionLabel.getSortRank
                    |> SortRank.getAutoIndexForSorting
                )
                currentMax
        )
        0
        options


removeOptionsFromOptionList : List Option -> List Option -> List Option
removeOptionsFromOptionList options optionsToRemove =
    List.filter (\option -> not (optionListContainsOptionWithValue option optionsToRemove)) options


highlightOption : Option -> Option
highlightOption option =
    case option of
        Option display label value description group search ->
            case display of
                OptionShown ->
                    Option OptionHighlighted label value description group search

                OptionHidden ->
                    Option OptionHidden label value description group search

                OptionSelected selectedIndex ->
                    Option (OptionSelectedHighlighted selectedIndex) label value description group search

                OptionSelectedHighlighted selectedIndex ->
                    Option (OptionSelectedHighlighted selectedIndex) label value description group search

                OptionHighlighted ->
                    Option OptionHighlighted label value description group search

                OptionDisabled ->
                    Option OptionDisabled label value description group search

        CustomOption display label value search ->
            case display of
                OptionShown ->
                    CustomOption OptionHighlighted label value search

                OptionHidden ->
                    CustomOption OptionHidden label value search

                OptionSelected selectedIndex ->
                    CustomOption (OptionSelectedHighlighted selectedIndex) label value search

                OptionSelectedHighlighted selectedIndex ->
                    CustomOption (OptionSelectedHighlighted selectedIndex) label value search

                OptionHighlighted ->
                    CustomOption OptionHighlighted label value search

                OptionDisabled ->
                    CustomOption OptionDisabled label value search

        EmptyOption display label ->
            case display of
                OptionShown ->
                    EmptyOption OptionHighlighted label

                OptionHidden ->
                    EmptyOption OptionHidden label

                OptionSelected selectedIndex ->
                    EmptyOption (OptionSelectedHighlighted selectedIndex) label

                OptionSelectedHighlighted selectedIndex ->
                    EmptyOption (OptionSelectedHighlighted selectedIndex) label

                OptionHighlighted ->
                    EmptyOption OptionHighlighted label

                OptionDisabled ->
                    EmptyOption OptionDisabled label


removeHighlightOption : Option -> Option
removeHighlightOption option =
    case option of
        Option display label value description group search ->
            case display of
                OptionShown ->
                    Option OptionShown
                        label
                        value
                        description
                        group
                        search

                OptionHidden ->
                    Option OptionHidden
                        label
                        value
                        description
                        group
                        search

                OptionSelected selectedIndex ->
                    Option (OptionSelected selectedIndex)
                        label
                        value
                        description
                        group
                        search

                OptionSelectedHighlighted selectedIndex ->
                    Option (OptionSelectedHighlighted selectedIndex)
                        label
                        value
                        description
                        group
                        search

                OptionHighlighted ->
                    Option OptionShown label value description group search

                OptionDisabled ->
                    Option OptionDisabled label value description group search

        CustomOption display label value search ->
            case display of
                OptionShown ->
                    CustomOption OptionShown label value search

                OptionHidden ->
                    CustomOption OptionHidden label value search

                OptionSelected selectedIndex ->
                    CustomOption (OptionSelected selectedIndex) label value search

                OptionSelectedHighlighted selectedIndex ->
                    CustomOption
                        (OptionSelectedHighlighted selectedIndex)
                        label
                        value
                        search

                OptionHighlighted ->
                    CustomOption OptionShown label value search

                OptionDisabled ->
                    CustomOption OptionDisabled label value search

        EmptyOption display label ->
            case display of
                OptionShown ->
                    EmptyOption OptionShown label

                OptionHidden ->
                    EmptyOption OptionHidden label

                OptionSelected selectedIndex ->
                    EmptyOption (OptionSelected selectedIndex) label

                OptionHighlighted ->
                    EmptyOption OptionShown label

                OptionDisabled ->
                    EmptyOption OptionDisabled label

                OptionSelectedHighlighted selectedIndex ->
                    EmptyOption (OptionSelectedHighlighted selectedIndex) label


isOptionHighlighted : Option -> Bool
isOptionHighlighted option =
    case option of
        Option display _ _ _ _ _ ->
            case display of
                OptionShown ->
                    False

                OptionHidden ->
                    False

                OptionSelected _ ->
                    False

                OptionSelectedHighlighted _ ->
                    False

                OptionHighlighted ->
                    True

                OptionDisabled ->
                    False

        CustomOption display _ _ _ ->
            case display of
                OptionShown ->
                    False

                OptionHidden ->
                    False

                OptionSelected _ ->
                    False

                OptionSelectedHighlighted _ ->
                    False

                OptionHighlighted ->
                    True

                OptionDisabled ->
                    False

        EmptyOption display _ ->
            case display of
                OptionShown ->
                    False

                OptionHidden ->
                    False

                OptionSelected _ ->
                    False

                OptionSelectedHighlighted _ ->
                    False

                OptionHighlighted ->
                    True

                OptionDisabled ->
                    False


unhighlightSelectedOptions : List Option -> List Option
unhighlightSelectedOptions =
    List.map
        (\option ->
            case option of
                Option optionDisplay _ _ _ _ _ ->
                    case optionDisplay of
                        OptionShown ->
                            option

                        OptionHidden ->
                            option

                        OptionSelected _ ->
                            option

                        OptionSelectedHighlighted selectedIndex ->
                            setOptionDisplay (OptionSelected selectedIndex) option

                        OptionHighlighted ->
                            option

                        OptionDisabled ->
                            option

                CustomOption optionDisplay _ _ _ ->
                    case optionDisplay of
                        OptionShown ->
                            option

                        OptionHidden ->
                            option

                        OptionSelected _ ->
                            option

                        OptionSelectedHighlighted selectedIndex ->
                            setOptionDisplay (OptionSelected selectedIndex) option

                        OptionHighlighted ->
                            option

                        OptionDisabled ->
                            option

                EmptyOption optionDisplay _ ->
                    case optionDisplay of
                        OptionShown ->
                            option

                        OptionHidden ->
                            option

                        OptionSelected _ ->
                            option

                        OptionSelectedHighlighted selectedIndex ->
                            setOptionDisplay (OptionSelected selectedIndex) option

                        OptionHighlighted ->
                            option

                        OptionDisabled ->
                            option
        )


optionIsHighlightable : Option -> Bool
optionIsHighlightable option =
    case option of
        Option display _ _ _ _ _ ->
            case display of
                OptionShown ->
                    True

                OptionHidden ->
                    False

                OptionSelected _ ->
                    False

                OptionSelectedHighlighted _ ->
                    False

                OptionHighlighted ->
                    False

                OptionDisabled ->
                    False

        CustomOption display _ _ _ ->
            case display of
                OptionShown ->
                    True

                OptionHidden ->
                    False

                OptionSelected _ ->
                    False

                OptionSelectedHighlighted _ ->
                    False

                OptionHighlighted ->
                    False

                OptionDisabled ->
                    False

        EmptyOption display _ ->
            case display of
                OptionShown ->
                    True

                OptionHidden ->
                    False

                OptionSelected _ ->
                    False

                OptionSelectedHighlighted _ ->
                    False

                OptionHighlighted ->
                    False

                OptionDisabled ->
                    False


selectOption : Int -> Option -> Option
selectOption selectionIndex option =
    case option of
        Option display label value description group search ->
            case display of
                OptionShown ->
                    Option (OptionSelected selectionIndex) label value description group search

                OptionHidden ->
                    Option (OptionSelected selectionIndex) label value description group search

                OptionSelected selectedIndex ->
                    Option (OptionSelected selectedIndex) label value description group search

                OptionSelectedHighlighted selectedIndex ->
                    Option (OptionSelectedHighlighted selectedIndex) label value description group search

                OptionHighlighted ->
                    Option (OptionSelected selectionIndex) label value description group search

                OptionDisabled ->
                    Option OptionDisabled label value description group search

        CustomOption display label value search ->
            case display of
                OptionShown ->
                    CustomOption (OptionSelected selectionIndex) label value search

                OptionHidden ->
                    CustomOption OptionHidden label value search

                OptionSelected selectedIndex ->
                    CustomOption (OptionSelected selectedIndex) label value search

                OptionSelectedHighlighted selectedIndex ->
                    CustomOption (OptionSelectedHighlighted selectedIndex) label value search

                OptionHighlighted ->
                    CustomOption (OptionSelected selectionIndex) label value search

                OptionDisabled ->
                    CustomOption OptionDisabled label value search

        EmptyOption display label ->
            case display of
                OptionShown ->
                    EmptyOption (OptionSelected selectionIndex) label

                OptionHidden ->
                    EmptyOption (OptionSelected selectionIndex) label

                OptionSelected selectedIndex ->
                    EmptyOption (OptionSelected selectedIndex) label

                OptionSelectedHighlighted selectedIndex ->
                    EmptyOption (OptionSelected selectedIndex) label

                OptionHighlighted ->
                    EmptyOption (OptionSelected selectionIndex) label

                OptionDisabled ->
                    EmptyOption OptionDisabled label


deselectOption : Option -> Option
deselectOption option =
    case option of
        Option display label value description group search ->
            case display of
                OptionShown ->
                    Option OptionShown label value description group search

                OptionHidden ->
                    Option OptionHidden label value description group search

                OptionSelected _ ->
                    Option OptionShown label value description group search

                OptionSelectedHighlighted _ ->
                    Option OptionShown label value description group search

                OptionHighlighted ->
                    Option OptionHighlighted
                        label
                        value
                        description
                        group
                        search

                OptionDisabled ->
                    Option OptionDisabled label value description group search

        CustomOption display label value search ->
            case display of
                OptionShown ->
                    CustomOption OptionShown label value search

                OptionHidden ->
                    CustomOption OptionHidden label value search

                OptionSelected _ ->
                    CustomOption OptionShown label value search

                OptionSelectedHighlighted _ ->
                    CustomOption OptionShown label value search

                OptionHighlighted ->
                    CustomOption OptionHighlighted label value search

                OptionDisabled ->
                    CustomOption OptionDisabled label value search

        EmptyOption display label ->
            case display of
                OptionShown ->
                    EmptyOption OptionShown label

                OptionHidden ->
                    EmptyOption OptionHidden label

                OptionSelected _ ->
                    EmptyOption OptionShown label

                OptionSelectedHighlighted _ ->
                    EmptyOption OptionShown label

                OptionHighlighted ->
                    EmptyOption OptionHighlighted label

                OptionDisabled ->
                    EmptyOption OptionDisabled label


deselectOptions : List Option -> List Option -> List Option
deselectOptions optionsToDeselect allOptions =
    let
        shouldDeselectOption option =
            -- figure out if options match my looking at their value's
            List.any
                (\optionToDeselect -> getOptionValue optionToDeselect == getOptionValue option)
                optionsToDeselect
    in
    List.map
        (\option ->
            if shouldDeselectOption option then
                deselectOption option

            else
                option
        )
        allOptions


selectedOptions : List Option -> List Option
selectedOptions options =
    options
        |> List.filter isOptionSelected
        |> List.sortBy getOptionSelectedIndex


unselectedOptions : List Option -> List Option
unselectedOptions options =
    options
        |> List.filter (\option -> isOptionSelected option |> not)


toggleSelectedHighlightByOptionValue : List Option -> OptionValue -> List Option
toggleSelectedHighlightByOptionValue options optionValue =
    options
        |> List.map
            (\option_ ->
                case option_ of
                    Option optionDisplay _ optionValue_ _ _ _ ->
                        if optionValue == optionValue_ then
                            case optionDisplay of
                                OptionShown ->
                                    option_

                                OptionHidden ->
                                    option_

                                OptionSelected selectedIndex ->
                                    option_ |> setOptionDisplay (OptionSelectedHighlighted selectedIndex)

                                OptionSelectedHighlighted selectedIndex ->
                                    option_ |> setOptionDisplay (OptionSelected selectedIndex)

                                OptionHighlighted ->
                                    option_

                                OptionDisabled ->
                                    option_

                        else
                            option_

                    CustomOption optionDisplay _ optionValue_ _ ->
                        if optionValue == optionValue_ then
                            case optionDisplay of
                                OptionShown ->
                                    option_

                                OptionHidden ->
                                    option_

                                OptionSelected selectedIndex ->
                                    option_ |> setOptionDisplay (OptionSelectedHighlighted selectedIndex)

                                OptionSelectedHighlighted selectedIndex ->
                                    option_ |> setOptionDisplay (OptionSelected selectedIndex)

                                OptionHighlighted ->
                                    option_

                                OptionDisabled ->
                                    option_

                        else
                            option_

                    EmptyOption _ _ ->
                        option_
            )


deselectAllSelectedHighlightedOptions : List Option -> List Option
deselectAllSelectedHighlightedOptions options =
    options
        |> List.map
            (\option_ ->
                case option_ of
                    Option optionDisplay _ _ _ _ _ ->
                        case optionDisplay of
                            OptionShown ->
                                option_

                            OptionHidden ->
                                option_

                            OptionSelected _ ->
                                option_

                            OptionSelectedHighlighted _ ->
                                option_ |> setOptionDisplay OptionShown

                            OptionHighlighted ->
                                option_

                            OptionDisabled ->
                                option_

                    CustomOption optionDisplay _ _ _ ->
                        case optionDisplay of
                            OptionShown ->
                                option_

                            OptionHidden ->
                                option_

                            OptionSelected _ ->
                                option_

                            OptionSelectedHighlighted _ ->
                                option_ |> setOptionDisplay OptionShown

                            OptionHighlighted ->
                                option_

                            OptionDisabled ->
                                option_

                    EmptyOption _ _ ->
                        option_
            )


deselectLastSelectedOption : List Option -> List Option
deselectLastSelectedOption options =
    let
        maybeLastSelectedOptionValue =
            options
                |> selectedOptions
                |> List.Extra.last
                |> Maybe.map getOptionValue
    in
    case maybeLastSelectedOptionValue of
        Just optionValueToDeselect ->
            deselectOptionInListByOptionValue optionValueToDeselect options

        Nothing ->
            options


hasSelectedHighlightedOptions : List Option -> Bool
hasSelectedHighlightedOptions options =
    List.any isOptionSelectedHighlighted options


isOptionSelectedHighlighted : Option -> Bool
isOptionSelectedHighlighted option =
    case option of
        Option optionDisplay _ _ _ _ _ ->
            isOptionDisplaySelectedHighlighted optionDisplay

        CustomOption optionDisplay _ _ _ ->
            isOptionDisplaySelectedHighlighted optionDisplay

        EmptyOption optionDisplay _ ->
            isOptionDisplaySelectedHighlighted optionDisplay


isOptionDisplaySelectedHighlighted : OptionDisplay -> Bool
isOptionDisplaySelectedHighlighted optionDisplay =
    case optionDisplay of
        OptionShown ->
            False

        OptionHidden ->
            False

        OptionSelected _ ->
            False

        OptionSelectedHighlighted _ ->
            True

        OptionHighlighted ->
            False

        OptionDisabled ->
            False


hasSelectedOption : List Option -> Bool
hasSelectedOption options =
    options |> selectedOptions |> List.isEmpty |> not


isEmptyOption : Option -> Bool
isEmptyOption option =
    case option of
        Option _ _ _ _ _ _ ->
            False

        CustomOption _ _ _ _ ->
            False

        EmptyOption _ _ ->
            True


{-| Return true if the option's (needle's) value matches one of the option's value in the haystack.
-}
optionListContainsOptionWithValue : Option -> List Option -> Bool
optionListContainsOptionWithValue needle haystack =
    let
        optionValue =
            getOptionValue needle
    in
    List.filter (\option_ -> getOptionValue option_ == optionValue) haystack
        |> List.isEmpty
        |> not


optionListContainsOptionWithValueString : String -> List Option -> Bool
optionListContainsOptionWithValueString valueString options =
    let
        optionValue =
            OptionValue valueString
    in
    List.filter (\option_ -> getOptionValue option_ == optionValue) options
        |> List.isEmpty
        |> not


optionToValueLabelTuple : Option -> ( String, String )
optionToValueLabelTuple option =
    ( getOptionValueAsString option, getOptionLabel option |> optionLabelToString )



{--Clean up custom options, remove all the custom options that are not selected --}


removeUnselectedCustomOptions : List Option -> List Option
removeUnselectedCustomOptions options =
    let
        unselectedCustomOptions =
            options
                |> customOptions
                |> unselectedOptions
    in
    removeOptionsFromOptionList options unselectedCustomOptions


customSelectedOptions : List Option -> List Option
customSelectedOptions =
    customOptions >> selectedOptions


customOptions : List Option -> List Option
customOptions options =
    List.filter isCustomOption options


isCustomOption : Option -> Bool
isCustomOption option =
    case option of
        Option _ _ _ _ _ _ ->
            False

        CustomOption _ _ _ _ ->
            True

        EmptyOption _ _ ->
            False


optionsDecoder : Json.Decode.Decoder (List Option)
optionsDecoder =
    Json.Decode.list decoder


decoder : Json.Decode.Decoder Option
decoder =
    Json.Decode.oneOf
        [ decodeOptionWithoutAValue
        , decodeOptionWithAValue
        ]


decodeOptionWithoutAValue : Json.Decode.Decoder Option
decodeOptionWithoutAValue =
    Json.Decode.field
        "value"
        valueDecoder
        |> Json.Decode.andThen
            (\value ->
                case value of
                    OptionValue _ ->
                        Json.Decode.fail "It can not be an option without a value because it has a value."

                    EmptyOptionValue ->
                        Json.Decode.map2
                            EmptyOption
                            displayDecoder
                            labelDecoder
            )


decodeOptionWithAValue : Json.Decode.Decoder Option
decodeOptionWithAValue =
    Json.Decode.map6 Option
        displayDecoder
        labelDecoder
        (Json.Decode.field
            "value"
            valueDecoder
        )
        descriptionDecoder
        optionGroupDecoder
        (Json.Decode.succeed Nothing)


displayDecoder : Json.Decode.Decoder OptionDisplay
displayDecoder =
    Json.Decode.oneOf
        [ Json.Decode.field
            "selected"
            Json.Decode.string
            |> Json.Decode.andThen
                (\str ->
                    case str of
                        "true" ->
                            Json.Decode.succeed (OptionSelected 0)

                        _ ->
                            Json.Decode.fail "Option is not selected"
                )
        , Json.Decode.field
            "selected"
            Json.Decode.bool
            |> Json.Decode.andThen
                (\isSelected ->
                    if isSelected then
                        Json.Decode.succeed (OptionSelected 0)

                    else
                        Json.Decode.succeed OptionShown
                )
        , Json.Decode.field
            "disabled"
            Json.Decode.bool
            |> Json.Decode.andThen
                (\isDisabled ->
                    if isDisabled then
                        Json.Decode.succeed OptionDisabled

                    else
                        Json.Decode.fail "Option is not disabled"
                )
        , Json.Decode.succeed OptionShown
        ]


valueDecoder : Json.Decode.Decoder OptionValue
valueDecoder =
    Json.Decode.string
        |> Json.Decode.andThen
            (\valueStr ->
                case String.trim valueStr of
                    "" ->
                        Json.Decode.succeed EmptyOptionValue

                    str ->
                        Json.Decode.succeed (OptionValue str)
            )


descriptionDecoder : Json.Decode.Decoder OptionDescription
descriptionDecoder =
    Json.Decode.oneOf
        [ Json.Decode.map2 OptionDescription
            (Json.Decode.field "description" Json.Decode.string)
            (Json.Decode.field "descriptionClean" (Json.Decode.nullable Json.Decode.string))
        , Json.Decode.succeed NoDescription
        ]


optionGroupDecoder : Json.Decode.Decoder OptionGroup
optionGroupDecoder =
    Json.Decode.oneOf
        [ Json.Decode.field "group" Json.Decode.string
            |> Json.Decode.map OptionGroup
        , Json.Decode.succeed NoOptionGroup
        ]


encode : Option -> Json.Decode.Value
encode option =
    Json.Encode.object
        [ ( "value", Json.Encode.string (getOptionValueAsString option) )
        , ( "label", Json.Encode.string (getOptionLabel option |> optionLabelToString) )
        , ( "description", Json.Encode.string (getOptionDescription option |> optionDescriptionToString) )
        , ( "isSelected", Json.Encode.bool (isOptionSelected option) )
        ]

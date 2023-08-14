module SelectionMode exposing
    ( InteractionState(..)
    , OutputStyle(..)
    , SelectionConfig(..)
    , SelectionMode(..)
    , defaultSelectionConfig
    , getCustomOptionHint
    , getCustomOptions
    , getDropdownStyle
    , getEventMode
    , getInteractionState
    , getMaxDropdownItems
    , getOutputStyle
    , getPlaceholder
    , getPlaceholderString
    , getSearchStringMinimumLength
    , getSelectedItemPlacementMode
    , getSelectionMode
    , getSingleItemRemoval
    , getTransformAndValidate
    , hasPlaceholder
    , isDisabled
    , isEventsOnly
    , isFocused
    , isSingleSelect
    , makeSelectionConfig
    , outputStyleToString
    , setAllowCustomOptionsWithBool
    , setCustomOptionHint
    , setDropdownStyle
    , setEventsMode
    , setEventsOnly
    , setInteractionState
    , setIsDisabled
    , setIsFocused
    , setMaxDropdownItems
    , setMultiSelectModeWithBool
    , setOutputStyle
    , setPlaceholder
    , setSearchStringMinimumLength
    , setSelectedItemStaysInPlaceWithBool
    , setSelectionMode
    , setShowDropdown
    , setSingleItemRemoval
    , setTransformAndValidate
    , showDropdown
    , showDropdownFooter
    , stringToOutputStyle
    )

import DomStateCache exposing (DomStateCache)
import OutputStyle
    exposing
        ( CustomOptionHint
        , CustomOptions(..)
        , DropdownState(..)
        , DropdownStyle(..)
        , EventsMode(..)
        , MaxDropdownItems(..)
        , MultiSelectOutputStyle(..)
        , SearchStringMinimumLength(..)
        , SelectedItemPlacementMode(..)
        , SingleItemRemoval(..)
        , SingleSelectOutputStyle(..)
        , defaultMultiSelectCustomHtmlFields
        , defaultSingleSelectCustomHtmlFields
        , getTransformAndValidateFromCustomOptions
        , setEventsModeMultiSelect
        , setEventsModeSingleSelect
        , setTransformAndValidateFromCustomOptions
        )
import PositiveInt exposing (PositiveInt)
import TransformAndValidate exposing (ValueTransformAndValidate)


type alias Placeholder =
    ( Bool, String )


type InteractionState
    = Focused
    | Unfocused
    | Disabled


type OutputStyle
    = CustomHtml
    | Datalist


type SelectionMode
    = SingleSelect
    | MultiSelect


type SelectionConfig
    = SingleSelectConfig SingleSelectOutputStyle Placeholder InteractionState
    | MultiSelectConfig MultiSelectOutputStyle Placeholder InteractionState


defaultSelectionConfig : SelectionConfig
defaultSelectionConfig =
    SingleSelectConfig
        (SingleSelectCustomHtml
            { customOptions = NoCustomOptions
            , selectedItemPlacementMode = SelectedItemStaysInPlace
            , maxDropdownItems = NoLimitToDropdownItems
            , searchStringMinimumLength = FixedSearchStringMinimumLength (PositiveInt.new 2)
            , dropdownState = Collapsed
            , dropdownStyle = NoFooter
            , eventsMode = AllowLightDomChanges
            }
        )
        ( False, "" )
        Unfocused


makeSelectionConfig :
    Bool
    -> Bool
    -> Bool
    -> Bool
    -> String
    -> ( Bool, String )
    -> Maybe String
    -> Bool
    -> MaxDropdownItems
    -> Bool
    -> SearchStringMinimumLength
    -> Bool
    -> ValueTransformAndValidate
    -> Result String SelectionConfig
makeSelectionConfig isEventsOnly_ disabled allowMultiSelect allowCustomOptions outputStyle placeholder customOptionHint enableMultiSelectSingleItemRemoval maxDropdownItems selectedItemStaysInPlace searchStringMinimumLength shouldShowDropdownFooter transformAndValidate =
    let
        outputStyleResult =
            outputStyle
                |> stringToOutputStyle

        interactionState =
            if disabled then
                Disabled

            else
                Unfocused
    in
    Result.andThen
        (\s ->
            if allowMultiSelect then
                let
                    styleResult =
                        makeMultiSelectOutputStyle s
                            isEventsOnly_
                            allowCustomOptions
                            enableMultiSelectSingleItemRemoval
                            maxDropdownItems
                            searchStringMinimumLength
                            shouldShowDropdownFooter
                            customOptionHint
                            transformAndValidate
                in
                Result.map (\style_ -> MultiSelectConfig style_ placeholder interactionState) styleResult

            else
                let
                    styleResult =
                        makeSingleSelectOutputStyle s
                            isEventsOnly_
                            allowCustomOptions
                            selectedItemStaysInPlace
                            maxDropdownItems
                            searchStringMinimumLength
                            shouldShowDropdownFooter
                            customOptionHint
                            transformAndValidate
                in
                Result.map
                    (\style_ -> SingleSelectConfig style_ placeholder interactionState)
                    styleResult
        )
        outputStyleResult


makeSingleSelectOutputStyle : OutputStyle -> Bool -> Bool -> Bool -> MaxDropdownItems -> SearchStringMinimumLength -> Bool -> Maybe String -> ValueTransformAndValidate -> Result String SingleSelectOutputStyle
makeSingleSelectOutputStyle outputStyle isEventsOnly_ allowCustomOptions selectedItemStaysInPlace maxDropdownItems searchStringMinimumLength shouldShowDropdownFooter customOptionHint transformAndValidate =
    case outputStyle of
        CustomHtml ->
            let
                customOptions =
                    if allowCustomOptions then
                        AllowCustomOptions customOptionHint transformAndValidate

                    else
                        NoCustomOptions

                selectedItemPlacementMode =
                    if selectedItemStaysInPlace then
                        SelectedItemStaysInPlace

                    else
                        SelectedItemMovesToTheTop

                dropdownStyle =
                    if shouldShowDropdownFooter then
                        ShowFooter

                    else
                        NoFooter

                eventsMode =
                    if isEventsOnly_ then
                        EventsOnly

                    else
                        AllowLightDomChanges
            in
            Ok
                (SingleSelectCustomHtml
                    { customOptions = customOptions
                    , selectedItemPlacementMode = selectedItemPlacementMode
                    , maxDropdownItems = maxDropdownItems
                    , searchStringMinimumLength = searchStringMinimumLength
                    , dropdownState = Collapsed
                    , dropdownStyle = dropdownStyle
                    , eventsMode = eventsMode
                    }
                )

        Datalist ->
            let
                eventsMode =
                    if isEventsOnly_ then
                        EventsOnly

                    else
                        AllowLightDomChanges
            in
            Ok (SingleSelectDatalist eventsMode transformAndValidate)


makeMultiSelectOutputStyle : OutputStyle -> Bool -> Bool -> Bool -> MaxDropdownItems -> SearchStringMinimumLength -> Bool -> Maybe String -> ValueTransformAndValidate -> Result String MultiSelectOutputStyle
makeMultiSelectOutputStyle outputStyle isEventsOnly_ allowCustomOptions enableMultiSelectSingleItemRemoval maxDropdownItems searchStringMinimumLength shouldShowDropdownFooter customOptionHint transformAndValidate =
    case outputStyle of
        CustomHtml ->
            let
                customOptions =
                    if allowCustomOptions then
                        AllowCustomOptions customOptionHint transformAndValidate

                    else
                        NoCustomOptions

                singleItemRemoval =
                    if enableMultiSelectSingleItemRemoval then
                        EnableSingleItemRemoval

                    else
                        DisableSingleItemRemoval

                dropdownStyle =
                    if shouldShowDropdownFooter then
                        ShowFooter

                    else
                        NoFooter

                eventsMode =
                    if isEventsOnly_ then
                        EventsOnly

                    else
                        AllowLightDomChanges
            in
            Ok
                (MultiSelectCustomHtml
                    { customOptions = customOptions
                    , singleItemRemoval = singleItemRemoval
                    , maxDropdownItems = maxDropdownItems
                    , searchStringMinimumLength = searchStringMinimumLength
                    , dropdownState = Collapsed
                    , dropdownStyle = dropdownStyle
                    , eventsMode = eventsMode
                    }
                )

        Datalist ->
            let
                eventsMode =
                    if isEventsOnly_ then
                        EventsOnly

                    else
                        AllowLightDomChanges
            in
            Ok (MultiSelectDataList eventsMode transformAndValidate)


isSingleSelect : SelectionConfig -> Bool
isSingleSelect selectionMode =
    case selectionMode of
        SingleSelectConfig _ _ _ ->
            True

        MultiSelectConfig _ _ _ ->
            False


getOutputStyle : SelectionConfig -> OutputStyle
getOutputStyle selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle _ _ ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml _ ->
                    CustomHtml

                SingleSelectDatalist _ _ ->
                    Datalist

        MultiSelectConfig multiSelectOutputStyle _ _ ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml _ ->
                    CustomHtml

                MultiSelectDataList _ _ ->
                    Datalist


getCustomOptionsFromDomStateCache : DomStateCache -> CustomOptions
getCustomOptionsFromDomStateCache domStateCache =
    case domStateCache.allowCustomOptions of
        DomStateCache.CustomOptionsNotAllowed ->
            NoCustomOptions

        DomStateCache.CustomOptionsAllowed ->
            AllowCustomOptions Nothing TransformAndValidate.empty

        DomStateCache.CustomOptionsAllowedWithHint string ->
            AllowCustomOptions (Just string) TransformAndValidate.empty


setOutputStyle : DomStateCache -> OutputStyle -> SelectionConfig -> SelectionConfig
setOutputStyle domStateCache outputStyle selectionConfig =
    -- TODO when changing output styles we should try to account for as much as we can, including seeing if we can
    --   - get the options in the right shape
    --   - any attribute that are set that might be relevant for the new output style
    case outputStyle of
        CustomHtml ->
            case selectionConfig of
                SingleSelectConfig singleSelectOutputStyle placeholder interactionState ->
                    case singleSelectOutputStyle of
                        SingleSelectCustomHtml _ ->
                            selectionConfig

                        SingleSelectDatalist _ _ ->
                            let
                                customOptions =
                                    getCustomOptionsFromDomStateCache domStateCache

                                singleSelectCustomHtmlFields =
                                    { defaultSingleSelectCustomHtmlFields | customOptions = customOptions }
                            in
                            SingleSelectConfig (SingleSelectCustomHtml singleSelectCustomHtmlFields) placeholder interactionState

                MultiSelectConfig multiSelectOutputStyle placeholder interactionState ->
                    case multiSelectOutputStyle of
                        MultiSelectCustomHtml _ ->
                            selectionConfig

                        MultiSelectDataList _ _ ->
                            let
                                customOptions =
                                    getCustomOptionsFromDomStateCache domStateCache

                                multiSelectCustomHtmlFields =
                                    { defaultMultiSelectCustomHtmlFields | customOptions = customOptions }
                            in
                            MultiSelectConfig (MultiSelectCustomHtml multiSelectCustomHtmlFields) placeholder interactionState

        Datalist ->
            case selectionConfig of
                SingleSelectConfig singleSelectOutputStyle placeholder interactionState ->
                    case singleSelectOutputStyle of
                        SingleSelectCustomHtml fields ->
                            SingleSelectConfig
                                (SingleSelectDatalist
                                    fields.eventsMode
                                    (getTransformAndValidateFromCustomOptions fields.customOptions)
                                )
                                placeholder
                                interactionState

                        SingleSelectDatalist _ _ ->
                            selectionConfig

                MultiSelectConfig multiSelectOutputStyle placeholder interactionState ->
                    case multiSelectOutputStyle of
                        MultiSelectCustomHtml fields ->
                            MultiSelectConfig
                                (MultiSelectDataList fields.eventsMode
                                    (getTransformAndValidateFromCustomOptions fields.customOptions)
                                )
                                placeholder
                                interactionState

                        MultiSelectDataList _ _ ->
                            selectionConfig


getCustomOptions : SelectionConfig -> CustomOptions
getCustomOptions selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle _ _ ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    singleSelectCustomHtmlFields.customOptions

                SingleSelectDatalist _ transformAndValidate ->
                    AllowCustomOptions Nothing transformAndValidate

        MultiSelectConfig multiSelectOutputStyle _ _ ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    multiSelectCustomHtmlFields.customOptions

                MultiSelectDataList _ transformAndValidate ->
                    AllowCustomOptions Nothing transformAndValidate


setCustomOptions : CustomOptions -> SelectionConfig -> SelectionConfig
setCustomOptions customOptions selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle placeholder interactionState ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    SingleSelectConfig
                        (SingleSelectCustomHtml
                            { singleSelectCustomHtmlFields | customOptions = customOptions }
                        )
                        placeholder
                        interactionState

                SingleSelectDatalist _ _ ->
                    selectionConfig

        MultiSelectConfig multiSelectOutputStyle placeholder interactionState ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    MultiSelectConfig (MultiSelectCustomHtml { multiSelectCustomHtmlFields | customOptions = customOptions }) placeholder interactionState

                MultiSelectDataList _ _ ->
                    selectionConfig


getCustomOptionHint : SelectionConfig -> CustomOptionHint
getCustomOptionHint selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle _ _ ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    case singleSelectCustomHtmlFields.customOptions of
                        AllowCustomOptions customOptionHint _ ->
                            customOptionHint

                        NoCustomOptions ->
                            Nothing

                SingleSelectDatalist _ _ ->
                    Nothing

        MultiSelectConfig multiSelectOutputStyle _ _ ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    case multiSelectCustomHtmlFields.customOptions of
                        AllowCustomOptions customOptionHint _ ->
                            customOptionHint

                        NoCustomOptions ->
                            Nothing

                MultiSelectDataList _ _ ->
                    Nothing


setCustomOptionHint : String -> SelectionConfig -> SelectionConfig
setCustomOptionHint hint selectionConfig =
    case getCustomOptionHint selectionConfig of
        Just _ ->
            let
                transformAndValidate =
                    getTransformAndValidate selectionConfig

                newAllowCustomOptions : CustomOptions
                newAllowCustomOptions =
                    AllowCustomOptions (Just hint) transformAndValidate
            in
            setCustomOptions newAllowCustomOptions selectionConfig

        Nothing ->
            -- TODO this could return a result that fails if we are not allowing custom options
            selectionConfig


setAllowCustomOptionsWithBool : Bool -> CustomOptionHint -> SelectionConfig -> SelectionConfig
setAllowCustomOptionsWithBool allowCustomOptions customOptionHint selectionConfig =
    let
        transformAndValidate =
            getTransformAndValidate selectionConfig

        newAllowCustomOptions : CustomOptions
        newAllowCustomOptions =
            if allowCustomOptions then
                AllowCustomOptions customOptionHint transformAndValidate

            else
                NoCustomOptions
    in
    setCustomOptions newAllowCustomOptions selectionConfig


getSelectedItemPlacementMode : SelectionConfig -> SelectedItemPlacementMode
getSelectedItemPlacementMode selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle _ _ ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    singleSelectCustomHtmlFields.selectedItemPlacementMode

                SingleSelectDatalist _ _ ->
                    SelectedItemIsHidden

        MultiSelectConfig _ _ _ ->
            SelectedItemStaysInPlace


setSelectedItemStaysInPlaceWithBool : Bool -> SelectionConfig -> SelectionConfig
setSelectedItemStaysInPlaceWithBool selectedItemStaysInPlace selectionConfig =
    if selectedItemStaysInPlace then
        setSelectedItemPlacementMode SelectedItemStaysInPlace selectionConfig

    else
        setSelectedItemPlacementMode SelectedItemMovesToTheTop selectionConfig


setSelectedItemPlacementMode : SelectedItemPlacementMode -> SelectionConfig -> SelectionConfig
setSelectedItemPlacementMode selectedItemPlacementMode selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle placeholder interactionState ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    SingleSelectConfig
                        (SingleSelectCustomHtml
                            { singleSelectCustomHtmlFields | selectedItemPlacementMode = selectedItemPlacementMode }
                        )
                        placeholder
                        interactionState

                SingleSelectDatalist _ _ ->
                    selectionConfig

        MultiSelectConfig _ _ _ ->
            selectionConfig


setMultiSelectModeWithBool : Bool -> SelectionConfig -> SelectionConfig
setMultiSelectModeWithBool isInMultiSelectMode selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle placeholder interactionState ->
            if isInMultiSelectMode then
                MultiSelectConfig (OutputStyle.singleToMulti singleSelectOutputStyle) placeholder interactionState

            else
                selectionConfig

        MultiSelectConfig multiSelectOutputStyle placeholder interactionState ->
            if isInMultiSelectMode then
                selectionConfig

            else
                SingleSelectConfig (OutputStyle.multiToSingle multiSelectOutputStyle) placeholder interactionState


getSelectionMode : SelectionConfig -> SelectionMode
getSelectionMode selectionConfig =
    case selectionConfig of
        SingleSelectConfig _ _ _ ->
            SingleSelect

        MultiSelectConfig _ _ _ ->
            MultiSelect


setSelectionMode : SelectionMode -> SelectionConfig -> SelectionConfig
setSelectionMode selectionMode selectionConfig =
    case selectionMode of
        SingleSelect ->
            case selectionConfig of
                SingleSelectConfig _ _ _ ->
                    selectionConfig

                MultiSelectConfig multiSelectOutputStyle placeholder interactionState ->
                    SingleSelectConfig (OutputStyle.multiToSingle multiSelectOutputStyle) placeholder interactionState

        MultiSelect ->
            case selectionConfig of
                SingleSelectConfig singleSelectOutputStyle placeholder interactionState ->
                    MultiSelectConfig (OutputStyle.singleToMulti singleSelectOutputStyle) placeholder interactionState

                MultiSelectConfig _ _ _ ->
                    selectionConfig


stringToOutputStyle : String -> Result String OutputStyle
stringToOutputStyle string =
    case string of
        "customHtml" ->
            Ok CustomHtml

        "custom-html" ->
            Ok CustomHtml

        "datalist" ->
            Ok Datalist

        "" ->
            Ok CustomHtml

        _ ->
            Err "Invalid output style"


outputStyleToString : OutputStyle -> String
outputStyleToString outputStyle =
    case outputStyle of
        CustomHtml ->
            "custom-html"

        Datalist ->
            "datalist"


isEventsOnly : SelectionConfig -> Bool
isEventsOnly selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle _ _ ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    case singleSelectCustomHtmlFields.eventsMode of
                        EventsOnly ->
                            True

                        AllowLightDomChanges ->
                            False

                SingleSelectDatalist eventsMode _ ->
                    case eventsMode of
                        EventsOnly ->
                            True

                        AllowLightDomChanges ->
                            False

        MultiSelectConfig multiSelectOutputStyle _ _ ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    case multiSelectCustomHtmlFields.eventsMode of
                        EventsOnly ->
                            True

                        AllowLightDomChanges ->
                            False

                MultiSelectDataList eventsMode _ ->
                    case eventsMode of
                        EventsOnly ->
                            True

                        AllowLightDomChanges ->
                            False


setEventsOnly : Bool -> SelectionConfig -> SelectionConfig
setEventsOnly bool selectionConfig =
    let
        newEventsMode =
            if bool then
                EventsOnly

            else
                AllowLightDomChanges
    in
    setEventsMode newEventsMode selectionConfig


isFocused : SelectionConfig -> Bool
isFocused selectionConfig =
    case selectionConfig of
        SingleSelectConfig _ _ interactionState ->
            case interactionState of
                Focused ->
                    True

                Unfocused ->
                    False

                Disabled ->
                    False

        MultiSelectConfig _ _ interactionState ->
            case interactionState of
                Focused ->
                    True

                Unfocused ->
                    False

                Disabled ->
                    False


setIsFocused : Bool -> SelectionConfig -> SelectionConfig
setIsFocused isFocused_ selectionConfig =
    let
        newInteractionState =
            if isFocused_ then
                Focused

            else
                Unfocused
    in
    setInteractionState newInteractionState selectionConfig


isDisabled : SelectionConfig -> Bool
isDisabled selectionConfig =
    case selectionConfig of
        SingleSelectConfig _ _ interactionState ->
            case interactionState of
                Focused ->
                    False

                Unfocused ->
                    False

                Disabled ->
                    True

        MultiSelectConfig _ _ interactionState ->
            case interactionState of
                Focused ->
                    False

                Unfocused ->
                    False

                Disabled ->
                    True


setIsDisabled : Bool -> SelectionConfig -> SelectionConfig
setIsDisabled isDisabled_ selectionConfig =
    if isDisabled_ then
        setInteractionState Disabled selectionConfig

    else
        setInteractionState Unfocused selectionConfig


getInteractionState : SelectionConfig -> InteractionState
getInteractionState selectionConfig =
    case selectionConfig of
        SingleSelectConfig _ _ interactionState ->
            interactionState

        MultiSelectConfig _ _ interactionState ->
            interactionState


setEventsMode : EventsMode -> SelectionConfig -> SelectionConfig
setEventsMode eventsMode selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle placeholder interactionState ->
            SingleSelectConfig
                (setEventsModeSingleSelect eventsMode singleSelectOutputStyle)
                placeholder
                interactionState

        MultiSelectConfig multiSelectOutputStyle placeholder interactionState ->
            MultiSelectConfig
                (setEventsModeMultiSelect eventsMode multiSelectOutputStyle)
                placeholder
                interactionState


setInteractionState : InteractionState -> SelectionConfig -> SelectionConfig
setInteractionState newInteractionState selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle placeholder _ ->
            SingleSelectConfig singleSelectOutputStyle placeholder newInteractionState

        MultiSelectConfig multiSelectOutputStyle placeholder _ ->
            MultiSelectConfig multiSelectOutputStyle placeholder newInteractionState


setShowDropdown : Bool -> SelectionConfig -> SelectionConfig
setShowDropdown showDropdown_ selectionConfig =
    let
        newDropdownState =
            if showDropdown_ then
                Expanded

            else
                Collapsed
    in
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle placeholder interactionState ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    SingleSelectConfig
                        (SingleSelectCustomHtml
                            { singleSelectCustomHtmlFields | dropdownState = newDropdownState }
                        )
                        placeholder
                        interactionState

                SingleSelectDatalist _ _ ->
                    selectionConfig

        MultiSelectConfig multiSelectOutputStyle placeholder interactionState ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    MultiSelectConfig
                        (MultiSelectCustomHtml { multiSelectCustomHtmlFields | dropdownState = newDropdownState })
                        placeholder
                        interactionState

                MultiSelectDataList _ _ ->
                    selectionConfig


setDropdownStyle : DropdownStyle -> SelectionConfig -> SelectionConfig
setDropdownStyle dropdownStyle selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle placeholder interactionState ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    SingleSelectConfig
                        (SingleSelectCustomHtml
                            { singleSelectCustomHtmlFields | dropdownStyle = dropdownStyle }
                        )
                        placeholder
                        interactionState

                SingleSelectDatalist _ _ ->
                    selectionConfig

        MultiSelectConfig multiSelectOutputStyle placeholder interactionState ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    MultiSelectConfig
                        (MultiSelectCustomHtml { multiSelectCustomHtmlFields | dropdownStyle = dropdownStyle })
                        placeholder
                        interactionState

                MultiSelectDataList _ _ ->
                    selectionConfig


setMaxDropdownItems : MaxDropdownItems -> SelectionConfig -> SelectionConfig
setMaxDropdownItems maxDropdownItems selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle placeholder interactionState ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    SingleSelectConfig
                        (SingleSelectCustomHtml
                            { singleSelectCustomHtmlFields | maxDropdownItems = maxDropdownItems }
                        )
                        placeholder
                        interactionState

                SingleSelectDatalist _ _ ->
                    selectionConfig

        MultiSelectConfig multiSelectOutputStyle placeholder interactionState ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    MultiSelectConfig
                        (MultiSelectCustomHtml { multiSelectCustomHtmlFields | maxDropdownItems = maxDropdownItems })
                        placeholder
                        interactionState

                MultiSelectDataList _ _ ->
                    selectionConfig


getMaxDropdownItems : SelectionConfig -> MaxDropdownItems
getMaxDropdownItems selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle _ _ ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    singleSelectCustomHtmlFields.maxDropdownItems

                SingleSelectDatalist _ _ ->
                    NoLimitToDropdownItems

        MultiSelectConfig multiSelectOutputStyle _ _ ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    multiSelectCustomHtmlFields.maxDropdownItems

                MultiSelectDataList _ _ ->
                    NoLimitToDropdownItems


setSingleItemRemoval : SingleItemRemoval -> SelectionConfig -> SelectionConfig
setSingleItemRemoval newSingleItemRemoval selectionConfig =
    case selectionConfig of
        SingleSelectConfig _ _ _ ->
            selectionConfig

        MultiSelectConfig multiSelectOutputStyle placeholder interactionState ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    MultiSelectConfig
                        (MultiSelectCustomHtml { multiSelectCustomHtmlFields | singleItemRemoval = newSingleItemRemoval })
                        placeholder
                        interactionState

                MultiSelectDataList _ _ ->
                    selectionConfig


setSearchStringMinimumLength : SearchStringMinimumLength -> SelectionConfig -> SelectionConfig
setSearchStringMinimumLength newSearchStringMinimumLength selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle placeholder interactionState ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    SingleSelectConfig
                        (SingleSelectCustomHtml
                            { singleSelectCustomHtmlFields | searchStringMinimumLength = newSearchStringMinimumLength }
                        )
                        placeholder
                        interactionState

                SingleSelectDatalist _ _ ->
                    selectionConfig

        MultiSelectConfig multiSelectOutputStyle placeholder interactionState ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    MultiSelectConfig
                        (MultiSelectCustomHtml { multiSelectCustomHtmlFields | searchStringMinimumLength = newSearchStringMinimumLength })
                        placeholder
                        interactionState

                MultiSelectDataList _ _ ->
                    selectionConfig


getSearchStringMinimumLength : SelectionConfig -> SearchStringMinimumLength
getSearchStringMinimumLength selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle _ _ ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    singleSelectCustomHtmlFields.searchStringMinimumLength

                SingleSelectDatalist _ _ ->
                    NoMinimumToSearchStringLength

        MultiSelectConfig multiSelectOutputStyle _ _ ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    multiSelectCustomHtmlFields.searchStringMinimumLength

                MultiSelectDataList _ _ ->
                    NoMinimumToSearchStringLength


getPlaceholder : SelectionConfig -> Placeholder
getPlaceholder selectionConfig =
    case selectionConfig of
        SingleSelectConfig _ placeholder _ ->
            placeholder

        MultiSelectConfig _ placeholder _ ->
            placeholder


hasPlaceholder : SelectionConfig -> Bool
hasPlaceholder selectionConfig =
    getPlaceholder selectionConfig |> Tuple.first


getPlaceholderString : SelectionConfig -> String
getPlaceholderString selectionConfig =
    getPlaceholder selectionConfig |> Tuple.second


setPlaceholder : Placeholder -> SelectionConfig -> SelectionConfig
setPlaceholder placeholder selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle _ interactionState ->
            SingleSelectConfig singleSelectOutputStyle placeholder interactionState

        MultiSelectConfig multiSelectOutputStyle _ interactionState ->
            MultiSelectConfig multiSelectOutputStyle placeholder interactionState


getSingleItemRemoval : SelectionConfig -> SingleItemRemoval
getSingleItemRemoval selectionConfig =
    case selectionConfig of
        SingleSelectConfig _ _ _ ->
            DisableSingleItemRemoval

        MultiSelectConfig multiSelectOutputStyle _ _ ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    multiSelectCustomHtmlFields.singleItemRemoval

                MultiSelectDataList _ _ ->
                    EnableSingleItemRemoval


getDropdownStyle : SelectionConfig -> DropdownStyle
getDropdownStyle selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle _ _ ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    singleSelectCustomHtmlFields.dropdownStyle

                SingleSelectDatalist _ _ ->
                    NoFooter

        MultiSelectConfig multiSelectOutputStyle _ _ ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    multiSelectCustomHtmlFields.dropdownStyle

                MultiSelectDataList _ _ ->
                    NoFooter


showDropdownFooter : SelectionConfig -> Bool
showDropdownFooter selectionConfig =
    case getDropdownStyle selectionConfig of
        NoFooter ->
            False

        ShowFooter ->
            True


getDropdownState : SelectionConfig -> DropdownState
getDropdownState selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle _ _ ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    singleSelectCustomHtmlFields.dropdownState

                SingleSelectDatalist _ _ ->
                    NotManagedByMe

        MultiSelectConfig multiSelectOutputStyle _ _ ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    multiSelectCustomHtmlFields.dropdownState

                MultiSelectDataList _ _ ->
                    NotManagedByMe


showDropdown : SelectionConfig -> Bool
showDropdown selectionConfig =
    case getDropdownState selectionConfig of
        Expanded ->
            True

        Collapsed ->
            False

        NotManagedByMe ->
            False


getTransformAndValidate : SelectionConfig -> ValueTransformAndValidate
getTransformAndValidate selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle _ _ ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    getTransformAndValidateFromCustomOptions singleSelectCustomHtmlFields.customOptions

                SingleSelectDatalist _ valueTransformAndValidate ->
                    valueTransformAndValidate

        MultiSelectConfig multiSelectOutputStyle _ _ ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    getTransformAndValidateFromCustomOptions multiSelectCustomHtmlFields.customOptions

                MultiSelectDataList _ valueTransformAndValidate ->
                    valueTransformAndValidate


setTransformAndValidate : ValueTransformAndValidate -> SelectionConfig -> SelectionConfig
setTransformAndValidate newTransformAndValidate selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle placeholder interactionState ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    let
                        newSingleSelectCustomFields =
                            { singleSelectCustomHtmlFields
                                | customOptions =
                                    setTransformAndValidateFromCustomOptions
                                        newTransformAndValidate
                                        singleSelectCustomHtmlFields.customOptions
                            }
                    in
                    SingleSelectConfig (SingleSelectCustomHtml newSingleSelectCustomFields) placeholder interactionState

                SingleSelectDatalist eventsMode _ ->
                    SingleSelectConfig (SingleSelectDatalist eventsMode newTransformAndValidate) placeholder interactionState

        MultiSelectConfig multiSelectOutputStyle placeholder interactionState ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    let
                        newMultiSelectCustomHtmlFields =
                            { multiSelectCustomHtmlFields
                                | customOptions =
                                    setTransformAndValidateFromCustomOptions
                                        newTransformAndValidate
                                        multiSelectCustomHtmlFields.customOptions
                            }
                    in
                    MultiSelectConfig (MultiSelectCustomHtml newMultiSelectCustomHtmlFields) placeholder interactionState

                MultiSelectDataList eventsMode _ ->
                    MultiSelectConfig (MultiSelectDataList eventsMode newTransformAndValidate) placeholder interactionState


getEventMode : SelectionConfig -> EventsMode
getEventMode selectionConfig =
    case selectionConfig of
        SingleSelectConfig singleSelectOutputStyle _ _ ->
            case singleSelectOutputStyle of
                SingleSelectCustomHtml singleSelectCustomHtmlFields ->
                    singleSelectCustomHtmlFields.eventsMode

                SingleSelectDatalist eventsMode _ ->
                    eventsMode

        MultiSelectConfig multiSelectOutputStyle _ _ ->
            case multiSelectOutputStyle of
                MultiSelectCustomHtml multiSelectCustomHtmlFields ->
                    multiSelectCustomHtmlFields.eventsMode

                MultiSelectDataList eventsMode _ ->
                    eventsMode

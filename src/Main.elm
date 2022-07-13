module Main exposing (..)

import Bounce exposing (Bounce)
import Browser
import Html exposing (Html, button, div, input, li, node, optgroup, span, text, ul)
import Html.Attributes
    exposing
        ( class
        , classList
        , disabled
        , id
        , maxlength
        , name
        , placeholder
        , style
        , tabindex
        , type_
        , value
        )
import Html.Attributes.Extra exposing (attributeIf)
import Html.Events
    exposing
        ( onBlur
        , onClick
        , onFocus
        , onInput
        , onMouseDown
        , onMouseEnter
        , onMouseLeave
        )
import Html.Lazy
import Json.Decode
import Json.Encode
import Keyboard exposing (Key(..))
import Keyboard.Events as Keyboard
import List.Extra
import Option
    exposing
        ( Option(..)
        , OptionGroup
        )
import OptionDisplay exposing (OptionDisplay(..))
import OptionLabel exposing (OptionLabel(..), optionLabelToString)
import OptionPresentor exposing (tokensToHtml)
import OptionSearcher exposing (doesSearchStringFindNothing, updateOrAddCustomOption)
import OptionSorting
    exposing
        ( OptionSort(..)
        , sortOptions
        , sortOptionsBySearchFilterTotalScore
        , stringToOptionSort
        )
import OptionValue exposing (OptionValue(..))
import OptionsUtilities
    exposing
        ( activateOptionInListByOptionValue
        , addAdditionalOptionsToOptionList
        , addAndSelectOptionsInOptionsListByString
        , adjustHighlightedOptionAfterSearch
        , customSelectedOptions
        , deselectAllButTheFirstSelectedOptionInList
        , deselectAllOptionsInOptionsList
        , deselectAllSelectedHighlightedOptions
        , deselectLastSelectedOption
        , deselectOptionInListByOptionValue
        , filterOptionsToShowInDropdown
        , findHighlightedOption
        , findHighlightedOrSelectedOptionIndex
        , findOptionByOptionValue
        , groupOptionsInOrder
        , hasSelectedHighlightedOptions
        , hasSelectedOption
        , highlightOptionInListByValue
        , isOptionValueInListOfOptionsByValue
        , moveHighlightedOptionDown
        , moveHighlightedOptionUp
        , optionsValues
        , removeHighlightOptionInList
        , removeOptionsFromOptionList
        , removeUnselectedCustomOptions
        , replaceOptions
        , selectHighlightedOption
        , selectOptionInListByOptionValue
        , selectOptionsInOptionsListByString
        , selectSingleOptionInList
        , selectedOptions
        , selectedOptionsToTuple
        , toggleSelectedHighlightByOptionValue
        , unhighlightSelectedOptions
        , updateDatalistOptionsWithPendingValidation
        , updateDatalistOptionsWithValue
        , updateDatalistOptionsWithValueAndErrors
        )
import OutputStyle
    exposing
        ( DropdownStyle(..)
        , MaxDropdownItems(..)
        , SearchStringMinimumLength(..)
        , SingleItemRemoval(..)
        )
import Ports
    exposing
        ( addOptionsReceiver
        , allOptions
        , allowCustomOptionsReceiver
        , blurInput
        , customOptionSelected
        , customValidationReceiver
        , deselectOptionReceiver
        , disableChangedReceiver
        , errorMessage
        , focusInput
        , initialValueSet
        , inputBlurred
        , inputFocused
        , inputKeyUp
        , invalidValue
        , loadingChangedReceiver
        , maxDropdownItemsChangedReceiver
        , muchSelectIsReady
        , multiSelectChangedReceiver
        , multiSelectSingleItemRemovalChangedReceiver
        , optionDeselected
        , optionSelected
        , optionSortingChangedReceiver
        , optionsReplacedReceiver
        , optionsUpdated
        , outputStyleChangedReceiver
        , placeholderChangedReceiver
        , removeOptionsReceiver
        , requestAllOptionsReceiver
        , scrollDropdownToElement
        , searchOptionsWithWebWorker
        , searchStringMinimumLengthChangedReceiver
        , selectOptionReceiver
        , selectedItemStaysInPlaceChangedReceiver
        , sendCustomValidationRequest
        , showDropdownFooterChangedReceiver
        , transformationAndValidationReceiver
        , updateOptionsFromDom
        , updateOptionsInWebWorker
        , updateSearchResultDataWithWebWorkerReceiver
        , valueCasingDimensionsChangedReceiver
        , valueChanged
        , valueChangedReceiver
        , valueCleared
        , valueDecoder
        , valuesDecoder
        )
import PositiveInt exposing (PositiveInt)
import RightSlot
    exposing
        ( FocusTransition(..)
        , RightSlot(..)
        , isRightSlotTransitioning
        , updateRightSlot
        , updateRightSlotForDatalist
        , updateRightSlotLoading
        , updateRightSlotTransitioning
        )
import SearchString exposing (SearchString)
import SelectionMode
    exposing
        ( OutputStyle(..)
        , SelectionConfig(..)
        , defaultSelectionConfig
        , getMaxDropdownItems
        , getOutputStyle
        , getSearchStringMinimumLength
        , getSingleItemRemoval
        , isDisabled
        , isFocused
        , isSingleSelect
        , makeSelectionConfig
        , setDropdownStyle
        , setIsDisabled
        , setIsFocused
        , setMaxDropdownItems
        , setSearchStringMinimumLength
        , setSelectedItemStaysInPlaceWithBool
        , setShowDropdown
        , setSingleItemRemoval
        , showDropdown
        , showDropdownFooter
        )
import TransformAndValidate
    exposing
        ( ValueTransformAndValidate
        , transformAndValidateFirstPass
        )


type Effect
    = NoEffect
    | Batch (List Effect)
    | FocusInput
    | BlurInput
    | InputHasBeenFocused
    | InputHasBeenBlurred
    | InputHasBeenKeyUp String TransformAndValidate.ValidationStatus
    | SearchStringTouched Float
    | UpdateOptionsInWebWorker
    | SearchOptionsWithWebWorker Json.Decode.Value
    | ReportValueChanged Json.Encode.Value
    | ValueCleared
    | InvalidValue Json.Encode.Value
    | CustomOptionSelected (List String)
    | ReportOptionSelected Json.Encode.Value
    | OptionDeselected Json.Encode.Value
    | OptionsUpdated Bool
    | SendCustomValidationRequest ( String, Int )
    | ReportErrorMessage String
    | ReportReady
    | ReportInitialValueSet Json.Encode.Value
    | FetchOptionsFromDom
    | ScrollDownToElement String
    | ReportAllOptions Json.Encode.Value


type Msg
    = NoOp
    | BringInputInFocus
    | BringInputOutOfFocus
    | InputBlur
    | InputFocus
    | DropdownMouseOverOption OptionValue
    | DropdownMouseOutOption OptionValue
    | DropdownMouseDownOption OptionValue
    | DropdownMouseUpOption OptionValue
    | UpdateSearchString String
    | SearchStringSteady
    | UpdateOptionValueValue Int String
    | TextInputOnInput String
    | ValueChanged Json.Decode.Value
    | OptionsReplaced Json.Decode.Value
    | OptionSortingChanged String
    | AddOptions Json.Decode.Value
    | RemoveOptions Json.Decode.Value
    | SelectOption Json.Decode.Value
    | DeselectOption Json.Decode.Value
    | DeselectOptionInternal Option
    | PlaceholderAttributeChanged ( Bool, String )
    | LoadingAttributeChanged Bool
    | MaxDropdownItemsChanged Int
    | ShowDropdownFooterChanged Bool
    | AllowCustomOptionsChanged ( Bool, String )
    | DisabledAttributeChanged Bool
    | MultiSelectAttributeChanged Bool
    | MultiSelectSingleItemRemovalAttributeChanged Bool
    | SearchStringMinimumLengthAttributeChanged Int
    | SelectedItemStaysInPlaceChanged Bool
    | OutputStyleChanged String
    | SelectHighlightedOption
    | DeleteInputForSingleSelect
    | EscapeKeyInInputFilter
    | MoveHighlightedOptionUp
    | MoveHighlightedOptionDown
    | ValueCasingWidthUpdate { width : Float, height : Float }
    | ClearAllSelectedOptions
      -- SelectedValueHighlight?!? WTF? Yes, this is because in multi selected
      --  mode a user can 'highlight' any number of the selected values by clicking
      --  on them and then delete them (with the delete key).
      --  If you can think of a better name we're all ears.
    | ToggleSelectedValueHighlight OptionValue
    | DeleteKeydownForMultiSelect
    | AddMultiSelectValue Int
    | RemoveMultiSelectValue Int
    | RequestAllOptions
    | UpdateSearchResultsForOptions Json.Encode.Value
    | CustomValidationResponse Json.Encode.Value
    | UpdateTransformationAndValidation Json.Encode.Value


type alias Model =
    { initialValue : List String
    , selectionConfig : SelectionConfig
    , options : List Option
    , optionSort : OptionSort
    , searchStringBounce : Bounce
    , searchStringDebounceLength : Float
    , searchString : SearchString
    , searchStringNonce : Int
    , focusedIndex : Int
    , rightSlot : RightSlot
    , valueCasing : ValueCasing
    }


type ValueCasing
    = ValueCasing Float Float


updateWrapper : Msg -> Model -> ( Model, Cmd Msg )
updateWrapper msg model =
    update msg model
        |> Tuple.mapSecond perform


update : Msg -> Model -> ( Model, Effect )
update msg model =
    case msg of
        NoOp ->
            ( model, NoEffect )

        BringInputInFocus ->
            case getOutputStyle model.selectionConfig of
                CustomHtml ->
                    if isRightSlotTransitioning model.rightSlot then
                        ( model, NoEffect )

                    else if isFocused model.selectionConfig then
                        ( model, FocusInput )

                    else
                        ( { model
                            | selectionConfig = setIsFocused True model.selectionConfig
                            , rightSlot = updateRightSlotTransitioning InFocusTransition model.rightSlot
                          }
                        , FocusInput
                        )

                Datalist ->
                    ( model, FocusInput )

        BringInputOutOfFocus ->
            if isRightSlotTransitioning model.rightSlot then
                ( model, NoEffect )

            else if isFocused model.selectionConfig then
                ( { model
                    | selectionConfig = setIsFocused False model.selectionConfig
                    , rightSlot = updateRightSlotTransitioning InFocusTransition model.rightSlot
                  }
                , BlurInput
                )

            else
                ( model, BlurInput )

        InputBlur ->
            case getOutputStyle model.selectionConfig of
                CustomHtml ->
                    let
                        optionsWithoutUnselectedCustomOptions =
                            removeUnselectedCustomOptions model.options
                                |> unhighlightSelectedOptions
                    in
                    ( { model
                        | searchString = SearchString.reset
                        , options = optionsWithoutUnselectedCustomOptions
                        , selectionConfig =
                            model.selectionConfig
                                |> setShowDropdown False
                                |> setIsFocused False
                        , rightSlot = updateRightSlotTransitioning NotInFocusTransition model.rightSlot
                        , searchStringBounce = Bounce.push model.searchStringBounce
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , batch
                        [ InputHasBeenBlurred
                        , SearchStringTouched model.searchStringDebounceLength
                        ]
                    )

                Datalist ->
                    ( { model
                        | selectionConfig = setIsFocused False model.selectionConfig
                      }
                    , InputHasBeenBlurred
                    )

        InputFocus ->
            case getOutputStyle model.selectionConfig of
                CustomHtml ->
                    ( { model
                        | selectionConfig =
                            model.selectionConfig
                                |> setShowDropdown True
                                |> setIsFocused True
                        , rightSlot = updateRightSlotTransitioning NotInFocusTransition model.rightSlot
                      }
                    , InputHasBeenFocused
                    )

                Datalist ->
                    ( { model
                        | selectionConfig = setIsFocused True model.selectionConfig
                      }
                    , InputHasBeenFocused
                    )

        DropdownMouseOverOption optionValue ->
            let
                updatedOptions =
                    model.options
                        |> highlightOptionInListByValue optionValue
            in
            ( { model
                | options = updatedOptions
              }
                |> updateModelWithChangesThatEffectTheOptionsWhenTheMouseMoves
            , NoEffect
            )

        DropdownMouseOutOption optionValue ->
            let
                updatedOptions =
                    removeHighlightOptionInList optionValue model.options
            in
            ( { model
                | options = updatedOptions
              }
                |> updateModelWithChangesThatEffectTheOptionsWhenTheMouseMoves
            , NoEffect
            )

        DropdownMouseDownOption optionValue ->
            ( { model
                | options = activateOptionInListByOptionValue optionValue model.options
              }
            , NoEffect
            )

        DropdownMouseUpOption optionValue ->
            let
                updatedOptions =
                    case model.selectionConfig of
                        MultiSelectConfig _ _ _ ->
                            selectOptionInListByOptionValue optionValue model.options

                        SingleSelectConfig _ _ _ ->
                            selectSingleOptionInList optionValue model.options
            in
            case SelectionMode.getSelectionMode model.selectionConfig of
                SelectionMode.SingleSelect ->
                    ( { model
                        | options = updatedOptions
                        , searchString = SearchString.reset
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , batch
                        [ makeEffectsWhenValuesChanges (selectedOptions updatedOptions) (Just optionValue)
                        , BlurInput
                        ]
                    )

                SelectionMode.MultiSelect ->
                    ( { model
                        | options = updatedOptions
                        , searchString = SearchString.reset
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , batch
                        [ makeEffectsWhenValuesChanges (selectedOptions updatedOptions) (Just optionValue)
                        , FocusInput
                        ]
                    )

        UpdateSearchString searchString ->
            ( { model
                | searchString = SearchString.update searchString
                , searchStringBounce = Bounce.push model.searchStringBounce
                , searchStringNonce = model.searchStringNonce + 1
              }
            , batch
                [ InputHasBeenKeyUp searchString TransformAndValidate.InputValidationIsNotHappening
                , SearchStringTouched model.searchStringDebounceLength
                ]
            )

        SearchStringSteady ->
            ( updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges model
            , SearchOptionsWithWebWorker
                (OptionSearcher.encodeSearchParams
                    model.searchString
                    (SelectionMode.getSearchStringMinimumLength model.selectionConfig)
                    model.searchStringNonce
                    (SearchString.isCleared model.searchString)
                )
            )

        UpdateOptionValueValue selectedValueIndex valueString ->
            case transformAndValidateFirstPass (SelectionMode.getTransformAndValidate model.selectionConfig) valueString selectedValueIndex of
                TransformAndValidate.ValidationPass _ _ ->
                    let
                        updatedOptions =
                            updateDatalistOptionsWithValue
                                (OptionValue.stringToOptionValue valueString)
                                selectedValueIndex
                                model.options

                        maybeSelectedOptionValue =
                            Just (OptionValue.stringToOptionValue valueString)
                    in
                    ( { model
                        | options = updatedOptions
                        , rightSlot = updateRightSlot model.rightSlot model.selectionConfig True (updatedOptions |> selectedOptions)
                      }
                    , batch
                        [ makeEffectsWhenValuesChanges
                            (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
                            maybeSelectedOptionValue
                        , InputHasBeenKeyUp valueString TransformAndValidate.InputHasBeenValidated
                        ]
                    )

                TransformAndValidate.ValidationFailed _ _ validationErrorMessages ->
                    let
                        updatedOptions =
                            updateDatalistOptionsWithValueAndErrors
                                validationErrorMessages
                                (OptionValue.stringToOptionValue valueString)
                                selectedValueIndex
                                model.options

                        maybeSelectedOptionValue =
                            Just (OptionValue.stringToOptionValue valueString)
                    in
                    ( { model
                        | options = updatedOptions
                        , rightSlot =
                            updateRightSlot
                                model.rightSlot
                                model.selectionConfig
                                True
                                (updatedOptions |> selectedOptions)
                      }
                    , batch
                        [ makeEffectsWhenValuesChanges
                            (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
                            maybeSelectedOptionValue
                        , InputHasBeenKeyUp valueString TransformAndValidate.InputHasFailedValidation
                        ]
                    )

                TransformAndValidate.ValidationPending _ _ ->
                    let
                        updatedOptions =
                            updateDatalistOptionsWithPendingValidation
                                (OptionValue.stringToOptionValue valueString)
                                selectedValueIndex
                                model.options

                        maybeSelectedOptionValue =
                            Just (OptionValue.stringToOptionValue valueString)
                    in
                    ( { model
                        | options = updatedOptions
                        , rightSlot =
                            updateRightSlot
                                model.rightSlot
                                model.selectionConfig
                                True
                                (updatedOptions |> selectedOptions)
                      }
                    , batch
                        [ makeEffectsWhenValuesChanges
                            (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
                            maybeSelectedOptionValue
                        , InputHasBeenKeyUp valueString TransformAndValidate.InputHasValidationPending
                        ]
                    )

        TextInputOnInput inputString ->
            ( { model
                | searchString = SearchString.update inputString
                , options = updateOrAddCustomOption (SearchString.update inputString) model.selectionConfig model.options
              }
            , InputHasBeenKeyUp inputString TransformAndValidate.InputValidationIsNotHappening
            )

        ValueChanged valuesJson ->
            let
                valuesResult =
                    case SelectionMode.getSelectionMode model.selectionConfig of
                        SelectionMode.SingleSelect ->
                            Json.Decode.decodeValue valueDecoder valuesJson

                        SelectionMode.MultiSelect ->
                            Json.Decode.decodeValue valuesDecoder valuesJson
            in
            case valuesResult of
                Ok values ->
                    case SelectionMode.getOutputStyle model.selectionConfig of
                        CustomHtml ->
                            let
                                newOptions =
                                    addAndSelectOptionsInOptionsListByString
                                        values
                                        model.options
                            in
                            ( { model
                                | options = newOptions
                              }
                                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                            , NoEffect
                            )

                        Datalist ->
                            let
                                newOptions =
                                    OptionsUtilities.updatedDatalistSelectedOptions
                                        (List.map OptionValue.stringToOptionValue values)
                                        model.options
                            in
                            ( { model
                                | options = newOptions
                              }
                                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                            , NoEffect
                            )

                Err error ->
                    ( model, ReportErrorMessage (Json.Decode.errorToString error) )

        OptionsReplaced newOptionsJson ->
            case Json.Decode.decodeValue (Option.optionsDecoder OptionDisplay.NewOption (SelectionMode.getOutputStyle model.selectionConfig)) newOptionsJson of
                Ok newOptions ->
                    case SelectionMode.getOutputStyle model.selectionConfig of
                        CustomHtml ->
                            let
                                newOptionWithOldSelectedOption =
                                    replaceOptions
                                        model.selectionConfig
                                        model.options
                                        newOptions
                            in
                            ( { model
                                | options =
                                    newOptionWithOldSelectedOption
                                        |> OptionsUtilities.updateAge
                                            CustomHtml
                                            model.searchString
                                            (SelectionMode.getSearchStringMinimumLength model.selectionConfig)
                                , rightSlot = updateRightSlot model.rightSlot model.selectionConfig (OptionsUtilities.hasSelectedOption newOptionWithOldSelectedOption) model.options
                                , searchStringBounce = Bounce.push model.searchStringBounce
                              }
                                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                            , batch
                                [ OptionsUpdated True
                                , makeCommandMessagesForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
                                ]
                            )

                        Datalist ->
                            let
                                newOptionWithOldSelectedOption =
                                    replaceOptions
                                        model.selectionConfig
                                        model.options
                                        newOptions
                                        |> OptionsUtilities.organizeNewDatalistOptions
                                        |> OptionsUtilities.updateAge
                                            Datalist
                                            model.searchString
                                            (SelectionMode.getSearchStringMinimumLength model.selectionConfig)
                            in
                            ( { model
                                | options = newOptionWithOldSelectedOption
                                , rightSlot = updateRightSlot model.rightSlot model.selectionConfig (OptionsUtilities.hasSelectedOption newOptionWithOldSelectedOption) model.options
                                , searchStringBounce = Bounce.push model.searchStringBounce
                              }
                                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                            , batch
                                [ OptionsUpdated True
                                , makeCommandMessagesForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
                                ]
                            )

                Err error ->
                    ( model, ReportErrorMessage (Json.Decode.errorToString error) )

        AddOptions optionsJson ->
            case Json.Decode.decodeValue (Option.optionsDecoder OptionDisplay.NewOption (SelectionMode.getOutputStyle model.selectionConfig)) optionsJson of
                Ok newOptions ->
                    let
                        updatedOptions =
                            addAdditionalOptionsToOptionList model.options newOptions
                                |> OptionsUtilities.updateAge
                                    (SelectionMode.getOutputStyle model.selectionConfig)
                                    model.searchString
                                    (SelectionMode.getSearchStringMinimumLength model.selectionConfig)
                    in
                    ( { model
                        | options = updatedOptions
                        , searchStringBounce = Bounce.push model.searchStringBounce
                        , searchStringDebounceLength = getDebouceDelayForSearch (List.length updatedOptions)

                        --, quietSearchForDynamicInterval = makeDynamicDebouncer (List.length updatedOptions)
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , batch
                        [ OptionsUpdated False
                        , makeCommandMessagesForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
                        ]
                    )

                Err error ->
                    ( model, ReportErrorMessage (Json.Decode.errorToString error) )

        RemoveOptions optionsJson ->
            case Json.Decode.decodeValue (Option.optionsDecoder OptionDisplay.MatureOption (SelectionMode.getOutputStyle model.selectionConfig)) optionsJson of
                Ok optionsToRemove ->
                    let
                        updatedOptions =
                            removeOptionsFromOptionList model.options optionsToRemove
                    in
                    ( { model
                        | options = updatedOptions
                        , searchStringBounce = Bounce.push model.searchStringBounce
                        , searchStringDebounceLength = getDebouceDelayForSearch (List.length updatedOptions)
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , batch
                        [ OptionsUpdated True
                        , makeCommandMessagesForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
                        ]
                    )

                Err error ->
                    ( model, ReportErrorMessage (Json.Decode.errorToString error) )

        SelectOption optionJson ->
            case Json.Decode.decodeValue (Option.decoder OptionDisplay.MatureOption (SelectionMode.getOutputStyle model.selectionConfig)) optionJson of
                Ok option ->
                    let
                        optionValue =
                            Option.getOptionValue option

                        updatedOptions : List Option
                        updatedOptions =
                            case SelectionMode.getSelectionMode model.selectionConfig of
                                SelectionMode.MultiSelect ->
                                    selectOptionInListByOptionValue optionValue model.options

                                SelectionMode.SingleSelect ->
                                    selectSingleOptionInList optionValue model.options
                    in
                    ( { model
                        | options = updatedOptions
                        , searchStringBounce = Bounce.push model.searchStringBounce
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , batch
                        [ makeEffectsWhenValuesChanges (selectedOptions updatedOptions) (Just optionValue)
                        , makeCommandMessagesForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
                        , SearchStringTouched model.searchStringDebounceLength
                        ]
                    )

                Err error ->
                    ( model, ReportErrorMessage (Json.Decode.errorToString error) )

        DeselectOptionInternal optionToDeselect ->
            deselectOption model optionToDeselect

        DeselectOption optionJson ->
            case Json.Decode.decodeValue (Option.decoder OptionDisplay.MatureOption (SelectionMode.getOutputStyle model.selectionConfig)) optionJson of
                Ok option ->
                    deselectOption model option

                Err error ->
                    ( model, ReportErrorMessage (Json.Decode.errorToString error) )

        OptionSortingChanged sortingString ->
            case stringToOptionSort sortingString of
                Ok optionSorting ->
                    ( { model | optionSort = optionSorting }, NoEffect )

                Err error ->
                    ( model, ReportErrorMessage error )

        PlaceholderAttributeChanged newPlaceholder ->
            ( { model | selectionConfig = SelectionMode.setPlaceholder newPlaceholder model.selectionConfig }
            , NoEffect
            )

        LoadingAttributeChanged bool ->
            ( { model
                | rightSlot =
                    updateRightSlotLoading
                        bool
                        model.selectionConfig
                        (hasSelectedOption model.options)
              }
            , NoEffect
            )

        MaxDropdownItemsChanged int ->
            let
                maxDropdownItems =
                    FixedMaxDropdownItems (PositiveInt.new int)
            in
            ( { model
                | selectionConfig = setMaxDropdownItems maxDropdownItems model.selectionConfig
              }
                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
            , NoEffect
            )

        ShowDropdownFooterChanged bool ->
            let
                newDropdownStyle =
                    if bool then
                        ShowFooter

                    else
                        NoFooter
            in
            ( { model
                | selectionConfig = setDropdownStyle newDropdownStyle model.selectionConfig
              }
            , NoEffect
            )

        AllowCustomOptionsChanged ( canAddCustomOptions, customOptionHint ) ->
            let
                maybeCustomOptionHint =
                    case customOptionHint of
                        "" ->
                            Nothing

                        _ ->
                            Just customOptionHint
            in
            ( { model
                | selectionConfig =
                    SelectionMode.setAllowCustomOptionsWithBool
                        canAddCustomOptions
                        maybeCustomOptionHint
                        model.selectionConfig
              }
            , NoEffect
            )

        DisabledAttributeChanged bool ->
            ( { model | selectionConfig = setIsDisabled bool model.selectionConfig }, NoEffect )

        SelectedItemStaysInPlaceChanged selectedItemStaysInPlace ->
            ( { model
                | selectionConfig =
                    setSelectedItemStaysInPlaceWithBool
                        selectedItemStaysInPlace
                        model.selectionConfig
              }
            , NoEffect
            )

        OutputStyleChanged newOutputStyleString ->
            case SelectionMode.stringToOutputStyle newOutputStyleString of
                Ok outputStyle ->
                    let
                        newSelectionConfig =
                            SelectionMode.setOutputStyle
                                outputStyle
                                model.selectionConfig
                    in
                    ( { model
                        | selectionConfig = newSelectionConfig
                        , rightSlot = updateRightSlot model.rightSlot newSelectionConfig True model.options
                      }
                    , FetchOptionsFromDom
                    )

                Err _ ->
                    ( model, ReportErrorMessage ("Invalid output style " ++ newOutputStyleString) )

        MultiSelectSingleItemRemovalAttributeChanged shouldEnableMultiSelectSingleItemRemoval ->
            let
                multiSelectSingleItemRemoval =
                    if shouldEnableMultiSelectSingleItemRemoval then
                        EnableSingleItemRemoval

                    else
                        DisableSingleItemRemoval
            in
            ( { model
                | selectionConfig = setSingleItemRemoval multiSelectSingleItemRemoval model.selectionConfig
              }
            , batch
                [ ReportReady
                , NoEffect
                ]
            )

        MultiSelectAttributeChanged isInMultiSelectMode ->
            let
                updatedOptions =
                    if isInMultiSelectMode then
                        model.options

                    else
                        deselectAllButTheFirstSelectedOptionInList model.options

                cmd =
                    if isInMultiSelectMode then
                        NoEffect

                    else
                        makeEffectsWhenValuesChanges (selectedOptions updatedOptions) Nothing
            in
            ( { model
                | selectionConfig = SelectionMode.setMultiSelectModeWithBool isInMultiSelectMode model.selectionConfig
                , options = updatedOptions
              }
                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
            , batch
                [ ReportReady
                , makeCommandMessagesForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
                , cmd
                ]
            )

        SearchStringMinimumLengthAttributeChanged searchStringMinimumLength ->
            ( { model
                | selectionConfig =
                    setSearchStringMinimumLength
                        (FixedSearchStringMinimumLength (PositiveInt.new searchStringMinimumLength))
                        model.selectionConfig
              }
                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
            , NoEffect
            )

        SelectHighlightedOption ->
            let
                maybeHighlightedOptionValue =
                    findHighlightedOption model.options |> Maybe.map Option.getOptionValue

                updatedOptions =
                    selectHighlightedOption model.selectionConfig model.options
            in
            case model.selectionConfig of
                SingleSelectConfig _ _ _ ->
                    ( { model
                        | options = updatedOptions
                        , searchString = SearchString.reset
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , batch
                        [ makeEffectsWhenValuesChanges (selectedOptions updatedOptions) maybeHighlightedOptionValue
                        , makeCommandMessagesForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
                        , BlurInput
                        ]
                    )

                MultiSelectConfig _ _ _ ->
                    ( { model
                        | options = updatedOptions
                        , searchString = SearchString.reset
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , batch
                        [ makeEffectsWhenValuesChanges (selectedOptions updatedOptions) maybeHighlightedOptionValue
                        , makeCommandMessagesForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
                        , FocusInput
                        ]
                    )

        DeleteInputForSingleSelect ->
            case model.selectionConfig of
                SingleSelectConfig _ _ _ ->
                    if hasSelectedOption model.options then
                        -- if there are ANY selected options, clear them all;
                        clearAllSelectedOption model

                    else
                        ( model, NoEffect )

                MultiSelectConfig _ _ _ ->
                    ( model, NoEffect )

        EscapeKeyInInputFilter ->
            ( { model
                | searchString = SearchString.reset
              }
                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
            , BlurInput
            )

        MoveHighlightedOptionUp ->
            let
                updatedOptions =
                    moveHighlightedOptionUp model.selectionConfig model.options (figureOutWhichOptionsToShowInTheDropdown model.selectionConfig model.options)
            in
            ( { model
                | options = updatedOptions
              }
              -- TODO This should probably not be "something"
            , ScrollDownToElement "something"
            )

        MoveHighlightedOptionDown ->
            let
                updatedOptions =
                    moveHighlightedOptionDown model.selectionConfig model.options (figureOutWhichOptionsToShowInTheDropdown model.selectionConfig model.options)
            in
            ( { model
                | options = updatedOptions
              }
              -- TODO This should probably not be "something"
            , ScrollDownToElement "something"
            )

        ValueCasingWidthUpdate dims ->
            ( { model | valueCasing = ValueCasing dims.width dims.height }, NoEffect )

        ClearAllSelectedOptions ->
            clearAllSelectedOption model

        ToggleSelectedValueHighlight optionValue ->
            let
                updatedOptions =
                    toggleSelectedHighlightByOptionValue model.options optionValue
            in
            ( { model
                | options = updatedOptions
              }
                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
            , NoEffect
            )

        DeleteKeydownForMultiSelect ->
            if SearchString.length model.searchString > 0 then
                ( model, NoEffect )

            else
                let
                    updatedOptions =
                        if hasSelectedHighlightedOptions model.options then
                            deselectAllSelectedHighlightedOptions model.options

                        else
                            deselectLastSelectedOption model.options
                in
                ( { model
                    | options = updatedOptions
                  }
                    |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                , batch
                    [ ReportValueChanged (updatedOptions |> selectedOptions |> Ports.optionsEncoder)

                    -- TODO optionDeselected
                    , FocusInput
                    ]
                )

        AddMultiSelectValue indexWhereToAdd ->
            let
                updatedOptions =
                    OptionsUtilities.addNewEmptyOptionAtIndex (indexWhereToAdd + 1) model.options
            in
            ( { model
                | focusedIndex = indexWhereToAdd + 1
                , options = updatedOptions
                , rightSlot = updateRightSlot model.rightSlot model.selectionConfig True (updatedOptions |> selectedOptions)
              }
            , makeEffectsWhenValuesChanges
                (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
                Nothing
            )

        RemoveMultiSelectValue indexWhereToDelete ->
            let
                updatedOptions =
                    OptionsUtilities.removeOptionFromOptionListBySelectedIndex indexWhereToDelete model.options
            in
            ( { model
                | options = updatedOptions
                , rightSlot = updateRightSlot model.rightSlot model.selectionConfig True (updatedOptions |> selectedOptions)
              }
            , makeEffectsWhenValuesChanges
                (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
                Nothing
            )

        RequestAllOptions ->
            ( model
            , ReportAllOptions (Json.Encode.list Option.encode model.options)
            )

        UpdateSearchResultsForOptions updatedSearchResultsJsonValue ->
            case Json.Decode.decodeValue Option.decodeSearchResults updatedSearchResultsJsonValue of
                Ok searchResults ->
                    let
                        updatedOptions =
                            model.options
                                |> OptionsUtilities.updateOptionsWithNewSearchResults searchResults.optionSearchFilters
                                |> OptionsUtilities.setAge OptionDisplay.MatureOption
                    in
                    ( { model
                        | options =
                            if searchResults.isClearingSearch then
                                -- If we are clearing the search results then we do not want to highlight the first
                                --  item in the dropdown.
                                updatedOptions

                            else
                                adjustHighlightedOptionAfterSearch updatedOptions
                                    (figureOutWhichOptionsToShowInTheDropdown model.selectionConfig updatedOptions
                                        |> OptionsUtilities.notSelectedOptions
                                    )
                      }
                    , NoEffect
                    )

                Err error ->
                    ( model, ReportErrorMessage (Json.Decode.errorToString error) )

        CustomValidationResponse customValidationResultJson ->
            case Json.Decode.decodeValue TransformAndValidate.customValidationResultDecoder customValidationResultJson of
                Ok customValidationResult ->
                    case TransformAndValidate.transformAndValidateSecondPass (SelectionMode.getTransformAndValidate model.selectionConfig) customValidationResult of
                        TransformAndValidate.ValidationPass valueString selectedValueIndex ->
                            let
                                updatedOptions =
                                    updateDatalistOptionsWithValue
                                        (OptionValue.stringToOptionValue valueString)
                                        selectedValueIndex
                                        model.options

                                maybeSelectedOptionValue =
                                    Just (OptionValue.stringToOptionValue valueString)
                            in
                            ( { model
                                | options = updatedOptions
                                , rightSlot = updateRightSlot model.rightSlot model.selectionConfig True (updatedOptions |> selectedOptions)
                              }
                            , makeEffectsWhenValuesChanges
                                (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
                                maybeSelectedOptionValue
                            )

                        TransformAndValidate.ValidationFailed valueString selectedValueIndex validationFailureMessages ->
                            let
                                updatedOptions =
                                    updateDatalistOptionsWithValueAndErrors
                                        validationFailureMessages
                                        (OptionValue.stringToOptionValue valueString)
                                        selectedValueIndex
                                        model.options

                                maybeSelectedOptionValue =
                                    Just (OptionValue.stringToOptionValue valueString)
                            in
                            ( { model
                                | options = updatedOptions
                                , rightSlot = updateRightSlot model.rightSlot model.selectionConfig True (updatedOptions |> selectedOptions)
                              }
                            , makeEffectsWhenValuesChanges
                                (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
                                maybeSelectedOptionValue
                            )

                        TransformAndValidate.ValidationPending _ _ ->
                            ( model, ReportErrorMessage "We should not end up with a validation pending state on a second pass." )

                Err error ->
                    ( model, ReportErrorMessage (Json.Decode.errorToString error) )

        UpdateTransformationAndValidation transformationAndValidationJson ->
            case Json.Decode.decodeValue TransformAndValidate.decoder transformationAndValidationJson of
                Ok newTransformationAndValidation ->
                    ( { model
                        | selectionConfig =
                            SelectionMode.setTransformAndValidate
                                newTransformationAndValidation
                                model.selectionConfig
                      }
                    , NoEffect
                    )

                Err error ->
                    ( model, ReportErrorMessage (Json.Decode.errorToString error) )


perform : Effect -> Cmd Msg
perform effect =
    case effect of
        NoEffect ->
            Cmd.none

        Batch effects ->
            effects
                |> List.map perform
                |> Cmd.batch

        FocusInput ->
            focusInput ()

        BlurInput ->
            blurInput ()

        InputHasBeenBlurred ->
            inputBlurred ()

        SearchStringTouched milSeconds ->
            Bounce.delay milSeconds SearchStringSteady

        InputHasBeenFocused ->
            inputFocused ()

        InputHasBeenKeyUp string _ ->
            inputKeyUp string

        UpdateOptionsInWebWorker ->
            updateOptionsInWebWorker ()

        SearchOptionsWithWebWorker value ->
            searchOptionsWithWebWorker value

        ReportValueChanged value ->
            valueChanged value

        ValueCleared ->
            valueCleared ()

        InvalidValue value ->
            invalidValue value

        CustomOptionSelected strings ->
            customOptionSelected strings

        ReportOptionSelected value ->
            optionSelected value

        OptionDeselected value ->
            optionDeselected value

        OptionsUpdated bool ->
            optionsUpdated bool

        SendCustomValidationRequest ( string, int ) ->
            sendCustomValidationRequest ( string, int )

        ReportErrorMessage string ->
            errorMessage string

        ReportReady ->
            muchSelectIsReady ()

        FetchOptionsFromDom ->
            updateOptionsFromDom ()

        ScrollDownToElement string ->
            scrollDropdownToElement string

        ReportAllOptions value ->
            allOptions value

        ReportInitialValueSet value ->
            initialValueSet value


batch : List Effect -> Effect
batch effects =
    Batch effects


deselectOption : Model -> Option -> ( Model, Effect )
deselectOption model option =
    let
        optionValue =
            Option.getOptionValue option

        updatedOptions =
            deselectOptionInListByOptionValue optionValue model.options
    in
    ( { model
        | options = updatedOptions
      }
        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
    , batch
        [ makeEffectsWhenValuesChanges (selectedOptions updatedOptions) Nothing
        , makeCommandMessagesForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
        ]
    )


clearAllSelectedOption : Model -> ( Model, Effect )
clearAllSelectedOption model =
    let
        deselectedOptions : List Option
        deselectedOptions =
            if List.isEmpty <| selectedOptionsToTuple model.options then
                -- no deselected options
                []

            else
                -- an option has been deselected. return the deselected value as a tuple.
                model.options

        deselectEventEffect =
            if List.isEmpty deselectedOptions then
                NoEffect

            else
                OptionDeselected (Ports.optionsEncoder deselectedOptions)

        newOptions =
            deselectAllOptionsInOptionsList model.options

        focusEffect =
            if isFocused model.selectionConfig then
                FocusInput

            else
                NoEffect
    in
    ( { model
        | options = deselectAllOptionsInOptionsList newOptions
        , rightSlot = updateRightSlot model.rightSlot model.selectionConfig False []
        , searchString = SearchString.reset
      }
    , batch
        [ makeEffectsWhenValuesChanges [] Nothing
        , deselectEventEffect
        , focusEffect
        ]
    )


updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges : Model -> Model
updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges model =
    updateModelWithChangesThatEffectTheOptionsWithSearchString
        model.rightSlot
        model.selectionConfig
        model.searchString
        model.options
        model


updateModelWithChangesThatEffectTheOptionsWhenTheMouseMoves : Model -> Model
updateModelWithChangesThatEffectTheOptionsWhenTheMouseMoves model =
    updatePartOfTheModelWithChangesThatEffectTheOptionsWhenTheMouseMoves
        model.rightSlot
        model.selectionConfig
        model.options
        model


updateModelWithChangesThatEffectTheOptionsWithSearchString :
    RightSlot
    -> SelectionConfig
    -> SearchString
    -> List Option
    -> { a | options : List Option, rightSlot : RightSlot }
    -> { a | options : List Option, rightSlot : RightSlot }
updateModelWithChangesThatEffectTheOptionsWithSearchString rightSlot selectionConfig searchString options model =
    { model
        | options = updateOrAddCustomOption searchString selectionConfig options
        , rightSlot =
            updateRightSlot
                rightSlot
                selectionConfig
                (hasSelectedOption options)
                (options |> selectedOptions)
    }


updatePartOfTheModelWithChangesThatEffectTheOptionsWhenTheMouseMoves :
    RightSlot
    -> SelectionConfig
    -> List Option
    -> { a | options : List Option, rightSlot : RightSlot }
    -> { a | options : List Option, rightSlot : RightSlot }
updatePartOfTheModelWithChangesThatEffectTheOptionsWhenTheMouseMoves rightSlot selectionMode options model =
    { model
        | rightSlot =
            updateRightSlot
                rightSlot
                selectionMode
                (hasSelectedOption options)
                (options |> selectedOptions)
    }


updateTheFullListOfOptions : SelectionConfig -> SearchString -> List Option -> List Option
updateTheFullListOfOptions selectionMode searchString options =
    options
        |> OptionSearcher.updateOptionsWithSearchStringAndCustomOption selectionMode searchString


updateTheOptionsForTheDropdown : SelectionConfig -> List Option -> List Option
updateTheOptionsForTheDropdown selectionMode options =
    -- TODO This function can go I think, it just has some tests
    options
        |> sortOptionsBySearchFilterTotalScore
        |> figureOutWhichOptionsToShowInTheDropdown selectionMode


figureOutWhichOptionsToShowInTheDropdown : SelectionConfig -> List Option -> List Option
figureOutWhichOptionsToShowInTheDropdown selectionMode options =
    let
        optionsThatCouldBeShown =
            options
                |> filterOptionsToShowInDropdown selectionMode
                |> OptionsUtilities.sortOptionsByBestScore

        lastIndexOfOptions =
            List.length optionsThatCouldBeShown - 1
    in
    case getMaxDropdownItems selectionMode of
        OutputStyle.FixedMaxDropdownItems maxDropdownItems ->
            let
                maxNumberOfDropdownItems =
                    PositiveInt.toInt maxDropdownItems
            in
            if List.length optionsThatCouldBeShown <= maxNumberOfDropdownItems then
                optionsThatCouldBeShown

            else
                case findHighlightedOrSelectedOptionIndex optionsThatCouldBeShown of
                    Just index ->
                        case index of
                            0 ->
                                List.take maxNumberOfDropdownItems optionsThatCouldBeShown

                            _ ->
                                if index == List.length optionsThatCouldBeShown - 1 then
                                    List.drop (List.length options - maxNumberOfDropdownItems) optionsThatCouldBeShown

                                else
                                    let
                                        isEven =
                                            modBy 2 maxNumberOfDropdownItems
                                                == 0

                                        half =
                                            if isEven then
                                                maxNumberOfDropdownItems // 2

                                            else
                                                (maxNumberOfDropdownItems // 2) + 1
                                    in
                                    if index + half > lastIndexOfOptions then
                                        -- The "window" runs off the "tail" of the list, so just take the last options
                                        List.drop (List.length options - maxNumberOfDropdownItems) optionsThatCouldBeShown

                                    else if index - half < 0 then
                                        -- The "window" runs off the "head" of the list, so just take the first options
                                        List.take maxNumberOfDropdownItems optionsThatCouldBeShown

                                    else
                                        options |> List.drop (index + 1 - half) |> List.take maxNumberOfDropdownItems

                    Nothing ->
                        List.take maxNumberOfDropdownItems options

        OutputStyle.NoLimitToDropdownItems ->
            optionsThatCouldBeShown


view : Model -> Html Msg
view model =
    div
        [ id "wrapper"
        , Html.Attributes.attribute "part" "wrapper"
        , case getOutputStyle model.selectionConfig of
            CustomHtml ->
                -- This stops the dropdown from flashes when the user clicks
                -- on an optgroup. And it kinda makes sense. we don't want
                --  mousedown events escaping and effecting the DOM.
                onMouseDownStopPropagationAndPreventDefault NoOp

            Datalist ->
                Html.Attributes.Extra.empty
        , classList [ ( "disabled", isDisabled model.selectionConfig ) ]
        ]
        [ if isSingleSelect model.selectionConfig then
            singleSelectView
                model.selectionConfig
                model.options
                model.searchString
                model.rightSlot

          else
            multiSelectView
                model.selectionConfig
                model.options
                model.searchString
                model.rightSlot
        , case getOutputStyle model.selectionConfig of
            CustomHtml ->
                dropdown
                    model.selectionConfig
                    model.options
                    model.searchString
                    model.valueCasing

            Datalist ->
                datalist model.options
        ]


singleSelectView : SelectionConfig -> List Option -> SearchString -> RightSlot -> Html Msg
singleSelectView selectionMode options searchString rightSlot =
    case getOutputStyle selectionMode of
        CustomHtml ->
            singleSelectViewCustomHtml
                selectionMode
                options
                searchString
                rightSlot

        Datalist ->
            singleSelectViewDatalistHtml selectionMode options


multiSelectView : SelectionConfig -> List Option -> SearchString -> RightSlot -> Html Msg
multiSelectView selectionMode options searchString rightSlot =
    case getOutputStyle selectionMode of
        CustomHtml ->
            multiSelectViewCustomHtml
                selectionMode
                options
                searchString
                rightSlot

        Datalist ->
            multiSelectViewDataset
                selectionMode
                options
                rightSlot


singleSelectViewCustomHtml : SelectionConfig -> List Option -> SearchString -> RightSlot -> Html Msg
singleSelectViewCustomHtml selectionConfig options searchString rightSlot =
    let
        hasOptionSelected =
            hasSelectedOption options

        valueStr =
            if hasOptionSelected then
                options
                    |> selectedOptionsToTuple
                    |> List.map Tuple.second
                    |> List.head
                    |> Maybe.withDefault ""

            else
                ""

        hasErrors =
            OptionsUtilities.hasAnyValidationErrors options

        hasPendingValidation =
            OptionsUtilities.hasAnyPendingValidation options
    in
    div
        [ id "value-casing"
        , valueCasingPartsAttribute selectionConfig hasErrors hasPendingValidation
        , attributeIf (not (isFocused selectionConfig)) (onMouseDown BringInputInFocus)
        , attributeIf (not (isFocused selectionConfig)) (onFocus BringInputInFocus)
        , tabIndexAttribute (isDisabled selectionConfig)
        , classList
            (valueCasingClassList selectionConfig hasOptionSelected False)
        ]
        [ span
            [ id "selected-value" ]
            [ text valueStr ]
        , singleSelectCustomHtmlInputField
            searchString
            (isDisabled selectionConfig)
            (isFocused selectionConfig)
            (SelectionMode.getPlaceholder selectionConfig)
            hasOptionSelected
        , case rightSlot of
            ShowNothing ->
                text ""

            ShowLoadingIndicator ->
                node "slot" [ name "loading-indicator" ] [ defaultLoadingIndicator ]

            ShowDropdownIndicator transitioning ->
                dropdownIndicator (SelectionMode.getInteractionState selectionConfig) transitioning

            ShowClearButton ->
                node "slot" [ name "clear-button" ] []

            ShowAddButton ->
                text ""

            ShowAddAndRemoveButtons ->
                text ""
        ]


multiSelectViewCustomHtml : SelectionConfig -> List Option -> SearchString -> RightSlot -> Html Msg
multiSelectViewCustomHtml selectionConfig options searchString rightSlot =
    let
        hasOptionSelected =
            hasSelectedOption options

        showPlaceholder =
            not hasOptionSelected && not (isFocused selectionConfig)

        placeholderAttribute =
            if showPlaceholder then
                placeholder (SelectionMode.getPlaceholderString selectionConfig)

            else
                Html.Attributes.classList []

        hasErrors =
            OptionsUtilities.hasAnyValidationErrors options

        hasPendingValidation =
            OptionsUtilities.hasAnyPendingValidation options

        inputFilter =
            input
                [ type_ "text"
                , onBlur InputBlur
                , onFocus InputFocus
                , onInput UpdateSearchString
                , onMouseDownStopPropagation NoOp
                , onMouseUpStopPropagation NoOp
                , value (SearchString.toString searchString)
                , placeholderAttribute
                , id "input-filter"
                , Html.Attributes.attribute "part" "input-filter"
                , disabled (isDisabled selectionConfig)
                , Keyboard.on Keyboard.Keydown
                    [ ( Enter, SelectHighlightedOption )
                    , ( Escape, EscapeKeyInInputFilter )
                    , ( ArrowUp, MoveHighlightedOptionUp )
                    , ( ArrowDown, MoveHighlightedOptionDown )
                    ]
                ]
                []
    in
    div
        [ id "value-casing"
        , valueCasingPartsAttribute selectionConfig hasErrors hasPendingValidation
        , onMouseDown BringInputInFocus
        , onFocus BringInputInFocus
        , Keyboard.on Keyboard.Keydown
            [ ( Delete, DeleteKeydownForMultiSelect )
            , ( Backspace, DeleteKeydownForMultiSelect )
            ]
        , tabIndexAttribute (isDisabled selectionConfig)
        , classList
            (valueCasingClassList selectionConfig hasOptionSelected False)
        ]
        (optionsToValuesHtml options (getSingleItemRemoval selectionConfig)
            ++ [ inputFilter
               , rightSlotHtml
                    rightSlot
                    (SelectionMode.getInteractionState selectionConfig)
                    0
               ]
        )


multiSelectViewDataset : SelectionConfig -> List Option -> RightSlot -> Html Msg
multiSelectViewDataset selectionConfig options rightSlot =
    let
        hasOptionSelected =
            hasSelectedOption options

        selectedOptions =
            options |> OptionsUtilities.selectedOptions

        hasAnError =
            not (OptionsUtilities.allOptionsAreValid selectedOptions)

        hasPendingValidation =
            OptionsUtilities.hasAnyPendingValidation selectedOptions

        makeInputs : List Option -> List (Html Msg)
        makeInputs selectedOptions_ =
            case List.length selectedOptions_ of
                0 ->
                    multiSelectDatasetInputField
                        Nothing
                        selectionConfig
                        rightSlot
                        0

                _ ->
                    List.concatMap
                        (\selectedOption ->
                            multiSelectDatasetInputField
                                (Just selectedOption)
                                selectionConfig
                                rightSlot
                                (Option.getOptionSelectedIndex selectedOption)
                        )
                        selectedOptions_
    in
    div
        [ id "value-casing"
        , valueCasingPartsAttribute selectionConfig hasAnError hasPendingValidation
        , classList
            (valueCasingClassList selectionConfig
                hasOptionSelected
                hasAnError
            )
        ]
        (makeInputs selectedOptions)


valueCasingClassList : SelectionConfig -> Bool -> Bool -> List ( String, Bool )
valueCasingClassList selectionConfig hasOptionSelected hasAnError =
    let
        isFocused_ =
            isFocused selectionConfig

        selectionModeClass =
            case SelectionMode.getSelectionMode selectionConfig of
                SelectionMode.SingleSelect ->
                    ( "single", True )

                SelectionMode.MultiSelect ->
                    ( "multi", True )

        outputStyleClass =
            case SelectionMode.getOutputStyle selectionConfig of
                SelectionMode.CustomHtml ->
                    ( "output-style-custom-html", True )

                Datalist ->
                    ( "output-style-datalist", True )

        showPlaceholder =
            case SelectionMode.getOutputStyle selectionConfig of
                CustomHtml ->
                    not hasOptionSelected && not isFocused_

                Datalist ->
                    False
    in
    [ ( "has-option-selected", hasOptionSelected )
    , ( "no-option-selected", not hasOptionSelected )
    , selectionModeClass
    , outputStyleClass
    , ( "disabled", isDisabled selectionConfig )
    , ( "focused", isFocused_ )
    , ( "not-focused", not isFocused_ )
    , ( "show-placeholder", showPlaceholder )
    , ( "error", hasAnError )
    ]


tabIndexAttribute disabled =
    if disabled then
        style "" ""

    else
        tabindex 0


singleSelectCustomHtmlInputField : SearchString -> Bool -> Bool -> ( Bool, String ) -> Bool -> Html Msg
singleSelectCustomHtmlInputField searchString isDisabled focused placeholderTuple hasSelectedOption =
    let
        keyboardEvents =
            Keyboard.customPerKey Keyboard.Keydown
                [ ( Enter
                  , { message = SelectHighlightedOption
                    , preventDefault = False
                    , stopPropagation = False
                    }
                  )
                , ( Backspace
                  , { message = DeleteInputForSingleSelect
                    , preventDefault = False
                    , stopPropagation = False
                    }
                  )
                , ( Delete
                  , { message = DeleteInputForSingleSelect
                    , preventDefault = False
                    , stopPropagation = False
                    }
                  )
                , ( Escape
                  , { message = EscapeKeyInInputFilter
                    , preventDefault = False
                    , stopPropagation = False
                    }
                  )

                -- We need to prevent default on these because when we use the arrow keys we want to move
                --  the highlighted option up and down but we do not want to move the cursor in the text box
                --  to the end and the beginning of the input.
                , ( ArrowUp
                  , { message = MoveHighlightedOptionUp
                    , preventDefault = True
                    , stopPropagation = False
                    }
                  )
                , ( ArrowDown
                  , { message = MoveHighlightedOptionDown
                    , preventDefault = True
                    , stopPropagation = False
                    }
                  )
                ]

        idAttr =
            id "input-filter"

        partAttr =
            Html.Attributes.attribute "part" "input-filter"

        typeAttr =
            type_ "text"

        onBlurAttr =
            onBlur InputBlur

        onFocusAttr =
            onFocus InputFocus

        showPlaceholder =
            not hasSelectedOption && not focused && Tuple.first placeholderTuple

        placeholderAttribute =
            if showPlaceholder then
                placeholder (Tuple.second placeholderTuple)

            else
                style "" ""
    in
    if isDisabled then
        input
            [ disabled True
            , idAttr
            , partAttr
            , placeholderAttribute
            ]
            []

    else if hasSelectedOption then
        input
            [ typeAttr
            , idAttr
            , partAttr
            , onBlurAttr
            , onFocusAttr
            , value ""
            , maxlength 0
            , placeholderAttribute
            , keyboardEvents
            ]
            []

    else
        input
            [ typeAttr
            , idAttr
            , partAttr
            , onBlurAttr
            , onFocusAttr
            , onMouseDownStopPropagation NoOp
            , onMouseUpStopPropagation NoOp
            , onInput UpdateSearchString
            , value (SearchString.toString searchString)
            , placeholderAttribute
            , keyboardEvents
            ]
            []


singleSelectViewDatalistHtml : SelectionConfig -> List Option -> Html Msg
singleSelectViewDatalistHtml selectionConfig options =
    let
        maybeSelectedOption =
            OptionsUtilities.findSelectedOption options

        hasOptionSelected =
            hasSelectedOption options

        hasAnError =
            maybeSelectedOption
                |> Maybe.map Option.getOptionValidationErrors
                |> Maybe.map List.isEmpty
                |> Maybe.map not
                |> Maybe.withDefault False

        hasPendingValidation =
            OptionsUtilities.hasAnyPendingValidation options
    in
    div
        [ id "value-casing"
        , valueCasingPartsAttribute selectionConfig hasAnError hasPendingValidation
        , tabIndexAttribute (isDisabled selectionConfig)
        , classList
            (valueCasingClassList selectionConfig hasOptionSelected hasAnError)
        ]
        [ singleSelectDatasetInputField
            maybeSelectedOption
            selectionConfig
            hasOptionSelected
        ]


multiSelectDatasetInputField : Maybe Option -> SelectionConfig -> RightSlot -> Int -> List (Html Msg)
multiSelectDatasetInputField maybeOption selectionConfig rightSlot index =
    let
        idAttr =
            id ("input-value-" ++ String.fromInt index)

        ariaLabel =
            Html.Attributes.attribute "aria-label" "much-select-value"

        errorIdAttr =
            id ("error-input-value-" ++ String.fromInt index)

        isOptionInvalid =
            Maybe.map Option.isInvalid maybeOption
                |> Maybe.withDefault False

        classes =
            [ ( "input-value", True )
            , ( "invalid", isOptionInvalid )
            ]

        typeAttr =
            type_ "text"

        placeholderAttribute =
            if SelectionMode.hasPlaceholder selectionConfig then
                placeholder (SelectionMode.getPlaceholderString selectionConfig)

            else
                Html.Attributes.Extra.empty

        valueString =
            case maybeOption of
                Just option ->
                    Option.getOptionValueAsString option

                Nothing ->
                    ""

        inputHtml =
            if isDisabled selectionConfig then
                input
                    [ disabled True
                    , idAttr
                    , ariaLabel
                    , Html.Attributes.attribute "part" "input-value"
                    , placeholderAttribute
                    , classList classes
                    ]
                    []

            else
                input
                    [ typeAttr
                    , idAttr
                    , ariaLabel
                    , Html.Attributes.attribute "part" "input-value"
                    , classList classes
                    , onInput (UpdateOptionValueValue index)
                    , onBlur InputBlur
                    , value valueString
                    , placeholderAttribute
                    , Html.Attributes.list "datalist-options"
                    ]
                    []

        makeValidationErrorMessage : TransformAndValidate.ValidationFailureMessage -> Html msg
        makeValidationErrorMessage validationFailure =
            case validationFailure of
                TransformAndValidate.ValidationFailureMessage validationReportLevel validationErrorMessage ->
                    case validationReportLevel of
                        TransformAndValidate.SilentError ->
                            text ""

                        TransformAndValidate.ShowError ->
                            case validationErrorMessage of
                                TransformAndValidate.ValidationErrorMessage string ->
                                    li [] [ text string ]

        errorMessage =
            if isOptionInvalid then
                div [ errorIdAttr, class "error-message" ]
                    [ ul []
                        (Maybe.map Option.getOptionValidationErrors maybeOption
                            |> Maybe.withDefault []
                            |> List.map makeValidationErrorMessage
                        )
                    ]

            else
                text ""
    in
    [ div [ class "input-wrapper", Html.Attributes.attribute "part" "input-wrapper" ]
        [ inputHtml
        , rightSlotHtml rightSlot (SelectionMode.getInteractionState selectionConfig) index
        ]
    , errorMessage
    ]


singleSelectDatasetInputField : Maybe Option -> SelectionConfig -> Bool -> Html Msg
singleSelectDatasetInputField maybeOption selectionMode hasSelectedOption =
    let
        idAttr =
            id "input-value"

        ariaLabel =
            Html.Attributes.attribute "aria-label" "much-select-value"

        partAttr =
            Html.Attributes.attribute "part" "input-value"

        typeAttr =
            type_ "text"

        onBlurAttr =
            onBlur InputBlur

        onFocusAttr =
            onFocus InputFocus

        showPlaceholder =
            not hasSelectedOption && not (isFocused selectionMode)

        placeholderAttribute =
            if showPlaceholder then
                placeholder (SelectionMode.getPlaceholderString selectionMode)

            else
                Html.Attributes.Extra.empty

        valueString =
            case maybeOption of
                Just option ->
                    Option.getOptionValueAsString option

                Nothing ->
                    ""
    in
    if isDisabled selectionMode then
        input
            [ disabled True
            , idAttr
            , ariaLabel
            , partAttr
            , placeholderAttribute
            ]
            []

    else
        input
            [ typeAttr
            , idAttr
            , ariaLabel
            , partAttr
            , onBlurAttr
            , onFocusAttr
            , onInput (UpdateOptionValueValue 0)
            , value valueString
            , placeholderAttribute
            , Html.Attributes.list "datalist-options"
            ]
            []


dropdownIndicator : SelectionMode.InteractionState -> FocusTransition -> Html Msg
dropdownIndicator interactionState transitioning =
    case interactionState of
        SelectionMode.Disabled ->
            text ""

        _ ->
            let
                action =
                    case transitioning of
                        InFocusTransition ->
                            NoOp

                        NotInFocusTransition ->
                            if interactionState == SelectionMode.Focused then
                                BringInputOutOfFocus

                            else
                                BringInputInFocus

                classes =
                    case interactionState of
                        SelectionMode.Focused ->
                            [ ( "down", True ) ]

                        SelectionMode.Unfocused ->
                            [ ( "up", True ) ]

                        SelectionMode.Disabled ->
                            []

                partAttr =
                    case interactionState of
                        SelectionMode.Focused ->
                            Html.Attributes.attribute "part" "dropdown-indicator down"

                        SelectionMode.Unfocused ->
                            Html.Attributes.attribute "part" "dropdown-indicator up"

                        SelectionMode.Disabled ->
                            Html.Attributes.attribute "part" "dropdown-indicator"
            in
            div
                [ id "dropdown-indicator"
                , partAttr
                , classList classes
                , onMouseDownStopPropagationAndPreventDefault action
                , onMouseUpStopPropagationAndPreventDefault NoOp
                ]
                [ text "❯" ]


type alias DropdownItemEventListeners msg =
    { mouseOverMsgConstructor : OptionValue -> msg
    , mouseOutMsgConstructor : OptionValue -> msg
    , mouseDownMsgConstructor : OptionValue -> msg
    , mouseUpMsgConstructor : OptionValue -> msg
    , noOpMsgConstructor : msg
    }


dropdown : SelectionConfig -> List Option -> SearchString -> ValueCasing -> Html Msg
dropdown selectionMode options searchString (ValueCasing valueCasingWidth valueCasingHeight) =
    let
        optionsForTheDropdown =
            figureOutWhichOptionsToShowInTheDropdown selectionMode options

        optionsHtml =
            -- TODO We should probably do something different if we are in a loading state
            if List.isEmpty optionsForTheDropdown then
                [ div [ class "option disabled" ] [ node "slot" [ name "no-options" ] [ text "No available options" ] ] ]

            else if doesSearchStringFindNothing searchString (getSearchStringMinimumLength selectionMode) optionsForTheDropdown then
                [ div [ class "option disabled" ] [ node "slot" [ name "no-filtered-options" ] [ text "This filter returned no results." ] ] ]

            else
                optionsToDropdownOptions
                    { mouseOverMsgConstructor = DropdownMouseOverOption
                    , mouseOutMsgConstructor = DropdownMouseOutOption
                    , mouseDownMsgConstructor = DropdownMouseDownOption
                    , mouseUpMsgConstructor = DropdownMouseUpOption
                    , noOpMsgConstructor = NoOp
                    }
                    selectionMode
                    optionsForTheDropdown

        dropdownFooterHtml =
            if showDropdownFooter selectionMode && List.length optionsForTheDropdown < List.length options then
                div
                    [ id "dropdown-footer"
                    , Html.Attributes.attribute "part" "dropdown-footer"
                    ]
                    [ text
                        ("showing "
                            ++ (optionsForTheDropdown |> List.length |> String.fromInt)
                            ++ " of "
                            ++ (options |> List.length |> String.fromInt)
                            ++ " options"
                        )
                    ]

            else
                text ""
    in
    if isDisabled selectionMode then
        text ""

    else
        div
            [ id "dropdown"
            , Html.Attributes.attribute "part" "dropdown"
            , classList
                [ ( "showing", showDropdown selectionMode )
                , ( "hiding", not (showDropdown selectionMode) )
                ]
            , style "top"
                (String.fromFloat valueCasingHeight ++ "px")
            , style
                "width"
                (String.fromFloat valueCasingWidth ++ "px")
            ]
            (optionsHtml ++ [ dropdownFooterHtml ])


optionsToDropdownOptions :
    DropdownItemEventListeners Msg
    -> SelectionConfig
    -> List Option
    -> List (Html Msg)
optionsToDropdownOptions eventHandlers selectionMode options =
    List.concatMap (optionGroupToHtml eventHandlers selectionMode) (groupOptionsInOrder options)


optionGroupToHtml : DropdownItemEventListeners Msg -> SelectionConfig -> ( OptionGroup, List Option ) -> List (Html Msg)
optionGroupToHtml dropdownItemEventListeners selectionMode ( optionGroup, options ) =
    let
        optionGroupHtml =
            case List.head options |> Maybe.andThen Option.getMaybeOptionSearchFilter of
                Just optionSearchFilter ->
                    case Option.optionGroupToString optionGroup of
                        "" ->
                            text ""

                        _ ->
                            div
                                [ class "optgroup"
                                , Html.Attributes.attribute "part" "dropdown-optgroup"
                                ]
                                [ span [ class "optgroup-header" ]
                                    (tokensToHtml optionSearchFilter.groupTokens)
                                ]

                Nothing ->
                    case Option.optionGroupToString optionGroup of
                        "" ->
                            text ""

                        optionGroupAsString ->
                            div
                                [ class "optgroup"
                                , Html.Attributes.attribute "part" "dropdown-optgroup"
                                ]
                                [ span [ class "optgroup-header" ]
                                    [ text
                                        optionGroupAsString
                                    ]
                                ]
    in
    optionGroupHtml :: List.map (optionToDropdownOption dropdownItemEventListeners selectionMode) options


optionToDropdownOption :
    DropdownItemEventListeners Msg
    -> SelectionConfig
    -> Option
    -> Html Msg
optionToDropdownOption eventHandlers selectionConfig_ option_ =
    Html.Lazy.lazy2
        (\selectionConfig option ->
            let
                descriptionHtml : Html Msg
                descriptionHtml =
                    if option |> Option.getOptionDescription |> Option.optionDescriptionToBool then
                        case Option.getMaybeOptionSearchFilter option of
                            Just optionSearchFilter ->
                                div
                                    [ class "description"
                                    , Html.Attributes.attribute "part" "dropdown-option-description"
                                    ]
                                    [ span [] (tokensToHtml optionSearchFilter.descriptionTokens)
                                    ]

                            Nothing ->
                                div
                                    [ class "description"
                                    , Html.Attributes.attribute "part" "dropdown-option-description"
                                    ]
                                    [ span []
                                        [ option
                                            |> Option.getOptionDescription
                                            |> Option.optionDescriptionToString
                                            |> text
                                        ]
                                    ]

                    else
                        text ""

                labelHtml : Html Msg
                labelHtml =
                    case Option.getMaybeOptionSearchFilter option of
                        Just optionSearchFilter ->
                            span [] (tokensToHtml optionSearchFilter.labelTokens)

                        Nothing ->
                            span [] [ Option.getOptionLabel option |> optionLabelToString |> text ]

                valueDataAttribute =
                    Html.Attributes.attribute "data-value" (Option.getOptionValueAsString option)
            in
            case Option.getOptionDisplay option of
                OptionShown _ ->
                    div
                        [ onMouseEnter (option |> Option.getOptionValue |> eventHandlers.mouseOverMsgConstructor)
                        , onMouseLeave (option |> Option.getOptionValue |> eventHandlers.mouseOutMsgConstructor)
                        , mousedownPreventDefault (option |> Option.getOptionValue |> eventHandlers.mouseDownMsgConstructor)
                        , mouseupPreventDefault (option |> Option.getOptionValue |> eventHandlers.mouseUpMsgConstructor)
                        , onClickPreventDefault eventHandlers.noOpMsgConstructor
                        , Html.Attributes.attribute "part" "dropdown-option"
                        , class "option"
                        , valueDataAttribute
                        ]
                        [ labelHtml, descriptionHtml ]

                OptionHidden ->
                    text ""

                OptionSelected _ _ ->
                    case SelectionMode.getSelectionMode selectionConfig of
                        SelectionMode.SingleSelect ->
                            div
                                [ onMouseEnter (option |> Option.getOptionValue |> eventHandlers.mouseOverMsgConstructor)
                                , onMouseLeave (option |> Option.getOptionValue |> eventHandlers.mouseOutMsgConstructor)
                                , mousedownPreventDefault (option |> Option.getOptionValue |> eventHandlers.mouseDownMsgConstructor)
                                , mouseupPreventDefault (option |> Option.getOptionValue |> eventHandlers.mouseUpMsgConstructor)
                                , Html.Attributes.attribute "part" "dropdown-option selected"
                                , class "selected"
                                , class "option"
                                , valueDataAttribute
                                ]
                                [ labelHtml, descriptionHtml ]

                        SelectionMode.MultiSelect ->
                            text ""

                OptionSelectedPendingValidation _ ->
                    div
                        [ Html.Attributes.attribute "part" "dropdown-option disabled"
                        , class "disabled"
                        , class "option"
                        , valueDataAttribute
                        ]
                        [ labelHtml, descriptionHtml ]

                OptionSelectedAndInvalid _ _ ->
                    text ""

                OptionSelectedHighlighted _ ->
                    case selectionConfig of
                        SingleSelectConfig _ _ _ ->
                            div
                                [ onMouseEnter (option |> Option.getOptionValue |> eventHandlers.mouseOverMsgConstructor)
                                , onMouseLeave (option |> Option.getOptionValue |> eventHandlers.mouseOutMsgConstructor)
                                , mousedownPreventDefault (option |> Option.getOptionValue |> eventHandlers.mouseDownMsgConstructor)
                                , mouseupPreventDefault (option |> Option.getOptionValue |> eventHandlers.mouseUpMsgConstructor)
                                , Html.Attributes.attribute "part" "dropdown-option selected highlighted"
                                , class "selected"
                                , class "highlighted"
                                , class "option"
                                , valueDataAttribute
                                ]
                                [ labelHtml, descriptionHtml ]

                        MultiSelectConfig _ _ _ ->
                            text ""

                OptionHighlighted ->
                    div
                        [ onMouseEnter (option |> Option.getOptionValue |> eventHandlers.mouseOverMsgConstructor)
                        , onMouseLeave (option |> Option.getOptionValue |> eventHandlers.mouseOutMsgConstructor)
                        , mousedownPreventDefault (option |> Option.getOptionValue |> eventHandlers.mouseDownMsgConstructor)
                        , mouseupPreventDefault (option |> Option.getOptionValue |> eventHandlers.mouseUpMsgConstructor)
                        , Html.Attributes.attribute "part" "dropdown-option highlighted"
                        , class "highlighted"
                        , class "option"
                        , valueDataAttribute
                        ]
                        [ labelHtml, descriptionHtml ]

                OptionDisabled _ ->
                    div
                        [ Html.Attributes.attribute "part" "dropdown-option disabled"
                        , class "disabled"
                        , class "option"
                        , valueDataAttribute
                        ]
                        [ labelHtml, descriptionHtml ]

                OptionActivated ->
                    div
                        [ onMouseEnter (option |> Option.getOptionValue |> eventHandlers.mouseOverMsgConstructor)
                        , onMouseLeave (option |> Option.getOptionValue |> eventHandlers.mouseOutMsgConstructor)
                        , mousedownPreventDefault (option |> Option.getOptionValue |> eventHandlers.mouseDownMsgConstructor)
                        , mouseupPreventDefault (option |> Option.getOptionValue |> eventHandlers.mouseUpMsgConstructor)
                        , onClickPreventDefault eventHandlers.noOpMsgConstructor
                        , Html.Attributes.attribute "part" "dropdown-option"
                        , class "option"
                        , class "active"
                        , class "highlighted"
                        , valueDataAttribute
                        ]
                        [ labelHtml, descriptionHtml ]
        )
        selectionConfig_
        option_


optionsToValuesHtml : List Option -> SingleItemRemoval -> List (Html Msg)
optionsToValuesHtml options enableSingleItemRemoval =
    options
        |> selectedOptions
        |> List.sortBy Option.getOptionSelectedIndex
        |> List.map (Html.Lazy.lazy2 optionToValueHtml enableSingleItemRemoval)


optionToValueHtml : SingleItemRemoval -> Option -> Html Msg
optionToValueHtml enableSingleItemRemoval option =
    let
        removalHtml =
            case enableSingleItemRemoval of
                EnableSingleItemRemoval ->
                    span [ mousedownPreventDefault <| DeselectOptionInternal option, class "remove-option" ] [ text "" ]

                DisableSingleItemRemoval ->
                    text ""

        partAttr =
            Html.Attributes.attribute "part" "value"

        highlightPartAttr =
            Html.Attributes.attribute "part" "value highlighted-value"
    in
    case option of
        Option display optionLabel optionValue _ _ _ ->
            case display of
                OptionShown _ ->
                    text ""

                OptionHidden ->
                    text ""

                OptionSelected _ _ ->
                    div
                        [ class "value"
                        , partAttr
                        ]
                        [ valueLabelHtml (OptionLabel.getLabelString optionLabel) optionValue, removalHtml ]

                OptionSelectedPendingValidation _ ->
                    text ""

                OptionSelectedAndInvalid _ _ ->
                    text ""

                OptionSelectedHighlighted _ ->
                    div
                        [ classList
                            [ ( "value", True )
                            , ( "highlighted-value", True )
                            ]
                        , highlightPartAttr
                        ]
                        [ valueLabelHtml (OptionLabel.getLabelString optionLabel) optionValue, removalHtml ]

                OptionHighlighted ->
                    text ""

                OptionDisabled _ ->
                    text ""

                OptionActivated ->
                    text ""

        CustomOption display optionLabel optionValue _ ->
            case display of
                OptionShown _ ->
                    text ""

                OptionHidden ->
                    text ""

                OptionSelected _ _ ->
                    div
                        [ class "value"
                        , partAttr
                        , mousedownPreventDefault
                            (ToggleSelectedValueHighlight optionValue)
                        ]
                        [ valueLabelHtml (OptionLabel.getLabelString optionLabel) optionValue, removalHtml ]

                OptionSelectedPendingValidation _ ->
                    text ""

                OptionSelectedAndInvalid _ _ ->
                    text ""

                OptionSelectedHighlighted _ ->
                    div
                        [ classList
                            [ ( "value", True )
                            , ( "highlighted-value", True )
                            ]
                        , highlightPartAttr
                        ]
                        [ valueLabelHtml (OptionLabel.getLabelString optionLabel) optionValue, removalHtml ]

                OptionHighlighted ->
                    text ""

                OptionDisabled _ ->
                    text ""

                OptionActivated ->
                    text ""

        EmptyOption display optionLabel ->
            case display of
                OptionShown _ ->
                    text ""

                OptionHidden ->
                    text ""

                OptionSelected _ _ ->
                    div [ class "value", partAttr ] [ text (OptionLabel.getLabelString optionLabel) ]

                OptionSelectedPendingValidation _ ->
                    text ""

                OptionSelectedAndInvalid _ _ ->
                    text ""

                OptionSelectedHighlighted _ ->
                    text ""

                OptionHighlighted ->
                    text ""

                OptionDisabled _ ->
                    text ""

                OptionActivated ->
                    text ""

        DatalistOption _ _ ->
            text ""


valueLabelHtml : String -> OptionValue -> Html Msg
valueLabelHtml labelText optionValue =
    span
        [ class "value-label"
        , mousedownPreventDefault
            (ToggleSelectedValueHighlight optionValue)
        ]
        [ text labelText ]


datalist : List Option -> Html Msg
datalist options =
    Html.datalist
        [ Html.Attributes.id "datalist-options" ]
        (List.concatMap
            dataListOptionGroupToHtml
            (groupOptionsInOrder (options |> OptionsUtilities.unselectedOptions))
        )


dataListOptionGroupToHtml : ( OptionGroup, List Option ) -> List (Html Msg)
dataListOptionGroupToHtml ( optionGroup, options ) =
    case Option.optionGroupToString optionGroup of
        "" ->
            List.map optionToDatalistOption options

        optionGroupAsString ->
            [ optgroup
                [ Html.Attributes.attribute "label" optionGroupAsString ]
                (List.map optionToDatalistOption options)
            ]


optionToDatalistOption : Option -> Html msg
optionToDatalistOption option =
    Html.option [ Html.Attributes.value (Option.getOptionValueAsString option) ] []


rightSlotHtml : RightSlot -> SelectionMode.InteractionState -> Int -> Html Msg
rightSlotHtml rightSlot interactionState selectedIndex =
    case rightSlot of
        ShowNothing ->
            text ""

        ShowLoadingIndicator ->
            node "slot"
                [ name "loading-indicator" ]
                [ defaultLoadingIndicator ]

        ShowDropdownIndicator transitioning ->
            dropdownIndicator interactionState transitioning

        ShowClearButton ->
            div
                [ id "clear-button-wrapper"
                , Html.Attributes.attribute "part" "clear-button-wrapper"
                , onClickPreventDefaultAndStopPropagation ClearAllSelectedOptions
                ]
                [ node "slot"
                    [ name "clear-button"
                    ]
                    [ text "✕"
                    ]
                ]

        ShowAddButton ->
            div [ class "add-remove-buttons" ]
                [ div [ class "add-button-wrapper", onClick (AddMultiSelectValue selectedIndex) ]
                    [ addButtonSlot selectedIndex ]
                ]

        ShowAddAndRemoveButtons ->
            div [ class "add-remove-buttons" ]
                [ div [ class "add-button-wrapper", onClick (AddMultiSelectValue selectedIndex) ]
                    [ addButtonSlot selectedIndex ]
                , div [ class "remove-button-wrapper", onClick (RemoveMultiSelectValue selectedIndex) ]
                    [ remoteButtonSlot selectedIndex ]
                ]


defaultLoadingIndicator : Html msg
defaultLoadingIndicator =
    div [ class "default-loading-indicator" ] []


addButtonSlot : Int -> Html msg
addButtonSlot index =
    node "slot"
        [ name ("add-value-button-" ++ String.fromInt index)
        ]
        [ defaultAddButton
        ]


remoteButtonSlot : Int -> Html msg
remoteButtonSlot index =
    node "slot"
        [ name ("remove-value-button-" ++ String.fromInt index)
        ]
        [ defaultRemoveButton
        ]


defaultAddButton : Html msg
defaultAddButton =
    button [] [ text "+" ]


defaultRemoveButton : Html msg
defaultRemoveButton =
    button [] [ text "✘" ]


valueCasingPartsAttribute : SelectionMode.SelectionConfig -> Bool -> Bool -> Html.Attribute Msg
valueCasingPartsAttribute selectionConfig hasError hasPendingValidation =
    let
        outputStyleStr =
            case SelectionMode.getOutputStyle selectionConfig of
                CustomHtml ->
                    "output-style-custom-html"

                Datalist ->
                    "output-style-datalist"

        selectionModeStr =
            case SelectionMode.getSelectionMode selectionConfig of
                SelectionMode.SingleSelect ->
                    "single"

                SelectionMode.MultiSelect ->
                    "multi"

        interactionStateStr =
            case SelectionMode.getInteractionState selectionConfig of
                SelectionMode.Focused ->
                    "focused"

                SelectionMode.Unfocused ->
                    "unfocused"

                SelectionMode.Disabled ->
                    "disabled"

        hasErrorStr =
            if hasError then
                "error"

            else
                ""

        hasPendingValidationStr =
            if hasPendingValidation then
                "pending-validation"

            else
                ""
    in
    Html.Attributes.attribute "part"
        (String.join " "
            [ "value-casing"
            , outputStyleStr
            , selectionModeStr
            , interactionStateStr
            , hasErrorStr
            , hasPendingValidationStr
            ]
        )


makeEffectsWhenValuesChanges : List Option -> Maybe OptionValue -> Effect
makeEffectsWhenValuesChanges selectedOptions maybeSelectedValue =
    let
        valueChangeCmd =
            if OptionsUtilities.allOptionsAreValid selectedOptions then
                ReportValueChanged (Ports.optionsEncoder selectedOptions)

            else if OptionsUtilities.hasAnyPendingValidation selectedOptions then
                NoEffect

            else
                InvalidValue (Ports.optionsEncoder selectedOptions)

        selectedCustomOptions =
            customSelectedOptions selectedOptions

        clearCmd =
            if List.isEmpty selectedOptions then
                ValueCleared

            else
                NoEffect

        customOptionCmd =
            if List.isEmpty selectedCustomOptions then
                NoEffect

            else if OptionsUtilities.allOptionsAreValid selectedCustomOptions then
                CustomOptionSelected (optionsValues selectedCustomOptions)

            else
                NoEffect

        -- Any time we select a new value we need to emit an `optionSelected` event.
        optionSelectedCmd =
            case maybeSelectedValue of
                Just selectedValue ->
                    case findOptionByOptionValue selectedValue selectedOptions of
                        Just option ->
                            if Option.isValid option then
                                ReportOptionSelected (Ports.optionEncoder option)

                            else
                                NoEffect

                        Nothing ->
                            NoEffect

                Nothing ->
                    NoEffect

        customValidationCmd =
            if OptionsUtilities.hasAnyPendingValidation selectedOptions then
                selectedOptions
                    |> List.filter Option.isPendingValidation
                    |> List.map (\option -> SendCustomValidationRequest ( Option.getOptionValueAsString option, Option.getOptionSelectedIndex option ))
                    |> batch

            else
                NoEffect
    in
    batch
        [ valueChangeCmd
        , customOptionCmd
        , clearCmd
        , optionSelectedCmd
        , customValidationCmd
        ]


makeCommandMessagesForUpdatingOptionsInTheWebWorker : Float -> SearchString -> Effect
makeCommandMessagesForUpdatingOptionsInTheWebWorker searchStringDebounceLength searchString =
    let
        searchStringUpdateCmd =
            if SearchString.isEmpty searchString then
                NoEffect

            else
                SearchStringTouched searchStringDebounceLength
    in
    batch [ UpdateOptionsInWebWorker, searchStringUpdateCmd ]


makeCommandMessageForInitialValue : List Option -> Effect
makeCommandMessageForInitialValue selectedOptions =
    case selectedOptions of
        [] ->
            NoEffect

        selectionOptions_ ->
            ReportInitialValueSet (Ports.optionsEncoder selectionOptions_)


type alias Flags =
    { value : Json.Decode.Value
    , placeholder : ( Bool, String )
    , customOptionHint : Maybe String
    , allowMultiSelect : Bool
    , outputStyle : String
    , enableMultiSelectSingleItemRemoval : Bool
    , optionsJson : String
    , optionSort : String
    , loading : Bool
    , maxDropdownItems : Int
    , disabled : Bool
    , allowCustomOptions : Bool
    , selectedItemStaysInPlace : Bool
    , searchStringMinimumLength : Int
    , showDropdownFooter : Bool
    , transformationAndValidationJson : String
    }


init : Flags -> ( Model, Effect )
init flags =
    let
        ( valueTransformationAndValidation, valueTransformationAndValidationErrorEffect ) =
            case TransformAndValidate.decode flags.transformationAndValidationJson of
                Ok value ->
                    ( value, NoEffect )

                Err error ->
                    ( TransformAndValidate.empty, ReportErrorMessage (Json.Decode.errorToString error) )

        selectionConfig =
            makeSelectionConfig flags.disabled
                flags.allowMultiSelect
                flags.allowCustomOptions
                flags.outputStyle
                flags.placeholder
                flags.customOptionHint
                flags.enableMultiSelectSingleItemRemoval
                flags.maxDropdownItems
                flags.selectedItemStaysInPlace
                flags.searchStringMinimumLength
                flags.showDropdownFooter
                valueTransformationAndValidation
                |> Result.withDefault defaultSelectionConfig

        optionSort =
            stringToOptionSort flags.optionSort
                |> Result.withDefault NoSorting

        ( initialValues, initialValueErrEffect ) =
            case Json.Decode.decodeValue (Json.Decode.oneOf [ valuesDecoder, valueDecoder ]) flags.value of
                Ok values ->
                    ( values, NoEffect )

                Err error ->
                    ( [], ReportErrorMessage (Json.Decode.errorToString error) )

        ( optionsWithInitialValueSelected, errorEffect ) =
            case Json.Decode.decodeString (Option.optionsDecoder OptionDisplay.MatureOption (SelectionMode.getOutputStyle selectionConfig)) flags.optionsJson of
                Ok options ->
                    case selectionConfig of
                        SingleSelectConfig _ _ _ ->
                            case List.head initialValues of
                                Just initialValueStr_ ->
                                    if isOptionValueInListOfOptionsByValue (OptionValue.stringToOptionValue initialValueStr_) options then
                                        let
                                            optionsWithUniqueValues =
                                                options |> List.Extra.uniqueBy Option.getOptionValueAsString
                                        in
                                        ( selectOptionsInOptionsListByString
                                            initialValues
                                            optionsWithUniqueValues
                                        , NoEffect
                                        )

                                    else
                                        -- TODO Perhaps we should call a helper function instead of calling selectOption here
                                        ( (Option.newOption initialValueStr_ Nothing |> Option.selectOption 0) :: options, NoEffect )

                                Nothing ->
                                    let
                                        optionsWithUniqueValues =
                                            options |> List.Extra.uniqueBy Option.getOptionValueAsString
                                    in
                                    ( optionsWithUniqueValues, NoEffect )

                        MultiSelectConfig _ _ _ ->
                            let
                                -- Don't include any empty options, that doesn't make sense.
                                optionsWithInitialValues =
                                    options
                                        |> List.filter (not << Option.isEmptyOption)
                                        |> addAndSelectOptionsInOptionsListByString initialValues
                            in
                            ( optionsWithInitialValues, NoEffect )

                Err error ->
                    ( [], ReportErrorMessage (Json.Decode.errorToString error) )

        optionsWithInitialValueSelectedSorted =
            case SelectionMode.getOutputStyle selectionConfig of
                CustomHtml ->
                    sortOptions optionSort optionsWithInitialValueSelected

                Datalist ->
                    OptionsUtilities.organizeNewDatalistOptions optionsWithInitialValueSelected
    in
    ( { initialValue = initialValues
      , selectionConfig = selectionConfig
      , options = optionsWithInitialValueSelectedSorted
      , optionSort = stringToOptionSort flags.optionSort |> Result.withDefault NoSorting
      , searchStringBounce = Bounce.init
      , searchStringDebounceLength = getDebouceDelayForSearch (List.length optionsWithInitialValueSelectedSorted)
      , searchString = SearchString.reset
      , searchStringNonce = 0
      , focusedIndex = 0
      , rightSlot =
            if flags.loading then
                ShowLoadingIndicator

            else
                case SelectionMode.getOutputStyle selectionConfig of
                    SelectionMode.CustomHtml ->
                        case SelectionMode.getSelectionMode selectionConfig of
                            SelectionMode.SingleSelect ->
                                ShowDropdownIndicator NotInFocusTransition

                            SelectionMode.MultiSelect ->
                                if hasSelectedOption optionsWithInitialValueSelected then
                                    ShowClearButton

                                else
                                    ShowDropdownIndicator NotInFocusTransition

                    Datalist ->
                        case SelectionMode.getSelectionMode selectionConfig of
                            SelectionMode.SingleSelect ->
                                ShowNothing

                            SelectionMode.MultiSelect ->
                                updateRightSlotForDatalist optionsWithInitialValueSelectedSorted

      -- TODO Should these be passed as flags?
      , valueCasing = ValueCasing 100 45
      }
    , batch
        [ errorEffect
        , initialValueErrEffect
        , ReportReady
        , makeCommandMessageForInitialValue (selectedOptions optionsWithInitialValueSelected)
        , UpdateOptionsInWebWorker
        , valueTransformationAndValidationErrorEffect
        ]
    )


getDebouceDelayForSearch : Int -> Float
getDebouceDelayForSearch numberOfOptions =
    if numberOfOptions < 100 then
        1

    else if numberOfOptions < 1000 then
        100

    else
        1000


main : Program Flags Model Msg
main =
    Browser.element
        { init =
            \flags ->
                init flags
                    |> Tuple.mapSecond perform
        , update = updateWrapper
        , subscriptions = subscriptions
        , view = view
        }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ addOptionsReceiver AddOptions
        , allowCustomOptionsReceiver AllowCustomOptionsChanged
        , deselectOptionReceiver DeselectOption
        , disableChangedReceiver DisabledAttributeChanged
        , loadingChangedReceiver LoadingAttributeChanged
        , maxDropdownItemsChangedReceiver MaxDropdownItemsChanged
        , multiSelectChangedReceiver MultiSelectAttributeChanged
        , multiSelectSingleItemRemovalChangedReceiver MultiSelectSingleItemRemovalAttributeChanged
        , optionsReplacedReceiver OptionsReplaced
        , optionSortingChangedReceiver OptionSortingChanged
        , placeholderChangedReceiver PlaceholderAttributeChanged
        , removeOptionsReceiver RemoveOptions
        , requestAllOptionsReceiver (\() -> RequestAllOptions)
        , searchStringMinimumLengthChangedReceiver SearchStringMinimumLengthAttributeChanged
        , selectOptionReceiver SelectOption
        , selectedItemStaysInPlaceChangedReceiver SelectedItemStaysInPlaceChanged
        , showDropdownFooterChangedReceiver ShowDropdownFooterChanged
        , valueCasingDimensionsChangedReceiver ValueCasingWidthUpdate
        , valueChangedReceiver ValueChanged
        , outputStyleChangedReceiver OutputStyleChanged
        , updateSearchResultDataWithWebWorkerReceiver UpdateSearchResultsForOptions
        , customValidationReceiver CustomValidationResponse
        , transformationAndValidationReceiver UpdateTransformationAndValidation
        ]


{-| Performs the mousedown event, but also prevent default.

We used to also stop propagation but that is actually a problem because that stops all the click events
default actions from being suppressed (I think).

-}
mousedownPreventDefault : msg -> Html.Attribute msg
mousedownPreventDefault message =
    Html.Events.custom "mousedown"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = False
            , preventDefault = True
            }
        )


{-| Performs the mousedown event, but also prevent default.

We used to also stop propagation but that is actually a problem because that stops all the click events
default actions from being suppressed (I think).

-}
mouseupPreventDefault : msg -> Html.Attribute msg
mouseupPreventDefault message =
    Html.Events.custom "mouseup"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = False
            , preventDefault = True
            }
        )


{-| Performs the event onClick, but also prevent default.

We used to also stop propagation but that is actually a problem because we want

-}
onClickPreventDefault : msg -> Html.Attribute msg
onClickPreventDefault message =
    Html.Events.custom "click"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = False
            , preventDefault = True
            }
        )


onClickPreventDefaultAndStopPropagation : msg -> Html.Attribute msg
onClickPreventDefaultAndStopPropagation message =
    Html.Events.custom "click"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = True
            , preventDefault = True
            }
        )


onMouseDownStopPropagationAndPreventDefault : msg -> Html.Attribute msg
onMouseDownStopPropagationAndPreventDefault message =
    Html.Events.custom "mousedown"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = True
            , preventDefault = True
            }
        )


onMouseDownStopPropagation : msg -> Html.Attribute msg
onMouseDownStopPropagation message =
    Html.Events.custom "mousedown"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = True
            , preventDefault = False
            }
        )


onMouseUpStopPropagationAndPreventDefault : msg -> Html.Attribute msg
onMouseUpStopPropagationAndPreventDefault message =
    Html.Events.custom "mouseup"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = True
            , preventDefault = True
            }
        )


onMouseUpStopPropagation : msg -> Html.Attribute msg
onMouseUpStopPropagation message =
    Html.Events.custom "mouseup"
        (Json.Decode.succeed
            { message = message
            , stopPropagation = True
            , preventDefault = False
            }
        )

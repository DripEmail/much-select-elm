module MuchSelect exposing (..)

import Bounce exposing (Bounce)
import Browser
import ConfigDump
import DomStateCache exposing (DomStateCache)
import DropdownOptions
    exposing
        ( DropdownOptions
        , figureOutWhichOptionsToShowInTheDropdown
        , moveHighlightedOptionDown
        , moveHighlightedOptionUp
        )
import Events
    exposing
        ( mouseUpPreventDefault
        , onClickPreventDefaultAndStopPropagation
        , onMouseDownStopPropagation
        , onMouseDownStopPropagationAndPreventDefault
        , onMouseUpStopPropagation
        , onMouseUpStopPropagationAndPreventDefault
        )
import GroupedDropdownOptions
    exposing
        ( DropdownOptionsGroup
        , GroupedDropdownOptions
        , groupOptionsInOrder
        , optionGroupsToHtml
        )
import Html exposing (Html, button, div, input, li, node, span, text, ul)
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
        , onMouseUp
        )
import Html.Lazy
import Json.Decode
import Json.Encode
import Keyboard exposing (Key(..))
import Keyboard.Events as Keyboard
import LightDomChange
import List.Extra
import Option
    exposing
        ( Option(..)
        , OptionGroup
        )
import OptionDisplay exposing (OptionDisplay(..))
import OptionLabel exposing (OptionLabel(..))
import OptionSearcher exposing (doesSearchStringFindNothing, updateOrAddCustomOption)
import OptionSorting
    exposing
        ( OptionSort(..)
        , sortOptions
        , stringToOptionSort
        )
import OptionValue exposing (OptionValue(..))
import OptionsUtilities
    exposing
        ( activateOptionInListByOptionValue
        , addAdditionalOptionsToOptionList
        , addAndSelectOptionsInOptionsListByString
        , customSelectedOptions
        , deselectAllButTheFirstSelectedOptionInList
        , deselectAllOptionsInOptionsList
        , deselectAllSelectedHighlightedOptions
        , deselectLastSelectedOption
        , deselectOptionInListByOptionValue
        , hasSelectedHighlightedOptions
        , hasSelectedOption
        , highlightOptionInListByValue
        , isOptionValueInListOfOptionsByValue
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
        , attributeChanged
        , attributeRemoved
        , blurInput
        , customOptionHintReceiver
        , customOptionSelected
        , customValidationReceiver
        , deselectOptionReceiver
        , disableChangedReceiver
        , dumpConfigState
        , dumpSelectedValues
        , errorMessage
        , focusInput
        , initialValueSet
        , inputBlurred
        , inputFocused
        , inputKeyUp
        , invalidValue
        , lightDomChange
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
        , requestConfigState
        , requestSelectedValues
        , scrollDropdownToElement
        , searchOptionsWithWebWorker
        , searchStringMinimumLengthChangedReceiver
        , selectOptionReceiver
        , selectedItemStaysInPlaceChangedReceiver
        , selectedValueEncodingChangeReceiver
        , sendCustomValidationRequest
        , showDropdownFooterChangedReceiver
        , transformationAndValidationReceiver
        , updateOptionsFromDom
        , updateOptionsInWebWorker
        , updateSearchResultDataWithWebWorkerReceiver
        , valueCasingDimensionsChangedReceiver
        , valueChangedMultiSelectSelect
        , valueChangedReceiver
        , valueChangedSingleSelect
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
import SelectedValueEncoding exposing (SelectedValueEncoding)
import SelectionMode
    exposing
        ( OutputStyle(..)
        , SelectionConfig(..)
        , defaultSelectionConfig
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
    | ReportValueChanged Json.Encode.Value SelectionMode.SelectionMode
    | ValueCleared
    | InvalidValue Json.Encode.Value
    | CustomOptionSelected (List String)
    | ReportOptionSelected Json.Encode.Value
    | ReportOptionDeselected Json.Encode.Value
    | OptionsUpdated Bool
    | SendCustomValidationRequest ( String, Int )
    | ReportErrorMessage String
    | ReportReady
    | ReportInitialValueSet Json.Encode.Value
    | FetchOptionsFromDom
    | ScrollDownToElement String
    | ReportAllOptions Json.Encode.Value
    | DumpConfigState Json.Encode.Value
    | DumpSelectedValues Json.Encode.Value
    | ChangeTheLightDom LightDomChange.LightDomChange


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
    | MaxDropdownItemsChanged String
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
    | AttributeChanged ( String, String )
    | AttributeRemoved String
    | CustomOptionHintChanged String
    | SelectedValueEncodingChanged String
    | RequestConfigState
    | RequestSelectedValues


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
    , selectedValueEncoding : SelectedValueEncoding
    , domStateCache : DomStateCache
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
            case SelectionMode.getSelectionMode model.selectionConfig of
                SelectionMode.SingleSelect ->
                    let
                        updatedOptions =
                            selectSingleOptionInList optionValue model.options

                        maybeNewlySelectedOption =
                            OptionsUtilities.findOptionByOptionValue optionValue updatedOptions
                    in
                    case maybeNewlySelectedOption of
                        Just newlySelectedOption ->
                            ( { model
                                | options = updatedOptions
                                , searchString = SearchString.reset
                              }
                                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                            , batch
                                [ makeEffectsWhenSelectingAnOption
                                    newlySelectedOption
                                    (SelectionMode.getEventMode model.selectionConfig)
                                    (SelectionMode.getSelectionMode model.selectionConfig)
                                    model.selectedValueEncoding
                                    (selectedOptions updatedOptions)
                                , BlurInput
                                ]
                            )

                        Nothing ->
                            ( model, ReportErrorMessage "Unable to select option" )

                SelectionMode.MultiSelect ->
                    let
                        updatedOptions =
                            selectOptionInListByOptionValue optionValue
                                (DropdownOptions.moveHighlightedOptionDownIfThereAreOptions
                                    model.selectionConfig
                                    model.options
                                )

                        maybeNewlySelectedOption =
                            OptionsUtilities.findOptionByOptionValue optionValue updatedOptions
                    in
                    case maybeNewlySelectedOption of
                        Just newlySelectedOption ->
                            ( { model
                                | options = updatedOptions
                                , searchString = SearchString.reset
                              }
                                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                            , batch
                                [ makeEffectsWhenSelectingAnOption
                                    newlySelectedOption
                                    (SelectionMode.getEventMode model.selectionConfig)
                                    (SelectionMode.getSelectionMode model.selectionConfig)
                                    model.selectedValueEncoding
                                    (selectedOptions updatedOptions)
                                , FocusInput
                                , SearchStringTouched model.searchStringDebounceLength
                                ]
                            )

                        Nothing ->
                            ( model, ReportErrorMessage "Unable to select option" )

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
                    in
                    ( { model
                        | options = updatedOptions
                        , rightSlot =
                            updateRightSlot
                                model.rightSlot
                                (model.selectionConfig |> SelectionMode.getOutputStyle)
                                (model.selectionConfig |> SelectionMode.getSelectionMode)
                                (updatedOptions |> selectedOptions)
                      }
                    , batch
                        [ makeEffectsWhenValuesChanges
                            (SelectionMode.getEventMode model.selectionConfig)
                            (SelectionMode.getSelectionMode model.selectionConfig)
                            model.selectedValueEncoding
                            (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
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
                    in
                    ( { model
                        | options = updatedOptions
                        , rightSlot =
                            updateRightSlot
                                model.rightSlot
                                (model.selectionConfig |> SelectionMode.getOutputStyle)
                                (model.selectionConfig |> SelectionMode.getSelectionMode)
                                (updatedOptions |> selectedOptions)
                      }
                    , batch
                        [ makeEffectsWhenValuesChanges
                            (SelectionMode.getEventMode model.selectionConfig)
                            (SelectionMode.getSelectionMode model.selectionConfig)
                            model.selectedValueEncoding
                            (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
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
                    in
                    ( { model
                        | options = updatedOptions
                        , rightSlot =
                            updateRightSlot
                                model.rightSlot
                                (model.selectionConfig |> SelectionMode.getOutputStyle)
                                (model.selectionConfig |> SelectionMode.getSelectionMode)
                                (updatedOptions |> selectedOptions)
                      }
                    , batch
                        [ makeEffectsWhenValuesChanges
                            (SelectionMode.getEventMode model.selectionConfig)
                            (SelectionMode.getSelectionMode model.selectionConfig)
                            model.selectedValueEncoding
                            (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
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
                                    selectOptionsInOptionsListByString
                                        values
                                        model.options
                            in
                            ( { model
                                | options = newOptions
                              }
                                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                            , makeEffectsWhenValuesChanges
                                (SelectionMode.getEventMode model.selectionConfig)
                                (SelectionMode.getSelectionMode model.selectionConfig)
                                model.selectedValueEncoding
                                (selectedOptions newOptions)
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
                            , makeEffectsWhenValuesChanges
                                (SelectionMode.getEventMode model.selectionConfig)
                                (SelectionMode.getSelectionMode model.selectionConfig)
                                model.selectedValueEncoding
                                (selectedOptions newOptions)
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
                                , rightSlot =
                                    updateRightSlot
                                        model.rightSlot
                                        (model.selectionConfig |> SelectionMode.getOutputStyle)
                                        (model.selectionConfig |> SelectionMode.getSelectionMode)
                                        (newOptionWithOldSelectedOption |> selectedOptions)
                                , searchStringBounce = Bounce.push model.searchStringBounce
                              }
                                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                            , batch
                                [ OptionsUpdated True
                                , makeEffectsForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
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
                                , rightSlot =
                                    updateRightSlot
                                        model.rightSlot
                                        (model.selectionConfig |> SelectionMode.getOutputStyle)
                                        (model.selectionConfig |> SelectionMode.getSelectionMode)
                                        (newOptionWithOldSelectedOption |> selectedOptions)
                                , searchStringBounce = Bounce.push model.searchStringBounce
                              }
                                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                            , batch
                                [ OptionsUpdated True
                                , makeEffectsForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
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
                        , makeEffectsForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
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
                        , makeEffectsForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
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
                        [ makeEffectsWhenSelectingAnOption
                            option
                            (SelectionMode.getEventMode model.selectionConfig)
                            (SelectionMode.getSelectionMode model.selectionConfig)
                            model.selectedValueEncoding
                            (selectedOptions updatedOptions)
                        , makeEffectsForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
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

        SelectedValueEncodingChanged selectedValueEncodingString ->
            case SelectedValueEncoding.fromString selectedValueEncodingString of
                Ok selectedValueEncoding ->
                    ( { model
                        | selectedValueEncoding =
                            selectedValueEncoding
                      }
                    , NoEffect
                    )

                Err error ->
                    ( model
                    , ReportErrorMessage error
                    )

        OptionSortingChanged sortingString ->
            case stringToOptionSort sortingString of
                Ok optionSorting ->
                    ( { model | optionSort = optionSorting }, NoEffect )

                Err error ->
                    ( model, ReportErrorMessage error )

        PlaceholderAttributeChanged newPlaceholder ->
            ( { model
                | selectionConfig =
                    SelectionMode.setPlaceholder
                        newPlaceholder
                        model.selectionConfig
              }
            , NoEffect
            )

        LoadingAttributeChanged bool ->
            ( { model
                | rightSlot =
                    updateRightSlotLoading
                        model.rightSlot
                        model.selectionConfig
                        (selectedOptions model.options)
                        bool
                , domStateCache =
                    DomStateCache.updateLoadingAttribute
                        (if bool then
                            DomStateCache.HasLoadingAttribute

                         else
                            DomStateCache.NoLoadingAttribute
                        )
                        model.domStateCache
              }
            , NoEffect
            )

        MaxDropdownItemsChanged stringValue ->
            case OutputStyle.stringToMaxDropdownItems stringValue of
                Ok maxDropdownItems ->
                    ( { model
                        | selectionConfig = setMaxDropdownItems maxDropdownItems model.selectionConfig
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , NoEffect
                    )

                Err error ->
                    ( model, ReportErrorMessage error )

        ShowDropdownFooterChanged bool ->
            let
                newDropdownStyle =
                    if bool then
                        ShowFooter

                    else
                        NoFooter
            in
            ( { model
                | selectionConfig =
                    setDropdownStyle
                        newDropdownStyle
                        model.selectionConfig
                , domStateCache =
                    DomStateCache.updateDropdownFooterAttribute
                        (if bool then
                            DomStateCache.HasDropdownFooterAttribute

                         else
                            DomStateCache.NoDropdownFooterAttribute
                        )
                        model.domStateCache
              }
            , NoEffect
            )

        AllowCustomOptionsChanged ( canAddCustomOptions, customOptionHint ) ->
            let
                maybeCustomOptionHint =
                    case customOptionHint of
                        "" ->
                            Nothing

                        "true" ->
                            Nothing

                        "false" ->
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
            let
                newSelectionConfig =
                    setIsDisabled bool model.selectionConfig
            in
            ( { model
                | selectionConfig = newSelectionConfig
                , rightSlot =
                    updateRightSlot
                        model.rightSlot
                        (newSelectionConfig |> SelectionMode.getOutputStyle)
                        (newSelectionConfig |> SelectionMode.getSelectionMode)
                        (model.options |> selectedOptions)
              }
            , NoEffect
            )

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
                                model.domStateCache
                                outputStyle
                                model.selectionConfig
                    in
                    ( { model
                        | selectionConfig = newSelectionConfig
                        , rightSlot =
                            updateRightSlot
                                model.rightSlot
                                (newSelectionConfig |> SelectionMode.getOutputStyle)
                                (newSelectionConfig |> SelectionMode.getSelectionMode)
                                (model.options |> selectedOptions)
                        , domStateCache =
                            DomStateCache.updateOutputStyle
                                (case outputStyle of
                                    Datalist ->
                                        DomStateCache.OutputStyleDatalist

                                    CustomHtml ->
                                        DomStateCache.OutputStyleCustomHtml
                                )
                                model.domStateCache
                      }
                    , Batch
                        [ FetchOptionsFromDom
                        , ChangeTheLightDom
                            (LightDomChange.AddUpdateAttribute
                                "output-style"
                                newOutputStyleString
                            )
                        ]
                    )

                Err _ ->
                    ( model
                    , ReportErrorMessage
                        ("Invalid output style " ++ newOutputStyleString)
                    )

        MultiSelectSingleItemRemovalAttributeChanged shouldEnableMultiSelectSingleItemRemoval ->
            let
                multiSelectSingleItemRemoval =
                    if shouldEnableMultiSelectSingleItemRemoval then
                        EnableSingleItemRemoval

                    else
                        DisableSingleItemRemoval
            in
            ( { model
                | selectionConfig =
                    setSingleItemRemoval
                        multiSelectSingleItemRemoval
                        model.selectionConfig
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
                        makeEffectsWhenValuesChanges
                            (SelectionMode.getEventMode model.selectionConfig)
                            (SelectionMode.getSelectionMode model.selectionConfig)
                            model.selectedValueEncoding
                            (selectedOptions updatedOptions)
            in
            ( { model
                | selectionConfig = SelectionMode.setMultiSelectModeWithBool isInMultiSelectMode model.selectionConfig
                , options = updatedOptions
              }
                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
            , batch
                [ ReportReady
                , makeEffectsForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
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
                maybeHighlightedOption =
                    OptionsUtilities.findHighlightedOption model.options

                updatedOptions =
                    selectHighlightedOption model.selectionConfig model.options

                maybeNewlySelectedOption =
                    maybeHighlightedOption |> Maybe.andThen (\highlightedOption -> OptionsUtilities.findOptionByOptionValue (Option.getOptionValue highlightedOption) updatedOptions)
            in
            case maybeNewlySelectedOption of
                Just newlySelectedOption ->
                    case SelectionMode.getSelectionMode model.selectionConfig of
                        SelectionMode.SingleSelect ->
                            ( { model
                                | options = updatedOptions
                                , searchString = SearchString.reset
                              }
                                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                            , batch
                                [ makeEffectsWhenSelectingAnOption
                                    newlySelectedOption
                                    (SelectionMode.getEventMode model.selectionConfig)
                                    (SelectionMode.getSelectionMode model.selectionConfig)
                                    model.selectedValueEncoding
                                    (selectedOptions updatedOptions)
                                , makeEffectsForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
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
                                [ makeEffectsWhenSelectingAnOption
                                    newlySelectedOption
                                    (SelectionMode.getEventMode model.selectionConfig)
                                    (SelectionMode.getSelectionMode model.selectionConfig)
                                    model.selectedValueEncoding
                                    (selectedOptions updatedOptions)
                                , makeEffectsForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
                                , FocusInput
                                ]
                            )

                Nothing ->
                    ( model, ReportErrorMessage "Unable select highlighted option" )

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
                    moveHighlightedOptionUp model.selectionConfig model.options
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
                    moveHighlightedOptionDown model.selectionConfig model.options
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
                    [ ReportValueChanged
                        (updatedOptions |> selectedOptions |> Ports.optionsEncoder)
                        (SelectionMode.getSelectionMode model.selectionConfig)

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
                , rightSlot =
                    updateRightSlot
                        model.rightSlot
                        (model.selectionConfig |> SelectionMode.getOutputStyle)
                        (model.selectionConfig |> SelectionMode.getSelectionMode)
                        (updatedOptions |> selectedOptions)
              }
            , makeEffectsWhenValuesChanges
                (SelectionMode.getEventMode model.selectionConfig)
                (SelectionMode.getSelectionMode model.selectionConfig)
                model.selectedValueEncoding
                (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
            )

        RemoveMultiSelectValue indexWhereToDelete ->
            let
                updatedOptions =
                    OptionsUtilities.removeOptionFromOptionListBySelectedIndex indexWhereToDelete model.options
            in
            ( { model
                | options = updatedOptions
                , rightSlot =
                    updateRightSlot
                        model.rightSlot
                        (model.selectionConfig |> SelectionMode.getOutputStyle)
                        (model.selectionConfig |> SelectionMode.getSelectionMode)
                        (updatedOptions |> selectedOptions)
              }
            , makeEffectsWhenValuesChanges
                (SelectionMode.getEventMode model.selectionConfig)
                (SelectionMode.getSelectionMode model.selectionConfig)
                model.selectedValueEncoding
                (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
            )

        RequestAllOptions ->
            ( model
            , ReportAllOptions (Json.Encode.list Option.encode model.options)
            )

        UpdateSearchResultsForOptions updatedSearchResultsJsonValue ->
            case Json.Decode.decodeValue Option.decodeSearchResults updatedSearchResultsJsonValue of
                Ok searchResults ->
                    if searchResults.searchNonce == model.searchStringNonce then
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
                                    let
                                        options : DropdownOptions
                                        options =
                                            DropdownOptions.figureOutWhichOptionsToShowInTheDropdownThatAreNotSelected model.selectionConfig updatedOptions
                                    in
                                    case DropdownOptions.head options of
                                        Just firstOption ->
                                            OptionsUtilities.highlightOptionInList firstOption updatedOptions

                                        Nothing ->
                                            updatedOptions
                          }
                        , NoEffect
                        )

                    else
                        ( model, NoEffect )

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
                            in
                            ( { model
                                | options = updatedOptions
                                , rightSlot =
                                    updateRightSlot
                                        model.rightSlot
                                        (model.selectionConfig |> SelectionMode.getOutputStyle)
                                        (model.selectionConfig |> SelectionMode.getSelectionMode)
                                        (updatedOptions |> selectedOptions)
                              }
                            , makeEffectsWhenValuesChanges
                                (SelectionMode.getEventMode model.selectionConfig)
                                (SelectionMode.getSelectionMode model.selectionConfig)
                                model.selectedValueEncoding
                                (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
                            )

                        TransformAndValidate.ValidationFailed valueString selectedValueIndex validationFailureMessages ->
                            let
                                updatedOptions =
                                    updateDatalistOptionsWithValueAndErrors
                                        validationFailureMessages
                                        (OptionValue.stringToOptionValue valueString)
                                        selectedValueIndex
                                        model.options
                            in
                            ( { model
                                | options = updatedOptions
                                , rightSlot =
                                    updateRightSlot
                                        model.rightSlot
                                        (model.selectionConfig |> SelectionMode.getOutputStyle)
                                        (model.selectionConfig |> SelectionMode.getSelectionMode)
                                        (updatedOptions |> selectedOptions)
                              }
                            , makeEffectsWhenValuesChanges
                                (SelectionMode.getEventMode model.selectionConfig)
                                (SelectionMode.getSelectionMode model.selectionConfig)
                                model.selectedValueEncoding
                                (updatedOptions |> selectedOptions |> OptionsUtilities.cleanupEmptySelectedOptions)
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

        AttributeChanged ( attributeName, newAttributeValue ) ->
            case attributeName of
                "allow-custom-options" ->
                    case newAttributeValue of
                        "" ->
                            ( { model
                                | selectionConfig =
                                    SelectionMode.setAllowCustomOptionsWithBool
                                        True
                                        Nothing
                                        model.selectionConfig
                                , domStateCache =
                                    DomStateCache.updateAllowCustomOptions
                                        DomStateCache.CustomOptionsAllowed
                                        model.domStateCache
                              }
                            , NoEffect
                            )

                        "false" ->
                            ( { model
                                | selectionConfig =
                                    SelectionMode.setAllowCustomOptionsWithBool
                                        False
                                        Nothing
                                        model.selectionConfig
                                , domStateCache =
                                    DomStateCache.updateAllowCustomOptions
                                        DomStateCache.CustomOptionsNotAllowed
                                        model.domStateCache
                              }
                            , NoEffect
                            )

                        "true" ->
                            ( { model
                                | selectionConfig =
                                    SelectionMode.setAllowCustomOptionsWithBool
                                        True
                                        Nothing
                                        model.selectionConfig
                                , domStateCache =
                                    DomStateCache.updateAllowCustomOptions
                                        DomStateCache.CustomOptionsAllowed
                                        model.domStateCache
                              }
                            , NoEffect
                            )

                        customOptionHint ->
                            ( { model
                                | selectionConfig =
                                    SelectionMode.setAllowCustomOptionsWithBool
                                        True
                                        (Just customOptionHint)
                                        model.selectionConfig
                                , domStateCache =
                                    DomStateCache.updateAllowCustomOptions
                                        (DomStateCache.CustomOptionsAllowedWithHint customOptionHint)
                                        model.domStateCache
                              }
                            , NoEffect
                            )

                "disabled" ->
                    let
                        newSelectionConfig =
                            setIsDisabled True model.selectionConfig
                    in
                    ( { model
                        | selectionConfig = newSelectionConfig
                        , rightSlot =
                            updateRightSlot
                                model.rightSlot
                                (newSelectionConfig |> SelectionMode.getOutputStyle)
                                (newSelectionConfig |> SelectionMode.getSelectionMode)
                                (model.options |> selectedOptions)
                        , domStateCache =
                            DomStateCache.updateDisabledAttribute
                                DomStateCache.HasDisabledAttribute
                                model.domStateCache
                      }
                    , NoEffect
                    )

                "events-only" ->
                    ( { model
                        | selectionConfig =
                            SelectionMode.setEventsOnly
                                True
                                model.selectionConfig
                      }
                    , NoEffect
                    )

                "loading" ->
                    case newAttributeValue of
                        "false" ->
                            ( { model
                                | rightSlot =
                                    updateRightSlotLoading
                                        model.rightSlot
                                        model.selectionConfig
                                        (selectedOptions model.options)
                                        False
                                , domStateCache =
                                    DomStateCache.updateLoadingAttribute
                                        DomStateCache.NoLoadingAttribute
                                        model.domStateCache
                              }
                            , NoEffect
                            )

                        _ ->
                            ( { model
                                | rightSlot =
                                    updateRightSlotLoading
                                        model.rightSlot
                                        model.selectionConfig
                                        (selectedOptions model.options)
                                        True
                                , domStateCache =
                                    DomStateCache.updateLoadingAttribute
                                        DomStateCache.HasLoadingAttribute
                                        model.domStateCache
                              }
                            , NoEffect
                            )

                "max-dropdown-items" ->
                    case OutputStyle.stringToMaxDropdownItems newAttributeValue of
                        Ok maxDropdownItems ->
                            ( { model
                                | selectionConfig = setMaxDropdownItems maxDropdownItems model.selectionConfig
                              }
                                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                            , NoEffect
                            )

                        Err err ->
                            ( model
                            , ReportErrorMessage
                                err
                            )

                "multi-select" ->
                    ( { model
                        | selectionConfig = SelectionMode.setMultiSelectModeWithBool True model.selectionConfig
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , batch
                        [ ReportReady
                        , makeEffectsForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
                        ]
                    )

                "multi-select-single-item-removal" ->
                    ( { model
                        | selectionConfig = setSingleItemRemoval EnableSingleItemRemoval model.selectionConfig
                      }
                    , ReportReady
                    )

                "option-sorting" ->
                    case stringToOptionSort newAttributeValue of
                        Ok optionSorting ->
                            ( { model | optionSort = optionSorting }, NoEffect )

                        Err error ->
                            ( model, ReportErrorMessage error )

                "output-style" ->
                    case SelectionMode.stringToOutputStyle newAttributeValue of
                        Ok outputStyle ->
                            let
                                newSelectionConfig =
                                    SelectionMode.setOutputStyle
                                        model.domStateCache
                                        outputStyle
                                        model.selectionConfig
                            in
                            ( { model
                                | selectionConfig = newSelectionConfig
                                , rightSlot =
                                    updateRightSlot
                                        model.rightSlot
                                        (newSelectionConfig |> SelectionMode.getOutputStyle)
                                        (newSelectionConfig |> SelectionMode.getSelectionMode)
                                        model.options
                                , domStateCache =
                                    DomStateCache.updateOutputStyle
                                        (case outputStyle of
                                            Datalist ->
                                                DomStateCache.OutputStyleDatalist

                                            CustomHtml ->
                                                DomStateCache.OutputStyleCustomHtml
                                        )
                                        model.domStateCache
                              }
                            , FetchOptionsFromDom
                            )

                        Err _ ->
                            ( model, ReportErrorMessage ("Invalid output style: " ++ newAttributeValue) )

                "placeholder" ->
                    ( { model | selectionConfig = SelectionMode.setPlaceholder ( True, newAttributeValue ) model.selectionConfig }
                    , NoEffect
                    )

                "search-string-minimum-length" ->
                    case newAttributeValue of
                        "" ->
                            ( { model
                                | selectionConfig =
                                    setSearchStringMinimumLength
                                        NoMinimumToSearchStringLength
                                        model.selectionConfig
                              }
                                |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                            , NoEffect
                            )

                        _ ->
                            case PositiveInt.fromString newAttributeValue of
                                Just minimumLength ->
                                    ( { model
                                        | selectionConfig =
                                            setSearchStringMinimumLength
                                                (FixedSearchStringMinimumLength minimumLength)
                                                model.selectionConfig
                                      }
                                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                                    , NoEffect
                                    )

                                Nothing ->
                                    ( model
                                    , ReportErrorMessage "Search string minimum length needs to be a positive integer"
                                    )

                "selected-option-goes-to-top" ->
                    ( { model
                        | selectionConfig =
                            setSelectedItemStaysInPlaceWithBool
                                False
                                model.selectionConfig
                      }
                    , NoEffect
                    )

                "selected-value" ->
                    case SelectedValueEncoding.stringToValueStrings model.selectedValueEncoding newAttributeValue of
                        Ok selectedValueStrings ->
                            if OptionsUtilities.selectedOptionValuesAreEqual selectedValueStrings model.options then
                                ( model, NoEffect )

                            else
                                case selectedValueStrings of
                                    [] ->
                                        clearAllSelectedOption model

                                    [ selectedValueString ] ->
                                        case selectedValueString of
                                            "" ->
                                                clearAllSelectedOption model

                                            _ ->
                                                let
                                                    newOptions =
                                                        model.options
                                                            |> List.map Option.deselectOption
                                                            |> addAndSelectOptionsInOptionsListByString
                                                                selectedValueStrings
                                                in
                                                ( { model
                                                    | options = newOptions
                                                  }
                                                    |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                                                , makeEffectsWhenValuesChanges
                                                    (SelectionMode.getEventMode model.selectionConfig)
                                                    (SelectionMode.getSelectionMode model.selectionConfig)
                                                    model.selectedValueEncoding
                                                    (OptionsUtilities.selectedOptions newOptions)
                                                )

                                    _ ->
                                        let
                                            newOptions =
                                                model.options
                                                    |> List.map Option.deselectOption
                                                    |> addAndSelectOptionsInOptionsListByString
                                                        selectedValueStrings
                                        in
                                        ( { model
                                            | options = newOptions
                                          }
                                            |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                                        , makeEffectsWhenValuesChanges
                                            (SelectionMode.getEventMode model.selectionConfig)
                                            (SelectionMode.getSelectionMode model.selectionConfig)
                                            model.selectedValueEncoding
                                            (OptionsUtilities.selectedOptions newOptions)
                                        )

                        Err error ->
                            ( model, ReportErrorMessage error )

                "selected-value-encoding" ->
                    case SelectedValueEncoding.fromString newAttributeValue of
                        Ok selectedValueEncoding ->
                            ( { model
                                | selectedValueEncoding =
                                    selectedValueEncoding
                              }
                            , NoEffect
                            )

                        Err error ->
                            ( model
                            , ReportErrorMessage error
                            )

                "show-dropdown-footer" ->
                    ( { model
                        | selectionConfig = setDropdownStyle ShowFooter model.selectionConfig
                        , domStateCache =
                            DomStateCache.updateDropdownFooterAttribute
                                DomStateCache.HasDropdownFooterAttribute
                                model.domStateCache
                      }
                    , NoEffect
                    )

                unknownAttribute ->
                    ( model, ReportErrorMessage ("Unknown attribute: " ++ unknownAttribute) )

        AttributeRemoved attributeName ->
            case attributeName of
                "allow-custom-options" ->
                    ( { model
                        | selectionConfig =
                            SelectionMode.setAllowCustomOptionsWithBool
                                False
                                Nothing
                                model.selectionConfig
                        , domStateCache =
                            DomStateCache.updateAllowCustomOptions
                                DomStateCache.CustomOptionsNotAllowed
                                model.domStateCache
                      }
                    , NoEffect
                    )

                "disabled" ->
                    ( { model
                        | selectionConfig = setIsDisabled False model.selectionConfig
                        , domStateCache =
                            DomStateCache.updateDisabledAttribute
                                DomStateCache.NoDisabledAttribute
                                model.domStateCache
                      }
                    , NoEffect
                    )

                "events-only" ->
                    ( { model
                        | selectionConfig =
                            SelectionMode.setEventsOnly
                                False
                                model.selectionConfig
                      }
                    , NoEffect
                    )

                "loading" ->
                    ( { model
                        | rightSlot =
                            updateRightSlotLoading
                                model.rightSlot
                                model.selectionConfig
                                (model.options |> selectedOptions)
                                False
                        , domStateCache =
                            DomStateCache.updateLoadingAttribute
                                DomStateCache.NoLoadingAttribute
                                model.domStateCache
                      }
                    , NoEffect
                    )

                "max-dropdown-items" ->
                    ( { model
                        | selectionConfig =
                            setMaxDropdownItems
                                (OutputStyle.FixedMaxDropdownItems OutputStyle.defaultMaxDropdownItemsNum)
                                model.selectionConfig
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , NoEffect
                    )

                "multi-select" ->
                    let
                        updatedOptions =
                            deselectAllButTheFirstSelectedOptionInList model.options
                    in
                    ( { model
                        | selectionConfig = SelectionMode.setMultiSelectModeWithBool False model.selectionConfig
                        , options = updatedOptions
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , batch
                        [ ReportReady
                        , makeEffectsForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
                        , makeEffectsWhenValuesChanges (SelectionMode.getEventMode model.selectionConfig)
                            (SelectionMode.getSelectionMode model.selectionConfig)
                            model.selectedValueEncoding
                            (selectedOptions updatedOptions)
                        ]
                    )

                "multi-select-single-item-removal" ->
                    ( { model
                        | selectionConfig =
                            setSingleItemRemoval
                                DisableSingleItemRemoval
                                model.selectionConfig
                      }
                    , ReportReady
                    )

                "option-sorting" ->
                    ( { model | optionSort = NoSorting }, NoEffect )

                "output-style" ->
                    let
                        newSelectionConfig =
                            SelectionMode.setOutputStyle
                                model.domStateCache
                                CustomHtml
                                model.selectionConfig
                    in
                    ( { model
                        | selectionConfig = newSelectionConfig
                        , rightSlot =
                            updateRightSlot
                                model.rightSlot
                                (newSelectionConfig |> SelectionMode.getOutputStyle)
                                (newSelectionConfig |> SelectionMode.getSelectionMode)
                                (model.options |> selectedOptions)
                      }
                    , FetchOptionsFromDom
                    )

                "placeholder" ->
                    ( { model
                        | selectionConfig =
                            SelectionMode.setPlaceholder ( False, "" )
                                model.selectionConfig
                      }
                    , NoEffect
                    )

                "search-string-minimum-length" ->
                    ( { model
                        | selectionConfig =
                            setSearchStringMinimumLength
                                NoMinimumToSearchStringLength
                                model.selectionConfig
                      }
                        |> updateModelWithChangesThatEffectTheOptionsWhenTheSearchStringChanges
                    , NoEffect
                    )

                "selected-option-goes-to-top" ->
                    ( { model
                        | selectionConfig =
                            setSelectedItemStaysInPlaceWithBool
                                True
                                model.selectionConfig
                      }
                    , NoEffect
                    )

                "selected-value" ->
                    clearAllSelectedOption model

                "selected-value-encoding" ->
                    ( { model
                        | selectedValueEncoding =
                            SelectedValueEncoding.defaultSelectedValueEncoding
                      }
                    , NoEffect
                    )

                "show-dropdown-footer" ->
                    ( { model
                        | selectionConfig = setDropdownStyle NoFooter model.selectionConfig
                        , domStateCache =
                            DomStateCache.updateDropdownFooterAttribute
                                DomStateCache.NoDropdownFooterAttribute
                                model.domStateCache
                      }
                    , NoEffect
                    )

                unknownAttribute ->
                    ( model, ReportErrorMessage ("Unknown attribute: " ++ unknownAttribute) )

        CustomOptionHintChanged customOptionHint ->
            ( { model
                | selectionConfig =
                    SelectionMode.setCustomOptionHint
                        customOptionHint
                        model.selectionConfig
              }
            , NoEffect
            )

        RequestConfigState ->
            ( model
            , DumpConfigState
                (ConfigDump.encodeConfig
                    model.selectionConfig
                    model.optionSort
                    model.selectedValueEncoding
                    model.rightSlot
                )
            )

        RequestSelectedValues ->
            ( model
            , DumpSelectedValues
                (Json.Encode.object
                    [ ( "value"
                      , SelectedValueEncoding.selectedValue
                            (SelectionMode.getSelectionMode model.selectionConfig)
                            model.options
                      )
                    , ( "rawValue"
                      , SelectedValueEncoding.rawSelectedValue
                            (SelectionMode.getSelectionMode model.selectionConfig)
                            model.selectedValueEncoding
                            model.options
                      )
                    ]
                )
            )


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

        ReportValueChanged value selectionMode ->
            case selectionMode of
                SelectionMode.SingleSelect ->
                    valueChangedSingleSelect value

                SelectionMode.MultiSelect ->
                    valueChangedMultiSelectSelect value

        ValueCleared ->
            valueCleared ()

        InvalidValue value ->
            invalidValue value

        CustomOptionSelected strings ->
            customOptionSelected strings

        ReportOptionSelected value ->
            optionSelected value

        ReportOptionDeselected value ->
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

        DumpConfigState value ->
            dumpConfigState value

        DumpSelectedValues value ->
            dumpSelectedValues value

        ChangeTheLightDom lightDomChange_ ->
            lightDomChange (LightDomChange.encode lightDomChange_)


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
        [ makeEffectsWhenDeselectingAnOption
            option
            (SelectionMode.getEventMode model.selectionConfig)
            (SelectionMode.getSelectionMode model.selectionConfig)
            model.selectedValueEncoding
            (selectedOptions updatedOptions)
        , makeEffectsForUpdatingOptionsInTheWebWorker model.searchStringDebounceLength model.searchString
        ]
    )


clearAllSelectedOption : Model -> ( Model, Effect )
clearAllSelectedOption model =
    let
        optionsAboutToBeDeselected : List Option
        optionsAboutToBeDeselected =
            OptionsUtilities.selectedOptions model.options

        deselectEventEffect =
            if List.isEmpty optionsAboutToBeDeselected then
                NoEffect

            else
                ReportOptionDeselected (Ports.optionsEncoder (deselectAllOptionsInOptionsList optionsAboutToBeDeselected))

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
        , rightSlot =
            updateRightSlot
                model.rightSlot
                (model.selectionConfig |> SelectionMode.getOutputStyle)
                (model.selectionConfig |> SelectionMode.getSelectionMode)
                []
        , searchString = SearchString.reset
      }
    , batch
        [ makeEffectsWhenValuesChanges (SelectionMode.getEventMode model.selectionConfig)
            (SelectionMode.getSelectionMode model.selectionConfig)
            model.selectedValueEncoding
            []
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
                (selectionConfig |> SelectionMode.getOutputStyle)
                (selectionConfig |> SelectionMode.getSelectionMode)
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
                (selectionMode |> SelectionMode.getOutputStyle)
                (selectionMode |> SelectionMode.getSelectionMode)
                (options |> selectedOptions)
    }


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
                customHtmlDropdown
                    model.selectionConfig
                    model.options
                    model.searchString
                    model.valueCasing

            Datalist ->
                GroupedDropdownOptions.dropdownOptionsToDatalistHtml (DropdownOptions.figureOutWhichOptionsToShowInTheDropdownThatAreNotSelected model.selectionConfig model.options)
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

        -- TODO On mouse down do something to provide a bit of feedback
        , attributeIf (not (isFocused selectionConfig)) (onMouseDown NoOp)
        , attributeIf (not (isFocused selectionConfig) && not (isDisabled selectionConfig)) (onMouseUp BringInputInFocus)
        , attributeIf (not (isFocused selectionConfig) && not (isDisabled selectionConfig)) (onFocus BringInputInFocus)
        , tabIndexAttribute (isDisabled selectionConfig)
        , classList
            (valueCasingClassList selectionConfig hasOptionSelected False)
        ]
        [ span
            [ id "selected-value"
            , Html.Attributes.attribute "part" "selected-value"
            ]
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

        -- TODO On mouse down do something to provide a bit of feedback
        , onMouseDown NoOp
        , onMouseUp BringInputInFocus
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
                    (SelectionMode.isDisabled selectionConfig)
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

        allowsCustomOptions =
            case SelectionMode.getCustomOptions selectionConfig of
                OutputStyle.AllowCustomOptions _ _ ->
                    True

                OutputStyle.NoCustomOptions ->
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
    , ( "allows-custom-options", allowsCustomOptions )
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
                    , value valueString
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
        , rightSlotHtml rightSlot (SelectionMode.getInteractionState selectionConfig) (isDisabled selectionConfig) index
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
            , value valueString
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


customHtmlDropdown : SelectionConfig -> List Option -> SearchString -> ValueCasing -> Html Msg
customHtmlDropdown selectionMode options searchString (ValueCasing valueCasingWidth valueCasingHeight) =
    let
        optionsForTheDropdown =
            figureOutWhichOptionsToShowInTheDropdown selectionMode options

        optionsHtml =
            -- TODO We should probably do something different if we are in a loading state
            if DropdownOptions.isEmpty optionsForTheDropdown then
                [ div [ class "option disabled" ] [ node "slot" [ name "no-options" ] [ text "No available options" ] ] ]

            else if doesSearchStringFindNothing searchString (getSearchStringMinimumLength selectionMode) optionsForTheDropdown then
                [ div [ class "option disabled" ] [ node "slot" [ name "no-filtered-options" ] [ text "This filter returned no results." ] ] ]

            else
                optionsForTheDropdown
                    |> groupOptionsInOrder
                    |> optionGroupsToHtml
                        { mouseOverMsgConstructor = DropdownMouseOverOption
                        , mouseOutMsgConstructor = DropdownMouseOutOption
                        , mouseDownMsgConstructor = DropdownMouseDownOption
                        , mouseUpMsgConstructor = DropdownMouseUpOption
                        , noOpMsgConstructor = NoOp
                        }
                        selectionMode

        dropdownFooterHtml =
            if showDropdownFooter selectionMode && DropdownOptions.length optionsForTheDropdown < List.length options then
                div
                    [ id "dropdown-footer"
                    , Html.Attributes.attribute "part" "dropdown-footer"
                    ]
                    [ text
                        ("showing "
                            ++ (optionsForTheDropdown |> DropdownOptions.length |> String.fromInt)
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
                    span [ mouseUpPreventDefault <| DeselectOptionInternal option, class "remove-option" ] [ text "" ]

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
        , mouseUpPreventDefault
            (ToggleSelectedValueHighlight optionValue)
        ]
        [ text labelText ]


rightSlotHtml : RightSlot -> SelectionMode.InteractionState -> Bool -> Int -> Html Msg
rightSlotHtml rightSlot interactionState isDisabled selectedIndex =
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
            if isDisabled then
                text ""

            else
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
            if isDisabled then
                text ""

            else
                div [ class "add-remove-buttons" ]
                    [ div [ class "add-button-wrapper", onClick (AddMultiSelectValue selectedIndex) ]
                        [ addButtonSlot selectedIndex ]
                    ]

        ShowAddAndRemoveButtons ->
            if isDisabled then
                text ""

            else
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


makeEffectsWhenValuesChanges : OutputStyle.EventsMode -> SelectionMode.SelectionMode -> SelectedValueEncoding.SelectedValueEncoding -> List Option -> Effect
makeEffectsWhenValuesChanges eventsMode selectionMode selectedValueEncoding selectedOptions =
    let
        valueChangeCmd =
            if OptionsUtilities.allOptionsAreValid selectedOptions then
                ReportValueChanged (Ports.optionsEncoder selectedOptions) selectionMode

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

        lightDomChangeEffect =
            case eventsMode of
                OutputStyle.EventsOnly ->
                    NoEffect

                OutputStyle.AllowLightDomChanges ->
                    ChangeTheLightDom
                        (LightDomChange.UpdateSelectedValue
                            (Json.Encode.object
                                [ ( "rawValue"
                                  , SelectedValueEncoding.rawSelectedValue
                                        selectionMode
                                        selectedValueEncoding
                                        selectedOptions
                                  )
                                , ( "value"
                                  , SelectedValueEncoding.selectedValue
                                        selectionMode
                                        selectedOptions
                                  )
                                , ( "selectionMode"
                                  , case selectionMode of
                                        SelectionMode.SingleSelect ->
                                            Json.Encode.string "single-select"

                                        SelectionMode.MultiSelect ->
                                            Json.Encode.string "multi-select"
                                  )
                                ]
                            )
                        )

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
        , customValidationCmd
        , lightDomChangeEffect
        ]


makeEffectsWhenSelectingAnOption : Option -> OutputStyle.EventsMode -> SelectionMode.SelectionMode -> SelectedValueEncoding.SelectedValueEncoding -> List Option -> Effect
makeEffectsWhenSelectingAnOption newlySelectedOption eventsMode selectionMode selectedValueEncoding options =
    let
        -- Any time we select a new value we need to emit an `optionSelected` event.
        optionSelectedEffects =
            ReportOptionSelected (Ports.optionEncoder newlySelectedOption)
    in
    batch
        [ makeEffectsWhenValuesChanges eventsMode selectionMode selectedValueEncoding options
        , optionSelectedEffects
        ]


makeEffectsWhenDeselectingAnOption : Option -> OutputStyle.EventsMode -> SelectionMode.SelectionMode -> SelectedValueEncoding.SelectedValueEncoding -> List Option -> Effect
makeEffectsWhenDeselectingAnOption deselectedOption eventsMode selectionMode selectedValueEncoding options =
    let
        -- Any time we deselect a new value we need to emit an `optionDeselected` event.
        optionDeselectedEffects =
            ReportOptionDeselected (Ports.optionEncoder deselectedOption)
    in
    batch
        [ makeEffectsWhenValuesChanges eventsMode selectionMode selectedValueEncoding options
        , optionDeselectedEffects
        ]


makeEffectsForUpdatingOptionsInTheWebWorker : Float -> SearchString -> Effect
makeEffectsForUpdatingOptionsInTheWebWorker searchStringDebounceLength searchString =
    let
        searchStringUpdateCmd =
            if SearchString.isEmpty searchString then
                NoEffect

            else
                SearchStringTouched searchStringDebounceLength
    in
    batch [ UpdateOptionsInWebWorker, searchStringUpdateCmd ]


makeEffectsForInitialValue : OutputStyle.EventsMode -> SelectionMode.SelectionMode -> SelectedValueEncoding.SelectedValueEncoding -> List Option -> Effect
makeEffectsForInitialValue eventsMode selectionMode selectedValueEncoding selectedOptions =
    case eventsMode of
        OutputStyle.EventsOnly ->
            ReportInitialValueSet (Ports.optionsEncoder selectedOptions)

        OutputStyle.AllowLightDomChanges ->
            Batch
                [ ReportInitialValueSet (Ports.optionsEncoder selectedOptions)
                , ChangeTheLightDom
                    (LightDomChange.UpdateSelectedValue
                        (Json.Encode.object
                            [ ( "rawValue"
                              , SelectedValueEncoding.rawSelectedValue
                                    selectionMode
                                    selectedValueEncoding
                                    selectedOptions
                              )
                            , ( "value"
                              , SelectedValueEncoding.selectedValue
                                    selectionMode
                                    selectedOptions
                              )
                            , ( "selectionMode"
                              , case selectionMode of
                                    SelectionMode.SingleSelect ->
                                        Json.Encode.string "single-select"

                                    SelectionMode.MultiSelect ->
                                        Json.Encode.string "multi-select"
                              )
                            ]
                        )
                    )
                ]


type alias Flags =
    { selectedValue : String
    , selectedValueEncoding : Maybe String
    , optionsJson : String
    , isEventsOnly : Bool
    , placeholder : ( Bool, String )
    , customOptionHint : Maybe String
    , allowMultiSelect : Bool
    , outputStyle : String
    , enableMultiSelectSingleItemRemoval : Bool
    , optionSort : String
    , loading : Bool
    , maxDropdownItems : Maybe String
    , disabled : Bool
    , allowCustomOptions : Bool
    , selectedItemStaysInPlace : Bool
    , searchStringMinimumLength : Maybe String
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
                    ( TransformAndValidate.empty
                    , ReportErrorMessage (Json.Decode.errorToString error)
                    )

        ( maxDropdownItems, maxDropdownItemsErrorEffect ) =
            case flags.maxDropdownItems of
                Just str ->
                    case OutputStyle.stringToMaxDropdownItems str of
                        Ok value ->
                            ( value, NoEffect )

                        Err error ->
                            ( OutputStyle.defaultMaxDropdownItems
                            , ReportErrorMessage error
                            )

                Nothing ->
                    ( OutputStyle.defaultMaxDropdownItems
                    , NoEffect
                    )

        ( searchStringMinimumLength, searchStringMinimumLengthErrorEffect ) =
            case flags.maxDropdownItems of
                Just str ->
                    case PositiveInt.fromString str of
                        Just int ->
                            if PositiveInt.isZero int then
                                ( NoMinimumToSearchStringLength, NoEffect )

                            else
                                ( FixedSearchStringMinimumLength int, NoEffect )

                        Nothing ->
                            ( OutputStyle.defaultSearchStringMinimumLength
                            , ReportErrorMessage
                                "Invalid value for the search-string-minimum-length attribute."
                            )

                Nothing ->
                    ( OutputStyle.defaultSearchStringMinimumLength, NoEffect )

        ( selectionConfig, selectionConfigErrorEffect ) =
            case
                makeSelectionConfig
                    flags.isEventsOnly
                    flags.disabled
                    flags.allowMultiSelect
                    flags.allowCustomOptions
                    flags.outputStyle
                    flags.placeholder
                    flags.customOptionHint
                    flags.enableMultiSelectSingleItemRemoval
                    maxDropdownItems
                    flags.selectedItemStaysInPlace
                    searchStringMinimumLength
                    flags.showDropdownFooter
                    valueTransformationAndValidation
            of
                Ok value ->
                    ( value, NoEffect )

                Err error ->
                    -- TODO this should return some invalid selection config
                    ( defaultSelectionConfig, ReportErrorMessage error )

        -- TODO report an error if this is an inlaid value
        optionSort =
            stringToOptionSort flags.optionSort
                |> Result.withDefault NoSorting

        -- TODO report an error if this is an inlaid value
        selectedValueEncoding =
            SelectedValueEncoding.fromMaybeString flags.selectedValueEncoding
                |> Result.withDefault SelectedValueEncoding.defaultSelectedValueEncoding

        ( initialValues, initialValueErrEffect ) =
            case SelectedValueEncoding.stringToValueStrings selectedValueEncoding flags.selectedValue of
                Ok values ->
                    ( values, NoEffect )

                Err error ->
                    ( [], ReportErrorMessage error )

        ( optionsWithInitialValueSelected, errorEffect ) =
            case Json.Decode.decodeString (Option.optionsDecoder OptionDisplay.MatureOption (SelectionMode.getOutputStyle selectionConfig)) flags.optionsJson of
                Ok options ->
                    case SelectionMode.getSelectionMode selectionConfig of
                        SelectionMode.SingleSelect ->
                            case List.head initialValues of
                                Just initialValueStr_ ->
                                    if isOptionValueInListOfOptionsByValue (OptionValue.stringToOptionValue initialValueStr_) options then
                                        let
                                            optionsWithUniqueValues =
                                                options
                                                    |> List.Extra.uniqueBy Option.getOptionValueAsString
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

                        SelectionMode.MultiSelect ->
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

        rightSlot : RightSlot
        rightSlot =
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

        initDomStateCache : SelectionConfig -> RightSlot.RightSlot -> DomStateCache
        initDomStateCache selectionConfig_ rightSlot_ =
            { allowCustomOptions =
                case SelectionMode.getCustomOptions selectionConfig_ of
                    OutputStyle.AllowCustomOptions maybeHint _ ->
                        case maybeHint of
                            Just hint ->
                                DomStateCache.CustomOptionsAllowedWithHint hint

                            Nothing ->
                                DomStateCache.CustomOptionsAllowed

                    OutputStyle.NoCustomOptions ->
                        DomStateCache.CustomOptionsNotAllowed
            , outputStyle =
                case getOutputStyle selectionConfig_ of
                    CustomHtml ->
                        DomStateCache.OutputStyleCustomHtml

                    Datalist ->
                        DomStateCache.OutputStyleDatalist
            , disabled =
                if isDisabled selectionConfig_ then
                    DomStateCache.HasDisabledAttribute

                else
                    DomStateCache.NoDisabledAttribute
            , loading =
                if RightSlot.isLoading rightSlot_ then
                    DomStateCache.HasLoadingAttribute

                else
                    DomStateCache.NoLoadingAttribute
            , showDropdownFooter =
                if showDropdownFooter selectionConfig_ then
                    DomStateCache.HasDropdownFooterAttribute

                else
                    DomStateCache.NoDropdownFooterAttribute
            }
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
      , rightSlot = rightSlot

      -- TODO Should the value casing's initial values be passed in as flags?
      , valueCasing = ValueCasing 100 45
      , selectedValueEncoding = selectedValueEncoding
      , domStateCache = initDomStateCache selectionConfig rightSlot
      }
    , batch
        [ errorEffect
        , maxDropdownItemsErrorEffect
        , searchStringMinimumLengthErrorEffect
        , initialValueErrEffect
        , ReportReady
        , makeEffectsForInitialValue
            (SelectionMode.getEventMode selectionConfig)
            (SelectionMode.getSelectionMode selectionConfig)
            selectedValueEncoding
            (selectedOptions optionsWithInitialValueSelected)
        , UpdateOptionsInWebWorker
        , valueTransformationAndValidationErrorEffect
        , selectionConfigErrorEffect
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
        , attributeChanged AttributeChanged
        , attributeRemoved AttributeRemoved
        , customOptionHintReceiver CustomOptionHintChanged
        , requestConfigState (\() -> RequestConfigState)
        , requestSelectedValues (\() -> RequestSelectedValues)
        , selectedValueEncodingChangeReceiver SelectedValueEncodingChanged
        ]


effectToDebuggingString : Effect -> String
effectToDebuggingString effect =
    case effect of
        NoEffect ->
            "NoEffect"

        Batch effects ->
            List.map effectToDebuggingString effects |> String.join " "

        FocusInput ->
            "FocusInput"

        BlurInput ->
            "BlurInput"

        InputHasBeenFocused ->
            "InputHasBeenFocused"

        InputHasBeenBlurred ->
            "InputHasBeenBlurred"

        InputHasBeenKeyUp _ _ ->
            "InputHasBeenKeyUp"

        SearchStringTouched _ ->
            "SearchStringTouched"

        UpdateOptionsInWebWorker ->
            "UpdateOptionsInWebWorker"

        SearchOptionsWithWebWorker _ ->
            "SearchOptionsWithWebWorker"

        ReportValueChanged _ _ ->
            "ReportValueChanged"

        ValueCleared ->
            "ValueCleared"

        InvalidValue _ ->
            "InvalidValue"

        CustomOptionSelected _ ->
            "CustomOptionSelected"

        ReportOptionSelected _ ->
            "ReportOptionSelected"

        ReportOptionDeselected _ ->
            "ReportOptionDeselected"

        OptionsUpdated _ ->
            "OptionsUpdated"

        SendCustomValidationRequest _ ->
            "SendCustomValidationRequest"

        ReportErrorMessage _ ->
            "ReportErrorMessage"

        ReportReady ->
            "ReportReady"

        ReportInitialValueSet _ ->
            "ReportInitialValueSet"

        FetchOptionsFromDom ->
            "FetchOptionsFromDom"

        ScrollDownToElement _ ->
            "ScrollDownToElement"

        ReportAllOptions _ ->
            "ReportAllOptions"

        DumpConfigState _ ->
            "DumpConfigState"

        DumpSelectedValues _ ->
            "DumpSelectedValues"

        ChangeTheLightDom _ ->
            "ChangeTheLightDom"

module RightSlot exposing (..)

{-| A type for (helping) keeping track of the focus state. While we are losing focus or while we are gaining focus we'll
be in transition.
-}

import Option exposing (Option)
import OptionValue
import SelectionMode exposing (OutputStyle, SelectionConfig(..), SelectionMode(..))


type FocusTransition
    = InFocusTransition
    | NotInFocusTransition


type RightSlot
    = ShowNothing
    | ShowLoadingIndicator
    | ShowDropdownIndicator FocusTransition
    | ShowClearButton
    | ShowAddButton
    | ShowAddAndRemoveButtons


updateRightSlot : RightSlot -> OutputStyle -> SelectionMode -> List Option -> RightSlot
updateRightSlot current outputStyle selectionMode selectedOptions =
    let
        hasSelectedOption =
            not (List.isEmpty selectedOptions)
    in
    case outputStyle of
        SelectionMode.CustomHtml ->
            case selectionMode of
                SingleSelect ->
                    case current of
                        ShowNothing ->
                            ShowDropdownIndicator NotInFocusTransition

                        ShowLoadingIndicator ->
                            ShowLoadingIndicator

                        ShowDropdownIndicator transitioning ->
                            ShowDropdownIndicator transitioning

                        ShowClearButton ->
                            ShowDropdownIndicator NotInFocusTransition

                        ShowAddButton ->
                            ShowDropdownIndicator NotInFocusTransition

                        ShowAddAndRemoveButtons ->
                            ShowDropdownIndicator NotInFocusTransition

                MultiSelect ->
                    case current of
                        ShowNothing ->
                            if hasSelectedOption then
                                ShowClearButton

                            else
                                ShowDropdownIndicator NotInFocusTransition

                        ShowLoadingIndicator ->
                            ShowLoadingIndicator

                        ShowDropdownIndicator focusTransition ->
                            if hasSelectedOption then
                                ShowClearButton

                            else
                                ShowDropdownIndicator focusTransition

                        ShowClearButton ->
                            if hasSelectedOption then
                                ShowClearButton

                            else
                                ShowDropdownIndicator NotInFocusTransition

                        ShowAddButton ->
                            ShowDropdownIndicator NotInFocusTransition

                        ShowAddAndRemoveButtons ->
                            ShowDropdownIndicator NotInFocusTransition

        SelectionMode.Datalist ->
            case selectionMode of
                SingleSelect ->
                    case current of
                        ShowNothing ->
                            ShowNothing

                        ShowLoadingIndicator ->
                            ShowLoadingIndicator

                        ShowDropdownIndicator _ ->
                            ShowNothing

                        ShowClearButton ->
                            ShowNothing

                        ShowAddButton ->
                            ShowNothing

                        ShowAddAndRemoveButtons ->
                            ShowNothing

                MultiSelect ->
                    let
                        showAddButtons =
                            List.any (\option -> option |> Option.getOptionValue |> OptionValue.isEmpty |> not) selectedOptions

                        showRemoveButtons =
                            List.length selectedOptions > 1

                        addAndRemoveButtonState =
                            if showAddButtons && not showRemoveButtons then
                                ShowAddButton

                            else if showAddButtons && showRemoveButtons then
                                ShowAddAndRemoveButtons

                            else
                                ShowNothing
                    in
                    case current of
                        ShowNothing ->
                            addAndRemoveButtonState

                        ShowLoadingIndicator ->
                            ShowLoadingIndicator

                        ShowDropdownIndicator _ ->
                            addAndRemoveButtonState

                        ShowClearButton ->
                            addAndRemoveButtonState

                        ShowAddButton ->
                            addAndRemoveButtonState

                        ShowAddAndRemoveButtons ->
                            addAndRemoveButtonState


updateRightSlotForDatalist : List Option -> RightSlot
updateRightSlotForDatalist selectedOptions =
    let
        showAddButtons =
            List.any (\option -> option |> Option.getOptionValue |> OptionValue.isEmpty |> not) selectedOptions

        showRemoveButtons =
            List.length selectedOptions > 1
    in
    if showAddButtons && not showRemoveButtons then
        ShowAddButton

    else if showAddButtons && showRemoveButtons then
        ShowAddAndRemoveButtons

    else
        ShowNothing


updateRightSlotLoading : RightSlot -> SelectionConfig -> List Option -> Bool -> RightSlot
updateRightSlotLoading current selectionConfig selectedOptions isLoading_ =
    if isLoading_ then
        ShowLoadingIndicator

    else
        case SelectionMode.getSelectionMode selectionConfig of
            SingleSelect ->
                case SelectionMode.getOutputStyle selectionConfig of
                    SelectionMode.CustomHtml ->
                        case current of
                            ShowNothing ->
                                ShowDropdownIndicator NotInFocusTransition

                            ShowLoadingIndicator ->
                                if List.isEmpty selectedOptions then
                                    ShowDropdownIndicator NotInFocusTransition

                                else
                                    ShowClearButton

                            ShowDropdownIndicator focusTransition ->
                                ShowDropdownIndicator focusTransition

                            ShowClearButton ->
                                ShowClearButton

                            ShowAddButton ->
                                if List.isEmpty selectedOptions then
                                    ShowDropdownIndicator NotInFocusTransition

                                else
                                    ShowClearButton

                            ShowAddAndRemoveButtons ->
                                if List.isEmpty selectedOptions then
                                    ShowDropdownIndicator NotInFocusTransition

                                else
                                    ShowClearButton

                    SelectionMode.Datalist ->
                        case current of
                            ShowNothing ->
                                ShowNothing

                            ShowLoadingIndicator ->
                                ShowNothing

                            ShowDropdownIndicator _ ->
                                ShowNothing

                            ShowClearButton ->
                                ShowNothing

                            ShowAddButton ->
                                ShowAddButton

                            ShowAddAndRemoveButtons ->
                                ShowAddAndRemoveButtons

            MultiSelect ->
                case SelectionMode.getOutputStyle selectionConfig of
                    SelectionMode.CustomHtml ->
                        case current of
                            ShowNothing ->
                                ShowNothing

                            ShowLoadingIndicator ->
                                if List.isEmpty selectedOptions then
                                    ShowDropdownIndicator NotInFocusTransition

                                else
                                    ShowClearButton

                            ShowDropdownIndicator focusTransition ->
                                ShowDropdownIndicator focusTransition

                            ShowClearButton ->
                                ShowClearButton

                            ShowAddButton ->
                                if List.isEmpty selectedOptions then
                                    ShowDropdownIndicator NotInFocusTransition

                                else
                                    ShowClearButton

                            ShowAddAndRemoveButtons ->
                                if List.isEmpty selectedOptions then
                                    ShowDropdownIndicator NotInFocusTransition

                                else
                                    ShowClearButton

                    SelectionMode.Datalist ->
                        let
                            showAddButtons =
                                List.any (\option -> option |> Option.getOptionValue |> OptionValue.isEmpty |> not) selectedOptions

                            showRemoveButtons =
                                List.length selectedOptions > 1

                            addAndRemoveButtonState =
                                if showAddButtons && not showRemoveButtons then
                                    ShowAddButton

                                else if showAddButtons && showRemoveButtons then
                                    ShowAddAndRemoveButtons

                                else
                                    ShowNothing
                        in
                        case current of
                            ShowNothing ->
                                addAndRemoveButtonState

                            ShowLoadingIndicator ->
                                addAndRemoveButtonState

                            ShowDropdownIndicator _ ->
                                addAndRemoveButtonState

                            ShowClearButton ->
                                addAndRemoveButtonState

                            ShowAddButton ->
                                addAndRemoveButtonState

                            ShowAddAndRemoveButtons ->
                                addAndRemoveButtonState


updateRightSlotTransitioning : FocusTransition -> RightSlot -> RightSlot
updateRightSlotTransitioning focusTransition rightSlot =
    case rightSlot of
        ShowDropdownIndicator _ ->
            ShowDropdownIndicator focusTransition

        _ ->
            rightSlot


isRightSlotTransitioning : RightSlot -> Bool
isRightSlotTransitioning rightSlot =
    case rightSlot of
        ShowNothing ->
            False

        ShowLoadingIndicator ->
            False

        ShowDropdownIndicator transitioning ->
            case transitioning of
                InFocusTransition ->
                    True

                NotInFocusTransition ->
                    False

        ShowClearButton ->
            False

        ShowAddButton ->
            False

        ShowAddAndRemoveButtons ->
            False


isLoading : RightSlot -> Bool
isLoading rightSlot =
    case rightSlot of
        ShowNothing ->
            False

        ShowLoadingIndicator ->
            True

        ShowDropdownIndicator _ ->
            False

        ShowClearButton ->
            False

        ShowAddButton ->
            False

        ShowAddAndRemoveButtons ->
            False

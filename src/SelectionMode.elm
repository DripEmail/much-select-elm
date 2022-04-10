module SelectionMode exposing
    ( CustomOptions(..)
    , OutputStyle(..)
    , SelectedItemPlacementMode(..)
    , SelectionMode(..)
    , SingleItemRemoval(..)
    , getCustomOptions
    , getSelectedItemPlacementMode
    , setAllowCustomOptionsWithBool
    , setMultiSelectModeWithBool
    , setSelectedItemStaysInPlace
    , stringToOutputStyle
    )


type CustomOptions
    = AllowCustomOptions
    | NoCustomOptions


type SingleItemRemoval
    = EnableSingleItemRemoval
    | DisableSingleItemRemoval


type OutputStyle
    = CustomHtml
    | Datalist


type SelectionMode
    = SingleSelect CustomOptions SelectedItemPlacementMode OutputStyle
    | MultiSelect CustomOptions SingleItemRemoval


type SelectedItemPlacementMode
    = SelectedItemStaysInPlace
    | SelectedItemMovesToTheTop


getCustomOptions : SelectionMode -> CustomOptions
getCustomOptions selectionMode =
    case selectionMode of
        SingleSelect customOptions _ _ ->
            customOptions

        MultiSelect customOptions _ ->
            customOptions


setAllowCustomOptionsWithBool : Bool -> SelectionMode -> SelectionMode
setAllowCustomOptionsWithBool bool mode =
    case mode of
        SingleSelect _ selectedItemPlacementMode outputStyle ->
            if bool then
                SingleSelect AllowCustomOptions selectedItemPlacementMode outputStyle

            else
                SingleSelect NoCustomOptions selectedItemPlacementMode outputStyle

        MultiSelect _ singleItemRemoval ->
            if bool then
                MultiSelect AllowCustomOptions singleItemRemoval

            else
                MultiSelect NoCustomOptions singleItemRemoval


getSelectedItemPlacementMode : SelectionMode -> SelectedItemPlacementMode
getSelectedItemPlacementMode selectionMode =
    case selectionMode of
        SingleSelect _ selectedItemPlacementMode _ ->
            selectedItemPlacementMode

        MultiSelect _ _ ->
            SelectedItemStaysInPlace


setSelectedItemStaysInPlace : Bool -> SelectionMode -> SelectionMode
setSelectedItemStaysInPlace selectedItemStaysInPlace selectionMode =
    case selectionMode of
        SingleSelect customOptions _ outputStyle ->
            if selectedItemStaysInPlace then
                SingleSelect customOptions SelectedItemStaysInPlace outputStyle

            else
                SingleSelect customOptions SelectedItemMovesToTheTop outputStyle

        MultiSelect _ _ ->
            selectionMode


setMultiSelectModeWithBool : Bool -> SelectionMode -> SelectionMode
setMultiSelectModeWithBool isInMultiSelectMode selectionMode =
    case selectionMode of
        SingleSelect customOptions _ _ ->
            if isInMultiSelectMode then
                MultiSelect customOptions DisableSingleItemRemoval

            else
                selectionMode

        MultiSelect customOptions _ ->
            if isInMultiSelectMode then
                selectionMode

            else
                SingleSelect customOptions SelectedItemStaysInPlace CustomHtml


stringToOutputStyle : String -> Result String OutputStyle
stringToOutputStyle string =
    case string of
        "customHtml" ->
            Ok CustomHtml

        "datalist" ->
            Ok Datalist

        _ ->
            Err "Invalid output style"

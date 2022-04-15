port module Ports exposing
    ( addOptionsReceiver
    , allOptions
    , allowCustomOptionsReceiver
    , blurInput
    , customOptionHintReceiver
    , customOptionSelected
    , deselectOptionReceiver
    , disableChangedReceiver
    , errorMessage
    , focusInput
    , initialValueSet
    , inputBlurred
    , inputKeyUp
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
    , placeholderChangedReceiver
    , removeOptionsReceiver
    , requestAllOptionsReceiver
    , scrollDropdownToElement
    , searchStringMinimumLengthChangedReceiver
    , selectOptionReceiver
    , selectedItemStaysInPlaceChangedReceiver
    , showDropdownFooterChangedReceiver
    , valueCasingDimensionsChangedReceiver
    , valueChanged
    , valueChangedReceiver
    , valueCleared
    , valueDecoder
    , valuesDecoder
    )

import Json.Decode


port muchSelectIsReady : () -> Cmd msg


port errorMessage : String -> Cmd msg


port valueChanged : List ( String, String ) -> Cmd msg


port initialValueSet : List ( String, String ) -> Cmd msg


port customOptionSelected : List String -> Cmd msg


port valueCleared : () -> Cmd msg


port optionSelected : ( String, String ) -> Cmd msg


port optionDeselected : List ( String, String ) -> Cmd msg


port inputKeyUp : String -> Cmd msg


port blurInput : () -> Cmd msg


port inputBlurred : () -> Cmd msg


port focusInput : () -> Cmd msg


port allOptions : Json.Decode.Value -> Cmd msg


port requestAllOptionsReceiver : (() -> msg) -> Sub msg


{-| This is called when options have been updated, the bool is true if all the options have been "replaced" and it's
false if the have just been "tweaked"
-}
port optionsUpdated : ( Bool, Json.Decode.Value ) -> Cmd msg


port scrollDropdownToElement : String -> Cmd msg


valuesDecoder : Json.Decode.Decoder (List String)
valuesDecoder =
    Json.Decode.oneOf
        [ Json.Decode.list Json.Decode.string
        , Json.Decode.string
            |> Json.Decode.map
                List.singleton
        ]


valueDecoder : Json.Decode.Decoder (List String)
valueDecoder =
    Json.Decode.oneOf
        [ Json.Decode.string
            |> Json.Decode.map
                List.singleton
        , Json.Decode.list Json.Decode.string
            |> Json.Decode.andThen
                (\listOfString ->
                    case listOfString of
                        [ _ ] ->
                            Json.Decode.succeed listOfString

                        _ ->
                            Json.Decode.fail "Only 1 value is allowed when in single select mode."
                )
        , Json.Decode.null []
        ]


port valueChangedReceiver : (Json.Decode.Value -> msg) -> Sub msg


port optionsReplacedReceiver : (Json.Decode.Value -> msg) -> Sub msg


port addOptionsReceiver : (Json.Decode.Value -> msg) -> Sub msg


port removeOptionsReceiver : (Json.Decode.Value -> msg) -> Sub msg


port selectOptionReceiver : (Json.Decode.Value -> msg) -> Sub msg


port deselectOptionReceiver : (Json.Decode.Value -> msg) -> Sub msg


port placeholderChangedReceiver : (String -> msg) -> Sub msg


port loadingChangedReceiver : (Bool -> msg) -> Sub msg


port disableChangedReceiver : (Bool -> msg) -> Sub msg


port multiSelectChangedReceiver : (Bool -> msg) -> Sub msg


port multiSelectSingleItemRemovalChangedReceiver : (Bool -> msg) -> Sub msg


port searchStringMinimumLengthChangedReceiver : (Int -> msg) -> Sub msg


port selectedItemStaysInPlaceChangedReceiver : (Bool -> msg) -> Sub msg


port maxDropdownItemsChangedReceiver : (Int -> msg) -> Sub msg


port showDropdownFooterChangedReceiver : (Bool -> msg) -> Sub msg


port allowCustomOptionsReceiver : (Bool -> msg) -> Sub msg


port customOptionHintReceiver : (Maybe String -> msg) -> Sub msg


port valueCasingDimensionsChangedReceiver : ({ width : Float, height : Float } -> msg) -> Sub msg


port optionSortingChangedReceiver : (String -> msg) -> Sub msg

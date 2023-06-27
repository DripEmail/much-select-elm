module GroupedDropdownOptions exposing (DropdownOptionsGroup, GroupedDropdownOptions, dropdownOptionsToDatalistHtml, getOptions, getOptionsGroup, groupOptionsInOrder, optionGroupsToHtml, test_DropdownOptionsGroupToStringAndOptions)

import DropdownOptions exposing (DropdownItemEventListeners, DropdownOptions, dropdownOptionsToDatalistOption, optionsToCustomHtml)
import Html exposing (Html, div, optgroup, span, text)
import Html.Attributes exposing (class)
import Option exposing (Option, OptionGroup, optionGroupToString)
import OptionPresentor exposing (tokensToHtml)
import SelectionMode exposing (SelectionConfig)


type alias GroupedDropdownOptions =
    List DropdownOptionsGroup


type DropdownOptionsGroup
    = DropdownOptionsGroup OptionGroup DropdownOptions


groupOptionsInOrder : DropdownOptions -> GroupedDropdownOptions
groupOptionsInOrder options =
    DropdownOptions.groupInOrder options
        |> List.map (\( group, options_ ) -> DropdownOptionsGroup group options_)


getOptions : DropdownOptionsGroup -> DropdownOptions
getOptions group =
    case group of
        DropdownOptionsGroup _ dropdownOptions ->
            dropdownOptions


getOptionsGroup : DropdownOptionsGroup -> OptionGroup
getOptionsGroup dropdownOptionsGroup =
    case dropdownOptionsGroup of
        DropdownOptionsGroup optionGroup _ ->
            optionGroup


test_DropdownOptionsGroupToStringAndOptions : GroupedDropdownOptions -> List ( String, List String )
test_DropdownOptionsGroupToStringAndOptions dropdownOptionsGroups =
    List.map
        (\optionsGroup ->
            ( optionsGroup
                |> getOptionsGroup
                |> optionGroupToString
            , optionsGroup
                |> getOptions
                |> DropdownOptions.test_getOptions
                |> List.map Option.test_optionToDebuggingString
            )
        )
        dropdownOptionsGroups


optionGroupsToHtml : DropdownItemEventListeners msg -> SelectionConfig -> GroupedDropdownOptions -> List (Html msg)
optionGroupsToHtml dropdownItemEventListeners selectionConfig groupedDropdownOptions =
    List.concatMap (optionGroupToHtml dropdownItemEventListeners selectionConfig) groupedDropdownOptions


optionGroupToHtml : DropdownItemEventListeners msg -> SelectionConfig -> DropdownOptionsGroup -> List (Html msg)
optionGroupToHtml dropdownItemEventListeners selectionMode dropdownOptionsGroup =
    let
        optionGroupHtml =
            case dropdownOptionsGroup |> getOptions |> DropdownOptions.maybeFirstOptionSearchFilter of
                Just optionSearchFilter ->
                    case dropdownOptionsGroup |> getOptionsGroup |> Option.optionGroupToString of
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
                    case dropdownOptionsGroup |> getOptionsGroup |> Option.optionGroupToString of
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
    optionGroupHtml :: optionsToCustomHtml dropdownItemEventListeners selectionMode (getOptions dropdownOptionsGroup)


dropdownOptionsToDatalistHtml : DropdownOptions -> Html msg
dropdownOptionsToDatalistHtml options =
    Html.datalist
        [ Html.Attributes.id "datalist-options" ]
        (dataListOptionGroupToHtml
            (groupOptionsInOrder options)
        )


dataListOptionGroupToHtml : GroupedDropdownOptions -> List (Html msg)
dataListOptionGroupToHtml groupedDropdownOptions =
    List.concatMap
        (\(DropdownOptionsGroup optionGroup dropdownOptions) ->
            case Option.optionGroupToString optionGroup of
                "" ->
                    dropdownOptionsToDatalistOption dropdownOptions

                optionGroupAsString ->
                    -- TODO I don't think this case "does" anything. `DatalistOption` does hot have an option group.
                    [ optgroup
                        [ Html.Attributes.attribute "label" optionGroupAsString ]
                        (dropdownOptionsToDatalistOption dropdownOptions)
                    ]
        )
        groupedDropdownOptions

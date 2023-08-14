module DomStateCache exposing (CustomOptionsAttribute(..), DisabledAttribute(..), DomStateCache, DropdownFooterAttribute(..), LoadingAttribute(..), OutputStyleAttribute(..), updateAllowCustomOptions, updateDisabledAttribute, updateDropdownFooterAttribute, updateLoadingAttribute, updateOutputStyle)


type alias DomStateCache =
    { allowCustomOptions : CustomOptionsAttribute
    , outputStyle : OutputStyleAttribute
    , disabled : DisabledAttribute
    , loading : LoadingAttribute
    , showDropdownFooter : DropdownFooterAttribute
    }


type CustomOptionsAttribute
    = CustomOptionsNotAllowed
    | CustomOptionsAllowed
    | CustomOptionsAllowedWithHint String


type OutputStyleAttribute
    = OutputStyleDatalist
    | OutputStyleCustomHtml


type DisabledAttribute
    = HasDisabledAttribute
    | NoDisabledAttribute


type LoadingAttribute
    = HasLoadingAttribute
    | NoLoadingAttribute


type DropdownFooterAttribute
    = HasDropdownFooterAttribute
    | NoDropdownFooterAttribute


updateAllowCustomOptions : CustomOptionsAttribute -> DomStateCache -> DomStateCache
updateAllowCustomOptions customOptions domStateCache =
    { domStateCache | allowCustomOptions = customOptions }


updateOutputStyle : OutputStyleAttribute -> DomStateCache -> DomStateCache
updateOutputStyle outputStyleAttribute domStateCache =
    { domStateCache | outputStyle = outputStyleAttribute }


updateDisabledAttribute : DisabledAttribute -> DomStateCache -> DomStateCache
updateDisabledAttribute disabledAttribute domStateCache =
    { domStateCache | disabled = disabledAttribute }


updateLoadingAttribute : LoadingAttribute -> DomStateCache -> DomStateCache
updateLoadingAttribute loadingAttribute domStateCache =
    { domStateCache | loading = loadingAttribute }


updateDropdownFooterAttribute : DropdownFooterAttribute -> DomStateCache -> DomStateCache
updateDropdownFooterAttribute dropdownFooterAttribute domStateCache =
    { domStateCache | showDropdownFooter = dropdownFooterAttribute }

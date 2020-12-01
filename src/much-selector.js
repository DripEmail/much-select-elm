// noinspection ES6CheckImport
import { Elm } from "./Main.elm";

const buildOptionsFromSelectElement = (selectElement) => {
  const options = [];
  const optionElements = selectElement.querySelectorAll("option");
  optionElements.forEach((optionElement, optionIndex) => {
    let value;
    if (optionElement.hasAttribute("value")) {
      value = optionElement.getAttribute("value");
    } else {
      value = optionElement.innerText;
    }
    const option = { value };
    option.label = optionElement.innerText;
    option.index = optionIndex;
    if (optionElement.hasAttribute("selected")) {
      const optionSelectedValue = optionElement.getAttribute("selected");
      option.selected = optionSelectedValue !== "false";
    }
    if (optionElement.parentElement.tagName === "OPTGROUP") {
      option.group = optionElement.parentElement.getAttribute("label");
    }
    if (optionElement.dataset.description) {
      option.description = optionElement.dataset.description;
    }
    option.disabled = optionElement.hasAttribute("disabled");
    options.push(option);
  });
  return options;
};

// adapted from https://github.com/thread/elm-web-components

class MuchSelector extends HTMLElement {
  constructor() {
    super();

    /**
     * @type {string|null}
     * @private
     */
    this._selected = null;

    /**
     * @type {string|null}
     * @private
     */
    this._placeholder = null;

    /**
     * @type {boolean}
     * @private
     */
    this._disabled = false;

    /**
     * @type {boolean}
     * @private
     */
    this._loading = false;

    /**
     * @type {null|object}
     * @private
     */
    this._app = null;
  }

  static get observedAttributes() {
    return ["selected", "disabled", "placeholder", "loading"];
  }

  // noinspection JSUnusedGlobalSymbols
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "selected") {
      if (oldValue !== newValue) {
        this.selected = newValue;
      }
    } else if (name === "placeholder") {
      if (oldValue !== newValue) {
        this.placeholder = newValue;
      }
    } else if (name === "disabled") {
      if (oldValue !== newValue) {
        this.disabled = newValue;
      }
    } else if (name === "loading") {
      if (oldValue !== newValue) {
        this.loading = newValue;
      }
    }
  }

  // noinspection JSUnusedGlobalSymbols
  connectedCallback() {
    // eslint-disable-next-line no-useless-catch
    try {
      const flags = this.buildFlags();

      // User shadow DOM.
      const parentDiv = this.attachShadow({ mode: "open" });

      const elmDiv = document.createElement("div");

      parentDiv.innerHTML = "";
      parentDiv.appendChild(this.styleTag);
      parentDiv.appendChild(elmDiv);

      // noinspection JSUnresolvedVariable
      this._app = Elm.Main.init({
        flags,
        node: elmDiv,
      });

      // noinspection JSUnresolvedVariable,JSIgnoredPromiseFromCall
      this._app.ports.valueChanged.subscribe(
        this.valueChangedHandler.bind(this)
      );
    } catch (error) {
      // TODO Do something interesting here
      throw error;
    }
  }

  buildFlags() {
    const flags = {};
    if (this.selected) {
      flags.value = this.selected;
    } else {
      flags.value = "";
    }

    if (this.hasAttribute("placeholder")) {
      flags.placeholder = this.getAttribute("placeholder").trim();
    } else {
      flags.placeholder = "";
    }

    if (this.hasAttribute("size")) {
      flags.size = this.getAttribute("size").trim();
    } else {
      flags.size = "";
    }

    if (this.hasAttribute("multi-select")) {
      flags.allowMultiSelect = this.getAttribute("multi-select") !== "false";
    } else {
      flags.allowMultiSelect = false;
    }

    flags.disabled = this.disabled;
    flags.loading = this.loading;

    const selectElement = this.querySelector("select");
    if (selectElement) {
      flags.optionsJson = JSON.stringify(
        buildOptionsFromSelectElement(selectElement)
      );
    } else {
      flags.optionsJson = JSON.stringify([]);
    }

    return flags;
  }

  valueChangedHandler(valuesTuple) {
    // TODO perhaps this delimiter should be configurable
    this.selected = valuesTuple.map((valueTuple) => valueTuple[0]).join(",");
  }

  get selected() {
    return this._selected;
  }

  set selected(value) {
    this.setAttribute("selected", value);

    if (value) {
      // TODO perhaps this delimiter should be configurable
      const values = value.split(",");

      // TODO Convert this._app to a function that get a promise that returns _app
      //  when it is ready.
      // noinspection JSUnresolvedVariable
      this._app.ports.valueChangedReceiver.send(values);
    } else {
      // TODO Convert this._app to a function that get a promise that returns _app
      //  when it is ready.
      // noinspection JSUnresolvedVariable
      this._app.ports.valueChangedReceiver.send([]);
    }
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(placeholder) {
    this.setAttribute("placeholder", placeholder);
    // TODO Convert this._app to a function that get a promise that returns _app
    //  when it is ready.
    // noinspection JSUnresolvedVariable
    this._app.ports.placeholderChangedReceiver.send(placeholder);

    this._placeholder = placeholder;
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    if (value === "false") {
      this._disabled = false;
    } else {
      this._disabled = !!value;
    }

    if (this._disabled) {
      this.setAttribute("disabled", "disabled");
    } else {
      this.removeAttribute("disabled");
    }
    // noinspection JSUnresolvedVariable
    this._app.ports.disableChangedReceiver.send(this._disabled);
  }

  get loading() {
    return this._loading;
  }

  set loading(value) {
    if (value === "false") {
      this._loading = false;
    } else {
      this._loading = !!value;
    }
    if (this._loading) {
      this.setAttribute("loading", "loading");
    } else {
      this.removeAttribute("loading");
    }
    // noinspection JSUnresolvedVariable
    this._app.ports.loadingChangedReceiver.send(this._loading);
  }

  // eslint-disable-next-line class-methods-use-this
  get styleTag() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `

      #input-filter {
        height: 40px;
        font-size: 25px;
      }
      #dropdown {
        background-color: #EEEEEE;
        display: none;
        padding: 5px;
        position: absolute;
        top: 50px;
        left: 0px;
        font-size: 20px;
        min-width: 200px;
      }
      #dropdown.showing {
        display: inline-block;
      }
      #dropdown.hiding {
        display: none;
      }
      .optgroup {
        background-color: gray;
        font-size: 0.85rem;
        font-weight: 300;
        padding: 5px;
      }
      .option {
        background-color: silver;
        padding: 5px;
        cursor: pointer;
      }

      .option.selected {
        background-color: darkslategrey;
        color: ghostwhite;
        cursor: pointer;
      }

      .option.highlighted {
        background-color: indigo;
        color: ghostwhite;
      }

      .option.disabled {
        display: none;
      }

      .description {
        font-size: 0.85rem;
        padding: 3px;
      }
      .highlight { color: blue }`;

    return styleTag;
  }
}

export default MuchSelector;

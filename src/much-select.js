// noinspection ES6CheckImport
import { Elm } from "./Main.elm";

import asciiFold from "./ascii-fold.js";

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
    option.labelClean = asciiFold(optionElement.innerText);
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
      option.descriptionClean = asciiFold(option.description);
    }
    option.disabled = optionElement.hasAttribute("disabled");
    options.push(option);
  });
  return options;
};

const notNullOrUndefined = (thing) => thing !== null && thing !== undefined;

const stringToOptionObject = (str) => ({
  value: str,
  label: str,
  labelClean: asciiFold(str),
});

const numberToOptionObject = (num) => ({
  value: `${num}`,
  label: `${num}`,
  labelClean: `${num}`,
});

const cleanUpOption = (option) => {
  if (typeof option === "string") {
    return stringToOptionObject(option);
  }
  if (typeof option === "number") {
    return numberToOptionObject(option);
  }
  if (typeof option === "object") {
    const optionMap = new Map();
    if (notNullOrUndefined(option.value)) {
      optionMap.set("value", `${option.value}`);
    }

    if (notNullOrUndefined(option.label)) {
      optionMap.set("label", `${option.label}`);
    }

    if (notNullOrUndefined(option.description)) {
      optionMap.set("description", option.description);
    }

    if (notNullOrUndefined(option.disabled)) {
      optionMap.set("disabled", !!option.disabled);
    }

    if (notNullOrUndefined(option.index)) {
      if (typeof option.index === "number") {
        optionMap.set("index", Math.floor(option.index));
      } else {
        throw new TypeError("option index in not a valid value");
      }
    }

    if (optionMap.has("value") && !optionMap.has("label")) {
      return {
        label: optionMap.get("value"),
        labelClean: asciiFold(optionMap.get("value")),
        value: optionMap.get("value"),
        description: optionMap.get("description"),
        descriptionClean: asciiFold(optionMap.get("description")),
        disabled: optionMap.get("disabled"),
        index: optionMap.get("index"),
      };
    }
    if (optionMap.has("label") && !optionMap.has("value")) {
      return {
        label: optionMap.get("label"),
        labelClean: asciiFold(optionMap.get("label")),
        value: optionMap.get("label"),
        description: optionMap.get("description"),
        descriptionClean: asciiFold(optionMap.get("description")),
        disabled: optionMap.get("disabled"),
        index: optionMap.get("index"),
      };
    }
    return {
      label: optionMap.get("label"),
      labelClean: asciiFold(optionMap.get("label")),
      value: optionMap.get("value"),
      description: optionMap.get("description"),
      descriptionClean: asciiFold(optionMap.get("description")),
      disabled: optionMap.get("disabled"),
      index: optionMap.get("index"),
    };
  }

  throw new TypeError("Invalid option");
};

const cleanUpOptions = (options) => options.map(cleanUpOption);

const makeDebouncedFunc = (func, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const makeDebounceLeadingFunc = (func, delay = 250) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      func(...args);
    }, delay);
  };
};

/**
 * Takes a value from a getAttribute call and converts it to a boolean value.
 * @param value {string}
 * @returns {boolean}
 */
const booleanAttributeValueToBool = (value) => {
  if (value === "false") {
    return false;
  }
  if (value === "") {
    return true;
  }
  return !!value;
};

// adapted from https://github.com/thread/elm-web-components

class MuchSelect extends HTMLElement {
  constructor() {
    super();

    /**
     * Used in the CSS and elsewhere to determine what the
     *  minimum width should be.
     * TODO Perhaps this should be a property or attribute.
     * @type {number}
     * @private
     */
    this._minimumWidth = 200;

    this._minimumHeight = 20;

    /**
     * @type {string|null}
     * @private
     */
    this._selectedValue = null;

    /**
     * This is controlled by the events-only attribute.
     * If this is true, no changes to the light DOM should
     * happen automatically.
     *
     * @type {boolean}
     * @private
     */
    this._eventsOnlyMode = false;

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
     * @type {number}
     * @private
     */
    this._maxDropdownItems = 10000;

    /**
     * There's a footer we can show in the dropdown that gives a summary of how many options are available.
     * @type {boolean}
     * @private
     */
    this._showDropdownFooter = false;

    /**
     * As the user types to filter the search results, what is the minimum number of character they need to type before
     *  the options are filtered.
     *
     * @type {number}
     * @private
     */
    this._searchStringMinimumLength = 2;

    /**
     * @type {boolean}
     * @private
     */
    this._isInMultiSelectMode = false;

    /**
     * @type {boolean}
     * @private
     */
    this._isInMultiSelectModeWithSingleItemRemoval = false;

    /**
     * @type {boolean}
     * @private
     */
    this._allowCustomOptions = false;

    /**
     * @type {string|null}
     * @private
     */
    this._customOptionHint = null;

    /**
     * @type {string}
     * @private
     */
    this._optionSorting = "no-sorting";

    /**
     * @type {boolean}
     * @private
     */
    this._selectedItemStaysInPlace = true;

    /**
     * Depending on what you've got going on, you may want different
     * schemes for encoding the selected values. There are some choices.
     *  - comma (default) - just making the values' comma separated (problematic if you have commas in your values)
     *  - json
     * @type {string}
     * @private
     */
    this._selectedValueEncoding = "comma";

    /**
     * Specify how the much-select should be rendered. The following styles are all options
     *  - customHtml (default)
     *  - datalist
     * @type {string}
     * @private
     */
    this._outputStyle = "customHtml";

    /**
     * @type {null|object}
     * @private
     */
    this._app = null;

    /**
     * @type {boolean}
     * @private
     */
    this._connected = false;

    /**
     * Once we see a value change come through, set this to true, then
     * when the much-select blurs, emmit the event and set it to false.
     * @type {boolean}
     * @private
     */
    this._emitBlurOrUnfocusedValueChanged = false;

    /**
     * @type {null|MutationObserver}
     * @private
     */
    this._muchSelectObserver = null;

    /**
     * @type {null|MutationObserver}
     * @private
     */
    this._selectSlotObserver = null;

    this._inputKeypressDebounceHandler = makeDebouncedFunc((searchString) => {
      this.dispatchEvent(
        new CustomEvent("inputKeyUpDebounced", {
          bubbles: true,
          detail: { searchString },
        })
      );
    });

    this._callValueCasingWidthUpdate = makeDebounceLeadingFunc(
      (width, height) => {
        this.appPromise.then((app) => {
          // noinspection JSUnresolvedVariable
          app.ports.valueCasingDimensionsChangedReceiver.send({
            width,
            height,
          });
        });
      },
      5
    );

    this._callOptionChanged = makeDebounceLeadingFunc((optionsJson) => {
      this.appPromise.then((app) => {
        // noinspection JSUnresolvedVariable
        app.ports.optionsReplacedReceiver.send(optionsJson);
        this.updateDimensions();
      });
    }, 5);

    this._callValueChanged = makeDebounceLeadingFunc((newValue) => {
      this.appPromise.then((app) => {
        // noinspection JSUnresolvedVariable
        app.ports.valueChangedReceiver.send(newValue);
      });
    }, 5);

    // noinspection JSUnresolvedFunction
    this._resizeObserver = new ResizeObserver(() => {
      // When the size changes we need to tell Elm, so it can
      //  adjust things like the width of the dropdown.
      this.updateDimensions();
    });
  }

  static get observedAttributes() {
    return [
      "allow-custom-options",
      "disabled",
      "events-only",
      "loading",
      "max-dropdown-items",
      "multi-select",
      "multi-select-single-item-removal",
      "option-sorting",
      "output-style",
      "placeholder",
      "search-string-minimum-length",
      "selected-option-goes-to-top",
      "selected-value",
      "selected-value-encoding",
      "show-dropdown-footer",
    ];
  }

  // noinspection JSUnusedGlobalSymbols
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "allow-custom-options") {
      if (oldValue !== newValue) {
        this.allowCustomOptions = newValue;
        this.customOptionHint = newValue;
      }
    } else if (name === "disabled") {
      if (oldValue !== newValue) {
        this.disabled = newValue;
      }
    } else if (name === "events-only") {
      if (oldValue !== newValue) {
        this.eventsOnlyMode = newValue;
      }
    } else if (name === "loading") {
      if (oldValue !== newValue) {
        this.loading = newValue;
      }
    } else if (name === "max-dropdown-items") {
      if (oldValue !== newValue) {
        this.maxDropdownItems = newValue;
      }
    } else if (name === "multi-select") {
      if (oldValue !== newValue) {
        this.isInMultiSelectMode = newValue;
      }
    } else if (name === "multi-select-single-item-removal") {
      if (oldValue !== newValue) {
        this.isInMultiSelectModeWithSingleItemRemoval = newValue;
      }
    } else if (name === "placeholder") {
      if (oldValue !== newValue) {
        this.updateDimensions();
        this.placeholder = newValue;
      }
    } else if (name === "option-sorting") {
      if (oldValue !== newValue) {
        this.optionSorting = newValue;
      }
    } else if (name === "output-style") {
      if (oldValue !== newValue) {
        this.outputStyle = newValue;
      }
    } else if (name === "search-string-minimum-length") {
      if (oldValue !== newValue) {
        this.searchStringMinimumLength = newValue;
      }
    } else if (name === "selected-option-goes-to-top") {
      if (oldValue !== newValue) {
        this.selectedItemGOesToTop = newValue;
      }
    } else if (name === "selected-value") {
      if (oldValue !== newValue) {
        this.updateDimensions();
        this.selectedValue = newValue;
      }
    } else if (name === "selected-value-encoding") {
      if (oldValue !== newValue) {
        this.updateDimensions();
        this.selectedValueEncoding = newValue;
      }
    } else if (name === "show-dropdown-footer") {
      if (oldValue !== newValue) {
        this.showDropdownFooter = newValue;
      }
    }
  }

  // noinspection JSUnusedGlobalSymbols
  connectedCallback() {
    this.parentDivPromise.then((parentDiv) => {
      const wrapperDiv = parentDiv.querySelector("#wrapper");
      this._resizeObserver.observe(wrapperDiv);

      parentDiv.addEventListener("mousedown", (evt) => {
        // This stops the dropdown from flashes when the user clicks
        //  on an optgroup. And it kinda makes sense. we don't want
        //  mousedown events escaping and effecting the DOM.
        evt.stopImmediatePropagation();
        evt.preventDefault();
      });
    });

    // noinspection JSUnresolvedVariable,JSIgnoredPromiseFromCall
    this.appPromise.then((app) =>
      app.ports.muchSelectIsReady.subscribe(() => {
        this.dispatchEvent(new CustomEvent("ready", { bubbles: true }));
        this.dispatchEvent(new CustomEvent("muchSelectReady"));
      })
    );

    // noinspection JSUnresolvedVariable,JSIgnoredPromiseFromCall
    this.appPromise.then((app) =>
      app.ports.errorMessage.subscribe(this.errorHandler.bind(this))
    );

    // noinspection JSUnresolvedVariable,JSIgnoredPromiseFromCall
    this.appPromise.then((app) =>
      app.ports.initialValueSet.subscribe((initialValues) => {
        this.valueChangedHandler(initialValues, true);
      })
    );

    // noinspection JSUnresolvedVariable,JSIgnoredPromiseFromCall
    this.appPromise.then((app) =>
      app.ports.valueChanged.subscribe(this.valueChangedHandler.bind(this))
    );

    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.optionSelected.subscribe((valueLabelPair) => {
        this.dispatchEvent(
          new CustomEvent("optionSelected", {
            bubbles: true,
            detail: {
              value: valueLabelPair[0],
              label: valueLabelPair[1],
            },
          })
        );
        // The addItem event is for backwards compatibility.
        this.dispatchEvent(
          new CustomEvent("addItem", {
            bubbles: true,
            detail: {
              value: valueLabelPair[0],
              label: valueLabelPair[1],
            },
          })
        );
      })
    );

    this.appPromise.then((app) => {
      app.ports.optionsUpdated.subscribe((optionsReplaced) => {
        this.dispatchEvent(
          new CustomEvent("optionsUpdated", {
            bubbles: true,
            detail: {
              optionsReplaced,
              optionsUpdated: !optionsReplaced,
            },
          })
        );
      });
    });

    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.inputKeyUp.subscribe((searchString) => {
        this.dispatchEvent(
          new CustomEvent("inputKeyUp", {
            bubbles: true,
            detail: { searchString },
          })
        );

        this._inputKeypressDebounceHandler(searchString);
      })
    );

    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.valueCleared.subscribe(() => {
        this.dispatchEvent(
          new CustomEvent("valueCleared", {
            bubbles: true,
          })
        );
        // The cleared event is for backwards compatibility.
        this.dispatchEvent(
          new CustomEvent("cleared", {
            bubbles: true,
          })
        );
      })
    );

    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.customOptionSelected.subscribe(
        this.customOptionSelected.bind(this)
      )
    );

    // noinspection JSUnresolvedVariable,JSIgnoredPromiseFromCall
    this.appPromise.then((app) =>
      app.ports.blurInput.subscribe(() => {
        // This port is called to "force" a blur.
        const inputFilterElement =
          this.shadowRoot.getElementById("input-filter");
        if (inputFilterElement) {
          inputFilterElement.blur();
        }
      })
    );

    // noinspection JSUnresolvedVariable,JSIgnoredPromiseFromCall
    this.appPromise.then((app) =>
      app.ports.inputBlurred.subscribe(() => {
        // This port is called AFTER the input has been blurred.
        if (this._emitBlurOrUnfocusedValueChanged) {
          this._emitBlurOrUnfocusedValueChanged = false;

          this.dispatchEvent(
            new CustomEvent("blurOrUnfocusedValueChanged", {
              bubbles: true,
              detail: {
                value: this.selectedValue,
              },
            })
          );
        }
      })
    );

    // noinspection JSUnresolvedVariable,JSIgnoredPromiseFromCall
    this.appPromise.then((app) =>
      app.ports.focusInput.subscribe(() => {
        window.requestAnimationFrame(() => {
          const inputFilterElement =
            this.shadowRoot.getElementById("input-filter");
          if (inputFilterElement) {
            this.shadowRoot.getElementById("input-filter").focus();
          }
        });
      })
    );

    // noinspection JSUnresolvedVariable,JSIgnoredPromiseFromCall
    this.appPromise.then((app) =>
      app.ports.optionDeselected.subscribe((deselectedValue) => {
        const formattedValue = {
          label: deselectedValue[0][1],
          value: deselectedValue[0][0],
        };
        this.dispatchEvent(
          new CustomEvent("optionDeselected", {
            bubbles: true,
            detail: formattedValue,
          })
        );
        this.dispatchEvent(
          new CustomEvent("deselectItem", {
            bubbles: true,
            detail: formattedValue,
          })
        );
      })
    );

    // noinspection JSUnresolvedVariable,JSIgnoredPromiseFromCall
    this.appPromise.then((app) =>
      app.ports.scrollDropdownToElement.subscribe(() => {
        const dropdown = this.shadowRoot.getElementById("dropdown");
        const highlightedOption = this.shadowRoot.querySelector(
          "#dropdown .option.highlighted"
        );

        // If we found the highlight option AND there are vertical scroll bars
        //  then scroll the dropdown to the highlighted option.
        if (highlightedOption) {
          if (dropdown.scrollHeight > dropdown.clientHeight) {
            const optionHeight = highlightedOption.clientHeight;
            const optionTop = highlightedOption.offsetTop - optionHeight;
            const optionBottom = optionTop + optionHeight + optionHeight;
            const dropdownTop = dropdown.scrollTop;
            const dropdownBottom = dropdownTop + dropdown.clientHeight;

            if (!(optionTop >= dropdownTop && optionBottom <= dropdownBottom)) {
              dropdown.scrollTop = optionTop;
            }
          }
        }
      })
    );

    this.startMuchSelectObserver();

    this.startSelectSlotObserver();

    // Set up the hidden input slot (if it exists) with any initial values
    this.updateHiddenInputValueSlot();

    this._connected = true;
  }

  startMuchSelectObserver() {
    // Options for the observer (which mutations to observe)
    const muchSelectMutationObserverConfig = {
      attributes: true,
      childList: true,
      subtree: false,
      characterData: false,
    };

    this._muchSelectObserver = new MutationObserver((mutationsList) => {
      mutationsList.forEach(() => {
        this.updateOptionsFromDom();
      });
    });
    this._muchSelectObserver.observe(this, muchSelectMutationObserverConfig);
  }

  stopMuchSelectObserver() {
    if (this._muchSelectObserver) {
      if (this._muchSelectObserver.disconnect) {
        this._muchSelectObserver.disconnect();
      }
    }
  }

  startSelectSlotObserver() {
    // Options for the observer (which mutations to observe)
    const selectSlotConfig = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    };

    this._selectSlotObserver = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === "childList") {
          this.updateOptionsFromDom();
        } else if (mutation.type === "attributes") {
          this.updateOptionsFromDom();
        }
      });
    });

    const selectElement = this.querySelector("select[slot='select-input']");
    if (selectElement) {
      this._selectSlotObserver.observe(
        this.querySelector("select[slot='select-input']"),
        selectSlotConfig
      );
    }
  }

  stopSelectSlotObserver() {
    if (this._selectSlotObserver) {
      if (this._selectSlotObserver.disconnect) {
        this._selectSlotObserver.disconnect();
      }
    }
  }

  updateOptionsFromDom() {
    const selectElement = this.querySelector("select[slot='select-input']");
    if (selectElement) {
      const optionsJson = buildOptionsFromSelectElement(selectElement);
      this._callOptionChanged(optionsJson);
    }
  }

  // noinspection JSUnusedGlobalSymbols
  disconnectedCallback() {
    this._resizeObserver.disconnect();
    if (this._selectSlotObserver) {
      this._selectSlotObserver.disconnect();
    }

    this._connected = false;
  }

  updateHiddenInputValueSlot() {
    if (!this.eventsOnlyMode) {
      const hiddenValueInput = this.querySelector(
        "[slot='hidden-value-input']"
      );
      if (hiddenValueInput) {
        if (this.selectedValue === null) {
          hiddenValueInput.setAttribute("value", "");
        } else if (this.selectedValue === undefined) {
          hiddenValueInput.setAttribute("value", "");
        } else {
          hiddenValueInput.setAttribute("value", this.selectedValue);
        }
      }
    }
  }

  /**
   * The idea with this method is that we need the selected input slot to mirror the internal state of the
   * much select, unless something else wants full control over the DOM (eventsOnlyMode is true), then we leave that
   * responsibility to them.
   *
   * One important thing that happens here is we need to pause the mutation observers so
   *  that we do not feed bad data back into the Elm app. Then when we are done changing
   *  the DOM, turn the mutation observers back on.
   */
  updateSelectInputSlot() {
    if (!this.eventsOnlyMode) {
      this.stopMuchSelectObserver();
      this.stopSelectSlotObserver();
      const selectInputSlot = this.querySelector("[slot='select-input']");
      if (selectInputSlot) {
        selectInputSlot.querySelectorAll("option").forEach((optionEl) => {
          if (optionEl.selected) {
            if (!this.isValueSelected(optionEl.value)) {
              optionEl.removeAttribute("selected");
            }
          } else if (this.isValueSelected(optionEl.value)) {
            optionEl.setAttribute("selected", "");
          }
        });
      }
      this.startMuchSelectObserver();
      this.startSelectSlotObserver();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  errorHandler(error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  /**
   * This method updates the width this widget when it's not selected, so when
   *  it is selected it matches the input element.
   * This needs to be called very time the options or the values change or
   *  anything else that might change the height or width of the much-select.
   * It waits for 1 frame before doing calculating what the height and width
   *  should be.
   */
  updateDimensions() {
    window.requestAnimationFrame(() => {
      // noinspection JSUnresolvedVariable,JSIgnoredPromiseFromCall
      this.appPromise.then(() => {
        // We run this code in here because the shadow root won't be available until the
        //  elm app is ready.
        const valueCasingElement =
          this.shadowRoot.getElementById("value-casing");
        if (valueCasingElement) {
          let width = valueCasingElement.offsetWidth;
          let height = valueCasingElement.offsetHeight;

          // Prevent the width from falling below this threshold.
          if (width < this._minimumWidth) {
            width = this._minimumWidth;
          }

          // Prevent the height from falling below this threshold.
          if (height < this._minimumHeight) {
            height = this._minimumHeight;
          }

          this._callValueCasingWidthUpdate(width, height);
        }
      });
    });
  }

  buildFlags() {
    const flags = {};

    flags.allowMultiSelect = this.isInMultiSelectMode;

    if (this.hasAttribute("multi-select-single-item-removal")) {
      flags.enableMultiSelectSingleItemRemoval =
        this.getAttribute("multi-select-single-item-removal").trim() === "true";
    } else {
      flags.enableMultiSelectSingleItemRemoval = false;
    }

    flags.value = this.parsedSelectedValue;

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

    if (this.hasAttribute("search-string-minimum-length")) {
      flags.searchStringMinimumLength = parseInt(
        this.getAttribute("search-string-minimum-length").trim(),
        10
      );
    } else {
      flags.searchStringMinimumLength = this.searchStringMinimumLength;
    }

    if (this.hasAttribute("show-dropdown-footer")) {
      flags.showDropdownFooter = booleanAttributeValueToBool(
        this.getAttribute("show-dropdown-footer")
      );
    } else {
      flags.showDropdownFooter = false;
    }

    if (this.hasAttribute("option-sorting")) {
      flags.optionSort = this.getAttribute("option-sorting");
    } else {
      flags.optionSort = "no-sorting";
    }

    if (
      this.hasAttribute("output-style") &&
      MuchSelect.isValidOutputStyle(this.getAttribute("output-style"))
    ) {
      flags.outputStyle = this.getAttribute("output-style");
    } else {
      flags.outputStyle = this.outputStyle;
    }

    flags.disabled = this.disabled;
    flags.loading = this.loading;
    flags.selectedItemStaysInPlace = this.selectedItemStaysInPlace;
    flags.maxDropdownItems = this.maxDropdownItems;
    flags.allowCustomOptions = this.allowCustomOptions;
    flags.customOptionHint = this.customOptionHint;

    const selectElement = this.querySelector("select[slot='select-input']");
    if (selectElement) {
      flags.optionsJson = JSON.stringify(
        buildOptionsFromSelectElement(selectElement)
      );
    } else {
      flags.optionsJson = JSON.stringify([]);
    }

    return flags;
  }

  /**
   * This method gets called any time the Elm app changes the value of this much select.
   * An "outgoing port" if you will.
   *
   * The selected values always come in an array of tuples, the first part of the tuple
   * being the value, and the second part being the label.
   *
   * @param {array} valuesTuple
   * @param {boolean} isInitialValueChange - This prevents events from being emitted while things are getting setup.
   */
  valueChangedHandler(valuesTuple, isInitialValueChange = false) {
    if (this.isInMultiSelectMode) {
      this.parsedSelectedValue = valuesTuple.map((valueTuple) => valueTuple[0]);
    } else {
      const valueAsArray = valuesTuple.map((valueTuple) => valueTuple[0]);
      if (valueAsArray.length === 0) {
        this.parsedSelectedValue = "";
      } else if (valueAsArray.length > 0) {
        [this.parsedSelectedValue] = valueAsArray;
      }
    }

    this._emitBlurOrUnfocusedValueChanged = true;

    this.updateDimensions();
    if (
      this.hasAttribute("multi-select") &&
      this.getAttribute("multi-select") !== "false"
    ) {
      // If we are in multi select mode put the list of values in the event.
      const valuesObj = valuesTuple.map((valueTuple) => ({
        value: valueTuple[0],
        label: valueTuple[1],
      }));
      if (!isInitialValueChange) {
        this.dispatchEvent(
          new CustomEvent("valueChanged", {
            bubbles: true,
            detail: { values: valuesObj },
          })
        );
        // The change event is for backwards compatibility.
        this.dispatchEvent(
          new CustomEvent("change", {
            bubbles: true,
            detail: { values: valuesObj },
          })
        );
      }
    } else if (valuesTuple.length === 0) {
      if (!isInitialValueChange) {
        // If we are in single select mode and the value is empty.
        this.dispatchEvent(
          new CustomEvent("valueChanged", {
            bubbles: true,
            detail: { value: null },
          })
        );
        // The change event is for backwards compatibility.
        this.dispatchEvent(
          new CustomEvent("change", {
            bubbles: true,
            detail: { value: null },
          })
        );
      }
    } else if (valuesTuple.length === 1) {
      if (!isInitialValueChange) {
        // If we are in single select mode put the list of values in the event.
        const valueObj = { value: valuesTuple[0][0], label: valuesTuple[0][1] };
        this.dispatchEvent(
          new CustomEvent("valueChanged", {
            bubbles: true,
            detail: { value: valueObj },
          })
        );
        // The change event is for backwards compatibility.
        this.dispatchEvent(
          new CustomEvent("changed", {
            bubbles: true,
            detail: { value: valueObj },
          })
        );
      }
    } else {
      // If we are in single select mode and there is more than one value then something is wrong.
      throw new TypeError(
        `In single select mode we are expecting a single value, instead we got ${valuesTuple.length}`
      );
    }

    this.updateHiddenInputValueSlot();

    this.updateSelectInputSlot();
  }

  customOptionSelected(values) {
    if (
      this.hasAttribute("multi-select") &&
      this.getAttribute("multi-select") !== "false" &&
      values.length > 0
    ) {
      // If we are in multi select mode put the list of values in the event.
      this.dispatchEvent(
        new CustomEvent("customValueSelected", {
          bubbles: true,
          detail: {
            values,
          },
        })
      );
    } else if (values.length === 1) {
      // If we are in single select mode put the list of values in the event.
      this.dispatchEvent(
        new CustomEvent("customValueSelected", {
          bubbles: true,
          detail: {
            value: values[0],
          },
        })
      );
    } else {
      // If we are in single select mode and there is not one value then something is wrong.
      throw new TypeError(
        `In single select mode we are expecting a single custom option, instead we got ${values.length}`
      );
    }
  }

  get appPromise() {
    if (this._appPromise) {
      return this._appPromise;
    }
    this._appPromise = new Promise((resolve, reject) => {
      if (this._app) {
        resolve(this._app);
      } else {
        try {
          const flags = this.buildFlags();

          // User shadow DOM.
          this._parentDiv = this.attachShadow({ mode: "open" });

          const html = this.templateTag.content.cloneNode(true);
          this._parentDiv.append(html);

          const elmDiv = this._parentDiv.querySelector("#mount-node");

          // noinspection JSUnresolvedVariable
          this._app = Elm.Main.init({
            flags,
            node: elmDiv,
          });
          resolve(this._app);
        } catch (error) {
          reject(error);
          this.errorHandler(error);
        }
      }
    });
    return this._appPromise;
  }

  get parentDivPromise() {
    return this.appPromise.then(() => this._parentDiv);
  }

  get selectedValue() {
    return this._selectedValue;
  }

  set selectedValue(value) {
    if (value === null) {
      this._selectedValue = null;
    } else if (value === undefined) {
      this._selectedValue = null;
    } else if (value === "") {
      this._selectedValue = "";
    } else {
      this._selectedValue = value;
    }

    if (!this.eventsOnlyMode) {
      this.setAttribute("selected-value", this._selectedValue);
    }

    if (this._selectedValue && !this.isInMultiSelectMode) {
      if (this.parsedSelectedValue === undefined) {
        // TODO - This case here seems heavy handed, why would parsedSelectedValue
        //  ever be undefined? I haven't been able to figure that out, so here,
        //  my "fix".
        this._callValueChanged(null);
      } else {
        this._callValueChanged(this.parsedSelectedValue);
      }
    } else if (this._selectedValue && this.isInMultiSelectMode) {
      this._callValueChanged(this.parsedSelectedValue);
    } else if (this.isInMultiSelectMode) {
      this._callValueChanged([]);
    } else {
      this._callValueChanged(null);
    }

    this.updateHiddenInputValueSlot();
  }

  get parsedSelectedValue() {
    if (this.selectedValueEncoding === "comma") {
      if (this.selectedValue) {
        return this.selectedValue.split(",");
      }
      return [];
    }
    if (this.selectedValueEncoding === "json") {
      if (this.isInMultiSelectMode) {
        if (this.selectedValue === "") {
          // a special case because an empty string is not valid JSON.
          return [];
        }
        return JSON.parse(decodeURIComponent(this.selectedValue));
      }
      if (this.selectedValue === "") {
        // a special case because an empty string is not valid JSON.
        return "";
      }
      const val = JSON.parse(decodeURIComponent(this.selectedValue));
      if (Array.isArray(val)) {
        return val.shift();
      }
      if (val === undefined) {
        return null;
      }
      return val;
    }
    throw new Error(
      `Unknown selected value encoding, something is very wrong: ${this.selectedValueEncoding}`
    );
  }

  set parsedSelectedValue(values) {
    if (this.selectedValueEncoding === "comma") {
      if (Array.isArray(values)) {
        this.selectedValue = values.join(",");
      } else {
        // This should be a string or possibly a null.
        this.selectedValue = values;
      }
    } else if (this.selectedValueEncoding === "json") {
      if (values === "") {
        // The empty string here is a special case because we don't want to encode an empty string.
        this.selectedValue = "";
      } else {
        this.selectedValue = encodeURIComponent(JSON.stringify(values));
      }
    }
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(placeholder) {
    if (!this.eventsOnlyMode) {
      this.setAttribute("placeholder", placeholder);
    }

    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.placeholderChangedReceiver.send(placeholder)
    );

    this._placeholder = placeholder;
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    if (value === "false") {
      this._disabled = false;
    } else if (value === "") {
      this._disabled = true;
    } else {
      this._disabled = !!value;
    }

    if (!this.eventsOnlyMode) {
      if (this._disabled) {
        this.setAttribute("disabled", "disabled");
      } else {
        this.removeAttribute("disabled");
      }
    }

    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.disableChangedReceiver.send(this._disabled)
    );
  }

  get eventsOnlyMode() {
    return this._eventsOnlyMode;
  }

  set eventsOnlyMode(value) {
    if (value === "false") {
      this._eventsOnlyMode = false;
    } else if (value === "") {
      this._eventsOnlyMode = true;
    } else {
      this._eventsOnlyMode = !!value;
    }
  }

  get maxDropdownItems() {
    return this._maxDropdownItems;
  }

  set maxDropdownItems(value) {
    let newValue;
    if (typeof value === "number") {
      newValue = Math.floor(value);
    } else if (typeof value === "string") {
      newValue = Math.floor(parseInt(value, 10));
    } else {
      throw new TypeError("Max dropdown items must be a number!");
    }
    if (newValue < 3) {
      this._maxDropdownItems = 3;
    } else {
      this._maxDropdownItems = newValue;

      if (!this.eventsOnlyMode) {
        this.setAttribute("max-dropdown-items", newValue);
      }
    }
    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.maxDropdownItemsChangedReceiver.send(this._maxDropdownItems)
    );
  }

  /**
   * @returns {boolean}
   */
  get showDropdownFooter() {
    return this._showDropdownFooter;
  }

  /**
   * @param value {boolean|string}
   */
  set showDropdownFooter(value) {
    this._showDropdownFooter = booleanAttributeValueToBool(value);

    if (!this.eventsOnlyMode) {
      if (this._showDropdownFooter) {
        this.setAttribute("show-dropdown-footer", "");
      } else {
        this.removeAttribute("show-dropdown-footer");
      }
    }

    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.showDropdownFooterChangedReceiver.send(this._showDropdownFooter)
    );
  }

  /**
   * Search String Minimum Length getter.
   *
   * @returns {number}
   */
  get searchStringMinimumLength() {
    return this._searchStringMinimumLength;
  }

  /**
   * Search String Minimum Length setter
   *
   * @param value {string|number}
   */
  set searchStringMinimumLength(value) {
    if (value === "false") {
      this._searchStringMinimumLength = 0;
    } else if (value === "") {
      this._searchStringMinimumLength = 0;
    } else if (Number.isInteger(value)) {
      if (value >= 0) {
        this._searchStringMinimumLength = value;
      } else {
        this._searchStringMinimumLength = 0;
      }
    } else if (typeof value === "string") {
      const intVal = parseInt(value, 10);
      if (intVal >= 0) {
        this._searchStringMinimumLength = intVal;
      } else {
        this._searchStringMinimumLength = 0;
      }
    }

    if (!this.eventsOnlyMode) {
      this.setAttribute(
        "search-string-minimum-length",
        `${this._searchStringMinimumLength}`
      );
    }

    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.searchStringMinimumLengthChangedReceiver.send(
        this._searchStringMinimumLength
      )
    );
  }

  get isInMultiSelectMode() {
    return this._isInMultiSelectMode;
  }

  set isInMultiSelectMode(value) {
    if (value === "false") {
      this._isInMultiSelectMode = false;
    } else if (value === "") {
      this._isInMultiSelectMode = true;
    } else {
      this._isInMultiSelectMode = !!value;
    }

    if (!this.eventsOnlyMode) {
      if (this._isInMultiSelectMode) {
        this.setAttribute("multi-select", value);
      } else {
        this.removeAttribute("multi-select");
      }
    }

    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.multiSelectChangedReceiver.send(this.isInMultiSelectMode)
    );
  }

  // noinspection JSUnusedGlobalSymbols
  get isInMultiSelectModeWithSingleItemRemoval() {
    return this._isInMultiSelectModeWithSingleItemRemoval;
  }

  set isInMultiSelectModeWithSingleItemRemoval(value) {
    if (value === "false") {
      this._isInMultiSelectModeWithSingleItemRemoval = false;
    } else if (value === "") {
      this._isInMultiSelectModeWithSingleItemRemoval = true;
    } else {
      this._isInMultiSelectModeWithSingleItemRemoval = !!value;
    }

    if (!this.eventsOnlyMode) {
      if (this._isInMultiSelectModeWithSingleItemRemoval) {
        this.setAttribute(
          "multi-select-single-item-removal",
          "multi-select-single-item-removal"
        );
      } else {
        this.removeAttribute("multi-select-single-item-removal");
      }
      // noinspection JSUnresolvedVariable
      this.appPromise.then((app) =>
        app.ports.multiSelectSingleItemRemovalChangedReceiver.send(
          this._isInMultiSelectModeWithSingleItemRemoval
        )
      );
    }
  }

  get loading() {
    return this._loading;
  }

  set loading(value) {
    if (value === "false") {
      this._loading = false;
    } else if (value === "") {
      this._loading = true;
    } else {
      this._loading = !!value;
    }
    if (!this.eventsOnlyMode) {
      if (this._loading) {
        this.setAttribute("loading", "loading");
      } else {
        this.removeAttribute("loading");
      }
    }
    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.loadingChangedReceiver.send(this._loading)
    );
  }

  get allowCustomOptions() {
    return this._allowCustomOptions;
  }

  set allowCustomOptions(value) {
    if (value === "false") {
      this._allowCustomOptions = false;
    } else if (value === "") {
      this._allowCustomOptions = true;
    } else {
      this._allowCustomOptions = !!value;
    }
    if (!this.eventsOnlyMode) {
      if (this._allowCustomOptions) {
        this.setAttribute("allow-custom-options", "true");
      } else {
        this.removeAttribute("allow-custom-options");
      }
    }

    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.allowCustomOptionsReceiver.send(this._allowCustomOptions)
    );
  }

  get customOptionHint() {
    return this._customOptionHint;
  }

  set customOptionHint(value) {
    if (value === "false") {
      this._customOptionHint = null;
    } else if (value === "true") {
      this._customOptionHint = null;
    } else if (value === null) {
      this._customOptionHint = null;
    } else if (value === "") {
      this._customOptionHint = null;
    } else if (typeof value === "string") {
      this._customOptionHint = value;
    } else {
      throw new TypeError(
        `Unexpected type for the customOptionHint, it should be a string but instead it is a: ${typeof value}`
      );
    }

    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.customOptionHintReceiver.send(this._customOptionHint)
    );
  }

  get selectedItemStaysInPlace() {
    return this._selectedItemStaysInPlace;
  }

  set selectedItemStaysInPlace(value) {
    if (value === "false") {
      this._selectedItemStaysInPlace = false;
    } else {
      this._selectedItemStaysInPlace = !!value;
    }

    if (!this.eventsOnlyMode) {
      if (!this._selectedItemStaysInPlace) {
        this.setAttribute("selected-option-goes-to-top", "");
      } else {
        this.removeAttribute("selected-option-goes-to-top");
      }
    }

    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.selectedItemStaysInPlaceChangedReceiver.send(
        this._selectedItemStaysInPlace
      )
    );
  }

  set selectedItemGOesToTop(value) {
    if (value === "") {
      this.selectedItemStaysInPlace = false;
    } else if (value === null) {
      this.selectedItemStaysInPlace = true;
    } else {
      this.selectedItemStaysInPlace = !value;
    }
  }

  get selectedValueEncoding() {
    return this._selectedValueEncoding;
  }

  /**
   * Do not allow this value to be anything but:
   *  - json
   *  - comma (default)
   *
   * In addition to actually changing the private property, it also (re)encodes
   *  the current selected value, but ONLY IF the web component is connected,
   *  meaning the connected callback has been called, if that has not been called
   *  we are still initializing.
   * */
  set selectedValueEncoding(value) {
    const currentValue = this.parsedSelectedValue;
    if (value === "json") {
      this._selectedValueEncoding = "json";
    } else if (value === "comma") {
      this._selectedValueEncoding = "comma";
    } else {
      throw new Error(`Invalid selected value encoding: ${value}`);
    }
    if (this._connected) {
      this.parsedSelectedValue = currentValue;
    }
  }

  get optionSorting() {
    return this._optionSorting;
  }

  /**
   * Do not allow this value to be anything but:
   *  - no-sorting
   *  - by-option-label
   * */
  set optionSorting(value) {
    if (value === "no-sorting") {
      this._optionSorting = "no-sorting";
    } else if (value === "by-option-label") {
      this._optionSorting = "by-option-label";
    } else if (value === null) {
      this._optionSorting = "no-sorting";
    } else if (value === "") {
      this._optionSorting = "no-sorting";
    } else {
      throw new Error(`Unexpected value for option sorting: ${value}`);
    }

    if (!this.eventsOnlyMode) {
      if (value === null || value === "") {
        this.removeAttribute("option-sorting");
      } else {
        this.setAttribute("option-sorting", this._optionSorting);
      }
    }
    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.optionSortingChangedReceiver.send(this._optionSorting)
    );
  }

  /**
   * @param {string} outputStyle
   * @return boolean
   * */
  static isValidOutputStyle(outputStyle) {
    return ["customHtml", "datalist"].includes(outputStyle);
  }

  get outputStyle() {
    return this._outputStyle;
  }

  set outputStyle(value) {
    if (MuchSelect.isValidOutputStyle(value)) {
      this._outputStyle = value;

      // noinspection JSUnresolvedVariable
      this.appPromise.then((app) =>
        app.ports.outputStyleChangedReceiver.send(this._outputStyle)
      );
    } else {
      throw new Error(`Invalid output style: ${value}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get styleTag() {
    // noinspection CssInvalidPropertyValue
    return `<style>
      :host {
        /*
        This web components should take up some space on the page.

        TODO: Do we really have to set this by hand? Can't we do something so that
        this gets calculated automatically? If it must be set by hand we should probably
        do something a bit more clever here to not hard code these values so much.
        */

        min-height: 40px;
        min-width: ${this._minimumWidth}px;
      }

      /*
      If we are using a select element in the select-input slot to manage the
      the options do not show it.
      */
      slot[name='select-input'] {
        display: none;
      }

      #wrapper {
        margin-top: auto;
        margin-bottom: auto;
        position: relative;
        min-width: ${this._minimumWidth}px;
        font: -moz-field;
        font: -webkit-small-control;
      }

      /*
        This value casing (and what's inside of it) is supposed to be the
        "main event".
      */
      #value-casing {
        min-height: 34px;
        cursor: pointer;
        -moz-appearance: textfield;
        -webkit-appearance: textfield;
        background-color: white;
        background-color: -moz-field;
        border: 1px solid darkgray;
        box-shadow: 1px 1px 1px 0 lightgray inset;
        padding: 4px 3px 2px 3px;
        display: flex;
        flex-flow: row nowrap;
      }

      #value-casing:hover, #value-casing:focus {
        /*
        TODO: I'm not sure this is the best place or the best way to indicate this
        "input" is focused.
        */
        outline: none;
        border-color: blue;
      }

      #value-casing.multi {
        flex-flow: row wrap;
      }

      #value-casing.disabled {
        border: 1px solid lightgray;
        cursor: pointer;
      }

      #value-casing .placeholder {
        color: silver;
        font-size: 25px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        flex-basis: auto;
      }

      #value-casing #input-filter {
        /*
        TODO, seems like the height and font-size should not be hardcoded.
        */
        height: 36px;
        font-size: 25px;
        /* The min-width let's the input shrink down as far as it needs to.
        The with width lets it grow as much as it can.
        */
        min-width: 10px;
        /* Let's give the input a bit more room than the selected values.
        */
        flex-grow: 3;
        flex-shrink: 0;
        flex-basis: 10%;

        /* We don't want a border because the value-casing will supply the border for
          this input.
        */
        border: none;

        /*
        We do not want an outline on the input (filter) because we want everything
        inside of the #value-casing to (kinda) act like a text input.
        */
        outline: none;
        background: none;
      }

      #input-filter:hover, #input-filter:focus {
        /*
        We do not want an outline on the input (filter) because we want everything
        inside of the #value-casing to (kinda) act like a text input.
        */
        outline: none;
        background: white;
      }

      #input-filter:disabled {
        /*
        Removing the default background color on the disabled input.
        We might want to do some additional styling for "disabled"
        much-selects but that should probably happen on the value-casing
        div.
        */
        background: none;
      }

      #value-casing.single {
        background-image: linear-gradient(to bottom, #fefefe, #f2f2f2);
        background-repeat: repeat-x;
      }

      #value-casing.single.disabled {
        background-image: none;
      }

      #value-casing.single.has-option-selected #selected-value {
        padding: 3px;
        font-size: 20px;
        margin: 2px 2px;
        min-width: 10px;
      }

      #value-casing.multi .value {
        padding: 3px;
        font-size: 20px;
        color: white;
        background-image: linear-gradient(to bottom, #4f6a8f, #88a2bc);
        background-repeat: repeat-x;
        margin: 2px 2px;
        border-radius: 5px;
        border: 3px solid #d99477;
        min-width: 10px;

        flex-grow: 0;
        flex-shrink: 1;
        flex-basis: auto;
      }

      #value-casing.multi .value.highlighted-value {
        background-image: linear-gradient(to bottom, #d99477, #efb680);
        background-repeat: repeat-x;
      }

      .value .remove-option::after {
        content: "x";
        padding-left: 5px;
      }

      #dropdown-indicator {
        position: absolute;
        right: 5px;
        top: 15px;
        cursor: pointer;
        display: block;
        transition: transform 0.25s;
        font-family: "Times New Roman" serif;
      }

      #dropdown-indicator.down {
        transform: rotate(180deg);
      }

      #dropdown-indicator.up {
        transform: rotate(0deg);
      }

      slot[name='loading-indicator'] {
        display: block;
        position: absolute;
        right: 5px;
        top: 10px;
      }

      #clear-button-wrapper {
        display: block;
        position: absolute;
        right: 3px;
        top: 7px;
        cursor: pointer;
      }

      #dropdown {
        background-color: #EEEEEE;
        visibility: hidden;
        position: absolute;
        left: 0;
        font-size: 20px;
        display: inline-block;
        z-index: 10;
        max-height: 300px;
        overflow-y: auto;
        cursor: default;
      }
      #dropdown.showing {
        visibility: visible;
      }
      #dropdown.hiding {
        visibility: hidden;
      }

      #dropdown-footer {
        font-size: 50%;
        text-align: center;
        color: gray;
        background-color: lightgray;
        padding: 5px;
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
        background-color: LightGray;
        color: silver;
        cursor: default;
      }

      .description {
        font-size: 0.85rem;
        padding: 3px;
      }

      .highlight { color: blue }

      /* This loading indicator was copied (almost exactly)
        from this article.
        https://dev.to/devmount/learn-css-animation-by-creating-pure-css-loaders-3lm6

        It was chosen because it was so simple and short.
      */
      .default-loading-indicator {
        height: 18px;
        width: 18px;
        border: 5px solid rgba(150, 150, 150, 0.2);
        border-radius: 50%;
        border-top-color: rgb(150, 150, 150);
        animation: rotate 1s 0s infinite ease-in-out alternate;
      }
      @keyframes rotate {
        0%   { transform: rotate(0);      }
        100% { transform: rotate(360deg); }
      }
    </style>`;
  }

  get templateTag() {
    const templateTag = document.createElement("template");
    templateTag.innerHTML = `
      <div>
        ${this.styleTag}
        <slot name="select-input"></slot>
        <div id="mount-node"></div>
      </div>
    `;
    return templateTag;
  }

  /**
   * This should tell you if a value is selected or not, whether the much-select is in single or multi select mode.
   *
   * @param testValue
   * @returns {boolean}
   */
  isValueSelected(testValue) {
    return this.parsedSelectedValue.includes(testValue);
  }

  updateOptions(options) {
    const cleanedUpOptions = cleanUpOptions(options);
    this._callOptionChanged(cleanedUpOptions);
    this.updateDimensions();
  }

  addOption(option) {
    this.addOptions([option]);
  }

  addOptions(options) {
    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.addOptionsReceiver.send(cleanUpOptions(options))
    );
    this.updateDimensions();
  }

  removeOption(option) {
    this.removeOptions([option]);
  }

  removeOptions(options) {
    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.removeOptionsReceiver.send(cleanUpOptions(options))
    );
    this.updateDimensions();
  }

  selectOption(option) {
    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.selectOptionReceiver.send(cleanUpOption(option))
    );
  }

  deselectOption(option) {
    // noinspection JSUnresolvedVariable
    this.appPromise.then((app) =>
      app.ports.deselectOptionReceiver.send(cleanUpOption(option))
    );
  }

  async getAllOptions() {
    return new Promise((resolve) => {
      const callback = (allOptions) => {
        this.appPromise.then((app) => {
          // noinspection JSUnresolvedVariable
          app.ports.allOptions.unsubscribe(callback);
        });
        resolve(allOptions);
      };

      this.appPromise.then((app) => {
        // noinspection JSUnresolvedVariable
        app.ports.allOptions.subscribe(callback);
        // noinspection JSUnresolvedVariable
        app.ports.requestAllOptionsReceiver.send(null);
      });
    });
  }
}

// noinspection JSUnusedGlobalSymbols
export default MuchSelect;

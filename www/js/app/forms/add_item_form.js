import Item from '../models/item.js';
import {initTextFieldById} from '../material/material.js';

export default class AddItemForm {
    constructor(itemInputId, priceInputId, storeInputId, submitBtnId) {
        this.initializeTextFields(itemInputId, priceInputId, storeInputId);
        // Initialize the submit button
        this.submitBtn = document.getElementById(submitBtnId);

        this.registerValidationListeners();
        this.registerSubmitForm();
    }

    /**
     * Clears all values from the form.
     */
    resetForm() {
        this.itemInput.value = "";
        this.priceInput.value = "";
        this.updateSubmitButton();
    }

    /**
     * public function to register code to be executed when the
     * form is submitted
     */
    onSubmit(callback) {
        this.callback = callback;
    }

    registerSubmitForm() {
        let form = this;
        this.submitBtn.addEventListener('click', () => {
            form._onSubmit();
        });
    }

    initializeTextFields(itemInputSelector, priceInputSelector, storeInputId) {
        this.itemInput = initTextFieldById(itemInputSelector);
        this.priceInput = initTextFieldById(priceInputSelector);
        this.storeInput = initTextFieldById(storeInputId);
        // Since price input is a number field, need to enable native validation
        // to let the browser prevent the user from typing letters into it.
        this.priceInput.useNativeValidation = true;
    }

    registerValidationListeners() {
        let form = this;
        // For each item in the list, add an input listener
        // to check if the submit button should be enabled/disabled
        [this.itemInput.input, this.priceInput.input, this.storeInput.input].forEach((el) => {
            el.addEventListener('input', () => {
                form.updateSubmitButton();
            });
        });
    }

    _onSubmit() {
        let item = new Item(this.itemInput.value, this.priceInput.value, null, this.storeInput.value);
        if (this.callback) {
            this.callback(item);
        }
        this.resetForm();
    }

    isValid() {
        return this.hasPrice() && this.hasItem() && this.hasStore();
    }

    /**
     * Checks if the form is valid to enable/disable the submit button
     */
    updateSubmitButton() {
        this.submitBtn.disabled = !this.isValid();
    }

    hasValue(value) {
        console.log("Value is: ", value);
        return value.trim() != "";
    }

    hasPrice() {
        return this.hasValue(this.priceInput.value);
    }

    hasItem() {
        return this.hasValue(this.itemInput.value);
    }

    hasStore() {
        return this.hasValue(this.storeInput.value);
    }
}

import Item from '../models/item.js';
import {initTextFieldById} from '../material/material.js';

export default class AddItemForm {
    constructor(itemInputId, priceInputId, submitBtnId) {
        this.initializeTextFields(itemInputId, priceInputId);
        // Initialize the submit button
        this.submitBtn = document.getElementById(submitBtnId);

        this.registerValidationListeners();
        this.registerSubmitForm();
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

    initializeTextFields(itemInputSelector, priceInputSelector) {
        this.itemInput = initTextFieldById(itemInputSelector);
        this.priceInput = initTextFieldById(priceInputSelector);
        // Since price input is a number field, need to enable native validation
        // to let the browser prevent the user from typing letters into it.
        this.priceInput.useNativeValidation = true;
    }

    registerValidationListeners() {
        let form = this;
        // For each item in the list, add an input listener
        // to check if the submit button should be enabled/disabled
        [this.itemInput.input, this.priceInput.input].forEach((el) => {
            el.addEventListener('input', () => {
                form.updateSubmitButton();
            });
        });
    }

    _onSubmit() {
        let item = new Item(this.itemInput.value, this.priceInput.value);
        if (this.callback) {
            this.callback(item);
        }
    }

    isValid() {
        return this.hasPrice() && this.hasItem();
    }

    /**
     * Checks if the form is valid to enable/disable the submit button
     */
    updateSubmitButton() {
        this.submitBtn.disabled = !this.isValid();
    }

    hasPrice() {
        return this.priceInput.value.trim() != "";
    }

    hasItem() {
        return this.itemInput.value.trim() != "";
    }
}
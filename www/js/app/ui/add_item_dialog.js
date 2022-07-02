import {initDialogById} from '../material/material.js';

export default class AddItemDialog {
    constructor(dialogSelector,
                displayDialogSelector) {
        this.initializeDialogModal(dialogSelector);
        this.initializeDisplayDialogButton(displayDialogSelector);
    }

    initializeDialogModal(dialogSelector) {
        this.dialog = initDialogById(dialogSelector);
    }

    initializeDisplayDialogButton(displayDialogSelector) {
        this.displayDialogButton = document.getElementById(displayDialogSelector);

        let dialog = this.dialog;
        this.displayDialogButton.addEventListener('click', function () {
            dialog.open();
        });
    }
}

import {initDialogById} from '../material/material.js';

export default class EditItemDialog {
    constructor(dialogId) {
        this.initializeDialogModal(dialogId);
    }

    initializeDialogModal(dialogId) {
        this.dialog = initDialogById(dialogId);
    }

    open() {
        this.dialog.open();
    }
}

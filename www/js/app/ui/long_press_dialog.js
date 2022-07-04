import {initDialogById} from '../material/material.js';

/**
 * Dialog that shows up when the user long presses
 * an item in the list
 */
export default class LongPressDialog {
    constructor(dialogId, editId, deleteId) {
        this.dialog = initDialogById(dialogId);
        this.registerListeners(editId, deleteId);
    }

    registerListeners(editId, deleteId) {
        let dialog = this;
        document.getElementById(editId).addEventListener('click', () => {
            if (dialog.editCallback) {
                dialog.editCallback(dialog.data);
            }
        });

        document.getElementById(deleteId).addEventListener('click', () => {
            if (dialog.deleteCallback) {
                dialog.deleteCallback(dialog.data);
            }
        });
    }

    /**
     * called when edit is selected
     */
    onEdit(callback) {
        this.editCallback = callback;
    }

    /**
     * called when edit is selected
     */
    onDelete(callback) {
        this.deleteCallback = callback;
    }

    open(data) {
        this.data = data;
        this.dialog.open();
    }
}

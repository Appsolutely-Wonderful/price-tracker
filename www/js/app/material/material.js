export function initTextFieldById(id) {
    let el = document.getElementById(id);
    return new mdc.textField.MDCTextField(el);
}

export function initDialogById(id) {
    let el = document.getElementById(id);
    return new mdc.dialog.MDCDialog(el);
}

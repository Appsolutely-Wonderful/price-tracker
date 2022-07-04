import Item from '../models/item.js';
import AddItemForm from './add_item_form.js';

export default class EditItemForm extends AddItemForm {
    constructor(itemId, priceId, storeId, submitId) {
        super(itemId, priceId, storeId, submitId);
    }

    fillFromItem(idx, item) {
        console.log("Fields: ", idx, item);
        this.itemInput.value = item.name;
        this.priceInput.value = item.price;
        // For dealing with pre-release items that didn't have store in
        // the item object
        if ('store' in item) {
            this.storeInput.value = item.store;
        } else {
            this.storeInput.value = "";
        }
        this.itemIndex = idx;
        this.updateSubmitButton();
    }

    _onSubmit() {
        let item = this.getItem();
        if (this.callback) {
            this.callback(this.itemIndex, item);
        }
        this.resetForm();
    }
}

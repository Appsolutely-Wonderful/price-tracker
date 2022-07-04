/**
 * All modules have been written to be fairly independent of one another.
 * this module is the glue that integrates all the modules into the main
 * application.
 */

import AddItemDialog from './ui/add_item_dialog.js';
import EditItemDialog from './ui/edit_item_dialog.js';
import ItemList from './ui/item_list.js';
import Searcher from './ui/search.js';
import AddItemForm from './forms/add_item_form.js';
import EditItemForm from './forms/edit_item_form.js';
import LongPressDialog from './ui/long_press_dialog.js';

// Item List Initialization
let itemStorageKey = 'items';
let itemList = new ItemList('js-item-list');
itemList.load(itemStorageKey);

// Item Dialog Initialization
let addItemDialog = new AddItemDialog('js-add-modal',
                                      'js-add-item');
let addItemForm = new AddItemForm('js-item-input',
                                  'js-price-input',
                                  'js-store-input',
                                  'js-submit-item-btn');
addItemForm.onSubmit((item) => {
    itemList.add(item);
    itemList.save(itemStorageKey);
});

// Long press functionality (depends on itemList)
let longPressItem = new LongPressDialog('js-long-press-dialog',
                                        'js-edit-item',
                                        'js-delete-item');
itemList.onLongPress((idx, item) => {longPressItem.open({index: idx, item: item})});
longPressItem.onDelete((data) => {
    itemList.removeAt(data.index);
    itemList.save(itemStorageKey);
});

// Edit Dialog (depends on long press and item list)
let editDialog = new EditItemDialog('js-edit-modal');
let editForm = new EditItemForm('js-item-edit-input',
                                'js-price-edit-input',
                                'js-store-edit-input',
                                'js-submit-edit-btn');
longPressItem.onEdit((data) => {
    editForm.fillFromItem(data.index, data.item);
    editDialog.open();
});

editForm.onSubmit((idx, item) => {
    itemList.replaceAt(idx, item);
    itemList.save(itemStorageKey);
});

// Search initialization
let searchForm = new Searcher('js-search-btn',
                              'js-search-back-btn',
                              'js-search-txt',
                              'js-search-section',
                              'js-title-section');

searchForm.onSearch((query) => itemList.filter(query));

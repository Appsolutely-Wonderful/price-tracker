import AddItemDialog from './ui/add_item_dialog.js';
import ItemList from './ui/item_list.js';
import Searcher from './ui/search.js';
import AddItemForm from './forms/add_item_form.js';

// Item List Initialization
let itemStorageKey = 'items';
let itemList = new ItemList('js-item-list');
itemList.load(itemStorageKey);

// Item Dialog Initialization
let addItemDialog = new AddItemDialog('js-add-modal',
                                      'js-add-item');
let addItemForm = new AddItemForm('js-item-input',
                                  'js-price-input',
                                  'js-submit-item-btn');
addItemForm.onSubmit((item) => {
    itemList.add(item);
    itemList.save(itemStorageKey);
});

// Search initialization
let searchForm = new Searcher('js-search-btn',
                              'js-search-back-btn',
                              'js-search-txt',
                              'js-search-section',
                              'js-title-section');
searchForm.onSearch((query) => itemList.filter(query));

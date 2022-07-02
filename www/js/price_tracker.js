class AddItemForm {
    constructor(tracker) {
        this.initForm = this.initForm.bind(this);
        this.initAddModal = this.initAddModal.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.initItemInput = this.initItemInput.bind(this);
        this.initPriceInput = this.initPriceInput.bind(this);
        this.checkFormReady = this.checkFormReady.bind(this);
        this.reset = this.reset.bind(this);

        this.tracker = tracker;
        this.initForm();
    }

    open() {
        this.addModal.open();
    }

    initForm() {
        this.initItemInput();
        this.initPriceInput();
        this.initAddModal();
    }

    initItemInput() {
        let el = document.getElementById('js-item-input');
        this.itemInput = new mdc.textField.MDCTextField(el);
        let form = this;
        el.addEventListener('input', (e) => {
            form.hasItem = e.target.value.trim() != "";
            form.checkFormReady();
        });
    }

    initPriceInput() {
        let el = document.getElementById('js-price-input');
        this.priceInput = new mdc.textField.MDCTextField(el);
        this.priceInput.useNativeValidation = true;
        let form = this;
        el.addEventListener('input', (e) => {
            form.hasPrice = e.target.value.trim() != "";
            form.checkFormReady();
        });
    }

    initAddModal() {
        // Initialize the modal.
        this.addModal = new mdc.dialog.MDCDialog(document.getElementById('js-add-modal'));
        // Initialize the add button
        let form = this;
        this.submitBtn = document.getElementById('js-submit-item-btn');
        this.submitBtn.addEventListener('click', () => {
            form.tracker.addItem(this.itemInput.value.trim(), this.priceInput.value);
            form.reset();
        });
    }


    checkFormReady() {
        if (this.hasPrice && this.hasItem) {
            this.submitBtn.disabled = false;
        }
    }

    reset() {
        this.hasPrice = false;
        this.hasItem = false;
        this.submitBtn.disabled = true;
        this.itemInput.value = "";
        this.priceInput.value = "";
    }
};

// Requires:
//  - js-add-btn - FAB for displaying the insert modal
//  - js-add-modal - Insert modal
//  - js-item-input - Item input in the insert modal
//  - js-price-input - The price of the item in the insert modal
class PriceTracker {
    constructor() {
        this.initAddBtn = this.initAddBtn.bind(this);
        this.initSearch = this.initSearch.bind(this);
        this.initItemList = this.initItemList.bind(this);
        this.displayAddModal = this.displayAddModal.bind(this);
        this.addItem = this.addItem.bind(this);
        this.addItemToDisplay = this.addItemToDisplay.bind(this);
        this.restoreSavedItems = this.restoreSavedItems.bind(this);
        this.getTimestamp = this.getTimestamp.bind(this)
        this.showSearch = this.showSearch.bind(this);
        this.hideSearch = this.hideSearch.bind(this);
        this.filterItems = this.filterItems.bind(this);

        this.trackedItems = [];

        this.initAddBtn();
        this.initItemList();
        this.initSearch();
        this.restoreSavedItems();
        this.addItemForm = new AddItemForm(this);
    }

    initAddBtn() {
        this.addBtn = document.getElementById('js-add-item');
        this.addBtn.addEventListener('click', this.displayAddModal);
    }


    
    initItemList() {
        let el = document.getElementById('js-item-list');
        this.itemList = new mdc.list.MDCList(el);
        this.itemListUl = el;
        console.log(this.itemList);
    }

    displayAddModal() {
        this.addItemForm.open();
    }

    getTimestamp() {
        let now = new Date();
        let month = now.getMonth();
        if (month < 10) {
            month = "0" + month;
        }
        let date = now.getDate();
        if (date < 10) {
            date = "0" + date;
        }
        return now.getFullYear() + "-" + month + "-" + date;
    }

    /**
     * Activated when a user clicks the add button from the
     * add item dialog modal.
     */
    addItem(item, price) {
        let timestamp = this.getTimestamp();
        if ((item != "") && price != "") {
            let newItem = {
                item: item,
                price: price,
                date: timestamp
            };
            this.trackedItems.push(newItem);
            console.log(this.trackedItems);
            localStorage.setItem('items', JSON.stringify(this.trackedItems));
            this.addItemToDisplay(item, price, timestamp);
        }
    }

    addItemToDisplay(item, price, date) {
        let html = `
<li class="mdc-list-item js-item">
    <span class="mdc-list-item__ripple"></span>
    <span class="mdc-list-item__text">
      <span class="mdc-list-item__primary-text">`+ item +`</span>
      <span class="mdc-list-item__secondary-text">`+ date +`</span>
    </span>

    <span class="mdc-list-item__meta">$` + price + `</span>
</li>
<li role="separator" class="mdc-list-divider"></li>`;
        this.itemListUl.innerHTML = html + this.itemListUl.innerHTML;
    }

    restoreSavedItems() {
        let items = localStorage.getItem('items');
        if (items != null) {
            let data = JSON.parse(items);
            this.trackedItems = data;
            console.log(this.trackedItems);
            let tracker = this;
            data.forEach((item) => tracker.addItemToDisplay(item.item, item.price, item.date));
        }
    }

    showSearch() {
        this.searchBtn.classList.add('hidden');
        this.titleSection.classList.add('hidden');
        this.searchSection.classList.remove('hidden');
    }

    hideSearch() {
        this.searchBtn.classList.remove('hidden');
        this.titleSection.classList.remove('hidden');
        this.searchSection.classList.add('hidden');
    }

    initSearch() {
        let tracker = this;

        this.searchBtn = document.getElementById('js-search-btn');
        this.searchBtn.addEventListener('click', () => tracker.showSearch());

        this.backBtn = document.getElementById('js-search-back-btn');
        this.backBtn.addEventListener('click', () => tracker.hideSearch());

        this.searchField = document.getElementById('js-search-txt');
        this.searchField.addEventListener('input', (e) => tracker.filterItems(e.target.value));
        this.searchSection = document.getElementById('js-search-section');

        this.titleSection = document.getElementById('js-title-section');
    }

    textContains(haystack, needle) {
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) >= 0;
    }

    filterItems(searchTerm) {
        let elements = document.getElementsByClassName('js-item');
        for (const el of elements) {
            let text = el.getElementsByClassName('mdc-list-item__primary-text')[0].textContent;
            let date = el.getElementsByClassName('mdc-list-item__secondary-text')[0].textContent;
            let price = el.getElementsByClassName('mdc-list-item__meta')[0].textContent;

            if (searchTerm == "" ||
                this.textContains(text, searchTerm) ||
                this.textContains(date, searchTerm) ||
                this.textContains(price, searchTerm)) {
                el.classList.remove('hidden');
                el.nextElementSibling.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
                el.nextElementSibling.classList.add('hidden');
            }
        }
    }
};

class Other {
};

import Item from '../models/item.js';
import {LongPress} from './touch_events.js';

export default class ItemList {
    /**
     * htmlTarget - The HTML <ul/> element that will hold the list items
     */
    constructor(htmlTargetId) {
        this.htmlTarget = document.getElementById(htmlTargetId);
        this.items = [];
        this.filterText = "";
    }

    add(item) {
        this.items.push(item);
        this.sort();
        this.render();
    }

    filter(query) {
        this.filterText = query;
        this.filterItems();
    }


    textContains(haystack, needle) {
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) >= 0;
    }

    filterItems() {
        let searchTerm = this.filterText;
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


    sort() {
        this.items.sort((a, b) => {
            return a.name > b.name ? 1: -1;
        })
    }

    getHtmlForItem(item) {
        // Set store text if store is available
        let store = "";
        if (item.store) {
            store = " | " + item.store;
        }
        return `<li class="mdc-list-item js-item">
    <span class="mdc-list-item__ripple"></span>
    <span class="mdc-list-item__text">
      <span class="mdc-list-item__primary-text">`+ item.name +`</span>
      <span class="mdc-list-item__secondary-text">`+ item.date + store + `</span>
    </span>

    <span class="mdc-list-item__meta">$` + item.price + `</span>
</li>
<li role="separator" class="mdc-list-divider"></li>`;
    }

    /**
     * Sets callback to be executed when an item is long pressed
     * parameters to the callback are (itemIndex, itemObject)
     */
    onLongPress(callback) {
        this.longPressCb = callback;
    }

    /**
     * Stores the item that was long pressed and executes the
     * callback
     */
    _onLongPress(idx) {
        this.selectedItemIndex = idx;
        if (this.longPressCb) {
            this.longPressCb(idx, this.items[idx]);
        }
    }

    /**
     * Removes the item at the specified index
     */
    removeAt(index) {
        this.items.splice(index, 1);
        this.render();
    }

    /**
     * Replaces the item at the specified index, this store any
     * new tracking information. For tracking, use updateAt. This
     * should be used for fixing typos
     */
    replaceAt(index, item) {
        this.items.splice(index, 1, item);
        this.render();
    }

    registerTouchListeners() {
        let elements = document.getElementsByClassName('js-item');
        let items = this.items;
        let itemList = this;
        let idx = 0;
        for (const el of elements) {
            let itemIndex = idx;
            if (!el.classList.contains('js-upgraded')) {
                let longPress = new LongPress(el);
                longPress.onLongPress(() => itemList._onLongPress(itemIndex));
                el.classList.add('js-upgraded');
            }
            idx += 1;
        }
    }

    render() {
        let listHtml = "";
        this.items.forEach((item) => {
            listHtml += this.getHtmlForItem(item);
        });
        // TODO: Fix vulnerability with using innerHTML since we're putting
        //       user supplied text directly into the web page.
        this.htmlTarget.innerHTML = listHtml;
        this.filterItems();
        this.registerTouchListeners();
    }

    /**
     * Saves items to localStorage using the given key
     */
    save(key) {
        localStorage.setItem(key, JSON.stringify(this.items));
    }

    load(key) {
        let loaded = JSON.parse(localStorage.getItem(key));
        if (loaded) {
            this.items = loaded;
            this.render();
        }
    }
}

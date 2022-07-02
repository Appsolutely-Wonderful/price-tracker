import Item from '../models/item.js';

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
        return `<li class="mdc-list-item js-item">
    <span class="mdc-list-item__ripple"></span>
    <span class="mdc-list-item__text">
      <span class="mdc-list-item__primary-text">`+ item.name +`</span>
      <span class="mdc-list-item__secondary-text">`+ item.date +`</span>
    </span>

    <span class="mdc-list-item__meta">$` + item.price + `</span>
</li>
<li role="separator" class="mdc-list-divider"></li>`;
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

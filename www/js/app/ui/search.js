export default class Search {
    /**
     * searchBtnId - The button used to begin the search
     * exitSearchBtnId - Button used to quit searching
     * searchTextId - Input field used for filtering results
     * searchSectionId - HTML Element that is displayed when search is enabled
     * titleSectionId - HTML Element that is displayed when search is disabled
     */
    constructor(searchBtnId, exitSearchBtnId, searchTextId, searchSectionId, titleSectionId) {
        this.searchBtn = document.getElementById(searchBtnId);
        this.backBtn = document.getElementById(exitSearchBtnId);
        this.searchField = document.getElementById(searchTextId);
        this.searchSection = document.getElementById(searchSectionId);
        this.titleSection = document.getElementById(titleSectionId);

        this.registerShowHideSearchListeners();
        this.registerSearchListener();
    }

    registerShowHideSearchListeners() {
        let ui = this;
        this.searchBtn.addEventListener('click', () => ui.showSearch());
        this.backBtn.addEventListener('click', () => ui.hideSearch());
    }

    registerSearchListener() {
        let ui = this;
        this.searchField.addEventListener('input', (e) => {
            if (ui.callback) {
                ui.callback(e.target.value);
            }
        });
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

    /**
     * Returns the search query to the callback to perform the search
     */
    onSearch(callback) {
        this.callback = callback;
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

}

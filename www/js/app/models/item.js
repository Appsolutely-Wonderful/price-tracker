/**
 * Encapsulates the information for a price tracked item
 */
export default class Item {
    constructor(name, price, date, location, store) {
        this.name = name;
        this.price = price;
        this.location = location;
        this.store = store;
        if (!date) {
            this.initDate();
        }
    }

    initDate() {
        this.date = this.getTimestamp();
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
}


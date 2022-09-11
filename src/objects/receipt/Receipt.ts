import ReceiptItem from "./ReceiptItem";

export default class Receipt {
    items: ReceiptItem[];
    constructor() {
        this.items = [];
    }

    addItem(item: ReceiptItem) {
        this.items.push(item);
    }
}
import ReceiptItem from "./ReceiptItem";

export interface ItemBuilder {
    type: string;
    builder: (...params: any) => ReceiptItem;
}

export default class ReceiptItemTypeDictionary {
    itemBuilders: { [type: string]: ItemBuilder } = {};
    constructor(...items: ReceiptItem[]) {
        items.map((item: ReceiptItem) => this.add(item));
    }

    add(item: ReceiptItem) {
        this.itemBuilders[item.type] = {
            type: item.type,
            builder: item.fromSignatureData,
        };
    }

    createItemFromType(type: string, ...params: any): ReceiptItem {
        return this.itemBuilders[type]?.builder(...params);
    }
}
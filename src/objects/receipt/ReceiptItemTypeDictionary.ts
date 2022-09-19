import ReceiptItem from './ReceiptItem';

export interface ItemBuilder {
    type: string;
    builder: (...params: any) => ReceiptItem;
}

export default class ReceiptItemTypeDictionary {
    itemBuilders: { [type: string]: ItemBuilder } = {};
    constructor(...items: ReceiptItem[]) {
        //items.map((item: ReceiptItem) => this.add(item));
    }

    add(type: string, builder: (...params: any) => ReceiptItem) {
        this.itemBuilders[type] = {
            type,
            builder,
        };
    }

    has(type: string) {
        return this.itemBuilders[type] != null;
    }

    createItemFromType(type: string, ...params: any): ReceiptItem {
        const itemBuilder = this.itemBuilders[type];
        if (itemBuilder) {
            return itemBuilder.builder(...params);
        }
        throw `Item builder does not exist for type ${type}.`;
    }
}

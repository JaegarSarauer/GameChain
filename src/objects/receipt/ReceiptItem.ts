import Controller from '../Controller';

export type ReceiptItemResult = unknown;

export type ReceiptItemParams = {[param: string]: any};

abstract class ReceiptItem {
    [data: string]: any;
    type: string;

    constructor(type: string) {
        this.type = type;
    }
    
    abstract execute(controller: Controller): ReceiptItemResult;
    abstract toSignatureData(): {[key: string]: any};
    abstract fromSignatureData(params: ReceiptItemParams): ReceiptItem;
}

export default ReceiptItem;

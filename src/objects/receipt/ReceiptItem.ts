import Controller from '../Controller';

export type ReceiptItemResult = unknown;

interface ReceiptItem {
    type: string;
    execute(controller: Controller): ReceiptItemResult;
    getBuilder(): (...params: any) => ReceiptItem;
}

export default ReceiptItem;

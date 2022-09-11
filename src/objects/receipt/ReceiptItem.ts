export type ReceiptItemResult = unknown;

interface ReceiptItem {
    execute(): ReceiptItemResult;
}

export default ReceiptItem;
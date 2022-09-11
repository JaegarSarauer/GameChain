import ReceiptItem, { ReceiptItemResult } from "../objects/receipt/ReceiptItem";

interface GameInterface {
    initialize(): void;
    update(item: ReceiptItem, result: ReceiptItemResult): void;
    finalize(): void;
}

export default GameInterface;
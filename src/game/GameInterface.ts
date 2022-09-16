import ReceiptItem, { ReceiptItemResult } from "../objects/receipt/ReceiptItem";
import Wallet from "../objects/wallet/Wallet";

interface GameInterface {
    initialize(wallets: Wallet[]): void;
    update(item: ReceiptItem, result: ReceiptItemResult): void;
    finalize(): void;
}

export default GameInterface;
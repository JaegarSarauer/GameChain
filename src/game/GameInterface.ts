import Controller from "../objects/Controller";
import ReceiptItem, { ReceiptItemResult } from "../objects/receipt/ReceiptItem";
import Wallet from "../objects/wallet/Wallet";

interface GameInterface {    
    initialize(controller: Controller): void;
    update(item: ReceiptItem, result: ReceiptItemResult): void;
    finalize(): void;
}

export default GameInterface;
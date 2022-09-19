
import { WriteWallet } from '..';
import GameInterface from '../game/GameInterface';
import AssignWalletReceiptItem from './receipt/items/AssignWalletReceiptItem';
import InvalidReceiptItem from './receipt/items/InvalidReceiptItem';
import Receipt from './receipt/Receipt';
import ReceiptItem from './receipt/ReceiptItem';
import Wallet from './wallet/Wallet';
import GameProxy from '../game/GameProxy';

abstract class Controller {
    abstract game: GameProxy;
    abstract receipt: Receipt;

    abstract initialize(): void;
    abstract update(wallet: Wallet, item: ReceiptItem): void;
    abstract finalize(): void;

    addReceiptItem(item: new (...params: any) => any) {
        const obj = new item();
        this.receipt.types.add(obj.type, obj.fromSignatureData);
    }
}

export default Controller;

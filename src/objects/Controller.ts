
import { WriteWallet } from '..';
import GameInterface from '../game/GameInterface';
import Receipt from './receipt/Receipt';
import ReceiptItem from './receipt/ReceiptItem';
import Wallet from './wallet/Wallet';

interface Controller {
    game: GameInterface;
    receipt: Receipt;

    initialize(wallets: WriteWallet[]): void;
    update(wallet: Wallet, item: ReceiptItem): void;
    finalize(): void;
}

export default Controller;

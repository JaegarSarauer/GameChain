import Receipt from '../objects/receipt/Receipt';
import GameProxy from '../game/GameProxy';
import GameInterface from '../game/GameInterface';
import SignatureUnwrapper from './SignatureUnwrapper';
import Controller from '../objects/Controller';
import Wallet from '../objects/wallet/Wallet';
import ReceiptItem from '../objects/receipt/ReceiptItem';
import ReadWallet from '../objects/wallet/ReadWallet';
import { WriteWallet } from '..';

export default class ValidatorController implements Controller {
    game: GameProxy;
    receipt: Receipt;

    constructor(gameInterface: GameInterface, receipt: Receipt) {
        this.game = new GameProxy(this, gameInterface);
        this.receipt = receipt;
    }

    initialize(wallets: WriteWallet[]) {
        this.game.initialize(wallets);
    }

    update(wallet: Wallet, item: ReceiptItem) {
        this.game.update(item);
    }

    finalize() {
        this.game.finalize();
    }

    replay() {
        if (this.receipt.signature) {
            let index = 0;
            const replayHandle = setInterval(() => {
                if (index >= this.receipt.getItemLength()) {
                    clearInterval(replayHandle);
                    return;
                }
                const item = this.receipt.getItem(index++);
                // TODO get address either from item or passed from getItem()
                if (item) {
                    const wallet = new ReadWallet('');
                    this.update(wallet, item);
                }
            }, 1000);
        }
    }
}

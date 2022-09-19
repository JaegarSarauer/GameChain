import Receipt from '../objects/receipt/Receipt';
import GameProxy from '../game/GameProxy';
import GameInterface from '../game/GameInterface';
import SignatureUnwrapper from './SignatureUnwrapper';
import Controller from '../objects/Controller';
import Wallet from '../objects/wallet/Wallet';
import ReceiptItem from '../objects/receipt/ReceiptItem';
import ReadWallet from '../objects/wallet/ReadWallet';
import { SignedSignature } from '../objects/receipt/SignatureType';
import InvalidReceiptItem from '../objects/receipt/items/InvalidReceiptItem';
import AssignWalletReceiptItem from '../objects/receipt/items/AssignWalletReceiptItem';

export default class ValidatorController extends Controller {
    game: GameProxy;
    receipt: Receipt;

    constructor(gameInterface: GameInterface, receipt: Receipt) {
        super();
        this.game = new GameProxy(this, gameInterface);
        this.receipt = receipt;
    }

    initialize() {
        // TODO consolidate into one call area.
        this.addReceiptItem(InvalidReceiptItem)
        this.addReceiptItem(AssignWalletReceiptItem)

        this.game.initialize();
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
            this.initialize();
            const replayHandle = setInterval(() => {
                if (index >= this.receipt.getItemLength()) {
                    clearInterval(replayHandle);
                    return;
                }
                const item = this.receipt.getItem(index++);
                if (item) {
                    // TODO fix empty wallet req.
                    const wallet = new ReadWallet('');
                    this.update(wallet, item);
                }
            }, 1000);
        }
    }
}

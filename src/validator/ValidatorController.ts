import Receipt from '../objects/receipt/Receipt';
import GameProxy from '../game/GameProxy';
import GameInterface from '../game/GameInterface';
import iWeb3 from '../adapter/web3';
import { SignedSignature } from 'objects/receipt/SignatureType';
import SignatureUnwrapper from './SignatureUnwrapper';
import ReceiptItem from 'objects/receipt/ReceiptItem';

export default class ValidatorController {
    game: GameProxy;
    receipt: Receipt;
    receiptItemIndex = 0;

    constructor(gameInterface: GameInterface, receipt: Receipt) {
        this.game = new GameProxy(gameInterface);
        this.receipt = receipt;
    }

    initialize() {
        this.game.initialize();
    }

    update(item: ReceiptItem) {
        //if (this.receiptItemIndex < this.receipt.signatures.length) {
            //this.game.update(this.receipt.signatures[this.receiptItemIndex++]);
        //}
        this.game.update(item);
    }
    finalize() {
        this.game.finalize();
    }

    reset() {
        this.receiptItemIndex = 0;
    }

    replay() {
        const unwrapper = new SignatureUnwrapper(this.receipt.signatures[0] as SignedSignature);
        this.reset();
        console.info(this.receipt.signatures)
        setInterval(()=> {
            //this.update();
            const item = unwrapper.next();
            //this.update(item);
        }, 1000);
    }
}

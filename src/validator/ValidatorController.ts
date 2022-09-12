import Receipt from '../objects/receipt/Receipt';
import GameProxy from '../game/GameProxy';
import GameInterface from 'game/GameInterface';

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

    update() {
        if (this.receiptItemIndex < this.receipt.items.length) {
            this.game.update(this.receipt.items[this.receiptItemIndex++]);
        }
    }
    finalize() {
        this.game.finalize();
    }

    reset() {
        this.receiptItemIndex = 0;
    }

    replay() {
        this.reset();
        setInterval(()=> {
            this.update();
        }, 1000);
    }
}

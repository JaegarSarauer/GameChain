import Receipt from '../objects/receipt/Receipt';
import GameProxy from '../game/GameProxy';

export default class ValidatorController {
    game: GameProxy;
    receipt: Receipt;
    receiptItemIndex = 0;

    constructor(game: GameProxy, receipt: Receipt) {
        this.game = game;
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

    replay() {
        this.receipt.items.forEach(() => {
            this.update();
        })
    }
}

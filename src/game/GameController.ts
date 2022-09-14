import Wallet from '../objects/Wallet';
import Receipt from '../objects/receipt/Receipt';
import ReceiptItem from '../objects/receipt/ReceiptItem';
import GameInterface from './GameInterface';
import GameProxy from './GameProxy';

export default class GameController {
    game: GameProxy;
    receipt: Receipt;

    constructor(gameInterface: GameInterface) {
        this.game = new GameProxy(gameInterface);
        this.receipt = new Receipt();
    }

    initialize() {
        this.game.initialize();
    }

    update(wallet: Wallet, item: ReceiptItem, shouldUpdate: boolean = true) {
        this.receipt.addItem(item, wallet);
        if (shouldUpdate) {
            this.game.update(item);
        }
    }

    finalize() {
        this.game.finalize();
    }
}

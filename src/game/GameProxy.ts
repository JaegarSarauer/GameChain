//import {ReceiptStructure} from "../objects/receipt/ReceiptStructure";
import ReceiptItem from '../objects/receipt/ReceiptItem';
import GameInterface from './GameInterface';

export default class GameProxy {
    game: GameInterface;

    constructor(game: GameInterface) {
        this.game = game;
    }

    initialize() {
        this.game.initialize();
    }

    update(item: ReceiptItem) {
        const result = item.execute();
        this.game.update(item, result);
    }

    finalize() {
        this.game.finalize();
    }
}

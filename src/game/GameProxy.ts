
import Wallet from '../objects/wallet/Wallet';
import Controller from '../objects/Controller';
import ReceiptItem from '../objects/receipt/ReceiptItem';
import GameInterface from './GameInterface';

export default class GameProxy {
    controller: Controller;
    game: GameInterface;

    constructor(controller: Controller, game: GameInterface) {
        this.controller = controller;
        this.game = game;
    }

    initialize(wallets: Wallet[]) {
        this.game.initialize(wallets);
    }

    update(item: ReceiptItem) {
        const result = item.execute(this.controller);
        this.game.update(item, result);
    }

    finalize() {
        this.game.finalize();
    }
}

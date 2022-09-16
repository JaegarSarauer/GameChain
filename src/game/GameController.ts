import WriteWallet from '../objects/wallet/WriteWallet';
import Receipt from '../objects/receipt/Receipt';
import ReceiptItem from '../objects/receipt/ReceiptItem';
import GameInterface from './GameInterface';
import GameProxy from './GameProxy';
import Controller from '../objects/Controller';
import Wallet from '../objects/wallet/Wallet';

export default class GameController implements Controller {
    game: GameProxy;
    receipt: Receipt;

    constructor(gameInterface: GameInterface) {
        this.game = new GameProxy(this, gameInterface);
        this.receipt = new Receipt();
    }

    initialize(wallets: Wallet[]) {
        this.game.initialize(wallets);
    }

    update(wallet: Wallet, item: ReceiptItem) {
        this.receipt.addItem(item, wallet);
        this.game.update(item);
    }

    finalize() {
        this.game.finalize();
    }
}

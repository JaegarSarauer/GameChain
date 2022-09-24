import WriteWallet from '../objects/wallet/WriteWallet';
import Receipt from '../objects/receipt/Receipt';
import ReceiptItem from '../objects/receipt/ReceiptItem';
import GameInterface from './GameInterface';
import GameProxy from './GameProxy';
import Controller from '../objects/Controller';
import Wallet from '../objects/wallet/Wallet';
import AssignWalletReceiptItem from '../objects/receipt/items/AssignWalletReceiptItem';
import InvalidReceiptItem from '../objects/receipt/items/InvalidReceiptItem';

export default class GameController extends Controller {
    game: GameProxy;
    receipt: Receipt;

    constructor(gameInterface: GameInterface) {
        super();
        this.game = new GameProxy(this, gameInterface);
        this.receipt = new Receipt();
    }

    initialize() {
        // TODO consolidate into one call area.
        this.addReceiptItem(InvalidReceiptItem)
        this.addReceiptItem(AssignWalletReceiptItem)
        
        this.game.initialize();
    }

    async update(wallet: Wallet, item: ReceiptItem) {
        await this.receipt.addItem(item, wallet);
        this.game.update(item);
    }

    finalize() {
        this.game.finalize();
    }
}

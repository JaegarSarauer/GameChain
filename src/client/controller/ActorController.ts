import iWeb3 from '../../adapter/web3';
import GameController from '../../game/GameController';
import AssignWalletReceiptItem from '../../objects/receipt/items/AssignWalletReceiptItem';
import WriteWallet from '../../objects/wallet/WriteWallet';
import Wallet from '../../objects/wallet/Wallet';
import LobbyController from '../../game/LobbyController';


//TODO figure out if this is a manager or controller
export default class ActorController {
    owner: Wallet | undefined;
    actor: Wallet | undefined;
    lobbyController: LobbyController;
    gameController: GameController | undefined;

    // todo replace with pubsub
    onGameReadyCallbacks: ((gameController: GameController) => void)[] = [];

    //TODO move the lobby controller instance, this is client -> server
    constructor(lobbyController: LobbyController) {
        this.lobbyController = lobbyController;
    }

    _createWallet() {
        const wallet = new WriteWallet(iWeb3.createWallet());
        return wallet;
    }

    getActor() {
        return this.actor ? this.actor : this.owner;
    }

    getOwner() {
        return this.owner;
    }

    queueAsOwner(player: Wallet) {
        this.owner = player;
        
        // TODO send better
        this.lobbyController.addClient(this);
    }

    queueAsSignedActor(owner: Wallet) {
        this.owner = owner;
        this.actor = this._createWallet();
        // TODO send better
        this.lobbyController.addClient(this);
    }

    async onGameReady(gameController: GameController) {
        const gameHash = 'TODO set proper game hash.';
        const actor = this.getActor() as Wallet;
        
        if (!this.owner) {
            throw 'Not queued.';
        }

        const assignWalletItem = new AssignWalletReceiptItem(actor, this.owner.getAddress(), gameHash);
        await gameController.update(this.owner, assignWalletItem);
        this.gameController = gameController;
        this.onGameReadyCallbacks.map((callback) => callback(gameController));
    }
}

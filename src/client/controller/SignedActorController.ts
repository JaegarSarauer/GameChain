import Wallet from "../../objects/Wallet";


export default class SignedActorController {
    wallets: Wallet[] = [];

    registerSignedWallet(wallet: Wallet) {
        this.wallets.push(wallet);
    }

    getWalletsInLobby() {
        return this.wallets.filter((wallet: Wallet) => wallet.isInGame() ? null : wallet);
    }
}
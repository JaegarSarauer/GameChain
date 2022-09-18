import Wallet from "../../objects/wallet/WriteWallet";

export class Actor {
    wallet: Wallet;

    constructor(wallet: Wallet) {
        this.wallet = wallet;
    }
}
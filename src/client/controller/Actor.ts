import Wallet from "../../objects/Wallet";

export class Actor {
    wallet: Wallet;

    constructor(wallet: Wallet) {
        this.wallet = wallet;
    }
}
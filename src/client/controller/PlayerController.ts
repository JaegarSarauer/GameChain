import iWeb3 from "../../adapter/web3";
import Wallet from "../../objects/Wallet";

class PlayerController {
    createWallet() {
        // Create a wallet 
        // Return the wallet
        const wallet = new Wallet(iWeb3.createWallet());
        return wallet;
    }
}
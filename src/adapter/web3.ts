import { SignedSignature } from '../objects/receipt/SignatureType';
import Web3 from 'web3';
import { Account, WalletBase, SignatureObject } from 'web3-core';
import MetaMask from './MetaMask';
import getWindow from './window';


class Web3Impl {
    web3: Web3 | undefined;
    metaMask: MetaMask | undefined;
    wallets: WalletBase | undefined;
    walletCounterId: number = 0;

    async init() {
        this.metaMask = new MetaMask();
        if (await this.metaMask.init()) {
            this.web3 = this.metaMask.web3;
        } else {
            this.web3 = new Web3(); 
        }
        getWindow.web3 = this.web3;
        this.wallets = this.web3!.eth.accounts.wallet.create(10);
    }

    createWallet(): Account {
        // TODO make this secure.
        const wallet = this.wallets?.[this.walletCounterId++];
        return wallet as Account;
    }

    // TODO return a read-only wallet?
    recoverSignature(sign: SignedSignature): string | undefined {
        const address = this.web3?.eth.accounts.recover(sign);
        return address
    }
}

const iWeb3 = new Web3Impl();
iWeb3.init();
export default iWeb3;

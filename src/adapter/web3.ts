import Web3 from 'web3';
import { Account } from 'web3-core';
import MetaMask from './MetaMask';
import getWindow from './window';

class Web3Impl {
    web3: Web3 | undefined;
    metaMask: MetaMask | undefined;

    async init() {
        this.metaMask = new MetaMask();
        if (await this.metaMask.init()) {
            this.web3 = this.metaMask.web3;
        } else {
            this.web3 = new Web3(); 
        }
        getWindow.web3 = this.web3;
    }

    createWallet(): Account {
        const wallet = this.web3!.eth.accounts.wallet.create(1);
        return wallet[0];
    }
}

const iWeb3 = new Web3Impl();
iWeb3.init();
export default iWeb3;

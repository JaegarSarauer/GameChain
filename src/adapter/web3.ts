import Web3 from 'web3';
import { Account } from 'web3-core';

class Web3Impl {
    web3: Web3;
    constructor() {
        this.web3 = new Web3();
    }

    createWallet(): Account {
        const wallet = this.web3.eth.accounts.wallet.create(1);
        return wallet[0];
    }
}

const iWeb3 = new Web3Impl();
export default iWeb3;

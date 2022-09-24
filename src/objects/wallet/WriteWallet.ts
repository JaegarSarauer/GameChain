import iWeb3 from '../../adapter/web3';
import { Account } from 'web3-core';
import { UnsignedItemSignature } from '../receipt/Receipt';
import Wallet from './Wallet';
import { SignedSignature } from '../receipt/SignatureType';


export default class WriteWallet implements Wallet {
    ownerPublicKey?: string;
    web3Wallet: Account;
    inGame: boolean = false;

    constructor(web3Wallet: Account) {
        this.web3Wallet = web3Wallet;
    }

    isInGame() {
        return this.inGame;
    }

    isOwned() {
        return this.ownerPublicKey != null;
    }

    getAddress() {
        return this.web3Wallet.address;
    }

    sign(item: UnsignedItemSignature): SignedSignature {
        const message = JSON.stringify(item);
        const signature = this.web3Wallet.sign(message) as SignedSignature;
        signature.message = JSON.parse(signature.message);
        return signature;
    }

    recover(signature: SignedSignature): string | undefined {
        const address = iWeb3?.web3?.eth.accounts.recover(signature);
        return address
    }
}

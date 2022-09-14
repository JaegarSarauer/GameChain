import iWeb3 from '../adapter/web3';
import { Account, Sign } from 'web3-core';
import { SignatureType } from './receipt/SignatureType';

interface Signature {
    data: any;
    signatureType: SignatureType;
}

export default class Wallet {
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

    sign(signature: Signature): Sign {
        const message = JSON.stringify(signature);
        return this.web3Wallet.sign(message);
    }

    signMessage(data: string) {
        return this.sign({ data, signatureType: 'NONE' });
    }

    assignWalletOwner(ownerPublicKey: string) {
        if (!this.ownerPublicKey) {
            this.ownerPublicKey = ownerPublicKey;
        }
        const data = { owner: this.ownerPublicKey };
        const dataString = JSON.stringify(data);
        return this.sign({ data: dataString, signatureType: "ASSIGN_OWNER" });
    }
}

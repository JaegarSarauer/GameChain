import iWeb3 from 'adapter/web3';
import { Account, Sign } from 'web3-core';
import { SignatureType, SignatureTypes } from './receipt/SignatureType';

interface Signature {
    message: string;
    signatureType: SignatureType;
}

export default class Wallet {
    ownerPublicKey?: string;
    web3Wallet: Account;

    constructor(web3Wallet: Account) {
        this.web3Wallet = web3Wallet;
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

    signMessage(message: string) {
        return this.sign({ message, signatureType: 'NONE' });
    }

    assignWalletOwner(ownerPublicKey: string) {
        if (!this.ownerPublicKey) {
            this.ownerPublicKey = ownerPublicKey;
        }
        const data = { owner: this.ownerPublicKey };
        const message = JSON.stringify(data);
        return this.sign({ message, signatureType: "ASSIGN_OWNER" });
    }
}

import { UnsignedItemSignature } from '../receipt/Receipt';
import Wallet from './Wallet';
import { SignedSignature } from '../receipt/SignatureType';
import iWeb3 from '../../adapter/web3';


export default class ReadWallet implements Wallet {
    ownerPublicKey?: string;
    address: string;
    inGame: boolean = false;

    constructor(address: string) {
        this.address = address;
    }

    isInGame() {
        return this.inGame;
    }

    isOwned() {
        return this.ownerPublicKey != null;
    }

    getAddress() {
        return this.address;
    }

    sign(item: UnsignedItemSignature): SignedSignature {
        throw 'Cannot sign with Read-Only Wallet';
    }

    recover(signature: SignedSignature): string | undefined {
        const address = iWeb3?.web3?.eth.accounts.recover(signature);
        return address
    }
}

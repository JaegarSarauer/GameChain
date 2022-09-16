import { ReceiptData } from '../../adapter/IPFS';
import ReceiptItem from './ReceiptItem';
import { SignedSignature } from './SignatureType';
import SignatureUnwrapper from '../../validator/SignatureUnwrapper';
import ReceiptItemTypeDictionary from './ReceiptItemTypeDictionary';
import Wallet from '../wallet/Wallet';


export type UnsignedItemSignature = (SignedSignature | undefined | ReceiptItem)[];


export default class Receipt {
    signature: SignedSignature | undefined;
    types: ReceiptItemTypeDictionary;

    constructor() {
        this.types = new ReceiptItemTypeDictionary();
    }

    getItem(index: number): ReceiptItem | undefined {
        if (this.signature) {
            const sigUnwrap = new SignatureUnwrapper(this.signature);
            const [message, signer] = sigUnwrap.getSignature(index);
            console.info(message, signer);
            //this.types.createItemFromType(message)
            // initialize receipt item from message.

            // TODO actual conversion
            return;
        }
        return;
    }

    addItem(item: ReceiptItem, wallet: Wallet) {
        const signature = this._sign(item, wallet);
        this.types.add(item);
        signature.message = JSON.parse(signature.message);
        this.signature = signature;
    }

    getItemLength() {
        if (this.signature) {
            const sigUnwrap = new SignatureUnwrapper(this.signature);
            return sigUnwrap.signatureCount;
        }
        return 0;
    }

    load(data: ReceiptData) {
        this.signature = JSON.parse(data);
    }

    _sign(item: ReceiptItem, wallet: Wallet): SignedSignature {
        const fullSig = [this.signature, item];
        return wallet.sign(fullSig) as SignedSignature;
    }
}

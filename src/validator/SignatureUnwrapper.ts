import iWeb3 from "../adapter/web3";
import { SignedSignature } from "../objects/receipt/SignatureType";
import ReceiptItem from "../objects/receipt/ReceiptItem";

export default class SignatureUnwrapper {
    signature: SignedSignature;
    signatureIndex: number = 0;
    signatureCount: number = 0;
    constructor(signature: SignedSignature) {
        this.signature = signature;
        this._findSignatureCount(this.signature);
    }

    next(): any { //ReceiptItem {
        const message = this._cycle(this.signature, this.signatureCount - 1);
        const signer = iWeb3.recoverSignature(message);
        //console.info(message);
    }

    _findSignatureCount(signature: SignedSignature) {
        if (signature?.message?.data) {
            this.signatureCount++;
            this._findSignatureCount(signature.message.data[0]);
        }
    }

    _cycle(signature: SignedSignature, depth: number) {
        if (signature?.message?.data) {
            if (depth > this.signatureIndex) {
                return this._cycle(signature.message.data[0], --depth);
            } else if (depth == this.signatureIndex) {
                ++this.signatureIndex;
                return signature;
            }
        }
    }
}
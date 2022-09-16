import iWeb3 from "../adapter/web3";
import { SignedSignature } from "../objects/receipt/SignatureType";
import ReceiptItem from "../objects/receipt/ReceiptItem";

export default class SignatureUnwrapper {
    signature: SignedSignature;
    signatureCount: number = 0;
    constructor(signature: SignedSignature) {
        this.signature = signature;
        this._findSignatureCount(this.signature);
    }

    getSignature(index: number): [SignedSignature, string | undefined] {
        if (index < 0 || index >= this.signatureCount) {
            throw 'Signature index out of bounds';
        }
        const message = this._cycle(this.signature, this.signatureCount - 1, index);
        const signer = iWeb3.recoverSignature(message);
        return [message, signer];
    }

    _findSignatureCount(signature: SignedSignature) {
        if (signature?.message) {
            this.signatureCount++;
            this._findSignatureCount(signature.message[0]);
        }
    }

    _cycle(signature: SignedSignature, depth: number, targetIndex: number): SignedSignature {
        if (signature?.message) {
            if (depth > targetIndex) {
                return this._cycle(signature.message[0], --depth, targetIndex);
            } else if (depth == targetIndex) {
                return signature;
            }
        }
        return signature;
    }
}
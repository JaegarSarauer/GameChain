import iWeb3 from "../../adapter/web3";
import Wallet from "../../objects/Wallet";
import { ReceiptData } from "../../adapter/IPFS";
import ReceiptItem from "./ReceiptItem";
import {SignedSignature} from './SignatureType';

export default class Receipt {
    signatures: (SignedSignature | ReceiptItem)[];
    constructor() {
        this.signatures = [];
    }

    addItem(item: ReceiptItem, wallet: Wallet) {
        const signature = this.sign(item, wallet);
        signature.message = JSON.parse(signature.message);
        //this.signatures.push(signature);
        this.signatures = [signature];
        console.info('Signature result: ', this.signatures)
    }

    load(data: ReceiptData) {
        this.signatures = JSON.parse(data);
    }

    sign(item: ReceiptItem, wallet: Wallet): SignedSignature {
        this.signatures.push(item);
        const signature = wallet.sign({
            data: this.signatures,
            signatureType: 'ACTOR_ACTION',
        });
        // console.info('Signature: ', signature);
        // iWeb3.recoverSignature(signature as SignatureObject);
        return signature as SignedSignature;
        //lastItem.signature = signature;
    }
}
import { ReceiptData } from '../../adapter/IPFS';
import ReceiptItem from './ReceiptItem';
import { SignedSignature } from './SignatureType';
import SignatureUnwrapper from '../../validator/SignatureUnwrapper';
import ReceiptItemTypeDictionary from './ReceiptItemTypeDictionary';
import Wallet from '../wallet/Wallet';
import ReadWallet from '../wallet/ReadWallet';
import InvalidReceiptItem from './items/InvalidReceiptItem';

export type UnsignedItemSignature = ({ [key: string]: any } | undefined)[];

export default class Receipt {
    signature: SignedSignature | undefined;
    types: ReceiptItemTypeDictionary;
    validActors: string[] = [];

    constructor() {
        this.types = new ReceiptItemTypeDictionary();
    }

    getItem(index: number): ReceiptItem | undefined {
        if (this.signature) {
            const sigUnwrap = new SignatureUnwrapper(this.signature);
            const [message, signer] = sigUnwrap.getSignature(index);
            const data = message.message[1];

            const item = this.types.createItemFromType(data.type, data);

            if (item) {
                // TODO special case
                if (item.type == 'ASSIGN_WALLET') {
                    return item;
                } else if (signer && this.isValidActor(signer)) {
                    return item;
                }
            }
        }
        return new InvalidReceiptItem();
    }

    isValidActor(address: string) {
        return this.validActors.filter((add: string) => add == address).length > 0;
    }

    async addItem(item: ReceiptItem, wallet: Wallet) {
        const signature = await this._sign(item, wallet);
        if (!this.types.has(item.type)) {
            throw `Unknown ReceiptItem type ${item.type}. Must be registered for validation.`
        }
        this.signature = signature;
    }

    getItemLength() {
        if (this.signature) {
            const sigUnwrap = new SignatureUnwrapper(this.signature);
            return sigUnwrap.signatureCount;
        }
        return 0;
    }

    async _sign(item: ReceiptItem, wallet: Wallet): Promise<SignedSignature> {
        const fullSig = [this.signature, item.toSignatureData()];
        return await wallet.sign(fullSig) as SignedSignature;
    }
}

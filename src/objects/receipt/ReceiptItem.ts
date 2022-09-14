import Wallet from "../../objects/Wallet";
//TODO make all uses of SignatureObject wrapped.
import {type SignedSignature} from './SignatureType';

export type ReceiptItemResult = unknown;

interface ReceiptItem {
    signature: SignedSignature | undefined;
    execute(): ReceiptItemResult;
}

export default ReceiptItem;
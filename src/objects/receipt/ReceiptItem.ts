import Controller from '../Controller';
import Wallet from '../wallet/Wallet';

export type ReceiptItemResult = unknown;

interface ReceiptItem {
    [data: string]: any;
    type: string;
    execute(controller: Controller): ReceiptItemResult;
    //getBuilder(): (params: {[param: string]: any}) => ReceiptItem;
    toSignatureData(): {[key: string]: any};
    fromSignatureData(params: {[param: string]: any}): ReceiptItem;
}

export default ReceiptItem;

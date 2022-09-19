import Controller from '../../Controller';
import ReceiptItem, { ReceiptItemParams } from '../ReceiptItem';

/*
This Receipt Item is also used as initial handshake which can be used to determine timeouts.
*/
export default class InvalidReceiptItem extends ReceiptItem {
    constructor() {
        super('INVALID');
    }

    execute(controller: Controller): void {

    }

    toSignatureData() {
        return {
        };
    }

    fromSignatureData(params: ReceiptItemParams) {
        return new InvalidReceiptItem();
    }
}

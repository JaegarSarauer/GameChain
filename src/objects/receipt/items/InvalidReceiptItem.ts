import Controller from '../../Controller';
import ReadWallet from '../../wallet/ReadWallet';
import Wallet from '../../wallet/Wallet';
import ReceiptItem from '../ReceiptItem';

/*
This Receipt Item is also used as initial handshake which can be used to determine timeouts.
*/
export default class InvalidReceiptItem implements ReceiptItem {
    type: string = 'INVALID';

    execute(controller: Controller): void {

    }

    // getBuilder(): (params: {[param: string]: any}) => ReceiptItem {
    //     // return ({ownerAddress, gameHash}) => {
    //     //     return new AssignWalletReceiptItem(ownerAddress, gameHash);
    //     // };
    // }

    toSignatureData() {
        return {
        };
    }

    fromSignatureData(params: {[param: string]: any}) {
        return new InvalidReceiptItem();
    }
}

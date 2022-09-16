import Controller from '../../Controller';
import ReceiptItem from '../ReceiptItem';

/*
This Receipt Item is also used as initial handshake which can be used to determine timeouts.
*/
export default class AssignWalletReceiptItem implements ReceiptItem {
    type: string = 'ASSIGN_WALLET';
    ownerAddress: string;
    gameHash: string;

    constructor(ownerAddress: string, gameHash: string) {
        this.ownerAddress = ownerAddress;
        this.gameHash = gameHash;
    }

    execute(controller: Controller): void {
        //const piece = main.game?.
    }

    getBuilder(): (...params: any) => ReceiptItem {
        return (ownerAddress: string, gameHash: string) => {
            return new AssignWalletReceiptItem(ownerAddress, gameHash);
        };
    }
}

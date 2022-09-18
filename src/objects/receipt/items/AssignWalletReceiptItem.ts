import Controller from '../../Controller';
import ReadWallet from '../../wallet/ReadWallet';
import Wallet from '../../wallet/Wallet';
import ReceiptItem from '../ReceiptItem';

/*
This Receipt Item is also used as initial handshake which can be used to determine timeouts.
*/
export default class AssignWalletReceiptItem implements ReceiptItem {
    type: string = 'ASSIGN_WALLET';
    actor: Wallet;
    ownerAddress: string;
    gameHash: string;

    constructor(actor: Wallet, ownerAddress: string, gameHash: string) {
        this.actor = actor;
        this.ownerAddress = ownerAddress;
        this.gameHash = gameHash;
    }

    execute(controller: Controller): void {
        controller.receipt.validActors.push(this.actor.getAddress());
    }

    // getBuilder(): (params: {[param: string]: any}) => ReceiptItem {
    //     // return ({ownerAddress, gameHash}) => {
    //     //     return new AssignWalletReceiptItem(ownerAddress, gameHash);
    //     // };
    // }

    toSignatureData() {
        return {
            actorAddress: this.actor.getAddress(),
            ownerAddress: this.ownerAddress,
            gameHash: this.gameHash,
            type: this.type,
        };
    }

    fromSignatureData(params: {[param: string]: any}) {
        const {actorAddress, ownerAddress, gameHash} = params;
        return new AssignWalletReceiptItem(new ReadWallet(actorAddress), ownerAddress, gameHash);
    }
}
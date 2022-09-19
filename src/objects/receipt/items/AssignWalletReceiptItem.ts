import Controller from '../../Controller';
import ReadWallet from '../../wallet/ReadWallet';
import Wallet from '../../wallet/Wallet';
import ReceiptItem, { ReceiptItemParams } from '../ReceiptItem';

/*
This Receipt Item is also used as initial handshake which can be used to determine timeouts.
*/
export default class AssignWalletReceiptItem extends ReceiptItem {
    actor: Wallet;
    ownerAddress: string;
    gameHash: string;

    constructor(actor: Wallet, ownerAddress: string, gameHash: string) {
        super('ASSIGN_WALLET');
        this.actor = actor;
        this.ownerAddress = ownerAddress;
        this.gameHash = gameHash;
    }

    execute(controller: Controller): void {
        controller.receipt.validActors.push(this.actor.getAddress());
    }

    toSignatureData() {
        return {
            actorAddress: this.actor.getAddress(),
            ownerAddress: this.ownerAddress,
            gameHash: this.gameHash,
            type: this.type,
        };
    }

    fromSignatureData(params: ReceiptItemParams) {
        const {actorAddress, ownerAddress, gameHash} = params;
        return new AssignWalletReceiptItem(new ReadWallet(actorAddress), ownerAddress, gameHash);
    }
}

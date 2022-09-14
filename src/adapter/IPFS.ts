import Receipt from "../objects/receipt/Receipt";

export type CID = string;
export type ReceiptData = string;

export class IPFS {
    receipts: {[key: string]: ReceiptData} = {};

    _generateKey(): CID {
        return String(Math.random())
    }

    uploadReceipt(receipt: Receipt): CID {
        const key = this._generateKey();
        this.receipts[key] = JSON.stringify(receipt);
        return key;
    }

    downloadReceipt(key: CID): Receipt {
        const receipt = new Receipt();
        //TODO JSON parse
        receipt.load(this.receipts[key])
        return receipt;
    }
}

const IPFSNode = new IPFS();
export default IPFSNode;
import { UnsignedItemSignature } from "../receipt/Receipt";
import { SignedSignature } from "../receipt/SignatureType";

interface Wallet {
    inGame: boolean;

    isInGame(): boolean;
    isOwned(): boolean;
    getAddress(): string;
    sign(item: UnsignedItemSignature): SignedSignature;
    recover(signature: SignedSignature): string | undefined;
}

export default Wallet;
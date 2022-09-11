
// defines the expected receipt structure for a game.
/*
Needs:
 - Allow for setup, gameplay, and cleanup/win condition of a game.
 - Allow for 1 to n players and non-player actors
    - (one is required in order to build the receipt)
 - 
*/

import { SignatureType } from "./SignatureType";

export interface Rule {
    signatureType: SignatureType | string;
    params: RuleParams;
}

export type RuleParams = {[key: string]: string|number;};

export default class ReceiptStructure {
    rules: Rule[] = [];

    addRule(signatureType: SignatureType | string, params: RuleParams) {
        return {
            signatureType, params
        };
    }
}
export const SignatureTypes = {
    NONE: 'NONE',
    ASSIGN_OWNER: 'ASSIGN_OWNER',
    ACTOR_ACTION: 'ACTOR_ACTION'
} as const;

export interface SignedSignature {
    message: any;
    messageHash: string;
    r: string;
    s: string;
    v: string;
}

export type SignatureType = keyof typeof SignatureTypes;
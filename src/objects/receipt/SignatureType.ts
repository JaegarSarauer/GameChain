export const SignatureTypes = {
    NONE: 'NONE',
    ASSIGN_OWNER: 'ASSIGN_OWNER',
} as const;

export type SignatureType = keyof typeof SignatureTypes;

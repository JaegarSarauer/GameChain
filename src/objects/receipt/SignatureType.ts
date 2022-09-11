export const SignatureTypes = {
    NONE: 'NONE',
    ASSIGN_OWNER: 'ASSIGN_OWNER',
    ACTOR_ACTION: 'ACTOR_ACTION'
} as const;



export type SignatureType = keyof typeof SignatureTypes;
import { Secp256k1KeyIdentity } from '@dfinity/identity-secp256k1';
export interface MockIdentity {
    name: string;
    principal: string;
    derEncodedPublicKey: string;
    identity: Secp256k1KeyIdentity;
    userGroup: number;
    seed: String;
}
export declare function getIdentityFromPhraseWithSeed2(phrase: string): {
    identity: Secp256k1KeyIdentity;
    seed: Uint8Array;
};
export declare function generateSeedphraseText(pathToSave: string): string;
export declare function generatePemfile(pathToSave: string, { seedPhrase }: {
    seedPhrase?: string;
}): void;

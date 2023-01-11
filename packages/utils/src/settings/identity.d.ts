import { SignIdentity } from '@dfinity/agent';
export declare function fromHexString(hexString: string): ArrayBuffer;
export declare const toHexString: (bytes: Uint8Array) => string;
export declare function getIdentityFromPem(): SignIdentity;
export declare function getIdentityFromPhrase(phrase: string): SignIdentity;
export declare function getIdentityFromPhraseWithSeed(phrase: string): {
    identity: SignIdentity;
    seed: Uint8Array;
};
declare const identity: () => SignIdentity;
export { identity };

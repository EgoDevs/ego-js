import { Principal } from '@dfinity/principal';
export type AccountIdentifier = string;
export declare function hasOwnProperty<X extends Record<string, unknown>, Y extends PropertyKey>(obj: Record<string, unknown>, prop: Y): obj is X & Record<Y, unknown>;
export declare function getCanisterId(configName: string): string | undefined;
export declare const asciiStringToByteArray: (text: string) => Array<number>;
export declare const principalToAccountIdentifier: (principal: Principal, subAccount?: Uint8Array) => string;
export declare const stringToAccountIdentifier: (str: string) => AccountIdentifier | undefined;
export declare const accountIdentifierToBytes: (accountIdentifier: AccountIdentifier) => Uint8Array;
export declare const calculateCrc32: (bytes: Uint8Array) => Uint8Array;

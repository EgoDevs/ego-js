export interface CredentialProject {
    folder?: string;
    seedPhrase: string;
    production_pem: string;
    production_cycles_wallet: string;
}
export declare function getEgoConfig<T>(key: string): T;
export declare const dfxVersion: number;
export declare const dfxPort: number;
export declare const canisters: string;
export declare const artifacts: string;
export declare const configs: string;
export declare const credentials: string;
export declare const productionPem: string;
export declare const productionCyclesWallet: string;
export declare const seedPhrase: string;
export declare const isProduction: boolean;
export declare const cyclesCreateCanister: bigint;
export declare function getEgoEnv(): string;
export declare const isIC: boolean;

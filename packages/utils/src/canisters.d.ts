export interface EgoInfraCanister {
    name: string;
    mainnet: string;
    testnet: string;
    local?: string;
}
export declare const egoInfra: EgoInfraCanister[];

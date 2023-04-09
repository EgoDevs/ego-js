import { ActorSubclass, SignIdentity } from '@dfinity/agent';
import { InterfaceFactory } from '@dfinity/candid/lib/cjs/idl';
import { EgoInfraCanister } from '@ego-js/utils';
export declare enum EgoNetwork {
    MainNet = "mainnet",
    TestNet = "testnet",
    Local = "local"
}
export declare abstract class EgoInfraInterface {
    mainnet: string;
    testnet: string;
    name: string;
    local?: string;
    abstract getCanisterId(network: EgoNetwork): string;
    abstract getCanisterName(): string;
    abstract getCurrentCanisterId(): string;
    abstract getCurrentNetwork(): EgoNetwork;
    abstract overrideCanisterId(network: EgoNetwork, canisterId: string): void;
    abstract toJSON(): EgoInfraCanister;
}
export declare class EgoInfraBase<T> implements EgoInfraInterface {
    mainnet: string;
    testnet: string;
    name: string;
    local?: string | undefined;
    currentNetwork: EgoNetwork;
    idl: InterfaceFactory;
    signIdentity: SignIdentity;
    private _actor;
    constructor(egoInfra: EgoInfraCanister, idl: InterfaceFactory, signIdentity?: SignIdentity, currentNetwork?: EgoNetwork);
    private _getActor;
    getActor(): Promise<ActorSubclass<T>>;
    toJSON(): EgoInfraCanister;
    getCanisterId(network: EgoNetwork): string;
    getCanisterName(): string;
    getCurrentCanisterId(): string;
    getCurrentNetwork(): EgoNetwork;
    overrideCanisterId(network: EgoNetwork, canisterId: string): void;
}

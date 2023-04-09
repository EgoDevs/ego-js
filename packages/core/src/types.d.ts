import { ActorMethod, ActorSubclass, SignIdentity } from '@dfinity/agent';
import { InterfaceFactory } from '@dfinity/candid/lib/cjs/idl';
import { Principal } from '@dfinity/principal';
import { EgoInfraCanister } from '@ego-js/utils';
import { Result_5, Result_6, Result_7, Result_8, Result_9, Result_10 } from './idls/ego_store';
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
export interface EgoLibWrapper {
    ego_canister_add: ActorMethod<[string, Principal], Result_6>;
    ego_controller_add: ActorMethod<[Principal], Result_6>;
    ego_controller_remove: ActorMethod<[Principal], Result_6>;
    ego_controller_set: ActorMethod<[Array<Principal>], Result_6>;
    ego_is_owner: ActorMethod<[], Result_9>;
    ego_is_user: ActorMethod<[], Result_9>;
    ego_log_list: ActorMethod<[bigint], Result_10>;
    ego_op_add: ActorMethod<[Principal], Result_6>;
    ego_owner_add: ActorMethod<[Principal], Result_6>;
    ego_owner_add_with_name: ActorMethod<[string, Principal], Result_6>;
    ego_owner_remove: ActorMethod<[Principal], Result_6>;
    ego_owner_set: ActorMethod<[Array<Principal>], Result_6>;
    ego_user_add: ActorMethod<[Principal], Result_6>;
    ego_user_remove: ActorMethod<[Principal], Result_6>;
    ego_user_set: ActorMethod<[Array<Principal>], Result_6>;
}
export interface EgoLibCycleWrapper {
    ego_cycle_check: ActorMethod<[], Result_6>;
    ego_cycle_estimate_set: ActorMethod<[bigint], Result_6>;
    ego_cycle_history: ActorMethod<[], Result_7>;
    ego_cycle_info: ActorMethod<[], Result_8>;
    ego_cycle_recharge: ActorMethod<[bigint], Result_6>;
    ego_cycle_threshold_get: ActorMethod<[], Result_5>;
    ego_runtime_cycle_threshold_get: ActorMethod<[], Result_5>;
}
export declare class EgoInfraBase<T extends EgoLibWrapper> implements EgoInfraInterface {
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
    useNetwork(network: EgoNetwork): void;
    toJSON(): EgoInfraCanister;
    getCanisterId(network: EgoNetwork): string;
    getCanisterName(): string;
    getCurrentCanisterId(): string;
    getCurrentNetwork(): EgoNetwork;
    overrideCanisterId(network: EgoNetwork, canisterId: string): void;
    egoOwnerAdd(principal: Principal): Promise<boolean>;
    egoOwnerAddWithName(name: string, principal: Principal): Promise<boolean>;
    egoOwnerRemove(principal: Principal): Promise<boolean>;
    egoOwnerSet(principals: Array<Principal>): Promise<boolean>;
    egoUserAdd(principal: Principal): Promise<boolean>;
    egoUserRemove(principal: Principal): Promise<boolean>;
    egoUserSet(principals: Array<Principal>): Promise<boolean>;
    egoOpAdd(principal: Principal): Promise<boolean>;
    egoIsUser(): Promise<boolean>;
    egoIsOwner(): Promise<boolean>;
    egoControllerAdd(principal: Principal): Promise<boolean>;
    egoControllerRemove(principal: Principal): Promise<boolean>;
    egoControllerSet(principals: Array<Principal>): Promise<boolean>;
}

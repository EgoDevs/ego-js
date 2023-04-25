import { CreateActorResult } from './settings/agent';
import { canister_settings, definite_canister_settings, _SERVICE as ManagementService } from './idls/management';
import { _SERVICE as CycleWalletService } from './idls/cycle_wallet';
import { ActorSubclass, SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
export declare const cycleWalletCanisterId: string;
export declare function managementActor(id?: SignIdentity): Promise<CreateActorResult<ManagementService>>;
export declare function cycleWalletActor(id?: SignIdentity): Promise<CreateActorResult<CycleWalletService>>;
export declare function readWasm(packagePath: string): number[];
export interface EGOPackage {
    type: string;
    candid: string;
    wasm: string;
    build: string[];
}
export interface ConfigFile {
    LOCAL_CANISTERID?: string;
    PRODUCTION_CANISTERID?: string;
}
export declare function readEgoDfxJson(folder: string, packageName: string): EGOPackage;
export declare function readConfig(configPath: string): ConfigFile;
export declare enum InstallMode {
    install = 0,
    reinstall = 1,
    upgrade = 2
}
export declare class ManagementApi {
    private _actor;
    get actor(): ActorSubclass<ManagementService>;
    constructor(_actor: ActorSubclass<ManagementService>);
    static create(id?: SignIdentity): Promise<ManagementApi>;
    static install({ id, name, wasm_path, canister_id, installMode, }: {
        id?: SignIdentity;
        name: string;
        wasm_path: string;
        canister_id: string;
        installMode: InstallMode;
    }): Promise<void>;
    static status(canister: string, id?: SignIdentity): Promise<{
        status: {
            stopped: null;
        } | {
            stopping: null;
        } | {
            running: null;
        };
        memory_size: bigint;
        cycles: bigint;
        settings: definite_canister_settings;
        module_hash: [] | [Array<number>];
    }>;
    static getCanisterControllers(canister: string, id?: SignIdentity): Promise<Principal[]>;
    static updateSettings(name: string, canister_id: string, settings: canister_settings, id?: SignIdentity): Promise<void>;
}

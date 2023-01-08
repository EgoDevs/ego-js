import { CreateActorResult } from './settings/agent';
import { canister_settings, _SERVICE as ManagementService } from './idls/management';
import { _SERVICE as CycleWalletService } from './idls/cycle_wallet';
import { ActorSubclass } from '@dfinity/agent';
export declare const cycleWalletCanisterId: string;
export declare function managementActor(): Promise<CreateActorResult<ManagementService>>;
export declare function cycleWalletActor(): Promise<CreateActorResult<CycleWalletService>>;
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
    static create(): Promise<ManagementApi>;
    static install({ name, wasm_path, canister_id, installMode, }: {
        name: string;
        wasm_path: string;
        canister_id: string;
        installMode: InstallMode;
    }): Promise<void>;
    static updateSettings(name: string, canister_id: string, settings: canister_settings): Promise<void>;
}

import { CreateActorResult, getActor, getActor2 } from './settings/agent';
import { canister_settings, definite_canister_settings, _SERVICE as ManagementService } from './idls/management';
import path from 'path';

import { _SERVICE as CycleWalletService } from './idls/cycle_wallet';
import { idlFactory as managementIdl } from './idls/management.idl';
import { idlFactory as cycleWalletIdl } from './idls/cycle_wallet.idl';
import { ActorSubclass, SignIdentity } from '@dfinity/agent';
import fs from 'fs';
import { Principal } from '@dfinity/principal';
import { identity } from './settings/identity';
import { productionCyclesWallet } from './settings/env';
import { fetch, Headers } from 'cross-fetch';

if (!globalThis.fetch) {
  (globalThis as any).fetch = fetch;
}

if (!global.fetch) {
  (global as any).fetch = fetch;
}

if (globalThis) {
  (globalThis as any).Headers = Headers;
}

if (global) {
  (global as any).Headers = Headers;
}

const managementCanisterId = '';
export const cycleWalletCanisterId = productionCyclesWallet;

export async function managementActor(id?: SignIdentity): Promise<CreateActorResult<ManagementService>> {
  return await getActor2<ManagementService>(id ?? identity(), managementIdl, managementCanisterId);
}

export async function cycleWalletActor(id?: SignIdentity): Promise<CreateActorResult<CycleWalletService>> {
  return await getActor2<CycleWalletService>(id ?? identity(), cycleWalletIdl, cycleWalletCanisterId);
}

export function readWasm(packagePath: string): number[] {
  return Array.from(new Uint8Array(fs.readFileSync(packagePath)));
}

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

export function readEgoDfxJson(folder: string, packageName: string): EGOPackage {
  const dfxFile = fs.readFileSync(folder + '/dfx.json').toString();
  const jsonFile = JSON.parse(dfxFile);
  const pkg: EGOPackage = jsonFile['canisters'][packageName];
  return pkg;
}

export function readConfig(configPath: string): ConfigFile {
  return JSON.parse(fs.readFileSync(configPath).toString()) as ConfigFile;
}

export enum InstallMode {
  install,
  reinstall,
  upgrade,
}

export class ManagementApi {
  get actor() {
    return this._actor;
  }
  constructor(private _actor: ActorSubclass<ManagementService>) {}
  static async create(id?: SignIdentity) {
    const { actor } = await managementActor(id);
    return new ManagementApi(actor);
  }

  static async install({
    id,
    name,
    wasm_path,
    canister_id,
    installMode = InstallMode.install,
  }: {
    id?: SignIdentity;
    name: string;
    wasm_path: string;
    canister_id: string;
    installMode: InstallMode;
  }) {
    const manager = await ManagementApi.create(id);
    console.log(`installing ${name} to ${canister_id}`);
    let mode: { install: null } | { reinstall: null } | { upgrade: null };
    switch (installMode) {
      case InstallMode.install:
        mode = { install: null };
        break;
      case InstallMode.reinstall:
        mode = { reinstall: null };
        break;
      case InstallMode.upgrade:
        mode = { upgrade: null };
        break;
      default:
        mode = { install: null };
        break;
    }
    try {
      const wasm = readWasm(wasm_path);
      await manager.actor.install_code({
        arg: [],
        wasm_module: readWasm(wasm_path),
        mode,
        canister_id: Principal.fromText(canister_id),
      });

      console.log(`Success with wasm bytes length: ${wasm.length}`);
    } catch (error) {
      throw new Error(`
      Error: Failed to install ${name} to ${canister_id}
      Reason: ${(error as Error).message}
      `);
    }
  }
  static async status(
    canister: string,
    id?: SignIdentity,
  ): Promise<{
    status: { stopped: null } | { stopping: null } | { running: null };
    memory_size: bigint;
    cycles: bigint;
    settings: definite_canister_settings;
    module_hash: [] | [Array<number>];
  }> {
    const manager = await ManagementApi.create(id);
    const status = await manager.actor.canister_status({ canister_id: Principal.fromText(canister) });
    return status;
  }

  static async getCanisterControllers(canister: string, id?: SignIdentity): Promise<Principal[]> {
    const status = await ManagementApi.status(canister, id);
    return status.settings.controllers;
  }

  static async updateSettings(name: string, canister_id: string, settings: canister_settings, id?: SignIdentity) {
    const manager = await ManagementApi.create(id);
    console.log(`update settings ${name} : ${canister_id}`);

    await manager.actor.update_settings({
      canister_id: Principal.fromText(canister_id),
      settings,
    });
  }
}

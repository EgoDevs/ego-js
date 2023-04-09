import { ActorMethod, ActorSubclass, SignIdentity } from '@dfinity/agent';
import { InterfaceFactory } from '@dfinity/candid/lib/cjs/idl';
import { Principal } from '@dfinity/principal';
import { EgoInfraCanister, getActor, getCanisterId, hasOwnProperty, identity } from '@ego-js/utils';
import { Result_5, Result_6, Result_7, Result_8, Result_9, Result_10, CycleRecord, CycleInfo } from './idls/ego_store';

export enum EgoNetwork {
  MainNet = 'mainnet',
  TestNet = 'testnet',
  Local = 'local',
}

export abstract class EgoInfraInterface {
  mainnet!: string;
  testnet!: string;
  name!: string;
  local?: string;
  public abstract getCanisterId(network: EgoNetwork): string;
  public abstract getCanisterName(): string;
  public abstract getCurrentCanisterId(): string;
  public abstract getCurrentNetwork(): EgoNetwork;
  public abstract overrideCanisterId(network: EgoNetwork, canisterId: string): void;
  public abstract toJSON(): EgoInfraCanister;
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

export class EgoInfraBase<T extends EgoLibWrapper> implements EgoInfraInterface {
  public mainnet: string;
  public testnet: string;
  public name: string;
  public local?: string | undefined;
  public currentNetwork: EgoNetwork;
  public idl: InterfaceFactory;
  public signIdentity: SignIdentity;
  private _actor: Promise<ActorSubclass<T>>;
  constructor(egoInfra: EgoInfraCanister, idl: InterfaceFactory, signIdentity: SignIdentity = identity(), currentNetwork?: EgoNetwork) {
    this.mainnet = egoInfra.mainnet;
    this.testnet = egoInfra.testnet;
    this.name = egoInfra.name;
    this.local = egoInfra.local;
    this.currentNetwork = currentNetwork ?? EgoNetwork.Local;
    this.idl = idl;
    this.signIdentity = signIdentity;
    this._actor = this._getActor<T>(signIdentity, this.currentNetwork);
  }

  private _getActor<T extends EgoLibWrapper>(signIdentity: SignIdentity, network: EgoNetwork = EgoNetwork.Local): Promise<ActorSubclass<T>> {
    return getActor(signIdentity, this.idl, this.getCanisterId(network));
  }

  public async getActor(): Promise<ActorSubclass<T>> {
    return await this._actor;
  }

  public useNetwork(network: EgoNetwork): void {
    this.currentNetwork = network;
  }

  public toJSON() {
    return {
      name: this.name,
      mainnet: this.mainnet,
      testnet: this.testnet,
      local: this.local,
    } as EgoInfraCanister;
  }
  public getCanisterId(network: EgoNetwork): string {
    switch (network) {
      case EgoNetwork.MainNet:
        return this.mainnet;
      case EgoNetwork.TestNet:
        return this.testnet;
      case EgoNetwork.Local:
        if (this.local) {
          return this.local;
        } else {
          try {
            const localCanisterId = getCanisterId(this.name);
            if (localCanisterId) {
              this.overrideCanisterId(EgoNetwork.Local, localCanisterId);
              return localCanisterId;
            } else {
              throw new Error('Local canister id not found');
            }
          } catch (error) {
            throw error;
          }
        }
    }
  }
  public getCanisterName(): string {
    return this.name;
  }
  public getCurrentCanisterId(): string {
    return this.getCanisterId(this.currentNetwork);
  }
  public getCurrentNetwork(): EgoNetwork {
    return this.currentNetwork;
  }
  public overrideCanisterId(network: EgoNetwork, canisterId: string): void {
    switch (network) {
      case EgoNetwork.MainNet:
        this.mainnet = canisterId;
        break;
      case EgoNetwork.TestNet:
        this.testnet = canisterId;
        break;
      case EgoNetwork.Local:
        this.local = canisterId;
        break;
    }
  }
  public async egoOwnerAdd(principal: Principal): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_owner_add(principal);
    if (hasOwnProperty(result, 'Ok')) {
      return true;
    } else {
      throw result.Err;
    }
  }
  public async egoOwnerAddWithName(name: string, principal: Principal): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_owner_add_with_name(name, principal);
    if (hasOwnProperty(result, 'Ok')) {
      return true;
    } else {
      throw result.Err;
    }
  }
  public async egoOwnerRemove(principal: Principal): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_owner_remove(principal);
    if (hasOwnProperty(result, 'Ok')) {
      return true;
    } else {
      throw result.Err;
    }
  }

  public async egoOwnerSet(principals: Array<Principal>): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_owner_set(principals);
    if (hasOwnProperty(result, 'Ok')) {
      return true;
    } else {
      throw result.Err;
    }
  }
  public async egoUserAdd(principal: Principal): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_user_add(principal);
    if (hasOwnProperty(result, 'Ok')) {
      return true;
    } else {
      throw result.Err;
    }
  }
  public async egoUserRemove(principal: Principal): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_user_remove(principal);
    if (hasOwnProperty(result, 'Ok')) {
      return true;
    } else {
      throw result.Err;
    }
  }
  public async egoUserSet(principals: Array<Principal>): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_user_set(principals);
    if (hasOwnProperty(result, 'Ok')) {
      return true;
    } else {
      throw result.Err;
    }
  }

  public async egoOpAdd(principal: Principal): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_op_add(principal);
    if (hasOwnProperty(result, 'Ok')) {
      return true;
    } else {
      throw result.Err;
    }
  }

  public async egoIsUser(): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_is_user();
    if (hasOwnProperty(result, 'Ok')) {
      return result.Ok;
    } else {
      throw result.Err;
    }
  }

  public async egoIsOwner(): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_is_owner();
    if (hasOwnProperty(result, 'Ok')) {
      return result.Ok;
    } else {
      throw result.Err;
    }
  }

  public async egoControllerAdd(principal: Principal): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_controller_add(principal);
    if (hasOwnProperty(result, 'Ok')) {
      return true;
    } else {
      throw result.Err;
    }
  }

  public async egoControllerRemove(principal: Principal): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_controller_remove(principal);
    if (hasOwnProperty(result, 'Ok')) {
      return true;
    } else {
      throw result.Err;
    }
  }

  public async egoControllerSet(principals: Array<Principal>): Promise<boolean> {
    const actor = await this.getActor();
    const result = await actor.ego_controller_set(principals);
    if (hasOwnProperty(result, 'Ok')) {
      return true;
    } else {
      throw result.Err;
    }
  }
}

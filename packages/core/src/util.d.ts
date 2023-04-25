import { SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { EgoInfraCanister } from '@ego-js/utils';
export declare function getInfra(name: string): EgoInfraCanister;
export declare function add_controller_to_canister(canisterId: string, controller: Principal | string, id?: SignIdentity, name?: string): Promise<string[]>;

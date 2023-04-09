import { EgoInfraBase, EgoNetwork } from './types';
import { _SERVICE as egoService } from './idls/ego_store';
import { SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
export declare class EgoStore extends EgoInfraBase<egoService> {
    constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork);
    addWalletProvider(appId: string, provider_id: string | Principal): Promise<import("./idls/ego_store").Result_2>;
}

import { EgoInfraBase, EgoNetwork } from './types';
import { AppMainInstallRequest, AppMainUpgradeRequest, _SERVICE as tenantService } from './idls/ego_tenant';
import { SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
export declare class EgoTenant extends EgoInfraBase<tenantService> {
    constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork);
    appMainDelete(canister: Principal): Promise<boolean>;
    appMainInstall(request: AppMainInstallRequest): Promise<Principal>;
    appMainUpgrade(request: AppMainUpgradeRequest): Promise<boolean>;
}

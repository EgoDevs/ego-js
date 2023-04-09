import { EgoInfraBase, EgoInfraInterface, EgoNetwork } from './types';
import { getInfra } from './util';
import { hasOwnProperty } from '@ego-js/utils';
import { idlFactory as tenantIDL } from './idls/ego_tenant.idl';
import { AppMainInstallRequest, AppMainUpgradeRequest, _SERVICE as tenantService } from './idls/ego_tenant';
import { SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export class EgoTenant extends EgoInfraBase<tenantService> {
  constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork) {
    super(getInfra('ego_tenant'), tenantIDL, signIdentity, currentNetwork);
  }

  async appMainDelete(canister: Principal): Promise<boolean> {
    const res = await (await this.getActor()).app_main_delete(canister);
    if (hasOwnProperty(res, 'Ok')) {
      return true;
    } else {
      throw new Error(JSON.stringify(res.Err));
    }
  }
  async appMainInstall(request: AppMainInstallRequest): Promise<Principal> {
    const res = await (await this.getActor()).app_main_install(request);
    if (hasOwnProperty(res, 'Ok')) {
      return res.Ok;
    } else {
      throw new Error(JSON.stringify(res.Err));
    }
  }

  async appMainUpgrade(request: AppMainUpgradeRequest): Promise<boolean> {
    const res = await (await this.getActor()).app_main_upgrade(request);
    if (hasOwnProperty(res, 'Ok')) {
      return res.Ok;
    } else {
      throw new Error(JSON.stringify(res.Err));
    }
  }
}

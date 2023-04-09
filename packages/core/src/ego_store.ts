import { EgoInfraBase, EgoInfraInterface, EgoNetwork } from './types';
import { getInfra } from './util';
import { egoInfra } from '@ego-js/utils';
import { idlFactory as storeIDL } from './idls/ego_store.idl';
import { _SERVICE as egoService } from './idls/ego_store';
import { SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export class EgoStore extends EgoInfraBase<egoService> {
  constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork) {
    super(getInfra('ego_store'), storeIDL, signIdentity, currentNetwork);
  }

  async addWalletProvider(appId: string, provider_id: string | Principal) {
    return await (
      await this.getActor()
    ).admin_wallet_provider_add({
      wallet_app_id: appId,
      wallet_provider: Principal.from(provider_id),
    });
  }
}

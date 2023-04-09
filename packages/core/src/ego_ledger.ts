import { EgoInfraBase, EgoInfraInterface, EgoNetwork } from './types';
import { getInfra } from './util';
import { hasOwnProperty } from '@ego-js/utils';
import { idlFactory as ledgerIDL } from './idls/ego_ledger.idl';
import { _SERVICE as ledgerService } from './idls/ego_ledger';
import { SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export class EgoLedger extends EgoInfraBase<ledgerService> {
  constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork) {
    super(getInfra('ego_ledger'), ledgerIDL, signIdentity, currentNetwork);
  }
}

import { EgoInfraBase, EgoInfraInterface, EgoNetwork } from './types';
import { getInfra } from './util';
import { hasOwnProperty } from '@ego-js/utils';
import { idlFactory as opsIDL } from './idls/ego_ops.idl';
import { _SERVICE as opsService } from './idls/ego_ops';
import { SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export class EgoOps extends EgoInfraBase<opsService> {
  constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork) {
    super(getInfra('ego_ops'), opsIDL, signIdentity, currentNetwork);
  }
}

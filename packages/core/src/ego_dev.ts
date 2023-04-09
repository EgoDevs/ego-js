import { EgoInfraBase, EgoInfraInterface, EgoNetwork } from './types';
import { getInfra } from './util';
import { hasOwnProperty } from '@ego-js/utils';
import { idlFactory as devIDL } from './idls/ego_dev.idl';
import { _SERVICE as devService } from './idls/ego_dev';
import { SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export class EgoDev extends EgoInfraBase<devService> {
  constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork) {
    super(getInfra('ego_dev'), devIDL, signIdentity, currentNetwork);
  }
}

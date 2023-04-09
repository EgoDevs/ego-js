import { EgoInfraBase, EgoInfraInterface, EgoNetwork } from './types';
import { getInfra } from './util';
import { hasOwnProperty } from '@ego-js/utils';
import { idlFactory as recordIDL } from './idls/ego_record.idl';
import { _SERVICE as recordService } from './idls/ego_record';
import { SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export class EgoRecord extends EgoInfraBase<recordService> {
  constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork) {
    super(getInfra('ego_record'), recordIDL, signIdentity, currentNetwork);
  }
}

import { EgoInfraBase, EgoInfraInterface, EgoNetwork } from './types';
import { getInfra } from './util';
import { hasOwnProperty } from '@ego-js/utils';
import { idlFactory as fileIDL } from './idls/ego_file.idl';
import { _SERVICE as fileService } from './idls/ego_file';
import { SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export class EgoFile extends EgoInfraBase<fileService> {
  constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork) {
    super(getInfra('ego_file'), fileIDL, signIdentity, currentNetwork);
  }
}

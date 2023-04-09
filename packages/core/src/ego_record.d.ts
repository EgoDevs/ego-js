import { EgoInfraBase, EgoNetwork } from './types';
import { _SERVICE as recordService } from './idls/ego_record';
import { SignIdentity } from '@dfinity/agent';
export declare class EgoRecord extends EgoInfraBase<recordService> {
    constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork);
}

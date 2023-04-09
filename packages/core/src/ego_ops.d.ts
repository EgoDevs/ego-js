import { EgoInfraBase, EgoNetwork } from './types';
import { _SERVICE as opsService } from './idls/ego_ops';
import { SignIdentity } from '@dfinity/agent';
export declare class EgoOps extends EgoInfraBase<opsService> {
    constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork);
}

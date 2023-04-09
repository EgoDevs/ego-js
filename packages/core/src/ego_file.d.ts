import { EgoInfraBase, EgoNetwork } from './types';
import { _SERVICE as fileService } from './idls/ego_file';
import { SignIdentity } from '@dfinity/agent';
export declare class EgoFile extends EgoInfraBase<fileService> {
    constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork);
}

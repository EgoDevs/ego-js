import { EgoInfraBase, EgoNetwork } from './types';
import { _SERVICE as devService } from './idls/ego_dev';
import { SignIdentity } from '@dfinity/agent';
export declare class EgoDev extends EgoInfraBase<devService> {
    constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork);
}

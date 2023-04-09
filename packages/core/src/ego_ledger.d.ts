import { EgoInfraBase, EgoNetwork } from './types';
import { _SERVICE as ledgerService } from './idls/ego_ledger';
import { SignIdentity } from '@dfinity/agent';
export declare class EgoLedger extends EgoInfraBase<ledgerService> {
    constructor(signIdentity?: SignIdentity, currentNetwork?: EgoNetwork);
}

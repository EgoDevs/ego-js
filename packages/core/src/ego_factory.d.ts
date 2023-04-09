import { SignIdentity } from '@dfinity/agent';
import { EgoNetwork } from './types';
import { EgoStore } from './ego_store';
import { EgoDev } from './ego_dev';
import { EgoLedger } from './ego_ledger';
import { EgoOps } from './ego_ops';
import { EgoTenant } from './ego_tenant';
import { EgoFile } from './ego_file';
import { EgoRecord } from './ego_record';
export declare class EgoFactory {
    readonly store: EgoStore;
    readonly dev: EgoDev;
    readonly file: EgoFile;
    readonly ledger: EgoLedger;
    readonly ops: EgoOps;
    readonly tenant: EgoTenant;
    readonly record: EgoRecord;
    constructor(store: EgoStore, dev: EgoDev, file: EgoFile, ledger: EgoLedger, ops: EgoOps, tenant: EgoTenant, record: EgoRecord);
    static connect(signIdentity?: SignIdentity, network?: EgoNetwork): Promise<EgoFactory>;
    useNetwork(network: EgoNetwork): EgoFactory;
}

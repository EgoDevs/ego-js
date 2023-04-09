import { SignIdentity } from '@dfinity/agent';
import { identity } from '@ego-js/utils';
import { EgoNetwork } from './types';
import { EgoStore } from './ego_store';
import { EgoDev } from './ego_dev';
import { EgoLedger } from './ego_ledger';
import { EgoOps } from './ego_ops';
import { EgoTenant } from './ego_tenant';
import { EgoFile } from './ego_file';
import { EgoRecord } from './ego_record';

export class EgoFactory {
  constructor(
    public readonly store: EgoStore,
    public readonly dev: EgoDev,
    public readonly file: EgoFile,
    public readonly ledger: EgoLedger,
    public readonly ops: EgoOps,
    public readonly tenant: EgoTenant,
    public readonly record: EgoRecord,
  ) {}

  static async connect(signIdentity: SignIdentity = identity(), network: EgoNetwork = EgoNetwork.Local) {
    const store = new EgoStore(signIdentity, network);
    const dev = new EgoDev(signIdentity, network);
    const file = new EgoFile(signIdentity, network);
    const ledger = new EgoLedger(signIdentity, network);
    const ops = new EgoOps(signIdentity, network);
    const tenant = new EgoTenant(signIdentity, network);
    const record = new EgoRecord(signIdentity, network);
    return new EgoFactory(store, dev, file, ledger, ops, tenant, record);
  }

  useNetwork(network: EgoNetwork): EgoFactory {
    this.store.useNetwork(network);
    this.dev.useNetwork(network);
    this.file.useNetwork(network);
    this.ledger.useNetwork(network);
    this.ops.useNetwork(network);
    this.tenant.useNetwork(network);
    this.record.useNetwork(network);
    return this;
  }
}

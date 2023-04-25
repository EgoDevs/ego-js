import { SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { EgoInfraCanister, ManagementApi, egoInfra } from '@ego-js/utils';

export function getInfra(name: string): EgoInfraCanister {
  try {
    return egoInfra.find(infra => infra.name === name)!;
  } catch (error) {
    throw new Error(`Ego Infra ${name} not found`);
  }
}

export async function add_controller_to_canister(
  canisterId: string,
  controller: Principal | string,
  id?: SignIdentity,
  name?: string,
): Promise<string[]> {
  const status = await ManagementApi.status(canisterId, id);
  const list = status.settings.controllers;
  list.push(typeof controller === 'string' ? Principal.fromText(controller) : controller);

  await ManagementApi.updateSettings(
    name ?? '',
    canisterId,
    {
      freezing_threshold: [status.settings.freezing_threshold],
      compute_allocation: [status.settings.compute_allocation],
      memory_allocation: [status.settings.memory_allocation],
      controllers: [list],
    },
    id,
  );
  return (await ManagementApi.status(canisterId, id)).settings.controllers.map(e => e.toText());
}

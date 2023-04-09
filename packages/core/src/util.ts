import { EgoInfraCanister, egoInfra } from '@ego-js/utils';

export function getInfra(name: string): EgoInfraCanister {
  try {
    return egoInfra.find(infra => infra.name === name)!;
  } catch (error) {
    throw new Error(`Ego Infra ${name} not found`);
  }
}

import fs from 'fs';

export interface CredentialProject {
  seedPhrase: string;
  production_pem: string;
  production_cycles_wallet: string;
}

export function getEgoConfig<T>(key: string): T {
  const config = JSON.parse(
    fs.readFileSync(`${process.cwd()}/ego-config.json`, {
      encoding: 'utf8',
    }),
  );
  return config[key] as T;
}
export const dfxVersion = getEgoConfig<number>('dfxVersion');
export const dfxPort = getEgoConfig<number>('dfxPort');
export const canisters = getEgoConfig<string>('canisters');
export const artifacts = getEgoConfig<string>('artifacts');
export const configs = getEgoConfig<string>('configs');
export const productionPem = getEgoConfig<CredentialProject>('credentials').production_pem;
export const productionCyclesWallet = getEgoConfig<CredentialProject>('credentials').production_cycles_wallet;
export const seedPhrase = getEgoConfig<CredentialProject>('credentials').seedPhrase;
export const isProduction = process.env.NODE_ENV === 'production';
export const cyclesCreateCanister = BigInt(getEgoConfig<string>('cycles_install_code').replace('_', ''));

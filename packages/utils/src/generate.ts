import Mock from 'mockjs';
import { Secp256k1KeyIdentity } from '@dfinity/identity-secp256k1';
import curve from 'starkbank-ecdsa';
import fs from 'fs';
import { toHexString } from '@dfinity/candid';
import KeyEncoder from 'key-encoder';
import { fetch, Headers } from 'cross-fetch';

if (!globalThis.fetch) {
  (globalThis as any).fetch = fetch;
}

if (!global.fetch) {
  (global as any).fetch = fetch;
}

if (globalThis) {
  (globalThis as any).Headers = Headers;
}

if (global) {
  (global as any).Headers = Headers;
}

const BIP32Factory = require('bip32');
const bip39 = require('bip39');
const ecc = require('tiny-secp256k1');

const keyEncoder = new KeyEncoder('secp256k1');

const { Random } = Mock;

export interface MockIdentity {
  name: string;
  principal: string;
  derEncodedPublicKey: string;
  identity: Secp256k1KeyIdentity;
  userGroup: number;
  seed: String;
}

export function getIdentityFromPhraseWithSeed2(phrase: string): {
  identity: Secp256k1KeyIdentity;
  seed: Uint8Array;
} {
  const seed = bip39.mnemonicToSeedSync(phrase);

  const ICP_PATH = "m/44'/223'/0'";
  const path = `${ICP_PATH}/0/0`;

  const bip32 = (BIP32Factory as any).default(ecc);

  const node = bip32.fromSeed(seed);

  const child = node.derivePath(path);

  return {
    identity: Secp256k1KeyIdentity.fromSecretKey(child.privateKey!),
    seed: new Uint8Array(seed),
  };
  // return seed;
}

export function generateSeedphraseText(pathToSave: string): string {
  const str = bip39.generateMnemonic();
  fs.writeFileSync(pathToSave, str);
  return str;
}

export function generatePemfile(pathToSave: string, { seedPhrase }: { seedPhrase?: string }) {
  const str = seedPhrase ?? bip39.generateMnemonic();
  const res = getIdentityFromPhraseWithSeed2(str);
  const save = keyEncoder.encodePrivate(toHexString(res.identity.getKeyPair().secretKey), 'raw', 'pem');
  fs.writeFileSync(pathToSave, save);
}

// function identityFactoryWihPhrase(phrase: string, index: number, group: number) {
//   const ids: Array<MockIdentity> = [];
//   for (var i = 0; i < index; i += 1) {
//     const { identity, seed } = getIdentityFromPhraseWithSeed(phrase);
//     ids.push({
//       name: Random.name(),
//       derEncodedPublicKey: toHexString(identity.getPublicKey().toDer()),
//       principal: identity.getPrincipal().toText(),
//       identity: identity,
//       userGroup: group,
//       seed: toHexString(seed),
//     });
//   }
//   return ids;
// }

// function generate2() {
//   fs.writeFileSync(
//     `${process.cwd()}/clients/fixtures/identities2.json`,
//     JSON.stringify([
//       ...identityFactoryWihPhrase('drama catch young miss please high blanket animal armor outdoor capital page', 1, 0),
//       // ...identityFactory(2, 1),
//       // ...identityFactory(2, 2),
//       // ...identityFactory(2, 3),
//     ]),
//   );
// }

// generate2();

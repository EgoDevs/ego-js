import fs from 'fs';
import path from 'path';
import { Secp256k1KeyIdentity } from '@dfinity/identity-secp256k1';
import { fetch, Headers } from 'cross-fetch';

if (!globalThis.fetch) {
  (globalThis as any).fetch = fetch;
  (globalThis as any).Headers = Headers;
}

if (!global.fetch) {
  (global as any).fetch = fetch;
  (global as any).Headers = Headers;
}

const BIP32Factory = require('bip32');
const bip39 = require('bip39');
const ecc = require('tiny-secp256k1');

import { SignIdentity } from '@dfinity/agent';
import curve from 'starkbank-ecdsa';
import { isProduction, productionPem, seedPhrase as seedPhraseFile } from './env';

export function fromHexString(hexString: string): ArrayBuffer {
  return new Uint8Array((hexString.match(/.{1,2}/g) ?? []).map(byte => parseInt(byte, 16))).buffer;
}

export const toHexString = (bytes: Uint8Array) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

export function getIdentityFromPem(): SignIdentity {
  const PrivateKey = curve.PrivateKey;
  const secretKey = PrivateKey.fromPem(
    fs
      .readFileSync(path.join(process.cwd(), productionPem), {
        encoding: 'utf-8',
      })
      .toString(),
  );
  return Secp256k1KeyIdentity.fromSecretKey(fromHexString(BigInt(secretKey.secret.toString()).toString(16)));
}

export function getIdentityFromPhrase(phrase: string): SignIdentity {
  const seed = bip39.mnemonicToSeedSync(phrase);

  const ICP_PATH = "m/44'/223'/0'";
  const path = `${ICP_PATH}/0/0`;

  const bip32 = (BIP32Factory as any).default(ecc);

  const node = bip32.fromSeed(seed);

  const child = node.derivePath(path);

  return Secp256k1KeyIdentity.fromSecretKey(child.privateKey!);
  // return seed;
}

export function getIdentityFromPhraseWithSeed(phrase: string): {
  identity: SignIdentity;
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

const identity = () => {
  if (!isProduction) {
    if (fs.existsSync(path.join(process.cwd(), seedPhraseFile))) {
      const seedPhrase = fs
        .readFileSync(path.join(process.cwd(), seedPhraseFile), {
          encoding: 'utf8',
        })
        .toString();
      return getIdentityFromPhrase(seedPhrase);
    } else {
      return Secp256k1KeyIdentity.generate();
    }
  } else {
    return getIdentityFromPem();
  }
};

export { identity };

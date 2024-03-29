import fs from 'fs';
import path from 'path';
import { fetch, Headers } from 'cross-fetch';
import { Principal } from '@dfinity/principal';
import { sha224 } from 'js-sha256';
import crc from 'crc';
import { configs, getEgoEnv } from './env';
import yargs from 'yargs';

const toHexString = (bytes: Uint8Array) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
export type AccountIdentifier = string;

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

export function hasOwnProperty<X extends Record<string, unknown>, Y extends PropertyKey>(
  obj: Record<string, unknown>,
  prop: Y,
): obj is X & Record<Y, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// export function getCanisterId(configName: string): string | undefined {
//   const isProd = process.env.NODE_ENV === 'production';
//   let canisterId: string | undefined;
//   if (isProd) {
//     const localFile = fs.readFileSync(path.resolve(`./${configs}/${configName}.json`), { encoding: 'utf8' });
//     canisterId = JSON.parse(localFile).PRODUCTION_CANISTERID;
//   } else {
//     const localFile = fs.readFileSync(path.resolve(`./${configs}/${configName}.json`), { encoding: 'utf8' });
//     canisterId = JSON.parse(localFile).LOCAL_CANISTERID;
//   }
//   return canisterId;
// }

export function getCanisterId(configName: string, env?: string): string | undefined {
  let fileName: string;
  let combinedEnv = env ?? getEgoEnv();

  let key = 'ic';
  switch (combinedEnv) {
    case 'local': {
      fileName = `${process.cwd()}/configs/local.json`;
      key = 'local';
      break;
    }
    case 'production': {
      fileName = `${process.cwd()}/configs/mainnet.json`;
      key = 'ic';
      break;
    }
    case 'mainnet': {
      fileName = `${process.cwd()}/configs/mainnet.json`;
      key = 'ic';
      break;
    }
    case 'testnet': {
      fileName = `${process.cwd()}/configs/testnet.json`;
      key = 'ic';
      break;
    }
    case 'custom': {
      fileName = `${process.cwd()}/configs/custom.json`;
      key = 'local';
      break;
    }
    default: {
      fileName = `${process.cwd()}/configs/local.json`;
      key = 'local';
      break;
    }
  }
  const localFile = fs.readFileSync(path.resolve(fileName), { encoding: 'utf8' });
  const canisterId = JSON.parse(localFile)[configName][key];
  return canisterId;
}

export const asciiStringToByteArray = (text: string): Array<number> => {
  return Array.from(text).map(c => c.charCodeAt(0));
};

export const principalToAccountIdentifier = (principal: Principal, subAccount?: Uint8Array): string => {
  // Hash (sha224) the principal, the subAccount and some padding
  const padding = asciiStringToByteArray('\x0Aaccount-id');

  const shaObj = sha224.create();
  shaObj.update([...padding, ...principal.toUint8Array(), ...(subAccount ?? Array(32).fill(0))]);
  const hash = new Uint8Array(shaObj.array());

  // Prepend the checksum of the hash and convert to a hex string
  const checksum = calculateCrc32(hash);
  const bytes = new Uint8Array([...checksum, ...hash]);
  return toHexString(bytes);
};

export const stringToAccountIdentifier = (str: string): AccountIdentifier | undefined => {
  try {
    if (str.length === 64) {
      return str;
    }
    if (str.length === 63) {
      return principalToAccountIdentifier(Principal.fromText(str));
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const accountIdentifierToBytes = (accountIdentifier: AccountIdentifier): Uint8Array => {
  return Uint8Array.from(Buffer.from(accountIdentifier, 'hex'));
};

export const calculateCrc32 = (bytes: Uint8Array): Uint8Array => {
  const checksumArrayBuf = new ArrayBuffer(4);
  const view = new DataView(checksumArrayBuf);
  view.setUint32(0, crc.crc32(Buffer.from(bytes)), false);
  return Buffer.from(checksumArrayBuf);
};

// export const

export const argv = yargs
  .option('clean', {
    alias: 'c',
    description: 'clean .dfx/ folder',
    type: 'boolean',
  })
  .option('create', {
    alias: 'n',
    description: 'create only',
    type: 'boolean',
  })
  .option('credentials', {
    alias: 'd',
    description: 'bootstrap credentials',
    type: 'boolean',
  })
  .option('init', {
    alias: 'init',
    description: 'init config',
    type: 'boolean',
  })
  .option('install', {
    alias: 'i',
    description: 'install only',
    type: 'boolean',
  })
  .option('reinstall', {
    alias: 'r',
    description: 'reinstall only',
    type: 'boolean',
  })
  .option('upgrade', {
    alias: 'u',
    description: 'upgrade only',
    type: 'boolean',
  })
  .option('postPatch', {
    alias: 'post',
    description: 'postPatch only',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h').argv;

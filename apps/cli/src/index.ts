import { runEgoBuilder } from './builder';
import {
  checkAndArtifacts,
  generateDFXJson,
  runClean,
  runCreate,
  runInstall,
  runReInstall,
  runUpgrade,
  runPostPatch,
  runCredentials,
  readDFX,
} from './deployer';
import yargs from 'yargs';
import { ThisArgv } from '@ego-js/utils';

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

if ((argv as ThisArgv).clean) {
  // console.log('clean');
  runClean();
}
if ((argv as ThisArgv).init) {
  // console.log('clean');
  readDFX();
}

if ((argv as ThisArgv).credentials) {
  // console.log('clean');
  runCredentials();
}

if ((argv as ThisArgv).create) {
  // console.log('create');
  checkAndArtifacts();
  generateDFXJson();
  runCreate();
}

if ((argv as ThisArgv).build) {
  runEgoBuilder();
}

if ((argv as ThisArgv).install) {
  // console.log('install');
  runInstall();
}

if ((argv as ThisArgv).reinstall) {
  // console.log('reinstall');
  runReInstall();
}

if ((argv as ThisArgv).upgrade) {
  // console.log('upgrade');
  runUpgrade();
}

if ((argv as ThisArgv).postPatch) {
  // console.log('upgrade');
  runPostPatch();
}

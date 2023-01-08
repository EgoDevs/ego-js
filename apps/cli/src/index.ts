import { runEgoBuilder } from './builder';
import { checkAndArtifacts, generateDFXJson, runClean, runCreate, runInstall, runReInstall, runUpgrade, runPostPatch } from './deployer';
import yargs from 'yargs';

interface ThisArgv {
  [x: string]: unknown;
  clean: boolean | undefined;
  create: boolean | undefined;
  build: boolean | undefined;
  install: boolean | undefined;
  reinstall: boolean | undefined;
  upgrade: boolean | undefined;
  remove: string | undefined;
  postPatch: boolean | undefined;
  _: (string | number)[];
  $0: string;
}

const argv = yargs
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

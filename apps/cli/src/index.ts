import { ThisArgv, argv } from '@ego-js/utils';
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
  runMigrateV1,
} from './deployer';

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

if ((argv as ThisArgv).migrate_v1) {
  // console.log('clean');
  runMigrateV1();
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

import file, { fstat } from 'fs';
import shell from 'shelljs';
import yargs from 'yargs';

import { ProjectConfig, getEgos, ThisArgv, argv } from '@ego-js/utils';
import { artifacts, canisters } from '@ego-js/utils';
import { fetch, Headers } from 'cross-fetch';
import { generateCandidFile } from './wasm_candid';

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

interface ThatArgv {
  [x: string]: unknown;
  idl: boolean | undefined;
  _: (string | number)[];
  $0: string;
}

const argv2 = yargs
  .option('idl', {
    alias: 'i',
    description: 'build idl only',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h').argv;

function buildDID(ego: ProjectConfig) {
  console.log({ ego });
  let originFile = `${process.cwd()}/${canisters}/${ego.category}/${ego.package}/${ego.package}.did`;

  let shouldSaveAutoName = `${process.cwd()}/${artifacts}/${ego.package}/${ego.package}.auto.did`;
  let shouldSaveName = `${process.cwd()}/${artifacts}/${ego.package}/${ego.package}.did`;

  if (ego.custom_candid && file.existsSync(originFile)) {
    shell.exec(`cp ${originFile} ${shouldSaveName}`);
  }

  let did_file_exist = true;
  try {
    did_file_exist = file.existsSync(shouldSaveName);
  } catch (error) {
    did_file_exist = false;
  }
  console.log({ did_file_exist });
  if (did_file_exist && ego.custom_candid) {
    // EGO_DIR="${process.cwd()}/${canisters}/${ego.category}/${ego.package}"
    if (!ego.single_mod) {
      const exist = file.existsSync(`${process.cwd()}/${canisters}/target/release/${ego.bin_name}`);
      const dir = exist ? `${process.cwd()}/${canisters}/target/release` : `${process.cwd()}/${canisters}`;
      const useCargo = exist ? './' : 'cargo run --release --bin ';
      shell.exec(`
      EGO_DIR= ${dir}
      cd $EGO_DIR && ${useCargo}${ego.bin_name} > ${shouldSaveAutoName}
      `);
    } else {
      generateCandidFile(shouldSaveAutoName, `${process.cwd()}/${canisters}/target/wasm32-unknown-unknown/release/${ego.package}.wasm`);
    }
  } else {
    console.log('Generating DID files');
    if (!ego.single_mod) {
      const exist = file.existsSync(`${process.cwd()}/${canisters}/target/release/${ego.bin_name}`);
      const dir = exist ? `${process.cwd()}/${canisters}/target/release` : `${process.cwd()}/${canisters}`;
      const useCargo = exist ? './' : 'cargo run --release --bin ';
      shell.exec(`
    EGO_DIR=${dir}
    cd $EGO_DIR && ${useCargo}${ego.bin_name} > ${shouldSaveAutoName} && ${useCargo}${ego.bin_name}> ${shouldSaveName}
    `);
    } else {
      generateCandidFile(shouldSaveAutoName, `${process.cwd()}/${canisters}/target/wasm32-unknown-unknown/release/${ego.package}.wasm`);
      generateCandidFile(shouldSaveName, `${process.cwd()}/${canisters}/target/wasm32-unknown-unknown/release/${ego.package}.wasm`);
    }
  }
}

function buildIDL(ego: ProjectConfig) {
  console.log('Build typescript IDL files');
  shell.exec(`
    EGO_DIR="${process.cwd()}/${artifacts}/${ego.package}"
    didc bind $EGO_DIR/${ego.package}.did -t ts > ${process.cwd()}/clients/idls/${ego.package}.d.ts
    didc bind $EGO_DIR/${ego.package}.did -t js > ${process.cwd()}/clients/idls/${ego.package}.idl.ts
    `);
}

function runBuildRust(ego: ProjectConfig) {
  // buildDID();
  let withFeatures = '';
  if (ego.features && ego.features.length > 0) {
    withFeatures = `--features '${ego.features.join(' ')}'`;
  }
  if (ego.no_build === false || ego.no_build === undefined) {
    let shouldSaveName = `${process.cwd()}/${artifacts}/${ego.package}/${ego.package}_opt.wasm`;
    if (!ego.single_mod) {
      shell.exec(`
          PARENT_DIR="${process.cwd()}/${canisters}"
          EGO_DIR="${process.cwd()}/${canisters}/${ego.category}/${ego.package}"
          CAT_DIR="${process.cwd()}/${canisters}/${ego.category}"
          cargo build --manifest-path "$EGO_DIR/actor/Cargo.toml" ${withFeatures} --bin ${ego.bin_name} --release -j1 
          TARGET="wasm32-unknown-unknown"
          cargo build --manifest-path "$EGO_DIR/actor/Cargo.toml" ${withFeatures} --lib --target $TARGET --release -j1
          if [[ ! "$(command -v ic-wasm)" ]]
          then
              echo "installing ic-wasm"
              run cargo install ic-wasm
          fi
          STATUS=$?
          echo "$PARENT_DIR/target/$TARGET/release/${ego.package}.wasm"
          if [ "$STATUS" -eq "0" ]; then
                 ic-wasm \
                 "$PARENT_DIR/target/$TARGET/release/${ego.package}.wasm" \
                 -o "${shouldSaveName}" shrink --optimize O3
                 gzip -c ${shouldSaveName} > ${shouldSaveName}.gz
          
             true
           else
             echo Could not install ic-wasm.
             false
           fi
          
          `);
    } else {
      let actor_entry = ego.actor_entry ? 'actor/' : '';
      shell.exec(`
          PARENT_DIR="${process.cwd()}/${canisters}"
          EGO_DIR="${process.cwd()}/${canisters}/${ego.category}/${ego.package}"
          CAT_DIR="${process.cwd()}/${canisters}/${ego.category}"
          TARGET="wasm32-unknown-unknown"
          cargo build --manifest-path "$EGO_DIR/${actor_entry}Cargo.toml" ${withFeatures} --lib --target $TARGET --release -j1
          if [[ ! "$(command -v ic-wasm)" ]]
          then
              echo "installing ic-wasm"
              run cargo install ic-wasm
          fi
          STATUS=$?
          echo "$PARENT_DIR/target/$TARGET/release/${ego.package}.wasm"
          if [ "$STATUS" -eq "0" ]; then
                 ic-wasm \
                 "$PARENT_DIR/target/$TARGET/release/${ego.package}.wasm" \
                 -o "${shouldSaveName}" shrink --optimize O3
                 gzip -c ${shouldSaveName} > ${shouldSaveName}.gz
          
             true
           else
             echo Could not install ic-wasm.
             false
           fi
          `);
    }
  }
}

export function runEgoBuilder(): void {
  getEgos(argv as ThisArgv).forEach(ego => {
    runBuildRust(ego);
    if ((argv2 as ThatArgv).idl) {
      buildIDL(ego);
    } else {
      buildDID(ego);
      buildIDL(ego);
      // buildExampleIDL(ego);
    }
  });
}

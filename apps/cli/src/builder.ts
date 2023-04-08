import file, { fstat } from 'fs';
import shell from 'shelljs';
import yargs from 'yargs';

import { ProjectConfig, getEgos, ThisArgv } from '@ego-js/utils';
import { artifacts, canisters } from '@ego-js/utils';
import { argv } from '.';
import { fetch, Headers } from 'cross-fetch';

if (!globalThis.fetch) {
  (globalThis as any).fetch = fetch;
  (globalThis as any).Headers = Headers;
}

if (!global.fetch) {
  (global as any).fetch = fetch;
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
    const exist = file.existsSync(`${process.cwd()}/${canisters}/target/release/${ego.bin_name}`);
    const dir = exist ? `${process.cwd()}/${canisters}/target/release` : `${process.cwd()}/${canisters}`;
    const useCargo = exist ? './' : 'cargo run --release --bin ';
    shell.exec(`
    EGO_DIR= ${dir}
    cd $EGO_DIR && ${useCargo}${ego.bin_name} > ${shouldSaveAutoName}
    `);
  } else {
    console.log('Generating DID files');
    const exist = file.existsSync(`${process.cwd()}/${canisters}/target/release/${ego.bin_name}`);
    const dir = exist ? `${process.cwd()}/${canisters}/target/release` : `${process.cwd()}/${canisters}`;
    const useCargo = exist ? './' : 'cargo run --release --bin ';
    shell.exec(`
    EGO_DIR=${dir}
    cd $EGO_DIR && ${useCargo}${ego.bin_name} > ${shouldSaveAutoName} && ${useCargo}${ego.bin_name}> ${shouldSaveName}
    `);
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
  if (ego.no_build === false || ego.no_build === undefined) {
    let shouldSaveName = `${process.cwd()}/${artifacts}/${ego.package}/${ego.package}_opt.wasm`;

    shell.exec(`
          PARENT_DIR="${process.cwd()}/${canisters}"
          EGO_DIR="${process.cwd()}/${canisters}/${ego.category}/${ego.package}"
          CAT_DIR="${process.cwd()}/${canisters}/${ego.category}"
          cargo build --manifest-path "$EGO_DIR/actor/Cargo.toml" --bin ${ego.bin_name} --release -j1
          TARGET="wasm32-unknown-unknown"
          cargo build --manifest-path "$EGO_DIR/actor/Cargo.toml" --lib --target $TARGET --release -j1
          cargo install ic-wasm
          STATUS=$?
          echo "$PARENT_DIR/target/$TARGET/release/${ego.package}.wasm"
          if [ "$STATUS" -eq "0" ]; then
                 ic-wasm \
                 "$PARENT_DIR/target/$TARGET/release/${ego.package}.wasm" \
                 -o "${shouldSaveName}" shrink
                 gzip -c ${shouldSaveName} > ${shouldSaveName}.gz
          
             true
           else
             echo Could not install ic-wasm.
             false
           fi
          
          `);
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

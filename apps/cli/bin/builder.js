"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "runEgoBuilder", {
    enumerable: true,
    get: ()=>runEgoBuilder
});
const _fs = _interopRequireDefault(require("fs"));
const _shelljs = _interopRequireDefault(require("shelljs"));
const _yargs = _interopRequireDefault(require("yargs"));
const _utils = require("@ego-js/utils");
const _ = require(".");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const argv2 = _yargs.default.option('idl', {
    alias: 'i',
    description: 'build idl only',
    type: 'boolean'
}).help().alias('help', 'h').argv;
function buildDID(ego) {
    console.log({
        ego
    });
    let originFile = `${process.cwd()}/${_utils.canisters}/${ego.category}/${ego.package}/${ego.package}.did`;
    let shouldSaveAutoName = `${process.cwd()}/${_utils.artifacts}/${ego.package}/${ego.package}.auto.did`;
    let shouldSaveName = `${process.cwd()}/${_utils.artifacts}/${ego.package}/${ego.package}.did`;
    if (ego.custom_candid && _fs.default.existsSync(originFile)) {
        _shelljs.default.exec(`cp ${originFile} ${shouldSaveName}`);
    }
    let did_file_exist = true;
    try {
        did_file_exist = _fs.default.existsSync(shouldSaveName);
    } catch (error) {
        did_file_exist = false;
    }
    console.log({
        did_file_exist
    });
    if (did_file_exist && ego.custom_candid) {
        _shelljs.default.exec(`
    EGO_DIR="${process.cwd()}/${_utils.canisters}"
    cd $EGO_DIR && cargo run --release ${ego.bin_name} > ${shouldSaveAutoName}
    `);
    } else {
        console.log('Generating DID files');
        _shelljs.default.exec(`
    EGO_DIR="${process.cwd()}/${_utils.canisters}"
    cd $EGO_DIR && cargo run --release ${ego.bin_name} > ${shouldSaveAutoName} && cargo run --release ${ego.bin_name}> ${shouldSaveName}
    `);
    }
}
function buildIDL(ego) {
    console.log('Build typescript IDL files');
    _shelljs.default.exec(`
    EGO_DIR="${process.cwd()}/${_utils.artifacts}/${ego.package}"
    didc bind $EGO_DIR/${ego.package}.did -t ts > ${process.cwd()}/clients/idls/${ego.package}.d.ts
    didc bind $EGO_DIR/${ego.package}.did -t js > ${process.cwd()}/clients/idls/${ego.package}.idl.ts
    `);
}
function runBuildRust(ego) {
    if (ego.no_build === false || ego.no_build === undefined) {
        let shouldSaveName = `${process.cwd()}/${_utils.artifacts}/${ego.package}/${ego.package}_opt.wasm`;
        _shelljs.default.exec(`
          PARENT_DIR="${process.cwd()}/${_utils.canisters}"
          EGO_DIR="${process.cwd()}/${_utils.canisters}/${ego.category}/${ego.package}"
          CAT_DIR="${process.cwd()}/${_utils.canisters}/${ego.category}"
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
function runEgoBuilder() {
    (0, _utils.getEgos)(_.argv).forEach((ego)=>{
        runBuildRust(ego);
        if (argv2.idl) {
            buildIDL(ego);
        } else {
            buildDID(ego);
            buildIDL(ego);
        }
    });
}

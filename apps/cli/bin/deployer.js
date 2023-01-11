"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    runClean: ()=>runClean,
    runCredentials: ()=>runCredentials,
    checkAndArtifacts: ()=>checkAndArtifacts,
    generateDFXJson: ()=>generateDFXJson,
    runCreate: ()=>runCreate,
    runInstall: ()=>runInstall,
    runReInstall: ()=>runReInstall,
    runUpgrade: ()=>runUpgrade,
    runPostPatch: ()=>runPostPatch
});
const _fs = _interopRequireDefault(require("fs"));
const _shelljs = _interopRequireDefault(require("shelljs"));
const _utils = require("@ego-js/utils");
const _principal = require("@dfinity/principal");
const _candid = require("@dfinity/candid");
const _ = require(".");
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function runClean() {
    console.log('run clean');
    for (const f of (0, _utils.getEgos)(_.argv)){
        const dfx_folder = process.cwd() + '/' + `${_utils.artifacts}` + '/' + f.package;
        _shelljs.default.exec(`rm -rf ${dfx_folder}`);
    }
}
function runCredentials() {
    console.log('run credentials');
    let exist = _fs.default.existsSync(`${process.cwd()}/${_utils.credentials}`);
    if (!exist) {
        _shelljs.default.exec(`mkdir ${process.cwd()}/${_utils.credentials}`);
    }
    const sp = (0, _utils.generateSeedphraseText)(`${_utils.seedPhrase}`);
    (0, _utils.generatePemfile)(`${_utils.productionPem}`, {
        seedPhrase: sp
    });
}
function checkAndArtifacts() {
    console.log('run checkAndArtifacts');
    for (const ego of (0, _utils.getEgos)(_.argv)){
        let folder_exist = true;
        try {
            folder_exist = _fs.default.existsSync(`${process.cwd()}/${_utils.artifacts}/${ego.package}`);
        } catch (error) {
            folder_exist = false;
        }
        if (!folder_exist) {
            _shelljs.default.exec(`mkdir ${process.cwd()}/${_utils.artifacts}/${ego.package}`);
            _shelljs.default.exec(`mkdir ${process.cwd()}/${_utils.artifacts}/${ego.package}/.dfx`);
            _shelljs.default.exec(`mkdir ${process.cwd()}/${_utils.artifacts}/${ego.package}/.dfx/local`);
        }
    }
}
function generateDFXJson() {
    console.log('run generateDFXJson');
    for (const ego of (0, _utils.getEgos)(_.argv)){
        let shouldSaveName = `${process.cwd()}/${_utils.artifacts}/${ego.package}/dfx.json`;
        _shelljs.default.exec(`rm -rf ${shouldSaveName}`);
        const packageItem = {};
        packageItem[ego.package] = {
            type: 'custom',
            candid: `${ego.package}.did`,
            wasm: `${ego.package}_opt.wasm.gz`,
            build: []
        };
        _utils.dfxConfigTemplate['canisters'] = packageItem;
        _fs.default.writeFileSync(shouldSaveName, JSON.stringify(_utils.dfxConfigTemplate));
    }
}
async function runCreate() {
    console.log('run runCreate');
    const { actor  } = await (0, _utils.managementActor)();
    for (const f of (0, _utils.getEgos)(_.argv)){
        const dfx_folder = process.cwd() + '/' + `${_utils.artifacts}` + '/' + f.package + '/.dfx';
        const dfx_local_json = dfx_folder + '/local/canister_ids.json';
        const dfx_ic_json = dfx_folder + '/ic/canister_ids.json';
        var _f_config;
        let configFile = (_f_config = f.config) !== null && _f_config !== void 0 ? _f_config : `${process.cwd()}/${_utils.configs}/${f.package}.json`;
        if (!f.no_deploy) {
            let canister_id;
            if (!_utils.isProduction) {
                canister_id = (await actor.provisional_create_canister_with_cycles({
                    settings: [
                        {
                            freezing_threshold: [],
                            controllers: [
                                [
                                    (0, _utils.identity)().getPrincipal()
                                ]
                            ],
                            memory_allocation: [],
                            compute_allocation: []
                        }
                    ],
                    amount: []
                })).canister_id;
            } else {
                const walletActor = (await (0, _utils.cycleWalletActor)()).actor;
                const walletCreateResult = await walletActor.wallet_create_canister({
                    cycles: _utils.cyclesCreateCanister,
                    settings: {
                        freezing_threshold: [],
                        controller: [],
                        controllers: [
                            [
                                (0, _utils.identity)().getPrincipal(),
                                _principal.Principal.fromText(_utils.cycleWalletCanisterId)
                            ]
                        ],
                        memory_allocation: [],
                        compute_allocation: []
                    }
                });
                if ((0, _utils.hasOwnProperty)(walletCreateResult, 'Ok')) {
                    canister_id = walletCreateResult.Ok.canister_id;
                } else {
                    throw new Error(`canister id create failed : ${walletCreateResult.Err}`);
                }
            }
            if (!_utils.isProduction) {
                const localCanisterId = canister_id.toText();
                console.log(`Creating canister ${f.package}...`);
                console.log(`${f.package} canister created with canister id: ${localCanisterId}`);
                let configJson = JSON.stringify({});
                try {
                    configJson = _fs.default.readFileSync(configFile).toString('utf8');
                } catch (error) {
                    _fs.default.writeFileSync(configFile, JSON.stringify({}));
                }
                const configObject = _objectSpreadProps(_objectSpread({}, JSON.parse(configJson)), {
                    LOCAL_CANISTERID: localCanisterId
                });
                if (f.url) {
                    Object.assign(configObject, {
                        LOCAL_URL: `http://${localCanisterId}.localhost:8000`
                    });
                }
                _fs.default.writeFileSync(configFile, JSON.stringify(configObject));
                const json = {};
                json[f.package] = {
                    local: canister_id.toText()
                };
                _fs.default.writeFileSync(dfx_local_json, JSON.stringify(json));
            } else {
                const productionId = canister_id.toText();
                console.log(`Creating canister ${f.package}...`);
                console.log(`${f.package} canister created with canister id: ${productionId}`);
                let configJson1 = JSON.stringify({});
                try {
                    configJson1 = _fs.default.readFileSync(configFile).toString('utf8');
                } catch (error1) {
                    _fs.default.writeFileSync(configFile, JSON.stringify({}));
                }
                const configObject1 = _objectSpreadProps(_objectSpread({}, JSON.parse(configJson1)), {
                    PRODUCTION_CANISTERID: productionId
                });
                if (f.url) {
                    Object.assign(configObject1, {
                        PRODUCTION_URL: `https://${productionId}.ic0.app`
                    });
                }
                const canister_ids_json = {};
                canister_ids_json[`${f.package}`] = {
                    ic: productionId
                };
                _fs.default.writeFileSync(configFile, JSON.stringify(configObject1));
                _fs.default.writeFileSync(`./${_utils.artifacts}/${f.package}/canister_ids.json`, JSON.stringify(canister_ids_json));
                const json1 = {};
                json1[f.package] = {
                    ic: canister_id.toText()
                };
                if (!_fs.default.existsSync(dfx_ic_json.replace('/canister_ids.json', ''))) {
                    _shelljs.default.exec(`mkdir ${dfx_ic_json.replace('/canister_ids.json', '')}`);
                }
                _fs.default.writeFileSync(dfx_ic_json, JSON.stringify(json1));
            }
        }
    }
}
async function runInstall() {
    console.log('run runInstall');
    const { actor  } = await (0, _utils.managementActor)();
    for (const f of (0, _utils.getEgos)(_.argv)){
        const dfx_folder = process.cwd() + '/' + `${_utils.artifacts}` + '/' + f.package;
        if (!f.no_deploy) {
            if (f.custom_deploy) {
                if (typeof f.custom_deploy === 'string') {
                    _shelljs.default.exec(`cd ${dfx_folder} && ${f.custom_deploy}`);
                } else {
                    f.custom_deploy();
                }
            } else {
                const pkg = (0, _utils.readEgoDfxJson)(dfx_folder, f.package);
                const wasm = (0, _utils.readWasm)(dfx_folder + '/' + pkg.wasm);
                const config = (0, _utils.readConfig)(process.cwd() + `/${_utils.configs}/` + f.package + '.json');
                if (!_utils.isProduction) {
                    try {
                        console.log(`installing ${f.package} to ${config.LOCAL_CANISTERID}`);
                        const initArgs = Array.from(new Uint8Array(_candid.IDL.encode([
                            _candid.IDL.Record({
                                init_caller: _candid.IDL.Opt(_candid.IDL.Principal)
                            })
                        ], [
                            {
                                init_caller: [
                                    (0, _utils.identity)().getPrincipal()
                                ]
                            }
                        ])));
                        await actor.install_code({
                            arg: initArgs,
                            wasm_module: wasm,
                            mode: {
                                install: null
                            },
                            canister_id: _principal.Principal.fromText(config.LOCAL_CANISTERID)
                        });
                        console.log(`Success with wasm bytes length: ${wasm.length}`);
                    } catch (error) {
                        console.log(error.message);
                    }
                } else {
                    try {
                        console.log(`installing ${f.package} to ${config.PRODUCTION_CANISTERID}`);
                        const walletActor = (await (0, _utils.cycleWalletActor)()).actor;
                        const wasm_module = _candid.IDL.Vec(_candid.IDL.Nat8);
                        const idl = _candid.IDL.Record({
                            arg: _candid.IDL.Vec(_candid.IDL.Nat8),
                            wasm_module: wasm_module,
                            mode: _candid.IDL.Variant({
                                reinstall: _candid.IDL.Null,
                                upgrade: _candid.IDL.Null,
                                install: _candid.IDL.Null
                            }),
                            canister_id: _candid.IDL.Principal
                        });
                        const initArgs1 = Array.from(new Uint8Array(_candid.IDL.encode([
                            _candid.IDL.Record({
                                init_caller: _candid.IDL.Opt(_candid.IDL.Principal)
                            })
                        ], [
                            {
                                init_caller: [
                                    (0, _utils.identity)().getPrincipal()
                                ]
                            }
                        ])));
                        const buf = _candid.IDL.encode([
                            idl
                        ], [
                            {
                                arg: initArgs1,
                                wasm_module: wasm,
                                mode: {
                                    install: null
                                },
                                canister_id: _principal.Principal.fromText(config.PRODUCTION_CANISTERID)
                            }
                        ]);
                        const args = Array.from(new Uint8Array(buf));
                        const result = await walletActor.wallet_call({
                            canister: _principal.Principal.fromHex(''),
                            cycles: _utils.cyclesCreateCanister,
                            method_name: 'install_code',
                            args
                        });
                        if ((0, _utils.hasOwnProperty)(result, 'Ok')) {
                            console.log(result.Ok.return);
                        } else {
                            throw new Error(result.Err);
                        }
                        console.log(`Success with wasm bytes length: ${wasm.length}`);
                    } catch (error1) {
                        console.log(error1.message);
                    }
                }
            }
        }
    }
}
async function runReInstall() {
    console.log('run runReInstall');
    const { actor  } = await (0, _utils.managementActor)();
    for (const f of (0, _utils.getEgos)(_.argv)){
        const dfx_folder = process.cwd() + '/' + `${_utils.artifacts}` + '/' + f.package;
        if (!f.no_deploy) {
            if (f.custom_deploy) {
                if (typeof f.custom_deploy === 'string') {
                    _shelljs.default.exec(`cd ${dfx_folder} && ${f.custom_deploy}`);
                } else {
                    f.custom_deploy();
                }
            } else {
                const pkg = (0, _utils.readEgoDfxJson)(dfx_folder, f.package);
                const wasm = (0, _utils.readWasm)(dfx_folder + '/' + pkg.wasm);
                const config = (0, _utils.readConfig)(process.cwd() + `/${_utils.configs}/` + f.package + '.json');
                if (!_utils.isProduction) {
                    try {
                        console.log(`reinstalling ${f.package} to ${config.LOCAL_CANISTERID}`);
                        await actor.install_code({
                            arg: [],
                            wasm_module: wasm,
                            mode: {
                                reinstall: null
                            },
                            canister_id: _principal.Principal.fromText(config.LOCAL_CANISTERID)
                        });
                        console.log(`Success with wasm bytes length: ${wasm.length}`);
                    } catch (error) {
                        console.log(error.message);
                    }
                } else {
                    try {
                        console.log(`reinstalling ${f.package} to ${config.PRODUCTION_CANISTERID}`);
                        const walletActor = (await (0, _utils.cycleWalletActor)()).actor;
                        const wasm_module = _candid.IDL.Vec(_candid.IDL.Nat8);
                        const idl = _candid.IDL.Record({
                            arg: _candid.IDL.Vec(_candid.IDL.Nat8),
                            wasm_module: wasm_module,
                            mode: _candid.IDL.Variant({
                                reinstall: _candid.IDL.Null,
                                upgrade: _candid.IDL.Null,
                                install: _candid.IDL.Null
                            }),
                            canister_id: _candid.IDL.Principal
                        });
                        const initArgs = Array.from(new Uint8Array(_candid.IDL.encode([
                            _candid.IDL.Record({
                                init_caller: _candid.IDL.Opt(_candid.IDL.Principal)
                            })
                        ], [
                            {
                                init_caller: [
                                    (0, _utils.identity)().getPrincipal()
                                ]
                            }
                        ])));
                        const buf = _candid.IDL.encode([
                            idl
                        ], [
                            {
                                arg: initArgs,
                                wasm_module: wasm,
                                mode: {
                                    reinstall: null
                                },
                                canister_id: _principal.Principal.fromText(config.PRODUCTION_CANISTERID)
                            }
                        ]);
                        const args = Array.from(new Uint8Array(buf));
                        const result = await walletActor.wallet_call({
                            canister: _principal.Principal.fromHex(''),
                            cycles: _utils.cyclesCreateCanister,
                            method_name: 'install_code',
                            args
                        });
                        if ((0, _utils.hasOwnProperty)(result, 'Ok')) {
                            console.log(result.Ok.return);
                        } else {
                            throw new Error(result.Err);
                        }
                        console.log(`Success with wasm bytes length: ${wasm.length}`);
                    } catch (error1) {
                        console.log(error1.message);
                    }
                }
            }
        }
    }
}
async function runUpgrade() {
    console.log('run runUpgrade');
    const { actor  } = await (0, _utils.managementActor)();
    for (const f of (0, _utils.getEgos)(_.argv)){
        const dfx_folder = process.cwd() + '/' + `${_utils.artifacts}` + '/' + f.package;
        if (!f.no_deploy) {
            if (f.custom_deploy) {
                if (typeof f.custom_deploy === 'string') {
                    _shelljs.default.exec(`cd ${dfx_folder} && ${f.custom_deploy}`);
                } else {
                    f.custom_deploy();
                }
            } else {
                const pkg = (0, _utils.readEgoDfxJson)(dfx_folder, f.package);
                const wasm = (0, _utils.readWasm)(dfx_folder + '/' + pkg.wasm);
                const config = (0, _utils.readConfig)(process.cwd() + `/${_utils.configs}/` + f.package + '.json');
                if (!_utils.isProduction) {
                    try {
                        console.log(`upgrading ${f.package} to ${config.LOCAL_CANISTERID}`);
                        await actor.install_code({
                            arg: [],
                            wasm_module: wasm,
                            mode: {
                                upgrade: null
                            },
                            canister_id: _principal.Principal.fromText(config.LOCAL_CANISTERID)
                        });
                        console.log(`Success with wasm bytes length: ${wasm.length}`);
                    } catch (error) {
                        console.log(error.message);
                    }
                } else {
                    try {
                        console.log(`upgrading ${f.package} to ${config.PRODUCTION_CANISTERID}`);
                        const walletActor = (await (0, _utils.cycleWalletActor)()).actor;
                        const wasm_module = _candid.IDL.Vec(_candid.IDL.Nat8);
                        const idl = _candid.IDL.Record({
                            arg: _candid.IDL.Vec(_candid.IDL.Nat8),
                            wasm_module: wasm_module,
                            mode: _candid.IDL.Variant({
                                reinstall: _candid.IDL.Null,
                                upgrade: _candid.IDL.Null,
                                install: _candid.IDL.Null
                            }),
                            canister_id: _candid.IDL.Principal
                        });
                        const initArgs = Array.from(new Uint8Array(_candid.IDL.encode([
                            _candid.IDL.Record({
                                init_caller: _candid.IDL.Opt(_candid.IDL.Principal)
                            })
                        ], [
                            {
                                init_caller: [
                                    (0, _utils.identity)().getPrincipal()
                                ]
                            }
                        ])));
                        const buf = _candid.IDL.encode([
                            idl
                        ], [
                            {
                                arg: initArgs,
                                wasm_module: wasm,
                                mode: {
                                    upgrade: null
                                },
                                canister_id: _principal.Principal.fromText(config.PRODUCTION_CANISTERID)
                            }
                        ]);
                        const args = Array.from(new Uint8Array(buf));
                        const result = await walletActor.wallet_call({
                            canister: _principal.Principal.fromHex(''),
                            cycles: _utils.cyclesCreateCanister,
                            method_name: 'install_code',
                            args
                        });
                        if ((0, _utils.hasOwnProperty)(result, 'Ok')) {
                            console.log(result.Ok.return);
                        } else {
                            throw new Error(result.Err);
                        }
                        console.log(`Success with wasm bytes length: ${wasm.length}`);
                    } catch (error1) {
                        console.log(error1.message);
                    }
                }
            }
        }
    }
}
async function runPostPatch() {
    console.log('run runPostPatch');
    const { actor  } = await (0, _utils.managementActor)();
    for (const f of (0, _utils.getEgos)(_.argv)){
        const dfx_folder = process.cwd() + '/' + `${_utils.artifacts}` + '/' + f.package;
        if (!f.no_deploy) {
            if (f.custom_deploy) {
                if (typeof f.custom_deploy === 'string') {
                    _shelljs.default.exec(`cd ${dfx_folder} && ${f.custom_deploy}`);
                } else {
                    f.custom_deploy();
                }
            } else {
                const pkg = (0, _utils.readEgoDfxJson)(dfx_folder, f.package);
                const wasm = (0, _utils.readWasm)(dfx_folder + '/' + pkg.wasm);
                console.log(pkg.wasm);
                const config = (0, _utils.readConfig)(process.cwd() + `/${_utils.configs}/` + f.package + '.json');
                if (!_utils.isProduction) {} else {
                    const walletActor = (await (0, _utils.cycleWalletActor)()).actor;
                    try {
                        console.log(`postPatching ${f.package} to ${config.PRODUCTION_CANISTERID}`);
                        const idl = _candid.IDL.Record({
                            principal: _candid.IDL.Principal,
                            name: _candid.IDL.Text
                        });
                        const buf = _candid.IDL.encode([
                            idl
                        ], [
                            {
                                principal: (0, _utils.identity)().getPrincipal(),
                                name: 'local'
                            }
                        ]);
                        const args = Array.from(new Uint8Array(buf));
                        const result = await walletActor.wallet_call({
                            canister: _principal.Principal.fromText(config.PRODUCTION_CANISTERID),
                            cycles: BigInt(0),
                            method_name: 'addManager',
                            args
                        });
                        if ((0, _utils.hasOwnProperty)(result, 'Ok')) {
                            console.log(result.Ok.return);
                        } else {
                            throw new Error(result.Err);
                        }
                        console.log(`Success with wasm bytes length: ${wasm.length}`);
                    } catch (error) {
                        console.log(error.message);
                    }
                }
            }
        }
    }
}

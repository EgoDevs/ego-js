import file, { fstat } from 'fs';
import shell from 'shelljs';
import yargs from 'yargs';
import { credentials, dfxConfigTemplate, generatePemfile, generateSeedphraseText, getEgos, productionPem, seedPhrase, ThisArgv } from '@ego-js/utils';
import { cycleWalletActor, cycleWalletCanisterId, managementActor, readConfig, readEgoDfxJson, readWasm } from '@ego-js/utils';
import { Principal } from '@dfinity/principal';
import { artifacts, configs, cyclesCreateCanister, isProduction } from '@ego-js/utils';
import { identity } from '@ego-js/utils';
import { hasOwnProperty } from '@ego-js/utils';
import { IDL } from '@dfinity/candid';
import { argv } from '.';

export function runClean() {
  console.log('run clean');
  for (const f of getEgos(argv as ThisArgv)) {
    const dfx_folder = process.cwd() + '/' + `${artifacts}` + '/' + f.package;
    // const dfx_sh = dfx_folder + '/dfx.sh';
    shell.exec(`rm -rf ${dfx_folder}`);
  }
}

export function runCredentials() {
  console.log('run credentials');
  let exist = file.existsSync(`${process.cwd()}/${credentials}`);
  if (!exist) {
    shell.exec(`mkdir ${process.cwd()}/${credentials}`);
  }
  const sp = generateSeedphraseText(`${seedPhrase}`);
  generatePemfile(`${productionPem}`, { seedPhrase: sp });
}

export interface DFXJson {
  local: {
    bind: string;
    type: string;
    replica: {
      subnet_type: string;
    };
    bitcoin?: {
      enabled: boolean;
      nodes: Array<string>;
    };
  };
}

export function readDFX() {
  console.log('run readDFX');
  const filePath = shell.exec(`dfx info networks-json-path`).replace('\n', '');

  const [_, dfxVersion] = shell.exec(`dfx --version`).replace('\n', '').split(' ');

  let dfxJson = file.readFileSync(Buffer.from(filePath), { encoding: 'utf-8' });

  const dfxJSON = JSON.parse(dfxJson) as DFXJson;

  const [__, dfxPort] = dfxJSON.local.bind.split(':');

  // const cyclesWallet = shell.exec(`dfx identity --network=ic get-wallet`).replace('\n', '');
  const config = JSON.parse(
    file.readFileSync(`${process.cwd()}/ego-config.json`, {
      encoding: 'utf8',
    }),
  );

  config['dfxVersion'] = dfxVersion;
  config['dfxPort'] = Number.parseInt(dfxPort);
  // config['credentials']['production_cycles_wallet'] = cyclesWallet;
  file.writeFileSync(`${process.cwd()}/ego-config.json`, JSON.stringify(config));
}

export function checkAndArtifacts() {
  console.log('run checkAndArtifacts');
  for (const ego of getEgos(argv as ThisArgv)) {
    let folder_exist = true;
    try {
      folder_exist = file.existsSync(`${process.cwd()}/${artifacts}/${ego.package}`);
    } catch (error) {
      folder_exist = false;
    }

    if (!folder_exist) {
      shell.exec(`mkdir ${process.cwd()}/${artifacts}/${ego.package}`);
      shell.exec(`mkdir ${process.cwd()}/${artifacts}/${ego.package}/.dfx`);
      shell.exec(`mkdir ${process.cwd()}/${artifacts}/${ego.package}/.dfx/local`);
    }
  }
}

export function generateDFXJson() {
  console.log('run generateDFXJson');
  for (const ego of getEgos(argv as ThisArgv)) {
    let shouldSaveName = `${process.cwd()}/${artifacts}/${ego.package}/dfx.json`;
    shell.exec(`rm -rf ${shouldSaveName}`);
    const packageItem = {};

    packageItem[ego.package] = {
      type: 'custom',
      candid: `${ego.package}.did`,
      wasm: `${ego.package}_opt.wasm.gz`,
      build: [],
    };
    // dfxConfigTemplate.canisters
    dfxConfigTemplate['canisters'] = packageItem;
    // const target = Object.assign(dfxConfigTemplate.canisters, packageItem);
    file.writeFileSync(shouldSaveName, JSON.stringify(dfxConfigTemplate));
  }
}

export async function runCreate() {
  console.log('run runCreate');
  const { actor } = await managementActor();

  for (const f of getEgos(argv as ThisArgv)) {
    const dfx_folder = process.cwd() + '/' + `${artifacts}` + '/' + f.package + '/.dfx';
    const dfx_local_json = dfx_folder + '/local/canister_ids.json';
    const dfx_ic_json = dfx_folder + '/ic/canister_ids.json';
    let configFile = f.config ?? `${process.cwd()}/${configs}/${f.package}.json`;

    if (!f.no_deploy) {
      let canister_id;
      if (!isProduction) {
        canister_id = (
          await actor.provisional_create_canister_with_cycles({
            settings: [
              {
                freezing_threshold: [],
                controllers: [[identity().getPrincipal()]],
                memory_allocation: [],
                compute_allocation: [],
              },
            ],
            amount: [],
          })
        ).canister_id;
      } else {
        const walletActor = (await cycleWalletActor()).actor;
        const walletCreateResult = await walletActor.wallet_create_canister({
          cycles: cyclesCreateCanister,
          settings: {
            freezing_threshold: [],
            controller: [],
            controllers: [[identity().getPrincipal(), Principal.fromText(cycleWalletCanisterId)]],
            memory_allocation: [],
            compute_allocation: [],
          },
        });
        if (hasOwnProperty(walletCreateResult, 'Ok')) {
          canister_id = walletCreateResult.Ok.canister_id;
        } else {
          throw new Error(`canister id create failed : ${walletCreateResult.Err}`);
        }
        // canister_id =
      }

      if (!isProduction) {
        const localCanisterId = canister_id.toText();
        console.log(`Creating canister ${f.package}...`);
        console.log(`${f.package} canister created with canister id: ${localCanisterId}`);

        let configJson = JSON.stringify({});

        try {
          configJson = file.readFileSync(configFile).toString('utf8');
        } catch (error) {
          file.writeFileSync(configFile, JSON.stringify({}));
        }

        const configObject = {
          ...JSON.parse(configJson),
          LOCAL_CANISTERID: localCanisterId,
        };

        if (f.url) {
          Object.assign(configObject, {
            LOCAL_URL: `http://${localCanisterId}.localhost:8000`,
          });
        }

        file.writeFileSync(configFile, JSON.stringify(configObject));
        const json = {};
        json[f.package] = { local: canister_id.toText() };
        file.writeFileSync(dfx_local_json, JSON.stringify(json));
      } else {
        const productionId = canister_id.toText();
        console.log(`Creating canister ${f.package}...`);
        console.log(`${f.package} canister created with canister id: ${productionId}`);

        let configJson = JSON.stringify({});
        try {
          configJson = file.readFileSync(configFile).toString('utf8');
        } catch (error) {
          file.writeFileSync(configFile, JSON.stringify({}));
        }

        const configObject = {
          ...JSON.parse(configJson),
          PRODUCTION_CANISTERID: productionId,
        };

        if (f.url) {
          Object.assign(configObject, {
            PRODUCTION_URL: `https://${productionId}.ic0.app`,
          });
        }

        const canister_ids_json = {};
        canister_ids_json[`${f.package}`] = { ic: productionId };

        file.writeFileSync(configFile, JSON.stringify(configObject));
        file.writeFileSync(`./${artifacts}/${f.package}/canister_ids.json`, JSON.stringify(canister_ids_json));
        const json = {};
        json[f.package] = { ic: canister_id.toText() };
        if (!file.existsSync(dfx_ic_json.replace('/canister_ids.json', ''))) {
          shell.exec(`mkdir ${dfx_ic_json.replace('/canister_ids.json', '')}`);
        }
        file.writeFileSync(dfx_ic_json, JSON.stringify(json));
      }
    }
  }
}

export async function runInstall() {
  console.log('run runInstall');
  const { actor } = await managementActor();

  for (const f of getEgos(argv as ThisArgv)) {
    const dfx_folder = process.cwd() + '/' + `${artifacts}` + '/' + f.package;
    // const dfx_sh = dfx_folder + '/dfx.sh';
    if (!f.no_deploy) {
      if (f.custom_deploy) {
        if (typeof f.custom_deploy === 'string') {
          shell.exec(`cd ${dfx_folder} && ${f.custom_deploy}`);
        } else {
          (f.custom_deploy as () => void)();
        }
      } else {
        const pkg = readEgoDfxJson(dfx_folder, f.package);
        const wasm = readWasm(dfx_folder + '/' + pkg.wasm);
        const config = readConfig(process.cwd() + `/${configs}/` + f.package + '.json');

        if (!isProduction) {
          try {
            console.log(`installing ${f.package} to ${config.LOCAL_CANISTERID!}`);
            const initArgs = Array.from(
              new Uint8Array(
                IDL.encode(
                  [IDL.Record({ init_caller: IDL.Opt(IDL.Principal) })],
                  [
                    {
                      init_caller: [identity().getPrincipal()],
                    },
                  ],
                ),
              ),
            );
            await actor.install_code({
              arg: initArgs,
              wasm_module: wasm,
              mode: { install: null },
              canister_id: Principal.fromText(config.LOCAL_CANISTERID!),
            });
            console.log(`Success with wasm bytes length: ${wasm.length}`);
          } catch (error) {
            console.log((error as Error).message);
          }
        } else {
          try {
            console.log(`installing ${f.package} to ${config.PRODUCTION_CANISTERID!}`);
            const walletActor = (await cycleWalletActor()).actor;
            const wasm_module = IDL.Vec(IDL.Nat8);
            const idl = IDL.Record({
              arg: IDL.Vec(IDL.Nat8),
              wasm_module: wasm_module,
              mode: IDL.Variant({
                reinstall: IDL.Null,
                upgrade: IDL.Null,
                install: IDL.Null,
              }),
              canister_id: IDL.Principal,
            });

            // IDL.Tuple()
            const initArgs = Array.from(
              new Uint8Array(
                IDL.encode(
                  [IDL.Record({ init_caller: IDL.Opt(IDL.Principal) })],
                  [
                    {
                      init_caller: [identity().getPrincipal()],
                    },
                  ],
                ),
              ),
            );

            const buf = IDL.encode(
              [idl],
              [
                {
                  arg: initArgs,
                  wasm_module: wasm,
                  mode: { install: null },
                  canister_id: Principal.fromText(config.PRODUCTION_CANISTERID!),
                },
              ],
            );
            const args = Array.from(new Uint8Array(buf));

            const result = await walletActor.wallet_call({
              canister: Principal.fromHex(''),
              cycles: cyclesCreateCanister,
              method_name: 'install_code',
              args,
            });

            if (hasOwnProperty(result, 'Ok')) {
              console.log(result.Ok.return);
            } else {
              throw new Error(result.Err);
            }

            console.log(`Success with wasm bytes length: ${wasm.length}`);
          } catch (error) {
            console.log((error as Error).message);
          }
        }
      }
    }
  }
}

export async function runReInstall() {
  console.log('run runReInstall');
  const { actor } = await managementActor();

  for (const f of getEgos(argv as ThisArgv)) {
    const dfx_folder = process.cwd() + '/' + `${artifacts}` + '/' + f.package;
    // const dfx_sh = dfx_folder + '/dfx.sh';
    if (!f.no_deploy) {
      if (f.custom_deploy) {
        if (typeof f.custom_deploy === 'string') {
          shell.exec(`cd ${dfx_folder} && ${f.custom_deploy}`);
        } else {
          (f.custom_deploy as () => void)();
        }
      } else {
        const pkg = readEgoDfxJson(dfx_folder, f.package);
        const wasm = readWasm(dfx_folder + '/' + pkg.wasm);
        const config = readConfig(process.cwd() + `/${configs}/` + f.package + '.json');

        if (!isProduction) {
          try {
            console.log(`reinstalling ${f.package} to ${config.LOCAL_CANISTERID!}`);
            const initArgs = Array.from(
              new Uint8Array(
                IDL.encode(
                  [IDL.Record({ init_caller: IDL.Opt(IDL.Principal) })],
                  [
                    {
                      init_caller: [identity().getPrincipal()],
                    },
                  ],
                ),
              ),
            );
            await actor.install_code({
              arg: initArgs,
              wasm_module: wasm,
              mode: { reinstall: null },
              canister_id: Principal.fromText(config.LOCAL_CANISTERID!),
            });

            console.log(`Success with wasm bytes length: ${wasm.length}`);
          } catch (error) {
            console.log((error as Error).message);
          }
        } else {
          try {
            console.log(`reinstalling ${f.package} to ${config.PRODUCTION_CANISTERID!}`);
            const walletActor = (await cycleWalletActor()).actor;
            const wasm_module = IDL.Vec(IDL.Nat8);
            const idl = IDL.Record({
              arg: IDL.Vec(IDL.Nat8),
              wasm_module: wasm_module,
              mode: IDL.Variant({
                reinstall: IDL.Null,
                upgrade: IDL.Null,
                install: IDL.Null,
              }),
              canister_id: IDL.Principal,
            });

            // IDL.Tuple()

            const initArgs = Array.from(
              new Uint8Array(
                IDL.encode(
                  [IDL.Record({ init_caller: IDL.Opt(IDL.Principal) })],
                  [
                    {
                      init_caller: [identity().getPrincipal()],
                    },
                  ],
                ),
              ),
            );

            const buf = IDL.encode(
              [idl],
              [
                {
                  arg: initArgs,
                  wasm_module: wasm,
                  mode: { reinstall: null },
                  canister_id: Principal.fromText(config.PRODUCTION_CANISTERID!),
                },
              ],
            );
            const args = Array.from(new Uint8Array(buf));

            const result = await walletActor.wallet_call({
              canister: Principal.fromHex(''),
              cycles: cyclesCreateCanister,
              method_name: 'install_code',
              args,
            });

            if (hasOwnProperty(result, 'Ok')) {
              console.log(result.Ok.return);
            } else {
              throw new Error(result.Err);
            }
            console.log(`Success with wasm bytes length: ${wasm.length}`);
          } catch (error) {
            console.log((error as Error).message);
          }
        }
      }
    }
  }
}

export async function runUpgrade() {
  console.log('run runUpgrade');
  const { actor } = await managementActor();

  for (const f of getEgos(argv as ThisArgv)) {
    const dfx_folder = process.cwd() + '/' + `${artifacts}` + '/' + f.package;
    // const dfx_sh = dfx_folder + '/dfx.sh';
    if (!f.no_deploy) {
      if (f.custom_deploy) {
        if (typeof f.custom_deploy === 'string') {
          shell.exec(`cd ${dfx_folder} && ${f.custom_deploy}`);
        } else {
          (f.custom_deploy as () => void)();
        }
      } else {
        const pkg = readEgoDfxJson(dfx_folder, f.package);
        const wasm = readWasm(dfx_folder + '/' + pkg.wasm);
        const config = readConfig(process.cwd() + `/${configs}/` + f.package + '.json');
        if (!isProduction) {
          try {
            console.log(`upgrading ${f.package} to ${config.LOCAL_CANISTERID!}`);
            await actor.install_code({
              arg: [],
              wasm_module: wasm,
              mode: { upgrade: null },
              canister_id: Principal.fromText(config.LOCAL_CANISTERID!),
            });
            console.log(`Success with wasm bytes length: ${wasm.length}`);
          } catch (error) {
            console.log((error as Error).message);
          }
        } else {
          try {
            console.log(`upgrading ${f.package} to ${config.PRODUCTION_CANISTERID!}`);
            const walletActor = (await cycleWalletActor()).actor;
            const wasm_module = IDL.Vec(IDL.Nat8);
            const idl = IDL.Record({
              arg: IDL.Vec(IDL.Nat8),
              wasm_module: wasm_module,
              mode: IDL.Variant({
                reinstall: IDL.Null,
                upgrade: IDL.Null,
                install: IDL.Null,
              }),
              canister_id: IDL.Principal,
            });

            // IDL.Tuple()
            const initArgs = Array.from(
              new Uint8Array(
                IDL.encode(
                  [IDL.Record({ init_caller: IDL.Opt(IDL.Principal) })],
                  [
                    {
                      init_caller: [identity().getPrincipal()],
                    },
                  ],
                ),
              ),
            );

            const buf = IDL.encode(
              [idl],
              [
                {
                  arg: initArgs,
                  wasm_module: wasm,
                  mode: { upgrade: null },
                  canister_id: Principal.fromText(config.PRODUCTION_CANISTERID!),
                },
              ],
            );
            const args = Array.from(new Uint8Array(buf));

            const result = await walletActor.wallet_call({
              canister: Principal.fromHex(''),
              cycles: cyclesCreateCanister,
              method_name: 'install_code',
              args,
            });

            if (hasOwnProperty(result, 'Ok')) {
              console.log(result.Ok.return);
            } else {
              throw new Error(result.Err);
            }
            console.log(`Success with wasm bytes length: ${wasm.length}`);
          } catch (error) {
            console.log((error as Error).message);
          }
        }
      }
    }
  }
}

export async function runPostPatch() {
  console.log('run runPostPatch');
  const { actor } = await managementActor();

  for (const f of getEgos(argv as ThisArgv)) {
    const dfx_folder = process.cwd() + '/' + `${artifacts}` + '/' + f.package;
    // const dfx_sh = dfx_folder + '/dfx.sh';
    if (!f.no_deploy) {
      if (f.custom_deploy) {
        if (typeof f.custom_deploy === 'string') {
          shell.exec(`cd ${dfx_folder} && ${f.custom_deploy}`);
        } else {
          (f.custom_deploy as () => void)();
        }
      } else {
        const pkg = readEgoDfxJson(dfx_folder, f.package);
        const wasm = readWasm(dfx_folder + '/' + pkg.wasm);
        console.log(pkg.wasm);
        const config = readConfig(process.cwd() + `/${configs}/` + f.package + '.json');
        if (!isProduction) {
        } else {
          const walletActor = (await cycleWalletActor()).actor;
          try {
            console.log(`postPatching ${f.package} to ${config.PRODUCTION_CANISTERID!}`);
            const idl = IDL.Record({
              principal: IDL.Principal,
              name: IDL.Text,
            });

            const buf = IDL.encode([idl], [{ principal: identity().getPrincipal(), name: 'local' }]);

            const args = Array.from(new Uint8Array(buf));

            const result = await walletActor.wallet_call({
              canister: Principal.fromText(config.PRODUCTION_CANISTERID!),
              cycles: BigInt(0),
              method_name: 'addManager',
              args,
            });

            if (hasOwnProperty(result, 'Ok')) {
              console.log(result.Ok.return);
            } else {
              throw new Error(result.Err);
            }
            console.log(`Success with wasm bytes length: ${wasm.length}`);
          } catch (error) {
            console.log((error as Error).message);
          }
        }
      }
    }
  }
}

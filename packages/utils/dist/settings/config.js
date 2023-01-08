import fs from "fs";
export var dfxConfigTemplate = {
    canisters: {},
    defaults: {
        build: {
            packtool: ""
        }
    },
    version: 1
};
export function getEgos() {
    var file = fs.readFileSync(process.cwd() + "/" + "ego-projects.json", {
        encoding: "utf-8"
    });
    return JSON.parse(file);
} // export const infraConfig: Configs = [
 //   {
 //     category: 'infra',
 //     package: 'ego_tenant',
 //     bin_name: 'ego-tenant',
 //     config: './configs/ego_tenant.json',
 //     post_install_sequence: 100,
 //   },
 //   {
 //     category: 'infra',
 //     package: 'ego_dev',
 //     bin_name: 'ego-dev',
 //     config: './configs/ego_dev.json',
 //     post_install_sequence: 100,
 //   },
 //   {
 //     category: 'infra',
 //     package: 'ego_file',
 //     bin_name: 'ego-file',
 //     config: './configs/ego_file.json',
 //     post_install_sequence: 100,
 //   },
 //   {
 //     category: 'infra',
 //     package: 'ego_store',
 //     bin_name: 'ego-store',
 //     config: './configs/ego_store.json',
 //     post_install_sequence: 100,
 //   },
 //   {
 //     category: 'infra',
 //     package: 'ego_assets',
 //     bin_name: 'ego-assets',
 //     config: './configs/ego_assets.json',
 //     post_install_sequence: 100,
 //     no_deploy: true,
 //   },
 //   {
 //     category: 'infra',
 //     package: 'ego_ops',
 //     bin_name: 'ego-ops',
 //     config: './configs/ego_ops.json',
 //     post_install_sequence: 100,
 //   },
 //   {
 //     category: 'infra',
 //     package: 'ego_ledger',
 //     bin_name: 'ego-ledger',
 //     config: './configs/ego_ledger.json',
 //     post_install_sequence: 100,
 //   },
 // ];
 // export const appsConfig: Configs = [];
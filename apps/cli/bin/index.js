"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _builder = require("./builder");
const _deployer = require("./deployer");
const _yargs = _interopRequireDefault(require("yargs"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _builder.runEgoBuilder)();
(0, _deployer.checkAndArtifacts)();
(0, _deployer.generateDFXJson)();
const argv = _yargs.default.option('clean', {
    alias: 'c',
    description: 'clean .dfx/ folder',
    type: 'boolean'
}).option('create', {
    alias: 'n',
    description: 'create only',
    type: 'boolean'
}).option('install', {
    alias: 'i',
    description: 'install only',
    type: 'boolean'
}).option('reinstall', {
    alias: 'r',
    description: 'reinstall only',
    type: 'boolean'
}).option('upgrade', {
    alias: 'u',
    description: 'upgrade only',
    type: 'boolean'
}).option('postPatch', {
    alias: 'post',
    description: 'postPatch only',
    type: 'boolean'
}).help().alias('help', 'h').argv;
if (argv.clean) {
    (0, _deployer.runClean)();
}
if (argv.create) {
    (0, _deployer.runCreate)();
}
if (argv.install) {
    (0, _deployer.runInstall)();
}
if (argv.reinstall) {
    (0, _deployer.runReInstall)();
}
if (argv.upgrade) {
    (0, _deployer.runUpgrade)();
}
if (argv.postPatch) {
    (0, _deployer.runPostPatch)();
}

"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "argv", {
    enumerable: true,
    get: ()=>argv
});
const _builder = require("./builder");
const _deployer = require("./deployer");
const _yargs = _interopRequireDefault(require("yargs"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const argv = _yargs.default.option('clean', {
    alias: 'c',
    description: 'clean .dfx/ folder',
    type: 'boolean'
}).option('create', {
    alias: 'n',
    description: 'create only',
    type: 'boolean'
}).option('credentials', {
    alias: 'd',
    description: 'bootstrap credentials',
    type: 'boolean'
}).option('init', {
    alias: 'init',
    description: 'init config',
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
if (argv.init) {
    (0, _deployer.readDFX)();
}
if (argv.credentials) {
    (0, _deployer.runCredentials)();
}
if (argv.create) {
    (0, _deployer.checkAndArtifacts)();
    (0, _deployer.generateDFXJson)();
    (0, _deployer.runCreate)();
}
if (argv.build) {
    (0, _builder.runEgoBuilder)();
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

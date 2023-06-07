"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _utils = require("@ego-js/utils");
const _builder = require("./builder");
const _deployer = require("./deployer");
if (_utils.argv.clean) {
    (0, _deployer.runClean)();
}
if (_utils.argv.init) {
    (0, _deployer.readDFX)();
}
if (_utils.argv.credentials) {
    (0, _deployer.runCredentials)();
}
if (_utils.argv.create) {
    (0, _deployer.checkAndArtifacts)();
    (0, _deployer.generateDFXJson)();
    (0, _deployer.runCreate)();
}
if (_utils.argv.build) {
    (0, _builder.runEgoBuilder)();
}
if (_utils.argv.install) {
    (0, _deployer.runInstall)();
}
if (_utils.argv.reinstall) {
    (0, _deployer.runReInstall)();
}
if (_utils.argv.upgrade) {
    (0, _deployer.runUpgrade)();
}
if (_utils.argv.postPatch) {
    (0, _deployer.runPostPatch)();
}

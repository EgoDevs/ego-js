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
    getIdentityFromPhraseWithSeed2 () {
        return getIdentityFromPhraseWithSeed2;
    },
    generateSeedphraseText () {
        return generateSeedphraseText;
    },
    generatePemfile () {
        return generatePemfile;
    }
});
var _mockjs = _interopRequireDefault(require("mockjs"));
var _identitySecp256K1 = require("@dfinity/identity-secp256k1");
var _fs = _interopRequireDefault(require("fs"));
var _candid = require("@dfinity/candid");
var _keyEncoder = _interopRequireDefault(require("key-encoder"));
var _crossFetch = require("cross-fetch");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
if (!globalThis.fetch) {
    globalThis.fetch = _crossFetch.fetch;
    globalThis.Headers = _crossFetch.Headers;
}
if (!global.fetch) {
    global.fetch = _crossFetch.fetch;
    global.Headers = _crossFetch.Headers;
}
var BIP32Factory = require("bip32");
var bip39 = require("bip39");
var ecc = require("tiny-secp256k1");
var keyEncoder = new _keyEncoder.default("secp256k1");
var Random = _mockjs.default.Random;
function getIdentityFromPhraseWithSeed2(phrase) {
    var seed = bip39.mnemonicToSeedSync(phrase);
    var ICP_PATH = "m/44'/223'/0'";
    var path = "".concat(ICP_PATH, "/0/0");
    var bip32 = BIP32Factory.default(ecc);
    var node = bip32.fromSeed(seed);
    var child = node.derivePath(path);
    return {
        identity: _identitySecp256K1.Secp256k1KeyIdentity.fromSecretKey(child.privateKey),
        seed: new Uint8Array(seed)
    };
}
function generateSeedphraseText(pathToSave) {
    var str = bip39.generateMnemonic();
    _fs.default.writeFileSync(pathToSave, str);
    return str;
}
function generatePemfile(pathToSave, param) {
    var seedPhrase = param.seedPhrase;
    var str = seedPhrase !== null && seedPhrase !== void 0 ? seedPhrase : bip39.generateMnemonic();
    var res = getIdentityFromPhraseWithSeed2(str);
    var save = keyEncoder.encodePrivate((0, _candid.toHexString)(res.identity.getKeyPair().secretKey), "raw", "pem");
    _fs.default.writeFileSync(pathToSave, save);
}

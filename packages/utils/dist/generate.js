"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getIdentityFromPhraseWithSeed", {
    enumerable: true,
    get () {
        return getIdentityFromPhraseWithSeed;
    }
});
var _mockjs = _interopRequireDefault(require("mockjs"));
var _identitySecp256K1 = require("@dfinity/identity-secp256k1");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var BIP32Factory = require("bip32");
var bip39 = require("bip39");
var ecc = require("tiny-secp256k1");
var Random = _mockjs.default.Random;
function getIdentityFromPhraseWithSeed(phrase) {
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

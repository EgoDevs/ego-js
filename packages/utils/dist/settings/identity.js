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
    fromHexString () {
        return fromHexString;
    },
    toHexString () {
        return toHexString;
    },
    getIdentityFromPem () {
        return getIdentityFromPem;
    },
    getIdentityFromPhrase () {
        return getIdentityFromPhrase;
    },
    getIdentityFromPhraseWithSeed () {
        return getIdentityFromPhraseWithSeed;
    },
    identity () {
        return identity;
    }
});
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _identitySecp256K1 = require("@dfinity/identity-secp256k1");
var _starkbankEcdsa = _interopRequireDefault(require("starkbank-ecdsa"));
var _env = require("./env");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var BIP32Factory = require("bip32");
var bip39 = require("bip39");
var ecc = require("tiny-secp256k1");
function fromHexString(hexString) {
    var _hexString_match;
    return new Uint8Array(((_hexString_match = hexString.match(/.{1,2}/g)) !== null && _hexString_match !== void 0 ? _hexString_match : []).map(function(byte) {
        return parseInt(byte, 16);
    })).buffer;
}
var toHexString = function(bytes) {
    return bytes.reduce(function(str, byte) {
        return str + byte.toString(16).padStart(2, "0");
    }, "");
};
function getIdentityFromPem() {
    var PrivateKey = _starkbankEcdsa.default.PrivateKey;
    var secretKey = PrivateKey.fromPem(_fs.default.readFileSync(_path.default.join(process.cwd(), _env.productionPem), {
        encoding: "utf-8"
    }).toString());
    return _identitySecp256K1.Secp256k1KeyIdentity.fromSecretKey(fromHexString(BigInt(secretKey.secret.toString()).toString(16)));
}
function getIdentityFromPhrase(phrase) {
    var seed = bip39.mnemonicToSeedSync(phrase);
    var ICP_PATH = "m/44'/223'/0'";
    var _$path = "".concat(ICP_PATH, "/0/0");
    var bip32 = BIP32Factory.default(ecc);
    var node = bip32.fromSeed(seed);
    var child = node.derivePath(_$path);
    return _identitySecp256K1.Secp256k1KeyIdentity.fromSecretKey(child.privateKey);
}
function getIdentityFromPhraseWithSeed(phrase) {
    var seed = bip39.mnemonicToSeedSync(phrase);
    var ICP_PATH = "m/44'/223'/0'";
    var _$path = "".concat(ICP_PATH, "/0/0");
    var bip32 = BIP32Factory.default(ecc);
    var node = bip32.fromSeed(seed);
    var child = node.derivePath(_$path);
    return {
        identity: _identitySecp256K1.Secp256k1KeyIdentity.fromSecretKey(child.privateKey),
        seed: new Uint8Array(seed)
    };
}
var seedPhrase = _fs.default.readFileSync(_path.default.join(process.cwd(), _env.seedPhrase), {
    encoding: "utf8"
}).toString();
var identity = !_env.isProduction ? getIdentityFromPhrase(seedPhrase) : getIdentityFromPem();

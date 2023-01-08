import fs from "fs";
import path from "path";
import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";
var BIP32Factory = require("bip32");
var bip39 = require("bip39");
var ecc = require("tiny-secp256k1");
import curve from "starkbank-ecdsa";
import { isProduction, productionPem, seedPhrase as seedPhraseFile } from "./env";
export function fromHexString(hexString) {
    var _hexString_match;
    return new Uint8Array(((_hexString_match = hexString.match(/.{1,2}/g)) !== null && _hexString_match !== void 0 ? _hexString_match : []).map(function(byte) {
        return parseInt(byte, 16);
    })).buffer;
}
export var toHexString = function(bytes) {
    return bytes.reduce(function(str, byte) {
        return str + byte.toString(16).padStart(2, "0");
    }, "");
};
export function getIdentityFromPem() {
    var PrivateKey = curve.PrivateKey;
    var secretKey = PrivateKey.fromPem(fs.readFileSync(path.join(process.cwd(), productionPem), {
        encoding: "utf-8"
    }).toString());
    return Secp256k1KeyIdentity.fromSecretKey(fromHexString(BigInt(secretKey.secret.toString()).toString(16)));
}
export function getIdentityFromPhrase(phrase) {
    var seed = bip39.mnemonicToSeedSync(phrase);
    var ICP_PATH = "m/44'/223'/0'";
    var _$path = "".concat(ICP_PATH, "/0/0");
    var bip32 = BIP32Factory.default(ecc);
    var node = bip32.fromSeed(seed);
    var child = node.derivePath(_$path);
    return Secp256k1KeyIdentity.fromSecretKey(child.privateKey);
// return seed;
}
export function getIdentityFromPhraseWithSeed(phrase) {
    var seed = bip39.mnemonicToSeedSync(phrase);
    var ICP_PATH = "m/44'/223'/0'";
    var _$path = "".concat(ICP_PATH, "/0/0");
    var bip32 = BIP32Factory.default(ecc);
    var node = bip32.fromSeed(seed);
    var child = node.derivePath(_$path);
    return {
        identity: Secp256k1KeyIdentity.fromSecretKey(child.privateKey),
        seed: new Uint8Array(seed)
    };
// return seed;
}
var seedPhrase = fs.readFileSync(path.join(process.cwd(), seedPhraseFile), {
    encoding: "utf8"
}).toString();
var identity = !isProduction ? getIdentityFromPhrase(seedPhrase) : getIdentityFromPem();
export { identity };

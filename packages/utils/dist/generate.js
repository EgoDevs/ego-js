import Mock from "mockjs";
import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";
var BIP32Factory = require("bip32");
var bip39 = require("bip39");
var ecc = require("tiny-secp256k1");
var Random = Mock.Random;
export function getIdentityFromPhraseWithSeed(phrase) {
    var seed = bip39.mnemonicToSeedSync(phrase);
    var ICP_PATH = "m/44'/223'/0'";
    var path = "".concat(ICP_PATH, "/0/0");
    var bip32 = BIP32Factory.default(ecc);
    var node = bip32.fromSeed(seed);
    var child = node.derivePath(path);
    return {
        identity: Secp256k1KeyIdentity.fromSecretKey(child.privateKey),
        seed: new Uint8Array(seed)
    };
// return seed;
} // function identityFactoryWihPhrase(phrase: string, index: number, group: number) {
 //   const ids: Array<MockIdentity> = [];
 //   for (var i = 0; i < index; i += 1) {
 //     const { identity, seed } = getIdentityFromPhraseWithSeed(phrase);
 //     ids.push({
 //       name: Random.name(),
 //       derEncodedPublicKey: toHexString(identity.getPublicKey().toDer()),
 //       principal: identity.getPrincipal().toText(),
 //       identity: identity,
 //       userGroup: group,
 //       seed: toHexString(seed),
 //     });
 //   }
 //   return ids;
 // }
 // function generate2() {
 //   fs.writeFileSync(
 //     `${process.cwd()}/clients/fixtures/identities2.json`,
 //     JSON.stringify([
 //       ...identityFactoryWihPhrase('drama catch young miss please high blanket animal armor outdoor capital page', 1, 0),
 //       // ...identityFactory(2, 1),
 //       // ...identityFactory(2, 2),
 //       // ...identityFactory(2, 3),
 //     ]),
 //   );
 // }
 // generate2();

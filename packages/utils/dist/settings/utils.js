function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
import fs from "fs";
import path from "path";
import { fetch } from "cross-fetch";
import { Principal } from "@dfinity/principal";
import { sha224 } from "js-sha256";
import crc from "crc";
var toHexString = function(bytes) {
    return bytes.reduce(function(str, byte) {
        return str + byte.toString(16).padStart(2, "0");
    }, "");
};
if (!globalThis.fetch) {
    globalThis.fetch = fetch;
}
if (!global.fetch) {
    global.fetch = fetch;
}
export function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
export function getCanisterId(configName) {
    var isProd = process.env.NODE_ENV === "production";
    var canisterId;
    if (isProd) {
        var localFile = fs.readFileSync(path.resolve("./configs/".concat(configName, ".json")), {
            encoding: "utf8"
        });
        canisterId = JSON.parse(localFile).PRODUCTION_CANISTERID;
    } else {
        var localFile1 = fs.readFileSync(path.resolve("./configs/".concat(configName, ".json")), {
            encoding: "utf8"
        });
        canisterId = JSON.parse(localFile1).LOCAL_CANISTERID;
    }
    return canisterId;
}
export var asciiStringToByteArray = function(text) {
    return Array.from(text).map(function(c) {
        return c.charCodeAt(0);
    });
};
export var principalToAccountIdentifier = function(principal, subAccount) {
    // Hash (sha224) the principal, the subAccount and some padding
    var padding = asciiStringToByteArray("\naccount-id");
    var shaObj = sha224.create();
    shaObj.update(_toConsumableArray(padding).concat(_toConsumableArray(principal.toUint8Array()), _toConsumableArray(subAccount !== null && subAccount !== void 0 ? subAccount : Array(32).fill(0))));
    var hash = new Uint8Array(shaObj.array());
    // Prepend the checksum of the hash and convert to a hex string
    var checksum = calculateCrc32(hash);
    var bytes = new Uint8Array(_toConsumableArray(checksum).concat(_toConsumableArray(hash)));
    return toHexString(bytes);
};
export var stringToAccountIdentifier = function(str) {
    try {
        if (str.length === 64) {
            return str;
        }
        if (str.length === 63) {
            return principalToAccountIdentifier(Principal.fromText(str));
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
};
export var accountIdentifierToBytes = function(accountIdentifier) {
    return Uint8Array.from(Buffer.from(accountIdentifier, "hex"));
};
export var calculateCrc32 = function(bytes) {
    var checksumArrayBuf = new ArrayBuffer(4);
    var view = new DataView(checksumArrayBuf);
    view.setUint32(0, crc.crc32(Buffer.from(bytes)), false);
    return Buffer.from(checksumArrayBuf);
}; // export const

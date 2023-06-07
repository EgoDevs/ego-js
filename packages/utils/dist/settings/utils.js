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
    hasOwnProperty () {
        return hasOwnProperty;
    },
    getCanisterId () {
        return getCanisterId;
    },
    asciiStringToByteArray () {
        return asciiStringToByteArray;
    },
    principalToAccountIdentifier () {
        return principalToAccountIdentifier;
    },
    stringToAccountIdentifier () {
        return stringToAccountIdentifier;
    },
    accountIdentifierToBytes () {
        return accountIdentifierToBytes;
    },
    calculateCrc32 () {
        return calculateCrc32;
    },
    argv () {
        return argv;
    }
});
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _crossFetch = require("cross-fetch");
var _principal = require("@dfinity/principal");
var _jsSha256 = require("js-sha256");
var _crc = _interopRequireDefault(require("crc"));
var _env = require("./env");
var _yargs = _interopRequireDefault(require("yargs"));
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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
var toHexString = function(bytes) {
    return bytes.reduce(function(str, byte) {
        return str + byte.toString(16).padStart(2, "0");
    }, "");
};
if (!globalThis.fetch) {
    globalThis.fetch = _crossFetch.fetch;
}
if (!global.fetch) {
    global.fetch = _crossFetch.fetch;
}
function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
function getCanisterId(configName, env) {
    var fileName;
    var combinedEnv = env !== null && env !== void 0 ? env : (0, _env.getEgoEnv)();
    var key = "ic";
    console.log({
        combinedEnv
    });
    switch(combinedEnv){
        case "local":
            {
                fileName = "".concat(process.cwd(), "/configs/local.json");
                key = "local";
                break;
            }
        case "mainnet":
            {
                fileName = "".concat(process.cwd(), "/configs/mainnet.json");
                key = "ic";
                break;
            }
        case "testnet":
            {
                fileName = "".concat(process.cwd(), "/configs/testnet.json");
                key = "ic";
                break;
            }
        case "custom":
            {
                fileName = "".concat(process.cwd(), "/configs/custom.json");
                key = "local";
                break;
            }
        default:
            {
                fileName = "".concat(process.cwd(), "/configs/local.json");
                key = "local";
                break;
            }
    }
    var localFile = _fs.default.readFileSync(_path.default.resolve(fileName), {
        encoding: "utf8"
    });
    var canisterId = JSON.parse(localFile)[configName][key];
    return canisterId;
}
var asciiStringToByteArray = function(text) {
    return Array.from(text).map(function(c) {
        return c.charCodeAt(0);
    });
};
var principalToAccountIdentifier = function(principal, subAccount) {
    var padding = asciiStringToByteArray("\naccount-id");
    var shaObj = _jsSha256.sha224.create();
    shaObj.update(_toConsumableArray(padding).concat(_toConsumableArray(principal.toUint8Array()), _toConsumableArray(subAccount !== null && subAccount !== void 0 ? subAccount : Array(32).fill(0))));
    var hash = new Uint8Array(shaObj.array());
    var checksum = calculateCrc32(hash);
    var bytes = new Uint8Array(_toConsumableArray(checksum).concat(_toConsumableArray(hash)));
    return toHexString(bytes);
};
var stringToAccountIdentifier = function(str) {
    try {
        if (str.length === 64) {
            return str;
        }
        if (str.length === 63) {
            return principalToAccountIdentifier(_principal.Principal.fromText(str));
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
};
var accountIdentifierToBytes = function(accountIdentifier) {
    return Uint8Array.from(Buffer.from(accountIdentifier, "hex"));
};
var calculateCrc32 = function(bytes) {
    var checksumArrayBuf = new ArrayBuffer(4);
    var view = new DataView(checksumArrayBuf);
    view.setUint32(0, _crc.default.crc32(Buffer.from(bytes)), false);
    return Buffer.from(checksumArrayBuf);
};
var argv = _yargs.default.option("clean", {
    alias: "c",
    description: "clean .dfx/ folder",
    type: "boolean"
}).option("create", {
    alias: "n",
    description: "create only",
    type: "boolean"
}).option("credentials", {
    alias: "d",
    description: "bootstrap credentials",
    type: "boolean"
}).option("init", {
    alias: "init",
    description: "init config",
    type: "boolean"
}).option("install", {
    alias: "i",
    description: "install only",
    type: "boolean"
}).option("reinstall", {
    alias: "r",
    description: "reinstall only",
    type: "boolean"
}).option("upgrade", {
    alias: "u",
    description: "upgrade only",
    type: "boolean"
}).option("postPatch", {
    alias: "post",
    description: "postPatch only",
    type: "boolean"
}).help().alias("help", "h").argv;

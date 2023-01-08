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
    }
});
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _crossFetch = require("cross-fetch");
var _principal = require("@dfinity/principal");
var _jsSha256 = require("js-sha256");
var _crc = _interopRequireDefault(require("crc"));
var _env = require("./env");
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
function getCanisterId(configName) {
    var isProd = process.env.NODE_ENV === "production";
    var canisterId;
    if (isProd) {
        var localFile = _fs.default.readFileSync(_path.default.resolve("./".concat(_env.configs, "/").concat(configName, ".json")), {
            encoding: "utf8"
        });
        canisterId = JSON.parse(localFile).PRODUCTION_CANISTERID;
    } else {
        var localFile1 = _fs.default.readFileSync(_path.default.resolve("./".concat(_env.configs, "/").concat(configName, ".json")), {
            encoding: "utf8"
        });
        canisterId = JSON.parse(localFile1).LOCAL_CANISTERID;
    }
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

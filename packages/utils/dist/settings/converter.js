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
import { Principal } from "@dfinity/principal";
import { sha224 } from "js-sha256";
import { Buffer } from "buffer";
import crc from "crc";
import { ALPHANUM_REGEX, CANISTER_MAX_LENGTH, SUB_ACCOUNT_BYTE_LENGTH } from "./constants";
export var uint8ArrayToBigInt = function(array) {
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    if (typeof view.getBigUint64 === "function") {
        return view.getBigUint64(0);
    } else {
        var high = BigInt(view.getUint32(0));
        var low = BigInt(view.getUint32(4));
        return (high << BigInt(32)) + low;
    }
};
var TWO_TO_THE_32 = BigInt(1) << BigInt(32);
export var bigIntToUint8Array = function(value) {
    var array = new Uint8Array(8);
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    if (typeof view.setBigUint64 === "function") {
        view.setBigUint64(0, value);
    } else {
        view.setUint32(0, Number(value >> BigInt(32)));
        view.setUint32(4, Number(value % TWO_TO_THE_32));
    }
    return array;
};
export var arrayBufferToArrayOfNumber = function(buffer) {
    var typedArray = new Uint8Array(buffer);
    return Array.from(typedArray);
};
export var arrayOfNumberToUint8Array = function(numbers) {
    return new Uint8Array(numbers);
};
export var arrayOfNumberToArrayBuffer = function(numbers) {
    return arrayOfNumberToUint8Array(numbers).buffer;
};
export var arrayBufferToNumber = function(buffer) {
    var view = new DataView(buffer);
    return view.getUint32(view.byteLength - 4);
};
export var numberToArrayBuffer = function(value, byteLength) {
    var buffer = new ArrayBuffer(byteLength);
    new DataView(buffer).setUint32(byteLength - 4, value);
    return buffer;
};
export var asciiStringToByteArray = function(text) {
    return Array.from(text).map(function(c) {
        return c.charCodeAt(0);
    });
};
export var toSubAccountId = function(subAccount) {
    var bytes = arrayOfNumberToArrayBuffer(subAccount);
    return arrayBufferToNumber(bytes);
};
export var fromSubAccountId = function(subAccountId) {
    var buffer = numberToArrayBuffer(subAccountId, SUB_ACCOUNT_BYTE_LENGTH);
    return arrayBufferToArrayOfNumber(buffer);
};
export var accountIdentifierToBytes = function(accountIdentifier) {
    return Uint8Array.from(Buffer.from(accountIdentifier, "hex")).subarray(4);
};
export var accountIdentifierFromBytes = function(accountIdentifier) {
    return Buffer.from(accountIdentifier).toString("hex");
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
export var principalToSubAccount = function(principal) {
    var bytes = principal.toUint8Array();
    var subAccount = new Uint8Array(32);
    subAccount[0] = bytes.length;
    subAccount.set(bytes, 1);
    return subAccount;
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
var toHexString = function(bytes) {
    return bytes.reduce(function(str, byte) {
        return str + byte.toString(16).padStart(2, "0");
    }, "");
};
// 4 bytes
export var calculateCrc32 = function(bytes) {
    var checksumArrayBuf = new ArrayBuffer(4);
    var view = new DataView(checksumArrayBuf);
    view.setUint32(0, crc.crc32(Buffer.from(bytes)), false);
    return Buffer.from(checksumArrayBuf);
};
export var E8S_PER_ICP = 100000000;
export var TokenSymbol;
(function(TokenSymbol) {
    TokenSymbol["ICP"] = "ICP";
})(TokenSymbol || (TokenSymbol = {}));
export var getDecimalFromSymbol = function(sym) {
    switch(sym){
        case TokenSymbol.ICP:
            return 8;
        default:
            return 8;
    }
};
export var formatAssetBySymbol = function(_amount, symbol) {
    var balanceString = balanceToString(_amount, getDecimalFromSymbol(symbol));
    var amount = Number(balanceString.total);
    var tokenMap = [
        {
            ICP: {
                amount: amount,
                balanceString: balanceString,
                symbol: "ICP"
            }
        }
    ];
    var found = tokenMap.find(function(v) {
        return v[symbol] !== undefined;
    });
    return found === null || found === void 0 ? void 0 : found[symbol];
};
export var parseBalance = function(balance) {
    return (parseInt(balance.value, 10) / Math.pow(10, balance.decimals)).toString();
};
export var balanceFromString = function(balance) {
    var decimal = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 8;
    var list = balance.split(".");
    var aboveZero = list[0];
    var aboveZeroBigInt = BigInt(aboveZero) * BigInt(1 * Math.pow(10, decimal));
    var belowZeroBigInt = BigInt(0);
    var belowZero = list[1];
    if (belowZero !== undefined) {
        belowZeroBigInt = BigInt(belowZero.substring(0, decimal).padEnd(decimal, "0"));
    }
    return aboveZeroBigInt + belowZeroBigInt;
};
export var balanceToString = function(balance) {
    var decimal = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 8;
    var balanceString = balance.toString(10);
    var balanceStringLength = balanceString.length;
    var aboveZero = "0";
    var belowZero = "0".padEnd(decimal, "0");
    if (balanceStringLength > decimal) {
        belowZero = balanceString.substring(balanceStringLength - decimal, balanceStringLength);
        aboveZero = balanceString.substring(0, balanceStringLength - decimal);
    } else {
        belowZero = balanceString.padStart(decimal, "0");
    }
    var formatAboveZero = String(aboveZero).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var _parseFloat_toString_split_, _parseFloat_toFixed_toString_split_;
    return {
        total: aboveZero + "." + belowZero,
        aboveZero: aboveZero,
        belowZero: belowZero,
        formatAboveZero: formatAboveZero,
        formatTotal: formatAboveZero + "." + ((_parseFloat_toString_split_ = parseFloat("0." + belowZero).toString().split(".")[1]) !== null && _parseFloat_toString_split_ !== void 0 ? _parseFloat_toString_split_ : "0"),
        formatTotalTo8: formatAboveZero + "." + belowZero,
        formatTotalTo4: formatAboveZero + "." + ((_parseFloat_toFixed_toString_split_ = parseFloat("0." + belowZero).toFixed(4).toString().split(".")[1]) !== null && _parseFloat_toFixed_toString_split_ !== void 0 ? _parseFloat_toFixed_toString_split_ : "0")
    };
};
export var validateAccountId = function(text) {
    return text.length === 64 && ALPHANUM_REGEX.test(text);
};
export var validatePrincipalId = function(text) {
    try {
        return text === Principal.fromText(text).toString();
    } catch (e) {
        return false;
    }
};
export var validateCanisterId = function(text) {
    try {
        return text.length <= CANISTER_MAX_LENGTH && validatePrincipalId(text);
    } catch (e) {
        return false;
    }
};
export var AddressType;
(function(AddressType) {
    AddressType["PRINCIPAL"] = "principal";
    AddressType["ACCOUNT"] = "accountId";
    AddressType["CANISTER"] = "canister";
    AddressType["ERC20"] = "erc20";
    AddressType["INVALID"] = "invalid";
})(AddressType || (AddressType = {}));
export var getAddressType = function(text) {
    try {
        if (validateAccountId(text)) {
            return AddressType.ACCOUNT;
        } else if (validatePrincipalId(text)) {
            return AddressType.PRINCIPAL;
        } else if (validateCanisterId(text)) {
            return AddressType.CANISTER;
        }
        return AddressType.INVALID;
    } catch (error) {
        throw error;
    }
};

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
    SUB_ACCOUNT_BYTE_LENGTH () {
        return SUB_ACCOUNT_BYTE_LENGTH;
    },
    CREATE_CANISTER_MEMO () {
        return CREATE_CANISTER_MEMO;
    },
    TOP_UP_CANISTER_MEMO () {
        return TOP_UP_CANISTER_MEMO;
    },
    TRANSACTION_FEE () {
        return TRANSACTION_FEE;
    },
    NET_ID () {
        return NET_ID;
    },
    ROSETTA_URL () {
        return ROSETTA_URL;
    },
    IC_EXPLORER () {
        return IC_EXPLORER;
    },
    IC_ROCKS () {
        return IC_ROCKS;
    },
    MAX_TRANSACTION_DECISION_MILSECONDS () {
        return MAX_TRANSACTION_DECISION_MILSECONDS;
    },
    PRINCIPAL_REGEX () {
        return PRINCIPAL_REGEX;
    },
    ALPHANUM_REGEX () {
        return ALPHANUM_REGEX;
    },
    CANISTER_REGEX () {
        return CANISTER_REGEX;
    },
    CANISTER_MAX_LENGTH () {
        return CANISTER_MAX_LENGTH;
    },
    ADDRESS_TYPES () {
        return ADDRESS_TYPES;
    }
});
var SUB_ACCOUNT_BYTE_LENGTH = 32;
var CREATE_CANISTER_MEMO = BigInt(0x41455243);
var TOP_UP_CANISTER_MEMO = BigInt(0x50555054);
var TRANSACTION_FEE = BigInt(10000);
var NET_ID = {
    blockchain: "Internet Computer",
    network: "00000000000000020101"
};
var ROSETTA_URL = "https://rosetta-api.internetcomputer.org";
var IC_EXPLORER = "https://dashboard.internetcomputer.org";
var IC_ROCKS = "https://ic.rocks";
var MAX_TRANSACTION_DECISION_MILSECONDS = 120000;
var PRINCIPAL_REGEX = /(\w{5}-){10}\w{3}/;
var ALPHANUM_REGEX = /^[a-zA-Z0-9]+$/;
var CANISTER_REGEX = /(\w{5}-){4}\w{3}/;
var CANISTER_MAX_LENGTH = 27;
var ADDRESS_TYPES = {
    PRINCIPAL: "principal",
    ACCOUNT: "accountId",
    CANISTER: "canister",
    ERC20: "erc20",
    UNKNOWN: "unknown"
};

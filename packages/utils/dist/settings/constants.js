export var SUB_ACCOUNT_BYTE_LENGTH = 32;
export var CREATE_CANISTER_MEMO = BigInt(0x41455243); // CREA,
export var TOP_UP_CANISTER_MEMO = BigInt(0x50555054); // TPUP
export var TRANSACTION_FEE = BigInt(10000);
export var NET_ID = {
    blockchain: "Internet Computer",
    network: "00000000000000020101"
};
export var ROSETTA_URL = "https://rosetta-api.internetcomputer.org";
export var IC_EXPLORER = "https://dashboard.internetcomputer.org";
export var IC_ROCKS = "https://ic.rocks";
export var MAX_TRANSACTION_DECISION_MILSECONDS = 120000;
export var PRINCIPAL_REGEX = /(\w{5}-){10}\w{3}/;
export var ALPHANUM_REGEX = /^[a-zA-Z0-9]+$/;
export var CANISTER_REGEX = /(\w{5}-){4}\w{3}/;
export var CANISTER_MAX_LENGTH = 27;
export var ADDRESS_TYPES = {
    PRINCIPAL: "principal",
    ACCOUNT: "accountId",
    CANISTER: "canister",
    ERC20: "erc20",
    UNKNOWN: "unknown"
}; // import config from "../config";
 // // @ts-ignore
 // export const HOST = "HOST" in config ? config["HOST"] : undefined;

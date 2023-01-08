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
    getEgoConfig () {
        return getEgoConfig;
    },
    dfxVersion () {
        return dfxVersion;
    },
    dfxPort () {
        return dfxPort;
    },
    canisters () {
        return canisters;
    },
    artifacts () {
        return artifacts;
    },
    configs () {
        return configs;
    },
    productionPem () {
        return productionPem;
    },
    productionCyclesWallet () {
        return productionCyclesWallet;
    },
    seedPhrase () {
        return seedPhrase;
    },
    isProduction () {
        return isProduction;
    },
    cyclesCreateCanister () {
        return cyclesCreateCanister;
    }
});
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getEgoConfig(key) {
    var config = JSON.parse(_fs.default.readFileSync("".concat(process.cwd(), "/ego-config.json"), {
        encoding: "utf-8"
    }));
    return config[key];
}
var dfxVersion = getEgoConfig("dfxVersion");
var dfxPort = getEgoConfig("dfxPort");
var canisters = getEgoConfig("canisters");
var artifacts = getEgoConfig("artifacts");
var configs = getEgoConfig("configs");
var productionPem = getEgoConfig("credentials").production_pem;
var productionCyclesWallet = getEgoConfig("credentials").production_cycles_wallet;
var seedPhrase = getEgoConfig("credentials").seedPhrase;
var isProduction = process.env.NODE_ENV === "production";
var cyclesCreateCanister = BigInt(getEgoConfig("cycles_install_code").replace("_", ""));

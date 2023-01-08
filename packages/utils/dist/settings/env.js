import fs from "fs";
export function getEgoConfig(key) {
    var config = JSON.parse(fs.readFileSync("".concat(process.cwd(), "/ego-config.json"), {
        encoding: "utf-8"
    }));
    return config[key];
}
export var dfxVersion = getEgoConfig("dfxVersion");
export var dfxPort = getEgoConfig("dfxPort");
export var canisters = getEgoConfig("canisters");
export var artifacts = getEgoConfig("artifacts");
export var configs = getEgoConfig("configs");
export var productionPem = getEgoConfig("credentials").production_pem;
export var productionCyclesWallet = getEgoConfig("credentials").production_cycles_wallet;
export var seedPhrase = getEgoConfig("credentials").seedPhrase;
export var isProduction = process.env.NODE_ENV === "production";
export var cyclesCreateCanister = BigInt(getEgoConfig("cycles_install_code").replace("_", ""));

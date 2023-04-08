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
    InstallMode () {
        return InstallMode;
    },
    cycleWalletCanisterId () {
        return cycleWalletCanisterId;
    },
    managementActor () {
        return managementActor;
    },
    cycleWalletActor () {
        return cycleWalletActor;
    },
    readWasm () {
        return readWasm;
    },
    readEgoDfxJson () {
        return readEgoDfxJson;
    },
    readConfig () {
        return readConfig;
    },
    ManagementApi () {
        return ManagementApi;
    }
});
var _agent = require("./settings/agent");
var _managementIdl = require("./idls/management.idl");
var _cycleWalletIdl = require("./idls/cycle_wallet.idl");
var _fs = _interopRequireDefault(require("fs"));
var _principal = require("@dfinity/principal");
var _identity = require("./settings/identity");
var _env = require("./settings/env");
var _crossFetch = require("cross-fetch");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var __generator = (void 0) && (void 0).__generator || function(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
if (!globalThis.fetch) {
    globalThis.fetch = _crossFetch.fetch;
    globalThis.Headers = _crossFetch.Headers;
}
if (!global.fetch) {
    global.fetch = _crossFetch.fetch;
    global.Headers = _crossFetch.Headers;
}
var managementCanisterId = "";
var cycleWalletCanisterId = _env.productionCyclesWallet;
function managementActor() {
    return _managementActor.apply(this, arguments);
}
function _managementActor() {
    _managementActor = _asyncToGenerator(function() {
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        (0, _agent.getActor2)((0, _identity.identity)(), _managementIdl.idlFactory, managementCanisterId)
                    ];
                case 1:
                    return [
                        2,
                        _state.sent()
                    ];
            }
        });
    });
    return _managementActor.apply(this, arguments);
}
function cycleWalletActor() {
    return _cycleWalletActor.apply(this, arguments);
}
function _cycleWalletActor() {
    _cycleWalletActor = _asyncToGenerator(function() {
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        (0, _agent.getActor2)((0, _identity.identity)(), _cycleWalletIdl.idlFactory, cycleWalletCanisterId)
                    ];
                case 1:
                    return [
                        2,
                        _state.sent()
                    ];
            }
        });
    });
    return _cycleWalletActor.apply(this, arguments);
}
function readWasm(packagePath) {
    return Array.from(new Uint8Array(_fs.default.readFileSync(packagePath)));
}
function readEgoDfxJson(folder, packageName) {
    var dfxFile = _fs.default.readFileSync(folder + "/dfx.json").toString();
    var jsonFile = JSON.parse(dfxFile);
    var pkg = jsonFile["canisters"][packageName];
    return pkg;
}
function readConfig(configPath) {
    return JSON.parse(_fs.default.readFileSync(configPath).toString());
}
var InstallMode;
(function(InstallMode) {
    InstallMode[InstallMode["install"] = 0] = "install";
    InstallMode[InstallMode["reinstall"] = 1] = "reinstall";
    InstallMode[InstallMode["upgrade"] = 2] = "upgrade";
})(InstallMode || (InstallMode = {}));
var ManagementApi = function() {
    "use strict";
    function ManagementApi(_actor) {
        _classCallCheck(this, ManagementApi);
        this._actor = _actor;
    }
    ManagementApi.create = function create() {
        return _asyncToGenerator(function() {
            var actor;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            managementActor()
                        ];
                    case 1:
                        actor = _state.sent().actor;
                        return [
                            2,
                            new ManagementApi(actor)
                        ];
                }
            });
        })();
    };
    ManagementApi.install = function install(param) {
        var name = param.name, wasm_path = param.wasm_path, canister_id = param.canister_id, _param_installMode = param.installMode, installMode = _param_installMode === void 0 ? InstallMode.install : _param_installMode;
        return _asyncToGenerator(function() {
            var manager, mode, wasm, error;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            ManagementApi.create()
                        ];
                    case 1:
                        manager = _state.sent();
                        console.log("installing ".concat(name, " to ").concat(canister_id));
                        switch(installMode){
                            case InstallMode.install:
                                mode = {
                                    install: null
                                };
                                break;
                            case InstallMode.reinstall:
                                mode = {
                                    reinstall: null
                                };
                                break;
                            case InstallMode.upgrade:
                                mode = {
                                    upgrade: null
                                };
                                break;
                            default:
                                mode = {
                                    install: null
                                };
                                break;
                        }
                        _state.label = 2;
                    case 2:
                        _state.trys.push([
                            2,
                            4,
                            ,
                            5
                        ]);
                        wasm = readWasm(wasm_path);
                        return [
                            4,
                            manager.actor.install_code({
                                arg: [],
                                wasm_module: readWasm(wasm_path),
                                mode,
                                canister_id: _principal.Principal.fromText(canister_id)
                            })
                        ];
                    case 3:
                        _state.sent();
                        console.log("Success with wasm bytes length: ".concat(wasm.length));
                        return [
                            3,
                            5
                        ];
                    case 4:
                        error = _state.sent();
                        throw new Error("\n      Error: Failed to install ".concat(name, " to ").concat(canister_id, "\n      Reason: ").concat(error.message, "\n      "));
                    case 5:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    ManagementApi.updateSettings = function updateSettings(name, canister_id, settings) {
        return _asyncToGenerator(function() {
            var manager;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            ManagementApi.create()
                        ];
                    case 1:
                        manager = _state.sent();
                        console.log("update settings ".concat(name, " : ").concat(canister_id));
                        return [
                            4,
                            manager.actor.update_settings({
                                canister_id: _principal.Principal.fromText(canister_id),
                                settings
                            })
                        ];
                    case 2:
                        _state.sent();
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _createClass(ManagementApi, [
        {
            key: "actor",
            get: function get() {
                return this._actor;
            }
        }
    ]);
    return ManagementApi;
}();

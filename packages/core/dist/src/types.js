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
    EgoNetwork () {
        return EgoNetwork;
    },
    EgoInfraInterface () {
        return EgoInfraInterface;
    },
    EgoInfraBase () {
        return EgoInfraBase;
    }
});
var _utils = require("@ego-js/utils");
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
var EgoNetwork;
(function(EgoNetwork) {
    EgoNetwork["MainNet"] = "mainnet";
    EgoNetwork["TestNet"] = "testnet";
    EgoNetwork["Local"] = "local";
})(EgoNetwork || (EgoNetwork = {}));
var EgoInfraInterface = function EgoInfraInterface() {
    "use strict";
    _classCallCheck(this, EgoInfraInterface);
};
var EgoInfraBase = function() {
    "use strict";
    function EgoInfraBase(egoInfra, idl) {
        var signIdentity = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (0, _utils.identity)(), currentNetwork = arguments.length > 3 ? arguments[3] : void 0;
        _classCallCheck(this, EgoInfraBase);
        this.mainnet = egoInfra.mainnet;
        this.testnet = egoInfra.testnet;
        this.name = egoInfra.name;
        this.local = egoInfra.local;
        this.currentNetwork = currentNetwork !== null && currentNetwork !== void 0 ? currentNetwork : EgoNetwork.Local;
        this.idl = idl;
        this.signIdentity = signIdentity;
        this._actor = this._getActor(signIdentity, this.currentNetwork);
    }
    var _proto = EgoInfraBase.prototype;
    _proto._getActor = function _getActor(signIdentity) {
        var network = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : EgoNetwork.Local;
        return (0, _utils.getActor)(signIdentity, this.idl, this.getCanisterId(network));
    };
    _proto.getActor = function getActor() {
        var _this = this;
        return _asyncToGenerator(function() {
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this._actor
                        ];
                    case 1:
                        return [
                            2,
                            _state.sent()
                        ];
                }
            });
        })();
    };
    _proto.useNetwork = function useNetwork(network) {
        this.currentNetwork = network;
    };
    _proto.toJSON = function toJSON() {
        return {
            name: this.name,
            mainnet: this.mainnet,
            testnet: this.testnet,
            local: this.local
        };
    };
    _proto.getCanisterId = function getCanisterId(network) {
        switch(network){
            case EgoNetwork.MainNet:
                return this.mainnet;
            case EgoNetwork.TestNet:
                return this.testnet;
            case EgoNetwork.Local:
                if (this.local) {
                    return this.local;
                } else {
                    try {
                        var localCanisterId = (0, _utils.getCanisterId)(this.name);
                        if (localCanisterId) {
                            this.overrideCanisterId(EgoNetwork.Local, localCanisterId);
                            return localCanisterId;
                        } else {
                            throw new Error("Local canister id not found");
                        }
                    } catch (error) {
                        throw error;
                    }
                }
        }
    };
    _proto.getCanisterName = function getCanisterName() {
        return this.name;
    };
    _proto.getCurrentCanisterId = function getCurrentCanisterId() {
        return this.getCanisterId(this.currentNetwork);
    };
    _proto.getCurrentNetwork = function getCurrentNetwork() {
        return this.currentNetwork;
    };
    _proto.overrideCanisterId = function overrideCanisterId(network, canisterId) {
        switch(network){
            case EgoNetwork.MainNet:
                this.mainnet = canisterId;
                break;
            case EgoNetwork.TestNet:
                this.testnet = canisterId;
                break;
            case EgoNetwork.Local:
                this.local = canisterId;
                break;
        }
    };
    _proto.egoOwnerAdd = function egoOwnerAdd(principal) {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_owner_add(principal)
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                true
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.egoOwnerAddWithName = function egoOwnerAddWithName(name, principal) {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_owner_add_with_name(name, principal)
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                true
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.egoOwnerRemove = function egoOwnerRemove(principal) {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_owner_remove(principal)
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                true
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.egoOwnerSet = function egoOwnerSet(principals) {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_owner_set(principals)
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                true
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.egoUserAdd = function egoUserAdd(principal) {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_user_add(principal)
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                true
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.egoUserRemove = function egoUserRemove(principal) {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_user_remove(principal)
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                true
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.egoUserSet = function egoUserSet(principals) {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_user_set(principals)
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                true
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.egoOpAdd = function egoOpAdd(principal) {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_op_add(principal)
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                true
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.egoIsUser = function egoIsUser() {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_is_user()
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                result.Ok
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.egoIsOwner = function egoIsOwner() {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_is_owner()
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                result.Ok
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.egoControllerAdd = function egoControllerAdd(principal) {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_controller_add(principal)
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                true
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.egoControllerRemove = function egoControllerRemove(principal) {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_controller_remove(principal)
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                true
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.egoControllerSet = function egoControllerSet(principals) {
        var _this = this;
        return _asyncToGenerator(function() {
            var actor, result;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        actor = _state.sent();
                        return [
                            4,
                            actor.ego_controller_set(principals)
                        ];
                    case 2:
                        result = _state.sent();
                        if ((0, _utils.hasOwnProperty)(result, "Ok")) {
                            return [
                                2,
                                true
                            ];
                        } else {
                            throw result.Err;
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    return EgoInfraBase;
}();

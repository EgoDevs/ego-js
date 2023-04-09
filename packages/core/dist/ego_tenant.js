"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EgoTenant", {
    enumerable: true,
    get () {
        return EgoTenant;
    }
});
var _types = require("./types");
var _util = require("./util");
var _utils = require("@ego-js/utils");
var _egoTenantIdl = require("./idls/ego_tenant.idl");
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
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
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
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
var EgoTenant = function(EgoInfraBase) {
    "use strict";
    _inherits(EgoTenant, EgoInfraBase);
    var _super = _createSuper(EgoTenant);
    function EgoTenant(signIdentity, currentNetwork) {
        _classCallCheck(this, EgoTenant);
        return _super.call(this, (0, _util.getInfra)("ego_tenant"), _egoTenantIdl.idlFactory, signIdentity, currentNetwork);
    }
    var _proto = EgoTenant.prototype;
    _proto.appMainDelete = function appMainDelete(canister) {
        var _this = this;
        return _asyncToGenerator(function() {
            var res;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        return [
                            4,
                            _state.sent().app_main_delete(canister)
                        ];
                    case 2:
                        res = _state.sent();
                        if ((0, _utils.hasOwnProperty)(res, "Ok")) {
                            return [
                                2,
                                true
                            ];
                        } else {
                            throw new Error(JSON.stringify(res.Err));
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.appMainInstall = function appMainInstall(request) {
        var _this = this;
        return _asyncToGenerator(function() {
            var res;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        return [
                            4,
                            _state.sent().app_main_install(request)
                        ];
                    case 2:
                        res = _state.sent();
                        if ((0, _utils.hasOwnProperty)(res, "Ok")) {
                            return [
                                2,
                                res.Ok
                            ];
                        } else {
                            throw new Error(JSON.stringify(res.Err));
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.appMainUpgrade = function appMainUpgrade(request) {
        var _this = this;
        return _asyncToGenerator(function() {
            var res;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getActor()
                        ];
                    case 1:
                        return [
                            4,
                            _state.sent().app_main_upgrade(request)
                        ];
                    case 2:
                        res = _state.sent();
                        if ((0, _utils.hasOwnProperty)(res, "Ok")) {
                            return [
                                2,
                                res.Ok
                            ];
                        } else {
                            throw new Error(JSON.stringify(res.Err));
                        }
                        return [
                            2
                        ];
                }
            });
        })();
    };
    return EgoTenant;
}(_types.EgoInfraBase);

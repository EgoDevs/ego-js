"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EgoFactory", {
    enumerable: true,
    get () {
        return EgoFactory;
    }
});
var _utils = require("@ego-js/utils");
var _types = require("./types");
var _egoStore = require("./ego_store");
var _egoDev = require("./ego_dev");
var _egoLedger = require("./ego_ledger");
var _egoOps = require("./ego_ops");
var _egoTenant = require("./ego_tenant");
var _egoFile = require("./ego_file");
var _egoRecord = require("./ego_record");
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
var EgoFactory = function() {
    "use strict";
    function EgoFactory(store, dev, file, ledger, ops, tenant, record) {
        _classCallCheck(this, EgoFactory);
        this.store = store;
        this.dev = dev;
        this.file = file;
        this.ledger = ledger;
        this.ops = ops;
        this.tenant = tenant;
        this.record = record;
    }
    var _proto = EgoFactory.prototype;
    _proto.useNetwork = function useNetwork(network) {
        this.store.useNetwork(network);
        this.dev.useNetwork(network);
        this.file.useNetwork(network);
        this.ledger.useNetwork(network);
        this.ops.useNetwork(network);
        this.tenant.useNetwork(network);
        this.record.useNetwork(network);
        return this;
    };
    EgoFactory.connect = function connect() {
        var signIdentity = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (0, _utils.identity)(), network = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : _types.EgoNetwork.Local;
        return _asyncToGenerator(function() {
            var store, dev, file, ledger, ops, tenant, record;
            return __generator(this, function(_state) {
                store = new _egoStore.EgoStore(signIdentity, network);
                dev = new _egoDev.EgoDev(signIdentity, network);
                file = new _egoFile.EgoFile(signIdentity, network);
                ledger = new _egoLedger.EgoLedger(signIdentity, network);
                ops = new _egoOps.EgoOps(signIdentity, network);
                tenant = new _egoTenant.EgoTenant(signIdentity, network);
                record = new _egoRecord.EgoRecord(signIdentity, network);
                return [
                    2,
                    new EgoFactory(store, dev, file, ledger, ops, tenant, record)
                ];
            });
        })();
    };
    return EgoFactory;
}();

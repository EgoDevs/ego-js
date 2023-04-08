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
    "_createActor" () {
        return _createActor;
    },
    getActor () {
        return getActor;
    },
    getActor2 () {
        return getActor2;
    }
});
var _agent = require("@dfinity/agent");
var _principal = require("@dfinity/principal");
var _env = require("./env");
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
function _createActor(interfaceFactory, canisterId, identity, host) {
    return __createActor.apply(this, arguments);
}
function __createActor() {
    __createActor = _asyncToGenerator(function(interfaceFactory, canisterId, identity, host) {
        var agent, actor;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    agent = new _agent.HttpAgent({
                        identity,
                        host: (host !== null && host !== void 0 ? host : !_env.isProduction) ? "http://127.0.0.1:".concat(_env.dfxPort) : "https://ic0.app/"
                    });
                    if (!!_env.isProduction) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        agent.fetchRootKey()
                    ];
                case 1:
                    _state.sent();
                    _state.label = 2;
                case 2:
                    actor = _agent.Actor.createActor(interfaceFactory, {
                        agent,
                        canisterId: canisterId === "" ? _principal.Principal.fromText("aaaaa-aa") : canisterId
                    });
                    return [
                        2,
                        {
                            actor,
                            agent
                        }
                    ];
            }
        });
    });
    return __createActor.apply(this, arguments);
}
var getActor = function() {
    var _ref = _asyncToGenerator(function(signIdentity, interfaceFactory, canisterId) {
        var actor;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        _createActor(interfaceFactory, canisterId, signIdentity)
                    ];
                case 1:
                    actor = _state.sent();
                    return [
                        2,
                        actor.actor
                    ];
            }
        });
    });
    return function getActor(signIdentity, interfaceFactory, canisterId) {
        return _ref.apply(this, arguments);
    };
}();
var getActor2 = function() {
    var _ref = _asyncToGenerator(function(signIdentity, interfaceFactory, canisterId) {
        var actor;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        _createActor(interfaceFactory, canisterId, signIdentity)
                    ];
                case 1:
                    actor = _state.sent();
                    return [
                        2,
                        actor
                    ];
            }
        });
    });
    return function getActor2(signIdentity, interfaceFactory, canisterId) {
        return _ref.apply(this, arguments);
    };
}();

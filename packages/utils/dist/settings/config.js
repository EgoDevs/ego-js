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
    dfxConfigTemplate () {
        return dfxConfigTemplate;
    },
    getEgos () {
        return getEgos;
    }
});
var _fs = _interopRequireDefault(require("fs"));
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
var dfxConfigTemplate = {
    canisters: {},
    defaults: {
        build: {
            packtool: ""
        }
    },
    version: 1
};
function getEgos(argv) {
    var file = _fs.default.readFileSync(process.cwd() + "/" + "ego-projects.json", {
        encoding: "utf-8"
    });
    var egos = JSON.parse(file);
    if (argv.project) {
        var project = argv.project;
        var ego = egos.find(function(e) {
            return e.package === project;
        });
        if (ego) {
            if (argv.install || argv.reinstall || argv.upgrade || argv.postPatch) {
                var _argv_env;
                egos = [
                    _objectSpreadProps(_objectSpread({}, ego), {
                        no_deploy: false,
                        env: (_argv_env = argv.env) !== null && _argv_env !== void 0 ? _argv_env : "local"
                    })
                ];
            } else {
                var _argv_env1;
                egos = [
                    _objectSpreadProps(_objectSpread({}, ego), {
                        env: (_argv_env1 = argv.env) !== null && _argv_env1 !== void 0 ? _argv_env1 : "local"
                    })
                ];
            }
        }
    }
    var _argv_env2;
    return egos.map(function(e) {
        return _objectSpreadProps(_objectSpread({}, e), {
            env: (_argv_env2 = argv.env) !== null && _argv_env2 !== void 0 ? _argv_env2 : "local"
        });
    });
}

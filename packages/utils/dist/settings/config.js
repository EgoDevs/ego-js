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
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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
function getEgos() {
    var file = _fs.default.readFileSync(process.cwd() + "/" + "ego-projects.json", {
        encoding: "utf-8"
    });
    return JSON.parse(file);
}

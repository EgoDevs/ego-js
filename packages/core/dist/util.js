"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getInfra", {
    enumerable: true,
    get () {
        return getInfra;
    }
});
var _utils = require("@ego-js/utils");
function getInfra(name) {
    try {
        return _utils.egoInfra.find(function(infra) {
            return infra.name === name;
        });
    } catch (error) {
        throw new Error("Ego Infra ".concat(name, " not found"));
    }
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
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
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
var __generator = this && this.__generator || function(thisArg, body) {
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
var _require = require("./http"), getRepoList = _require.getRepoList, getTagList = _require.getTagList;
var ora = require("ora");
var inquirer = require("inquirer");
var util = require("util");
var path = require("path");
var downloadGitRepo = require("download-git-repo");
var chalk = require("chalk");
var fs = require("fs-extra");
function wrapLoading(fn, message) {
    return _wrapLoading.apply(this, arguments);
}
function _wrapLoading() {
    _wrapLoading = _asyncToGenerator(function(fn, message) {
        var _len, args, _key, spinner, result, error;
        var _arguments = arguments;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    for(_len = _arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
                        args[_key - 2] = _arguments[_key];
                    }
                    spinner = ora(message);
                    spinner.start();
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        fn.apply(void 0, _toConsumableArray(args))
                    ];
                case 2:
                    result = _state.sent();
                    spinner.succeed();
                    return [
                        2,
                        result
                    ];
                case 3:
                    error = _state.sent();
                    console.log("Request failed, refetch ...");
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return _wrapLoading.apply(this, arguments);
}
var Generator = function() {
    "use strict";
    function Generator(name, targetDir) {
        _classCallCheck(this, Generator);
        this.name = name;
        this.targetDir = targetDir;
        this.downloadGitRepo = util.promisify(downloadGitRepo);
    }
    var _proto = Generator.prototype;
    _proto.getRepo = function getRepo() {
        return _asyncToGenerator(function() {
            var repoList, repos, repo;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            wrapLoading(getRepoList, "waiting fetch template")
                        ];
                    case 1:
                        repoList = _state.sent();
                        if (!repoList) return [
                            2
                        ];
                        repos = repoList.map(function(item) {
                            return item.name;
                        }).filter(function(i) {
                            return i.endsWith("-template");
                        });
                        return [
                            4,
                            inquirer.prompt({
                                name: "repo",
                                type: "list",
                                choices: repos,
                                message: "Please choose a template to create project"
                            })
                        ];
                    case 2:
                        repo = _state.sent().repo;
                        return [
                            2,
                            repo
                        ];
                }
            });
        })();
    };
    _proto.download = function download(repo, tag) {
        var _this = this;
        return _asyncToGenerator(function() {
            var requestUrl;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        requestUrl = "egoDevs/".concat(repo).concat(tag ? "#" + tag : "");
                        return [
                            4,
                            wrapLoading(_this.downloadGitRepo, "waiting download template", requestUrl, path.resolve(process.cwd(), _this.targetDir))
                        ];
                    case 1:
                        _state.sent();
                        return [
                            2
                        ];
                }
            });
        })();
    };
    _proto.create = function create() {
        var _this = this;
        return _asyncToGenerator(function() {
            var repo;
            return __generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            _this.getRepo()
                        ];
                    case 1:
                        repo = _state.sent();
                        return [
                            4,
                            _this.download(repo, undefined)
                        ];
                    case 2:
                        _state.sent();
                        console.log("\r\nSuccessfully created project ".concat(chalk.cyan(_this.name)));
                        console.log("\r\n  cd ".concat(chalk.cyan(_this.name)));
                        console.log("  pnpm install\r\n");
                        return [
                            2
                        ];
                }
            });
        })();
    };
    return Generator;
}();
var create_project = function() {
    var _ref = _asyncToGenerator(function(name, options) {
        var cwd, targetAir, action, generator;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    cwd = process.cwd();
                    targetAir = path.join(cwd, name);
                    if (!fs.existsSync(targetAir)) return [
                        3,
                        6
                    ];
                    if (!options.force) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        fs.remove(targetAir)
                    ];
                case 1:
                    _state.sent();
                    return [
                        3,
                        6
                    ];
                case 2:
                    return [
                        4,
                        inquirer.prompt([
                            {
                                name: "action",
                                type: "list",
                                message: "Target directory already exists Pick an action:",
                                choices: [
                                    {
                                        name: "Overwrite",
                                        value: "overwrite"
                                    },
                                    {
                                        name: "Cancel",
                                        value: false
                                    }
                                ]
                            }
                        ])
                    ];
                case 3:
                    action = _state.sent().action;
                    if (!!action) return [
                        3,
                        4
                    ];
                    return [
                        2
                    ];
                case 4:
                    if (!(action === "overwrite")) return [
                        3,
                        6
                    ];
                    console.log("\r\nRemoving...");
                    return [
                        4,
                        fs.remove(targetAir)
                    ];
                case 5:
                    _state.sent();
                    _state.label = 6;
                case 6:
                    generator = new Generator(name, targetAir);
                    generator.create();
                    return [
                        2
                    ];
            }
        });
    });
    return function create_project(name, options) {
        return _ref.apply(this, arguments);
    };
}();
module.exports = create_project;

#!/usr/bin/env node
var program = require("commander").program;
program.argument("<app-name>").description("create a new project").option("-f, --force", "overwrite target directory if it exist").action(function(name, options) {
    require("./generator")(name, options);
});
program.parse(process.argv);

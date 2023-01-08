"use strict";
const { program  } = require('commander');
program.command('create <app-name>').description('create a new project').option('-f, --force', 'overwrite target directory if it exist').action((name, options)=>{
    require('../src/generator')(name, options);
});
program.parse(process.argv);

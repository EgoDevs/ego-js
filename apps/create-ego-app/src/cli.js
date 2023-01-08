#!/usr/bin/env node

const { program } = require('commander');

// import figlet from 'figlet';
// import chalk from 'chalk';
program
  .command('create <app-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exist') // 是否强制创建，当文件夹已经存在
  .action((name, options) => {
    require('./generator')(name, options);
  });

program.parse(process.argv);

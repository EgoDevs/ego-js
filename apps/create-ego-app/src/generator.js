const { getRepoList, getTagList } = require('./http');
const ora = require('ora');
const inquirer = require('inquirer');
const util = require('util');
const path = require('path');
const downloadGitRepo = require('download-git-repo');
const chalk = require('chalk');
const fs = require('fs-extra');

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();
  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    console.log('Request failed, refetch ...');
  }
}

class Generator {
  constructor(name, targetDir) {
    this.name = name;
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async getRepo() {
    const repoList = await wrapLoading(getRepoList, 'waiting fetch template');
    if (!repoList) return;

    const repos = repoList.map(item => item.name).filter(i => i.endsWith('-template'));

    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project',
    });

    return repo;
  }

  // async getTag(repo) {
  //   const tags = await wrapLoading(getTagList, 'waiting fetch tag', repo);
  //   if (!tags) return;

  //   const tagsList = tags.map(item => item.name);

  //   const { tag } = await inquirer.prompt({
  //     name: 'tag',
  //     type: 'list',
  //     choices: tagsList,
  //     message: 'Place choose a tag to create project',
  //   });

  //   return tag;
  // }

  async download(repo, tag) {
    const requestUrl = `egoDevs/${repo}${tag ? '#' + tag : ''}`;

    await wrapLoading(this.downloadGitRepo, 'waiting download template', requestUrl, path.resolve(process.cwd(), this.targetDir));
  }

  async modify_package() {
    const targetAir = path.join(process.cwd(), this.name);
    const pkgPath = path.join(targetAir, 'package.json');
    const pkg = await fs.readJson(pkgPath);
    pkg.name = this.name;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  async create() {
    const repo = await this.getRepo();

    // const tag = await this.getTag(repo);

    await this.download(repo, undefined);
    await this.modify_package();

    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log('  pnpm install\r\n');
  }
}

const create_project = async (name, options) => {
  const cwd = process.cwd();
  const targetAir = path.join(cwd, name);

  if (fs.existsSync(targetAir)) {
    if (options.force) {
      await fs.remove(targetAir);
    } else {
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite',
            },
            {
              name: 'Cancel',
              value: false,
            },
          ],
        },
      ]);

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        console.log(`\r\nRemoving...`);
        await fs.remove(targetAir);
      }
    }
  }

  const generator = new Generator(name, targetAir);

  generator.create();
};

module.exports = create_project;

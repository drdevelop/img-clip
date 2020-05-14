const path = require('path');
const inquirer = require('inquirer');
const { cloneDeep, cleanPkg, versionIteration } = require('./util');

const root = process.cwd();
const pkgInfo = require(path.join(root, './package.json'));

// should do version change
const envReleaseType = process.env.VERSION_ENV;

async function getReleaseType() {
  if (envReleaseType) return envReleaseType;
  const answers = await inquirer
    .prompt([
      {
        name: 'releaseType',
        /* eslint-disable-next-line */
        message: `what's release type of this publish`,
        type: 'list',
        choices: ['major', 'minor', 'patch', 'other'],
      },
    ]);
  return answers.releaseType;
}

async function getInputVersion() {
  const answers = await inquirer
    .prompt([
      {
        name: 'version',
        /* eslint-disable-next-line */
        message: `what's version of this publish`,
        type: 'input',
        choices: ['major', 'minor', 'patch', 'other'],
      },
    ]);
  return answers.version;
}

async function start() {
  let version;
  const releaseType = await getReleaseType();
  if (releaseType === 'other') {
    version = await getInputVersion();
  }
  const nextVersion = versionIteration(releaseType, version);
  await cleanPkg(cloneDeep(pkgInfo), root, nextVersion);
}

start();

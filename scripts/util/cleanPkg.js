const path = require('path');
const { writeFile } = require('./fs-extra');

const cleanFields = ['devDependencies', 'husky', 'lint-staged'];

async function cleanPkg(pkgInfo, root, nextVersion) {
  console.log('next version', nextVersion);
  pkgInfo.version = nextVersion;
  for (let i = 0; i < cleanFields.length; i++) {
    delete pkgInfo[cleanFields[i]];
  }
  await writeFile(path.join(root, './release/package.json'), JSON.stringify(pkgInfo, null, 2));
}

module.exports = cleanPkg;

const lodash = require('lodash');
const cleanPkg = require('./cleanPkg');
const versionIteration = require('./versionManage');

module.exports = {
  ...lodash,
  cleanPkg,
  versionIteration,
};

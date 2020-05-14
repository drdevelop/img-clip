const fs = require('fs');

function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

module.exports = {
  writeFile,
};

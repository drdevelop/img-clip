const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const version = process.env.npm_package_version;

function writeFile(filePath, file) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, file, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(filePath);
    });
  });
}

class CompressAndNoPlugin {
  constructor(options = { compressAndNo: 'both' }) {
    this.options = options;
  }

  apply(compiler) {
    console.log('begin run plugin');
    const outputPath = compiler.options.output.path;
    compiler.hooks.afterEmit.tapAsync('CompressAndNoPlugin', (compilation, callback) => {
      console.log('compilation done');
      const files = Object.keys(compilation.assets);
      files.map(async (fileName) => {
        /** get file context, do handle */
        const source = compilation.assets[fileName].source();
        const result = UglifyJS.minify(source, {
          compress: {
            drop_console: true,
          },
        });
        const content = result.code;
        const distPath = path.join(outputPath, fileName.replace('.js', '.min.js'));
        await writeFile(distPath, content);

        if (!version) {
          console.error('Please write version field of package.json file');
          return;
        }
        callback();
      });
    });
  }
}

module.exports = CompressAndNoPlugin;

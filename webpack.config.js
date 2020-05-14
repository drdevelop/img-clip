const path = require('path');
const CompressAndNo = require('./webpack-plugin/compressAndNo');

module.exports = {
  mode: 'production',
  entry: {
    imgClip: './index.js',
  },
  output: {
    library: 'ImgClip',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, './lib'),
    }],
  },
  optimization: {
    minimize: false,
  },
  plugins: [new CompressAndNo()],
};

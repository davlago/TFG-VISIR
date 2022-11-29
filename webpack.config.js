const path = require('path');

//npx webpack --config webpack.config.js

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpackIndex.js',
  },
};
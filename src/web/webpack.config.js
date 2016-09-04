const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/js');

const config = {
  entry: [
    './src/client/client',
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: path.join(__dirname, 'node_modules'),
        loaders: ['babel'],
      },
    ],
  },
};

module.exports = config;

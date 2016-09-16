const webpack = require('webpack');
const path = require('path');
const { NODE_ENV, FRONTEND_API_URL: API_URL } = require('./config');

const BUILD_DIR = path.resolve(__dirname, 'public/js');

const config = {
  entry: [
    './src/client/client',
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({ NODE_ENV, API_URL }),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
  ],
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

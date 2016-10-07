const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
  NODE_ENV,
  FRONTEND_API_URL: API_URL,
  AUTH_GITHUB_ID,
} = require('./config');

const IS_DEV_ENV = NODE_ENV.toUpperCase() === 'DEVELOPMENT';
const BUILD_DIR = path.resolve(__dirname, 'public');

const BUNDLER_PLUGINS = [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify({ NODE_ENV, API_URL, AUTH_GITHUB_ID }),
  }),
  new ExtractTextPlugin('/css/bundle.css'),
];

if (!IS_DEV_ENV) {
  BUNDLER_PLUGINS.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }));
}

const config = {
  debug: IS_DEV_ENV,
  devtool: IS_DEV_ENV ? 'eval' : '',
  entry: [
    path.join(__dirname, '/src/client/client'),
  ],
  output: {
    path: BUILD_DIR,
    filename: '/js/bundle.js',
  },
  plugins: BUNDLER_PLUGINS,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: path.join(__dirname, 'node_modules'),
        loaders: ['babel'],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!sass-loader!autoprefixer-loader'),
      },
    ],
  },
};

module.exports = config;

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {
  NODE_ENV, FRONTEND_API_URL as API_URL, AUTH_GITHUB_ID,
} from 'config';

const config = {};
const debug = NODE_ENV.toUpperCase() !== 'PRODUCTION';

config.name = 'client-side';
config.target = 'web';
config.debug = debug;
config.devtool = debug ? 'source-map' : '';

config.entry = {
  client: path.join(__dirname, '/client/client'),
};

config.output = {
  path: path.resolve(__dirname, 'public'),
  filename: '/js/[name].js',
};

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': JSON.stringify({ NODE_ENV, API_URL, AUTH_GITHUB_ID }),
  }),
  new ExtractTextPlugin('/css/bundle.css'),
];

if (!debug) {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  );
}

config.resolve = {
  extensions: ['', '.js', '.jsx'],
  root: [
    path.resolve(process.env.NODE_PATH),
  ],
};

config.module = {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: path.join(__dirname, 'node_modules'),
      loaders: ['babel'],
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin
        .extract('style-loader', 'css-loader!sass-loader!autoprefixer-loader'),
    },
  ],
};

export default config;

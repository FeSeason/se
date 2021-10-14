const HtmlWebpackPlugin = require('html-webpack-plugin');

const { appEntry, appBuild, htmlEntry, alias, publicPath, sourceMap } = require('./config');
const loaderRules = require('./loaders');
const { NODE_ENV } = require('./env');
const { isDev, assetsPath } = require('./utils');


const baseConfig = {
  mode: NODE_ENV.DEV,

  entry: appEntry,

  output: {
    publicPath,
    path: appBuild,
    filename: isDev()
      ? 'js/[name].[contenthash].js'
      : assetsPath('js/[name].[contenthash].js'),
    chunkFilename: isDev()
      ? 'js/[name].js'
      : assetsPath('js/[name]~[contenthash].js'),
    assetModuleFilename: isDev()
      ? 'assets/[hash][ext][query]'
      : assetsPath('assets/[hash][ext][query]'),
  },

  // TODO:
  // cache: {
  //   type: 'filesystem',
  // },

  module: {
    rules: loaderRules,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: htmlEntry,
      filename: 'index.html',
      title: 'Webpack5 React',
    }),
  ],

};

module.exports = baseConfig;
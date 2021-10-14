const webpack = require('webpack');
const { merge } = require('webpack-merge');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const commonConfig = require('./webpack.common');
const { NODE_ENV } = require('./env');
const { devServer, port, host, sourceMap } = require('./config');
const logger = require('./logger');


const config = merge(commonConfig, {
  mode: NODE_ENV.DEV,

  devtool: sourceMap.dev,

  devServer: devServer,

  plugins: [
    new ReactRefreshWebpackPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV.DEV),
    }),

    new friendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: logger.appStarted(port, host),
      },
    }),
  ],

  optimization: {
    usedExports: true,
    // 模块合并
    concatenateModules: true,
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle
      chunks: 'all',
    },
  },

  stats: 'errors-only',
});

module.exports = config;

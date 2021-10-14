const chalk = require('chalk');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonConfig = require('./webpack.common');
const { NODE_ENV } = require('./env');
const { assetsPath } = require('./utils');
const { sourceMap } = require('./config');

module.exports = merge(commonConfig, {
  mode: NODE_ENV.PROD,

  devtool: sourceMap.prod,

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    // externals 会导致 热更新失败问题  https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/335
    // 'react-refresh': 'ReactRefresh',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV.PROD),
    }),
    new CleanWebpackPlugin(),

    new ProgressBarPlugin({
      format:
        `${chalk.green.bold('build[:bar]')} ` +
        chalk.green.bold(':percent') +
        ' (:elapsed seconds)',
      clear: false,
      width: 60,
    }),

    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[contenthash].css'),
      chunkFilename: assetsPath('css/[id].[contenthash].css'),
      ignoreOrder: false,
    }),
  ],

  optimization: {
    // 分析每个运行时使用的出口,省略未使用的 export
    usedExports: true,

    runtimeChunk: {
      // 会为每个入口添加一个只含有 runtime 的额外 chunk
      name: 'runtime',
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),

      new CssMinimizerPlugin({
        parallel: 4,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],

    emitOnErrors: false,

    splitChunks: {
      // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
      chunks: 'all',

      // 模块超过30k自动被抽离成公共模块
      minSize: 30000,

      // 模块被引用>=1次，便分割
      minChunks: 1,

      // 命名分隔符
      automaticNameDelimiter: '~',
      cacheGroups: {
        default: {
          // 模块缓存规则，设置为false，默认缓存组将禁用
          // 模块被引用>=2次，拆分至vendors公共模块
          minChunks: 2,

          // 优先级
          priority: -20,

          // 默认使用已有的模块
          reuseExistingChunk: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          // minChunks: 1,

          // 确定模块打入的优先级
          priority: -10,

          // 使用复用已经存在的模块
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
});

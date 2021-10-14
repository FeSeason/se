/* eslint-disable no-undef */
const path = require('path');
const appRoot = process.cwd();
const resolveAbPath = relativePath => path.resolve(appRoot, relativePath);
const proxy = require('./proxy')

console.log('NODE_ENV', process.env.NODE_ENV);

module.exports = {
  sourceMap: {
    dev: 'cheap-module-source-map',
    prod: 'hidden-source-map',
  },
  // 项目根目录
  appRoot,

  // 源码 src 目录
  appSrc: resolveAbPath('src'),

  // 项目入口
  appEntry: resolveAbPath('src/App.tsx'),

  // 打包输出目录
  appBuild: resolveAbPath('dist'),

  publicPath: '/',

  // 资源子目录
  assetsSubDirectory: 'static',

  // html 模板入口
  htmlEntry: resolveAbPath('public/index.html'),

  devServer: {
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
    noInfo: true,
    quiet: true,
    proxy,
  },

  port: 3000,
  host: 'localhost',

  alias: {
    '@': resolveAbPath('src'),
    // '@components': resolveAbPath('src/components'),
    // '@assets': resolveAbPath('src/assets'),
    // '@pages': resolveAbPath('src/pages'),
    // '@utils': resolveAbPath('src/utils'),
    // '@hooks': resolveAbPath('src/hooks'),
  },
};

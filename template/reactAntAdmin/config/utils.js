const path = require('path');
const { assetsSubDirectory } = require('./config')
const { NODE_ENV } = require('./env')

// 资源子目录
exports.assetsPath = function (_path) {
  return path.posix.join(assetsSubDirectory, _path)
}

// 开发环境判断
exports.isDev = function () {
  return process.env.NODE_ENV === NODE_ENV.DEV
}
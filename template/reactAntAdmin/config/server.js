const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('./webpack.dev');
const { devServer, port, host } = require('./config');
const logger = require('./logger');

const compile = webpack(webpackDevConfig)
const devServerOptions = Object.assign({}, devServer, {});

const server = new webpackDevServer(compile, devServerOptions);

server.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }
});



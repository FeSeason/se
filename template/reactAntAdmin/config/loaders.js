const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssModuleRegex = /\.module\.css$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessModuleRegex = /\.module\.(less)$/;
const imageInlineSizeLimit = 4 * 1024;
const { isDev } = require('./utils');


// TODO: loader opt
module.exports = [
  {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      'ts-loader',
    ],
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    exclude: cssModuleRegex,
    use: [
      isDev() ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      'postcss-loader',
    ],
  },
  {
    test: /\.less$/,
    exclude: lessModuleRegex,
    use: [
      isDev() ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      'postcss-loader',
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
  {
    test: /\.(scss|sass)$/,
    exclude: sassModuleRegex,
    use: [
      isDev() ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      'postcss-loader',
      'sass-loader',
    ],
  },
  {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],

    // webpack 5 图片资源无需使用 url-loader
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: imageInlineSizeLimit, // 4kb
      },
    },
  },
  {
    test: /\.(eot|svg|ttf|woff|woff2?)$/,

    // webpack 5 文件资源无需使用 url-loader
    type: 'asset/resource',
  },
];

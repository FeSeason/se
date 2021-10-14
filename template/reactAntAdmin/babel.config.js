module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // tree shaking
        modules: false,
        targets: { browsers: ['chrome >= 60'] },

        // 按需引入
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',

    // ts-loader 默认支持
    // '@babel/plugin-proposal-nullish-coalescing-operator',
    // '@babel/plugin-proposal-optional-chaining',
  ],
};
/* eslint-disable @typescript-eslint/no-require-imports */
const nodeExternals = require('webpack-node-externals');

/**
 * @file Webpack configuration for NestJS application.
 * @param {import('webpack').Configuration} options
 * @returns {import('webpack').Configuration}
 */
const config = (options) => ({
  ...options,
  output: {
    ...options.output,
    library: {
      type: 'module',
    },
    module: true,
  },
  experiments: {
    ...options.experiments,
    outputModule: true,
  },
  resolve: {
    ...options.resolve,
    extensions: ['.ts', '.js'],
    extensionAlias: {
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
    },
  },
  externals: [
    nodeExternals({
      allowlist: ['@requester/cache', '@requester/store'],
      importType: 'module',
    }),
  ],
});

module.exports = config;

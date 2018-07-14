const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'none',
  target: 'node',
  node: {
    fs: 'empty'
  },
  externals: [nodeExternals()]
};

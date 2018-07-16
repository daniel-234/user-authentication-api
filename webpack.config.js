const nodeExternals = require('webpack-node-externals');

module.exports = ({ mode }) => ({
  mode,
  target: 'node',
  node: {
    fs: 'empty'
  },
  externals: [nodeExternals()],
  output: {
    filename: 'server.js'
  }
});

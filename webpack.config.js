const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

// TODO
// Configure start server plugin

module.exports = ({ mode }) => ({
  mode,
  entry: ['webpack/hot/poll?1000', './src/index'],
  watch: true,
  target: 'node',
  node: {
    fs: 'empty'
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  plugins: [new StartServerPlugin('server.js')],
  output: {
    filename: 'server.js'
  }
});

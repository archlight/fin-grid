const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  }
};
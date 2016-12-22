var path = require('path');

module.exports = {
  entry: {
    example: './example/web/example.js',
    happo: './example/web/happo.js',
  },
  output: {
    path: path.resolve(__dirname, 'example', 'web', 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

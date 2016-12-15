var path = require('path');

module.exports = {
  entry: './example/example.js',
  output: {
    path: path.resolve(__dirname, 'example', 'dist'),
    filename: 'example.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  }
};

var webpack = require('webpack');
var path = require('path');

module.exports = [{
  entry: {
    example: './example/web/example.js',
    happo: './example/web/happo.js',
    pythagoras: './example/web/pythagoras.js',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'example', 'web', 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
}, {
  entry: {
    perf: './example/web/perf.js',
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'example', 'web', 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}];

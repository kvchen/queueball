// const webpack = require('webpack');


module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist/static',
    publicPath: '/static/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          'presets': ['es2015', 'stage-3'],
          'comments': false,
        },
      },
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
    ],
  },
};

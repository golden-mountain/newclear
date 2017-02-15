var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  // context: path.join(__dirname, '../../'),
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    // 'bootstrap-loader',
    'babel-polyfill',
    // 'eventsource-polyfill', // necessary for hot reloading with IE
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new LodashModuleReplacementPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({ filename: 'style.css',  allChunks: true }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production')
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise', // works as expected
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  resolve: {
    extensions: [ '.json', '.js', '.jsx' ],
    modules: [
      'src',
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true
            }
          },
          // {
          //   loader: 'react-hot-loader'// trap: if put this line down to babel-loader, will cause
          // },
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(gif|png|jpg|jpeg|ttf|eot|svg?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(md|html)/,
        loaders: [ "html-loader", "markdown-loader" ]
      }
    ]
  }
};

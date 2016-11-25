var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  // context: path.join(__dirname, '../../'),
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    // 'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
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
    new ExtractTextPlugin({ filename: 'style.css',  allChunks: true })
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
        loaders: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!sass-loader' })
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
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
          }
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
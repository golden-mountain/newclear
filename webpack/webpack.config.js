const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
// const config = require ('../client/configs/app');

const CONTENT_BASE = '../client';
var base = require('./base');

base.entry = {
  js: [
    'babel-polyfill',
    'index'
  ],
  vendor: [
    // 'bootstrap-loader',
    'react', 'react-dom'
  ]
};

base.output = {
  path: path.join(__dirname, '../builds'),
  filename: 'bundle.js',
  publicPath: '/builds/'
};

base.module.loaders =  base.module.loaders.concat([
  {
    test: /\.(html|ejs)$/,
    loader: 'file-loader',
    query: {
      name: '[name].[ext]'
    }
  },
  {
    test: /\.md/,
    loaders: [ 'html-loader', 'markdown-loader' ]
  }

]);

base.plugins = base.plugins.concat([
  // new LayoutModuleReplacementPlugin(/layouts\/(.*)/,  './layouts/' + config.OEM + '/$1', path.resolve(CONTENT_BASE)),
  new CleanPlugin([ 'builds' ], {
    root: path.join(__dirname, '../'),
    verbose: true,
    dry: false
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: false,
    debug: true
    // options: {
    //   postcss: [ autoprefixer ],
    //   // cleaner:  [autoprefixer({ browsers: [] })],
    //   context: path.join(__dirname, 'client')
    // }
  }),

  new ExtractTextPlugin({ filename: 'style.css',  allChunks: true }),
  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false
  //   },
  //   output: {
  //     comments: false
  //   },
  //   sourceMap: false
  // }),

  new HtmlWebpackPlugin({  // Also generate a test.html
    filename: 'index.html',
    title: 'A10 TPS GUI',
    template: 'index.ejs'
  })
]);

// base.devtool = 'source-map';
base.devServer = {
  contentBase: CONTENT_BASE,
  noInfo: true,
  hot: true,
  inline: true,
  proxy: {
    '/axapi/*': {
      target: 'https://' + ( process.env.AXAPI_HOST || '192.168.105.196' ),
      secure: false,
      rewrite: function(req, res) { // eslint-disable-line
        console.log(req, 'this is request');
      }
    }
  }
};

console.log(base);
module.exports = base;

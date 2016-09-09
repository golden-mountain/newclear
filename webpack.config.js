const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './client'),
  entry: {
    js: [
      'index', 'pages/Home'
    ],
    vendor: [
      'bootstrap-loader', 'react', 'react-dom'
    ]
  },
  output: {
    path: 'builds',
    filename: 'bundle.js',
    publicPath: '/builds/'
  },
  module: {
    loaders: [
      {
        test: /\.(html|ejs)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
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
        loader: 'json'
      },
      {
        test: /\.md/,
        loaders: [ "html-loader", "markdown-loader" ]
      },      
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client'),
        loaders: [
          {
            loader: 'babel',
            query: {
              cacheDirectory: true
            }
          },
          {
            loader: 'eslint'
          }
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve('./client'),
      'node_modules'
    ]
  },
  plugins: [
    new CleanPlugin('builds'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   output: {
    //     comments: false
    //   },
    //   sourceMap: false
    // }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new HtmlWebpackPlugin({  // Also generate a test.html
      // filename: 'index.html',
      title: 'A10 TPS GUI',
      template: 'index.ejs'
    }),    
    new ExtractTextPlugin({ filename: 'style.css',  allChunks: true })    
    // new ExtractTextPlugin('style.css', {
    //   allChunks: true
    // })
  ],
  devtool:'eval-source-map',
  devServer: {
    contentBase: './client',
    noInfo: true,
    hot: true,
    inline: true,    
    proxy: {
      '/axapi/*': {
        target: 'https://192.168.105.196',
        secure: false,
        rewrite: function(req, res) {
          console.log(req, 'this is request');
        }
      }
    }, 
  },

  postcss: ['autoprefixer']
};

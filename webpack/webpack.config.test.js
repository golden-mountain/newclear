var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
// var path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CleanPlugin = require('clean-webpack-plugin');
// var config = require ('../client/configs/app');
// var CONTENT_BASE = '../client';

var base = require('./base');

base.target = 'node';
base.externals = [nodeExternals()];

module.exports = base;

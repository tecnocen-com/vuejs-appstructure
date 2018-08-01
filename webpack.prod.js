const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: "assets/js/[name].min.js",
    chunkFilename: "assets/js/[name]/[name].min.js",
    path: path.resolve(__dirname, "build"),
    publicPath: ''
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.min.js"    // Setting vue mode
    }
  },
  plugins: [
    new webpack.DefinePlugin({          // Setting production mode
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
});

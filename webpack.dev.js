const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: "assets/js/[name].bundle.js",
    chunkFilename: "assets/js/[name]/[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: ''
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"    // Setting vue mode
    }
  },
  devServer: {
    contentBase: './build',
    port: 4200
  }
});

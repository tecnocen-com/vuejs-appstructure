const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: "./app/js/index.jsx"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [ 'vue-loader' ]
      },
      {
        test: /\.(js|jsx)$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader?name=assets/image/[name].[ext]' ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'app/image/icon/favicon.png',
      template: "app/index.html"
    })
  ]
};

var path = require("path"),
  webpack = require("webpack"),
  debug = process.env.NODE_ENV !== "production";
module.exports = {
  entry: {
    index: "./client/js/index/index.jsx",
    home: "./client/js/home/home.jsx"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/build/", // always string
    filename: debug ? "[name].bundle.js" : "[name].min.js",
    chunkFilename: debug ? "[name]/[name].bundle.js" : "[name]/[name].min.js"
  },
  resolve: {
    alias: {
      vue: debug ? "vue/dist/vue.js" : "vue/dist/vue.min.js"
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: debug ? [] : [
    new webpack.DefinePlugin({          //Setting Vue on production mode
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: false,
      compress: true
    })
  ]
};
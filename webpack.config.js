var path = require("path"),
  webpack = require("webpack"),
  debug = process.env.NODE_ENV !== "production";
module.exports = {
  entry: {
    login: "./client/js/login.js",
    main: "./client/js/main.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: debug ? "[name].bundle.js" : "[name].min.js",
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
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
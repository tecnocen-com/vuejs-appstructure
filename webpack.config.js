var path = require("path");
var webpack = require("webpack");
var debug = process.env.NODE_ENV !== "production";
module.exports = {
    entry: {
        //login: './client/vue/login.js',
        main: './client/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: debug ? '[name].bundle.js' : '[name].min.js',
    },
    plugins: debug ? [] : [
        new webpack.DefinePlugin({          //Setting Vue on production mode
            'process.env': {
              NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: true
        })
    ]
};
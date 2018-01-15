var autoprefixer = require("autoprefixer");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
var InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
var WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
var getClientEnviroment = require("./env");
var paths = require("./paths");

var publicPath = "/";
var publicUrl = "";
var env = getClientEnvironment(publicUrl);

var config = {
    entry: './index.js',
    output: {
        path: '/',
        filename: 'index.bundle.js',
    },
    devServer: {
        inline: true,
        port: 8080
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, /\.sass?$/],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            // Process JS with Babel.
            {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: "babel",
                query: {
                    cacheDirectory: true
                }
            },
            {
                rules: [{
                    test: [/\.sass$/],
                    include: paths.appSrc,
                    loaders: ["style", "css", "sass"],
                    use: [{
                        loader: "sass-loader" // compiles Sass to CSS
                    }]
                }]
            }
        ]
    }
};
module.exports = config;
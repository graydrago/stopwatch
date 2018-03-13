"use strict";
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",

    output: {
        filename: "bundle.js",
        sourceMapFilename: "bundle.js.map",
        path: path.resolve(__dirname, "build")
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "build"),
        port: 8000,
    },

    devtool: "#source-map",

    plugins: [
        new htmlWebpackPlugin({
            title: "Application",
            filename: "index.html",
        }),
    ]
};

"use strict";
//const webpack = require("webpack");
const path = require("path");
const uglifyJSPlugin = require("uglifyjs-webpack-plugin");
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
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "build"),
        port: 8000,
    },

    devtool: "#source-map",

    plugins: [
        //new uglifyJSPlugin(),
        new htmlWebpackPlugin({
            title: "Application",
            filename: "index.html",
        }),
    ]
};

const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./example/demo/index.html"),
    filename: "./index.html"
});

module.exports = {
    entry: path.join(__dirname, "./example/demo/index.tsx"),
    output: {
        path: path.join(__dirname, "example/demo/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            use: "ts-loader",
            exclude: /node_modules/
        }]
    },
    devtool: 'inline-source-map',
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: [".ts", ".tsx", '.js']
    },
    devServer: {
        port: 3001
    }
};
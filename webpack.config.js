var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./app",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './src'),
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }


        ]
    },

    plugins: [
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'index.html',
            files: {
                "css": [ "styles.css" ],
                "js": [ "assets/bundle.js"]
            }
        })
    ]

};
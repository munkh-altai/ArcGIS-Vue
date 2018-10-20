const webpack = require("webpack");
const path = require("path");
let WebpackNotifierPlugin = require('webpack-notifier')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = env => {
    return {
        entry: [
            "./src/main.js"
        ],
    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: "/",
        filename: "app/main.js",
        chunkFilename: "[id].main.js",
        library: "app/main",
        libraryTarget: "amd"
    },
    devtool: "#inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        compress: true,
        historyApiFallback: true,
        noInfo: true,
        port: 8080,
        host:'127.0.0.1',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },

        resolve: {
            extensions: ['*', '.js', '.jsx', '.vue'],
            alias: {
                'vue$': 'vue/dist/vue.common.js'
            }
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },

                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader',
                            scss: 'vue-style-loader!css-loader!sass-loader'
                        }
                    }
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader']
                },

                {
                    test: /\.scss$/,
                    loaders: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader!sass-loader"
                    })
                },

                {
                    test: /\.(png|jpg|gif|webp)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]?[hash]',
                        publicPath: '/'
                    }
                },

                {
                    test: /\.(woff2?|ttf|eot|svg|otf)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]?[hash]',
                        publicPath: '/'
                    }
                },
            ]
        },

        plugins: [
            new ExtractTextPlugin("css/[name].css"),
            // new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            // new webpack.optimize.UglifyJsPlugin({
            //     sourceMap: true,
            //     compress: {
            //         warnings: false
            //     }
            // }),
            //
            // new webpack.DefinePlugin({
            //     'process.env.NODE_ENV': JSON.stringify('production')
            // })

        ],

        externals: [
            (context, request, callback) => {
                if (
                    /^esri/.test(request)
                ) {
                    return callback(null, "amd " + request);
                }
                callback();
            }
        ]

};
};
if (process.env.NODE_ENV === 'prod') {

}

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// Определим HtmlWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                'vue-style-loader',
                'css-loader'
                ]
            }

        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new VueLoaderPlugin(),

        new CopyWebpackPlugin({
            patterns: [
            {from: './src/static', to: './static'},
            {from: './src/data', to: './data'}
            ]
        })
    ],
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].bundle.js'
    }
}
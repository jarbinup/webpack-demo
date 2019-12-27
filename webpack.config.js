const path = require('path');
const  HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    // devtool: 'source-map',
    devtool: 'eval-source-map',
    // devtool: 'cheap-module-eval-source-map',
    
    plugins: [
        new HtmlwebpackPlugin({
            template: './index.html',
            filename: 'index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}
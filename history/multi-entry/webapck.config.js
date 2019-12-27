const path = require('path');
const  HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // 多入口，需要写成一个对象
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    output: {
        // [name] 表示 home, other
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: './index.html',
            filename: 'home.html',
            // 代码块，要引哪个文件
            chunks: ['home'],
        }),
        new HtmlwebpackPlugin({
            template: './index.html',
            filename: 'other.html',
            chunks: ['other']
        })
    ]
}
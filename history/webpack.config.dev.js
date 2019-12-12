const path = require('path');
// 是一个类 所以首字母大写了
const  HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        port: 3000,
        // 进度条
        progress: true,
        contentBase: './build',
        // 开启压缩
        compress: true,
    },
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        // filename: 'bundle.[hash].js', 每次 build 之后的文件都带hash
        // filename: '[name].js', 原名
        path: path.resolve(__dirname, 'build')
    },
    // 数组放着所有 webpack 插件
    plugins: [
        new HtmlwebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // 哈希是加个被引用的文件的 防止缓存
            hash: true,
            minify: {
                // 删除引号
                removeAttributeQuotes: true,
                // 折叠空行
                collapseWhitespace: true,
            }
        }),
    ]
}
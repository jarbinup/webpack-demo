const path = require('path');
// 是一个类 所以首字母大写了
const  HtmlwebpackPlugin = require('html-webpack-plugin');
// 以 link 的形式引入样式
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserJSPlugin = require('terser-webpack-plugin');
const UglifyjsJSPlugin = require('uglifyjs-webpack-plugin');
// 压缩 CSS
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // optimization: { //  优化项, 在 production 模式下生效
    //     minimizer: [
    //         // new TerserJSPlugin({}), // js
    //         new UglifyjsJSPlugin({
    //             cache: true,
    //         }),
    //         new OptimizeCssAssetsWebpackPlugin({}), // css 
    //     ]
    // },
    mode: 'development',
    // mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        // 生产环境的时候 css、img、html 等静态文件可能会上传到 CDN 上
        // 此时我们希望在引用这些资源的时候可以自动加上域名，这就是 publicPath
        // publicPath: 'http://www.jarbinup.com'

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
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
    ],
    module: {
        rules: [
            {
                // 解析 html 文件中的 loader 
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(png|jpg|jepg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        
                        options: {
                            limit: 100*1024,
                            outputPath: 'img/',
                            // 只给图片加上公共路径的路径
                            // publicPath: 'http://wwww.jarbinup.com/'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
}
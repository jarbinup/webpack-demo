## webapck 基础配置

1. 打包（webpack 支持我们的 js 模块化），支持模块化 可以写一点 common JS 规范的代码（node代码）
```js
// 导出
module.exports = 'yangyp'; 

// 引入
const str = require('./module.js');
```

2. webpack 打包本质上是把相互引用的文件内容加载到对象里面，以 eval 的形式，对象 key 是文件路径，value 里 eval 是文件的内容

3. webpack-dev-server 静态服务，通过配置脚本启用可以在打包输出的目录 build 开启一个服务

4. webpack-dev-server 模式的时候，生成的 index.html 在内存中，看不见。npx webpack 的时候会生成真实的

5. npx webpack-dev-server 如果有 getaddrinfo ENOTFOUND localhost，需要在本地 host 列表为 127.0.0.1 映射 localhost 


## 配置插件 loader

1. loader 把源代码转化，转化出一个`模块`，对应配置中的 module，有很多模块（js,css） 
2. 
```js
module: {
    rules: [
        {
            test: /\.css$/,
            // loader 从右向左执行，从上往下执行
            // use 直接写成字符串表示只使用一个loader，
            // 数组表示多个loader串行执行
            // css-loader 处理 @import等
            // style-loader 把样式写入 header 中的 <style> 中
            // less-loader 把 less 转换成 css
            // 安装 less-loader 的时候也要安装 less，
            // less-loader 调用 less 进行转换
            // sass 的话要安装 node-sass 和 sass-loader 
            // yarn add `` -D 安装开发依赖
            use: ['style-loader', 'css-loader']
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top'
                    }
                },
                'css-loader'
            ]
        }
    ]
}
```

#### mini-css-extract-plugin 
专门抽离 css 插件， 插件都是类, 把 css 文件抽到 link 中
#### autoprefixer 自动添加浏览器前缀
用这个包的前提是需要用个 loader 来处理一下，比如用 loader-less 基于 less 模块处理 .less 文件，loader-sass 基于 node-sass 处理 .sass 文件，这个 loader 叫 postcss-loader

#### optimization webpack 4 中的优化项
## 问题
1. loader 和 plugin 有什么区别
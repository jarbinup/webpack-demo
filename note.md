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

#### babel-loader / @babel/core 转换 js 版本 配置环境的时使用 @babel-preset-env, 还可以使用 @babel-proprosal-plugin 插件来转换提议中的属性，比如 class 装饰器等

babel-polyfill 和 babel-runtime 有啥区别
babel 转换语法，runtime 则是在转换 api 的时候提供工具方法类库。
```js
'foobar'.includes('foo') 
```
实例方法，表示在运行的时候也是需要这个包的，所以要 安装到到依赖， 使用 polyfill 转换（打补丁）

#### expose-loader 暴露模块到全局变量
#### new webpack.ProvidePlugin: {
    jquery: '$' //在每个模块中都注juery
}

已经在文件见中通过 CDN 的方式引入了，但是为了保持一致，我们可能在具体的模块中，不会通过全局暴露的方式使用，而是通过
import $ from 'jquery';

通过 externals 声明模块是外部引入的，并不需要打包
externals: {
    jquery: '$'
}


a. expose-module 暴露模块 window 上
b. providePlugin  给每个模块提供一个包
c. externals 引入不打包的方式



1219-处理图片

图片来源
a. js 中 new Image() 引入
let image = new Image();
image.src = './logo.png'; 此时解析打包的时候，只是个字符串。不会被打包；如果想要有依赖关系，就需要导入进来，有 require 语法，webpack 就认为你是个资源，就被打包进来。可以使用 require，也可以直接使用 ES6 语法 import 
import logo from './logo.png';
logo 是图片的一个哈希地址

b. css background
body {
    background: url("./logo.png")
}
此时背景图片是可以直接被打包的，因为我们使用了 css-loader 会直接解析 url

c. html <img src>
html-withimg-loader 解决 html 中的图片

处理图片的 loader，file-loader -D 
默认会在内部生成一张图片到 build 目录下， 并且返回生成的图片名称


更常见的场景是，当图片文件小于多少 K 的时候，使用 url-loader 把文件直接转换成 base64, 超过则使用 file-loader 文件直出  


1220-配置篇
多应用：
a. entry 配置成多入口文件
b. output 时 filename 用 [name]
c. plugins 时 HtmlWebpackPlugin 配置 chunks

sourceMap
devtool: 'source-map' 会打包生成 index.js.map 会标示当前报错的行和列打包生成的 map 文件大而全


import 在生产环境 默认会移除没用的代码
举例： import 一个对象，代码中只使用了一个方法，此时在生产环境 production 中只会打包使用到的方法，开发模式下 development 这个对象重的方法都会打包出去
tree-shaking 没用到的代码 自动删除掉，只有 import 语法可以。
es6 的语法默认导出 
export default {
    sum,
    minus
}
此时

let calc = require('./index');
calc.sum 会报错
calc.default.sum 正常，导出的对象在默认对象上

es6 会把结果放到 default 模块上，require 语法不支持 tree-sharking, 
scope hosting 作用域提升 webpack 中可以省略简化代码

抽离公共代码 common vendor 
splitChunks 属性 
webpack 4 之前是 commonChunkPlugins

路由懒加载 也是通过 import 的方式，返回一个 promise 

热更新 不是刷新页面 而是只更新页面的部分
刷新页面的叫 强制更新

new webpack.NamedModulesPlugin() 打印更新的模块路径
new webpack.HotModuleRepalcementPlugin() 热更新插件

## 问题
1. loader 和 plugin 有什么区别

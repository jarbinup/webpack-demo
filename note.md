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
# vue-cli3.0 项目优化方案总结

## 一、代码优化

### 路由懒加载

使用路由懒加载时，vue-router 会将整个大的 js 进行切片，对当前路由的资源进行一个按需加载。

1. 普通加载

   ```javascript
   import HelloWorld from "@/components/HelloWorld";
   ```

2. 按需加载

   ```javascript
   const HelloWorld = () => import("@/components/HelloWorld");
   ```

### UI 组件库按需引入

项目中的 UI 组件，如果全局引入的话，会造成打包后的文件体积过大，所以需要避免使用全局的方式引入组件，对于使用频率高的组件进行全局按需引入，使用频率低的组件可在对应的 vue 文件中进行局部按需引入，即使用一次，引用一次。

## 二、配置优化

### 默认配置优化

1. 关闭生成环境的 source map

   ```javascript
   // vue.config.js

   module.exports = {
     productionSourceMap: false,
   };
   ```

2. 移除预加载和优先加载

   ```javascript
   // vue.config.js

   module.exports = {
     chainWebpack: (config) => {
       // 移除 prefetch 插件
       config.plugins.delete("prefetch");
       // 移除 preload 插件
       config.plugins.delete("preload");
     },
   };
   ```

### CDN 加速

1.  定义需要配置的 CDN 加速的文件名称

    ```javascript
    // vue.config.js

    const cdn = {
      // cdn：模块名称(对应引用模块名称)和模块作用域命名（对应window里面挂载的变量名称）
      externals: {
        vue: "Vue",
        vuex: "Vuex",
        "vue-router": "VueRouter",
        axios: "axios",
      },
      // cdn的css链接
      css:[]
      // cdn的js链接
      js: [
        "https://cdn.staticfile.org/vue/2.6.11/vue.min.js",
        "https://cdn.staticfile.org/vuex/3.1.3/vuex.min.js",
        "https://cdn.staticfile.org/vue-router/3.1.3/vue-router.min.js",
        "https://cdn.staticfile.org/axios/0.19.2/axios.min.js",
      ],
    };
    ```

2.  设置 CDN 开关

    ```javascript
    // vue.config.js

    // 是否为生产环境
    const isProduction = process.env.NODE_ENV !== "development";
    // 本地环境是否需要使用cdn
    const devNeedCdn = true;
    ```

3.  配置打包文件

    ```javascript
    // vue.config.js
    module.exports = {
      chainWebpack: (config) => {
        // 往html页面注入cdn
        config.plugin("html").tap((args) => {
          // 生产环境或本地需要cdn时，才注入cdn
          if (isProduction || devNeedCdn) args[0].cdn = cdn;
          return args;
        });
      },
      configureWebpack: (config) => {
        // 用cdn方式引入，构建时需要忽略相关资源
        if (isProduction || devNeedCdn) config.externals = cdn.externals;
      },
    };
    ```

4.  编辑 index.html 文件，在文档中合适的位置注入 CDN

    ```HTML
    <!-- 使用CDN的JS文件 -->
    <% for (var i in htmlWebpackPlugin.options.cdn &&
    htmlWebpackPlugin.options.cdn.js) { %>
      <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
    ```

    > 注意：按上述配置开启 CDN 后，webpack 打包时会忽略相关的挂载资源，文档中无需再次引用，使用挂载在 windows 上的全局变量即可，但是如果使用了编辑器的代码检查，则会产生大量的报错，代码提示也会失效，所以即使开启了 CDN 也不建议删除文档中的引用，尽管这样无法有效的减少打包后的体积，但有利于开发，项目也能有效的使用 CDN 的加速服务。

### 构建时开启 Gzip 压缩

1. 安装插件

   ```
   npm install compression-webpack-plugin --save-dev
   ```

2. 配置打包文件，开启 Gzip 压缩

   ```javascript
   // vue.config.js
   const CompressionWebpackPlugin = require("compression-webpack-plugin");
   module.exports = {
     configureWebpack: (config) => {
       //生产环境下，开启gzip打包
       if (isProduction) {
         config.plugins.push(
           new CompressionWebpackPlugin({
             filename: "[path].gz[query]",
             algorithm: "gzip",
             test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
             threshold: 10240, //10240 对超过10k的数据进行压缩
             minRatio: 0.8,
           })
         );
       }
     },
   };
   ```

3. 配置 nginx 服务
   ```
   gzip_static on;
   ```
   > 注意：当 nginx 未开启 gzip_static 的时候，构建的 gz 文件并没有被运行；gzip_static 是会自动执行 gz 文件的，这样就避免了通过 nginx 进行资源的实时访问压缩，减轻了服务器的压力；nginx 默认没有安装 gzip_static 模块，在 nginx 编译时应该将其编译进去 ./configure --with-http_gzip_static_module

## nginx 开启 Gzip 压缩

gzip属于在线压缩，在资源通过http发送报文给客户端的过程中，进行压缩，可以减少客户端带宽占用，减少文件传输大小。

```
gzip on;
gzip_min_length 10k;
gzip_buffers 4 16k;
gzip_comp_level 4;
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
gzip_disable "MSIE [1-6]\.";
```

>注意：可与gzip_static混用，但在本地构建时得保留源文件，当然，保留源文件的最大原因还是，开启gizp压缩后，若客户端不支持gizp，也不会影响应用正常访问。
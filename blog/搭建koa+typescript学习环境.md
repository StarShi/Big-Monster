# 搭建 node + typescript + koa 环境

1.  新建项目文件
      
     npm init
2.  进入项目，初始 typescript 配置文件

        npm install -save typescript
        tsc init

3)  安装 koa 框架

        npm install -save koa koa-router
        npm install --save-dev nodemon ts-node @types/koa @types/koa-router

> 注意：
>
> 1. nodemon：是热更新插件，监听文件变化，自动启动服务器；
> 2. ts-node：可以直接执行.ts 文件，无需编译
> 3. @types/koa 与@types/koa-router：是 koa koa-router 的 typescript 封装

4.  根目录新建和编辑 nodemon.json，支持 typescript

    ```json
    {
      "restartable": "rs",
      "ignore": [".git", "node_modules/**", "dist", ".cache", "logs"],
      "verbose": true,
      "execMap": {
        "": "node",
        "js": "node --harmony",
        "ts": "ts-node"
      },
      "events": {
        "start": "",
        "crash": "",
        "exit": "",
        "restart": ""
      },
      "ext": "js json ts tsx",
      "watch": ["./**"],
      "env": {
        "NODE_ENV": "development",
        "PORT": "3000"
      },
      "legacy-watch": false
    }
    ```

5.  根目录新建和编辑 app.ts 文件

    ```typescript
    import Koa from "koa";
    const app = new Koa();
    // 对于任何请求，app将调用该异步函数处理请求：
    app.use(async (ctx, next) => {
      await next();
      ctx.response.type = "text/html";
      ctx.response.body = "<h1>Hello, koa222!</h1>";
    });

    // 在端口3000监听:
    app.listen(3000);
    console.log("app started at port 3000...");
    ```

6.  编辑 package.json，配置运行命令

    ```json
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon  app.ts"
    },
    ```

7.  启动服务器，并在浏览器访问 3000 端口

        npm start

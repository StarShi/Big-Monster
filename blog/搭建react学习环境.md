# [初学react时，搭建react学习环境](https://github.com/StarShi/Big-Monster/tree/master/source/react-learn)

## 前期准备
1. 新建项目目录react-learn
2. 初始化npm init 
3. 在react-learn下新建src文件夹，放置源码
4. 在react-learn下新建webpack.config.js,用于webpack配置
5. 在react-learn下新建.babelrc,用于babel配置
6. 得到最终目录结构如下：

![](https://i.imgur.com/AE4GhF3.png)

## 搭建webpack打包环境
### 安装 
1. 安装webpack

        npm i -D webpack webpack-cli 

2. 安装webpack虚拟服务

        npm i -D webpack-dev-server
     
3. 安装动态生成html入口文件插件
    
        npm i -D html-webpack-plugin
        
4. 安装babel，解析ES6语法以及jsx语法

    	npm install -D babel-loader @babel/core 
    	
    	npm install -D @babel/preset-react @babel/preset-env 

        npm install -D @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties
    
    	npm install -S @babel/runtime 
    	
5. 安装react

    	npm install -S react react-dom 
    	
### webpack配置

1. 编辑webpack.config.js配置文件，如下：

    ```javascript
    const path = require("path");
    const webpack = require("webpack");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    
    function resolve(dir) {//转化成绝对路径
        return path.join(__dirname,'..',dir);
    }
    
    const config = {
        mode:'development',
        entry:"./src/main.js",//入口文件
        output:{//出口文件
            path: path.resolve(__dirname, 'dist'),
            filename: '[name]/js/[name].js'
        },
        module:{
            rules:[
                {
                    test:/\.(js|jsx)$/,//配置babel-loader 解析es6和jsx语法
                    use:'babel-loader'
                }
            ]
        },
        devServer:{//在线服务
            // 设置服务器访问的基本目录
            contentBase:path.resolve(__dirname,'dist'), //最好设置成绝对路径
            // 设置服务器的ip地址,可以是localhost
            host:'localhost',
            // 设置端口 不设置默认8080 如果设置了被占用则往后加1  8081
            // port: 8080,
            // 设置自动拉起浏览器
            open:true,
            historyApiFallback:true,//配置信息
            //该属性设置热更新无效
            // hot:true
        },
        devtool:"cheap-module-eval-source-map",//资源映射，用于错误提示
        plugins:[
            new webpack.HotModuleReplacementPlugin(),//调用webpack的热更新插件
            new HtmlWebpackPlugin({
                template: './src/index.html',//模版文件路径
                filename: 'index.html',//打包后的文件名称
            })
        ]
    };
    
    module.exports = config;

    ```
2. 编辑.babelrc文件，如下：
    ```json
    {
        "presets": ["@babel/preset-env", "@babel/preset-react"],
        "plugins": ["@babel/plugin-transform-runtime","@babel/plugin-proposal-class-properties"]
    }
    ```

3. 打开package.json，在script中新增打包命令,如下：

        "dev": "webpack-dev-server --config ./webpack.config.js --color"
        
4. 依次完成以上步骤，react学习环境便大功告成

## 环境测试

1. 编辑index.html文件，如下

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>react</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
    </html>
    ```

2. 编辑main.js文件，如下

    ```javascript
    import React from "react";
    import ReactDom from "react-dom";
    
    const hello = <h1>Hello World!</h1>;
    
    ReactDom.render(hello,document.querySelector("#app"));
    ```
    
3. 打开cmd,进入项目根目录，运行npm run dev，如果在浏览器看到Hello World!,那恭喜你，react学习环境已经搭建成功，可以跟我一起学习react了。





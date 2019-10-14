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
    devtool:"cheap-module-eval-source-map",//资源映射，
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//调用webpack的热更新插件
        new HtmlWebpackPlugin({
            template: './src/index.html',//模版文件路径
            filename: 'index.html',//打包后的文件名称
        })
    ]
};

module.exports = config;
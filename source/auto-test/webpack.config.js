const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");//js压缩
const entry = require('./entry.config.js');
function resolve(src) {
    return path.resolve(__dirname, './',src)
}
const config = {
    mode: 'production',
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/[name][hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,//配置babel-loader 解析es6和jsx语法
                use: ['babel-loader'],
                exclude: resolve('node_modules')
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),//编译时，先删除打包文件，默认删除output的文件夹
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",//提取出的模块名
                    test: /\.js/,
                    chunks: "initial",//表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    minChunks: 2,
                    priority: 0
                },
            }
        },
        // splitChunks: {
        //     chunks: 'all',
        // },
        minimizer: [
            new UglifyJsWebpackPlugin({//压缩js
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
        ]
    },
    // devtool: 'cheap-module-eval-source-map'
    devtool: 'inline-source-map',
    node: {
        console: false,
        global: true,
        domain:true,
        module:true,
        // 更多选项，请查看“其他 Node.js 核心库”
    }
};

module.exports = config;

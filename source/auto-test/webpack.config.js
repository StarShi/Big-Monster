const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
function resolve(src) {
    return path.resolve(__dirname, '../',src)
}
const config = {
    mode: 'production',
    entry: './src/app_1/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,//配置babel-loader 解析es6和jsx语法
                use: 'babel-loader',
                exclude: resolve('node_modules')
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({//编译时，先删除打包文件
            // 打印日志
            verbose: true,
            // 默认移除文件
            dry: false,
            cleanOnceBeforeBuildPatterns: ['./dist/*']
        }),
    ],
    devtool: 'cheap-module-eval-source-map'
};

module.exports = config;

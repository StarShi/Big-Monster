const path = require('path');
const webpackConfig = require('./webpack.config.js');
process.env.CHROME_BIN = require('puppeteer').executablePath();
function resolve(src) {
    return path.resolve(__dirname, './',src)
}
module.exports = function (config) {
    config.set({
        //基础路径，用在files，exclude属性上
        basePath: resolve('dist'),
        // 测试框架
        frameworks: ["mocha","chai"],
        // plugins:["karma-mocha","karma-chai","karma-chrome-launcher","karma-coverage","karma-sourcemap-loader","karma-webpack"],
        // 需要加载到浏览器的文件列表
        files: [
            "*/*.js"
        ],
        // 排除的文件列表
        exclude: [],
        // 在浏览器使用之前处理匹配的文件
        preprocessors: {
            "/dist/*.js": ["webpack",'sourcemap' ,"coverage"]
        },
        reporters: ["progress", "coverage"],
        //使用reporters为"coverage"时报告输出的类型和那目录
        coverageReporter: {
            type: "html",
            dir: "/dist/coverage"
        },
        port: 9876,
        colors: true,
        /**
         * 日志等级.可能的值：
         * config.LOG_DISABLE //不输出信息
         * config.LOG_ERROR    //只输出错误信息
         * config.LOG_WARN //只输出警告信息
         * config.LOG_INFO //输出全部信息
         * config.LOG_DEBUG //输出调试信息
         */
        logLevel: config.LOG_INFO,
        // 启用或禁用自动检测文件变化进行测试
        autoWatch: true,
        //测试启动的浏览器
        browsers: ["ChromeHeadless"],
        //开启或禁用持续集成模式
        singleRun: true,
        //并发级别（启动的浏览器数）
        concurrency: Infinity,
        webpack: webpackConfig,
        nightmareOptions: {
            width: 800,
            height: 600,
            show: false,
        },
    })
    ;
};
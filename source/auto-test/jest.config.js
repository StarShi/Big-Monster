module.exports = {
  verbose: true,//控制台打印测试用例执行信息
  globalSetup: "./utils/setup.js",//全局启动后会执行这个文件代码，然后才运行测试用例
  globalTeardown: "./utils/teardown.js",//全部用例执行结束后,会执行这个文件代码
  testEnvironment: "./utils/puppeteerEnv.js",//测试环境
  moduleFileExtensions:["js"],//模块文件后缀
  roots: ["tests"],//测试根目录
  coverageDirectory:"coverage",//测试覆盖率or测试报告目录
  collectCoverage:true,//是否收集测试覆盖率
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "coverage/html-report",
      "filename": "report.html",
      "expand": true
    }],
  ],//测试报告
};
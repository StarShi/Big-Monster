module.exports = {
  verbose: true,//控制台打印测试用例执行信息
  globalSetup: './utils/setup.js',//全局启动后会执行这个文件代码，然后才运行测试用例
  globalTeardown: './utils/teardown.js',//全部用例执行结束后,会执行这个文件代码
  testEnvironment: './utils/puppeteerEnv.js',//测试环境
  moduleFileExtensions:['js'],//模块文件后缀
  roots: ["tests"],//测试根目录
};
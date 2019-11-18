module.exports = {
  verbose: true,
  globalSetup: './utils/setup.js',//全局启动后会执行这个文件代码，然后才运行测试用例
  globalTeardown: './utils/teardown.js',//全部用例执行结束后,会执行这个文件代码
  testEnvironment: './utils/puppeteerEnv.js',
  moduleFileExtensions:['js'],
  roots: [
    "tests",
  ],
};
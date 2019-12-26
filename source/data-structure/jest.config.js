module.exports = {
  preset: 'ts-jest',
  verbose: true,//控制台打印测试用例执行信息
  testEnvironment: "node",//测试环境
  moduleFileExtensions:["ts","tsx","js","jsx"],//模块文件后缀
  roots: ["tests"],//测试根目录
  coverageDirectory:"./tests/coverage",//测试覆盖率or测试报告目录
  collectCoverage:true,//是否收集测试覆盖率
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "./tests/coverage/html-report",
      "filename": "report.html",
      "expand": true
    }],
  ],//测试报告
};
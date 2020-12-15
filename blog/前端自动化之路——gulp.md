# [前端自动化之路——gulp](https://github.com/StarShi/Big-Monster/tree/master/source/gulp)

## 安装

```
mkdir gulp-learn
cd gulp-learn
npm install -g gulp-cli
npm init
npm install gulp --save-dev
```

## 配置

1. 根目录下新建配置文件 gulpfile.js

   ```javascript
   function defaultTask(cb) {
     cb();
   }
   exports.default = defaultTask;
   ```

2. 配置 package.json 执行脚本

   ```js
   {
     "scripts": {
       "gulpTest": "gulp", // 或者可以使用 gulp -f ./gulpfile.js 指定配置文件的位置
       "gulp": "gulp -f ./build/compiler.js"
     }
   }
   ```

3. 执行命令

   ```json
   npm run gulpTest
   npm run gulp
   ```

   > 官方检测版本的代码 gulp --version，在 windows 上有报错，但不影响 gulp 的使用，如果上述命令顺利执行，则表示 gulp 已经安装成功了

## API 介绍

1. gulp.src()：获取 gulp 任务流要处理的文件
2. gulp.desc()：输出文件
3. gulp.task()：建立 gulp 任务
4. gulp.watch()：监听文件的变化
5. gulp.pipe()：管道，用于连接转换流（Transform streams）或可写流（Writable streams）

### 使用 gulp API

设置任务：处理 src 下文件，输出到 dist 目录中

#### 默认任务

```javascript
// build/compiler.js
const gulp = require("gulp");

// 必须定义default任务，因为package.json 配置的命令，只运行默认任务
gulp.task("default", () => {
  console.log("glup 任务");
  // 读取处理文件src/index.js输出到dist目录
  return gulp.src("../src/index.js").pipe(gulp.dest("../dist"));
});
```

#### 自定义任务

```javascript
const gulp = require("gulp");

gulp.task("default", () => {
  return gulp.src("../src/index.js").pipe(gulp.dest("../dist"));
});

// 自定义任务
gulp.task("compileCss", () => {
  return gulp.src("../src/index.css").pipe(gulp.dest("../dist"));
});
```

指定 gulp 执行的任务

```json
{
  "scripts": {
    "gulp": "gulp -f ./build/compiler.js compileCss default"
  }
}
```

> 注意：
>
> - 因为 gulp 不再支持同步任务．所以任务中必须返回流（stream），否则会报错——Did you forget to signal async completion?

## 第三方插件

1. gulp-htmlmin：html 文件压缩
2. gulp-csso：css 文件压缩
3. gulp-babel：js 语法转化
4. gulp-less：less 语法转化
5. gulp-uglify：压缩混淆 js
6. browsersync：浏览器实时同步
7. gulp-file-include：抽取公共代码，用于模块化开发

### 使用插件

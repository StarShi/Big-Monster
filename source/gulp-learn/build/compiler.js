// 引入 gulp
const gulp = require("gulp");

// 必须输入 default 任务
gulp.task("default", () => {
  console.log("glup 任务");
  // 读取处理文件src/index.js输出到dist目录
  return gulp.src("../src/index.js").pipe(gulp.dest("../dist"));
});

gulp.task("compileCss", () => {
  console.log("glup 任务");
  // 读取处理文件src/index.js输出到dist目录
  return gulp.src("../src/index.css").pipe(gulp.dest("../dist"));
});
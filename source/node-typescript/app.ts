import Koa from "koa";
const app = new Koa();
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa222!</h1>';
});

// 在端口3000监听:
app.listen(3001);
console.log('app started at port 3000...');
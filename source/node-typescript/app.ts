import Koa from "koa";
import routers from "./routers/index";

const app = new Koa();
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
});


app.use(routers.routes()).use(routers.allowedMethods());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
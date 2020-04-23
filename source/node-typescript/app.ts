import Koa from "koa";
import Router from "koa-router";
import index from "./router/index";
import api from "./router/api";

const app = new Koa();
const router = new Router();
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
});


router.use("/index",index.routes());
router.use("/api",api.routes());
app.use(router.routes()).use(router.allowedMethods());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
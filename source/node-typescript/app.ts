import Koa from "koa";
import bodyParser from "koa-bodyparser";
import routers from "./routers/index";
import DB from "./libs/connect_db";
import dbConfig from "./config/db";
// Sequelize orm

const app = new Koa();
const db = new DB(dbConfig);
db.connect();
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
});
// 处理post数据
app.use(bodyParser());
// 注册路由
app.use(routers.routes()).use(routers.allowedMethods());

// 在端口3000监听:
app.listen(3001);
console.log('app started at port 3000...');
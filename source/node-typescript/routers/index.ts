
/* 
  整合所有子路由
*/
import Router from "koa-router";
import Api from "./api/news_api";
const router = new Router();


router.use(Api.routes()).use(Api.allowedMethods());
export default router
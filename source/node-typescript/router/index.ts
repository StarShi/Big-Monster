
import Router from "koa-router";
const router = new Router();

router.get("/",(ctx)=>{
  ctx.body = "XX管理"
})

router.get("/abc",(ctx)=>{
  ctx.body = "abc"
})

export default router
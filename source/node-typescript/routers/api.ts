
import Router from "koa-router";
const router = new Router();

router.get("/news",(ctx)=>{
  ctx.body = "新闻"
})


export default router
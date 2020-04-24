
import Router from "koa-router";
const router = new Router();

router.prefix("/api")
router.get("/news",(ctx)=>{
  ctx.body = "新闻"
})

router.post("/test",(ctx)=>{
  ctx.body = ctx.request.body
})



export default router
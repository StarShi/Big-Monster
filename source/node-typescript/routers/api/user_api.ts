
import Router from "koa-router";
import UserController from "../../controllers/user_controller";
const router = new Router();
const userController = new UserController();

router.prefix("/api/user")
router.get("/add_user",userController.addUser)

router.get("/search_user",userController.searchUser)



export default router
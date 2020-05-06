
import Router from "koa-router";
import UserController from "../../controllers/user_controller";
import RoleController from "../../controllers/role_controller";
const router = new Router();
const userController = new UserController();
const roleController = new RoleController();

router.prefix("/api/user")
router.get("/add_user",userController.addUser)
router.get("/search_user",userController.searchUser)
router.get("/add_role",roleController.addRole)
router.get("/search_role",roleController.searchRole)


export default router
import {Context} from 'koa';
import User from "../models/user_model";
import Role from "../models/role_model";
export default class UserController {
  // 添加用户
  public async addUser(ctx:Context) {
    let user = new User();
    user.name = ctx.request.query.name;
    user.password = ctx.request.query.password;
    user.roles = await Role.findByIds([1],{ select: ["id", "role"] });
    return await user.save()
  }
  // 查询用户
  public async searchUser(ctx:Context){
    ctx.body =  await User.find();
  }
}
 
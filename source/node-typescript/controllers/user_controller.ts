import {Context} from 'koa';
import User from "../models/user_model";
export default class UserController {
  // 添加用户
  public async addUser(ctx:Context) {
    let user = new User();
    user.name = ctx.request.body.name;
    user.password = ctx.request.body.password;
    console.log(ctx.request.body)
    return await user.save()
  }
  // 查询用户
  public async searchUser(){
    return await User.find();
  }
}
 
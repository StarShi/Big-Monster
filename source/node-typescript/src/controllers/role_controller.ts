import {Context} from 'koa';
import Role from "../models/role_model";
export default class RoleController {
  // 添加用户
  public async addRole(ctx:Context) {
    let role = new Role();
    role.role = ctx.request.query.role;
    return await role.save()
  }
  // 查询用户
  public async searchRole(ctx:Context){
    ctx.body =  await Role.find();
  }
}
 
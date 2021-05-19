import { Database } from "../types/config";
const config: Database = {
  database: "my_test", // 数据库
  username: "mysql", // 用户名
  password: "123456", // 口令
  host: "127.0.0.1", // 主机名
  port: 3306, // 端口号
  entities: ["models/*.ts"],
  synchronize: true,
};

export default config;
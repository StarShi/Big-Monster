import path from "path";
import { Database } from "../types/config";

// 开发配置
const devConfig: Database = {
  database: "my_test", // 数据库
  username: "mysql", // 用户名
  password: "sxx123456", // 口令
  host: "47.107.96.127", // 主机名
  port: 3306, // 端口号
  entities: ["src/models/*{.ts,.js}"],
  synchronize: true,
};
// 测试配置
const testConfig: Database = {
  database: "my_test", // 数据库
  username: "mysql", // 用户名
  password: "sxx123456", // 口令
  host: "47.107.96.127", // 主机名
  port: 3306, // 端口号
  entities: [path.join(__dirname,"..","models/*{.ts,.js}")],
  synchronize: true,
};
// 正式配置
const prodConfig: Database = {
  database: "my_test", // 数据库
  username: "mysql", // 用户名
  password: "sxx123456", // 口令
  host: "47.107.96.127", // 主机名
  port: 3306, // 端口号
  entities: [path.join(__dirname,"..","models/*{.ts,.js}")],
  synchronize: true,
};
let config: Database;
if (process.env.NODE_ENV === "production") {
  config = prodConfig;
} else if (process.env.NODE_ENV === "test") {
  config = testConfig;
} else {
  config = devConfig;
}
export default config;

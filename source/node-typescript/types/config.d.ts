export interface Database {
  // ip 地址
  host: string;
  // 数据库名字
  database: string;
  // 数据库用户名
  username: string;
  // 数据库密码
  password: string;
  // 数据库类型
  type?: string;
  // 端口
  port?: number;
  // 模型入口
  entities?: string[];
  // 模型与数据库的表同步更新
  synchronize?: boolean;
}

import { createConnection } from "typeorm";
import { Database } from "../types/config";
/**
 * @description 数据库连接类
 * @author Star Shi
 * @date 2020-04-26
 * @export
 * @class DB
 */
export default class DB {
  private host: string;
  private database: string;
  private username: string;
  private password: string;
  private port?: number;
  private type: any;
  private entities: string[];
  private synchronize: boolean;

  constructor(config: Database) {
    this.host = config.host;
    this.database = config.database;
    this.username = config.username;
    this.password = config.password;
    this.type = config.type || "mysql";
    this.port = config.port || 3306;
    this.entities = config.entities;
    this.synchronize = config.synchronize === true ? true : false;
    this.connect();
  }

  /**
   * @description 进行连接
   * @author Star Shi
   * @date 2020-05-07
   */
  public async connect() {
    try {
      await createConnection({
        host: this.host,
        type: this.type,
        port: this.port,
        database: this.database,
        username: this.username,
        password: this.password,
        entities: this.entities,
        synchronize: this.synchronize,
        extra: {
          connectionLimit: 10, // 连接池最大连接数量, 查阅资料 建议是  core number  * 2 + n
        },
      });
    } catch (error) {
      //连接出错
      console.log(error);
    }
  }
}

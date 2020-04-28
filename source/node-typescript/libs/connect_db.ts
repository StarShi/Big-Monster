import { Sequelize } from "sequelize-typescript";
import { Database } from "../types/config";
import utils  from "./utils";
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
  constructor(config: Database) {
    this.host = config.host;
    this.database = config.database;
    this.username = config.username;
    this.password = config.password;
    this.type = config.type || "mysql";
    this.port = config.port || 3306;
  }

  /**
   * @description 连接数据库
   * @author Star Shi
   * @date 2020-04-26
   * @returns {Sequelize}
   */
  public connect(): Sequelize {
    const sequelize = new Sequelize({
      database: this.database,
      username: this.username,
      password: this.password,
      host: this.host,
      dialect: this.type,
      port: this.port,
      pool: {
        max: 10,
        min: 0,
        idle: 30000,
      },
    });
    // 添加model
    sequelize.addModels([utils.resolve("models")]);
    console.log(utils.resolve("models"))
    // 监听连接情况
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err: any) => {
        console.error("Unable to connect to the database:", err);
      });
    return sequelize;
  }
}

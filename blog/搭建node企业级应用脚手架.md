# [搭建 node 企业级应用脚手架](https://github.com/StarShi/Big-Monster/tree/master/source/node-typescript)

## typescript + koa + typeorm + (mysql)

### 前期准备

1.  新建项目文件

        npm init

2.  进入项目，初始 typescript 配置文件

        npm install -save typescript
        tsc init

3.  安装项目依赖

        npm install -g nodemon pm2
        npm install -save koa koa-router koa-bodyparser mysql2 typeorm
        npm install --save-dev nodemon pm2 ts-node @types/koa @types/koa-router @types/koa-bodyparser

4.  新建文件目录

    ![](https://starshi.github.io/my-images/blog/node+koa%E6%96%87%E4%BB%B6%E7%9B%AE%E5%BD%95.png)


### 依赖介绍

#### 中间件

1. [koa-router](https://github.com/ZijianHe/koa-router)：用来处理 koa 框架中的路由
2. [koa-bodyparser](https://github.com/koajs/bodyparser)：用来处理 koa 框架中请求的 body 传参

#### ORM(Object-Relationl Mapping)

1. [typeorm](https://github.com/typeorm/typeorm)：在关系型数据库和对象之间做一个映射，无需关心底层的数据库和 SQL 语句，直接用对象就可以进行数据库的读写
2. [mysql2](https://github.com/sidorares/node-mysql2)：数据库插件

#### 项目启动插件

1. [cross-env](https://github.com/kentcdodds/cross-env)：跨平台运行设置和使用环境变量的脚本，主要时用以区分本地开发环境 development、在线测试环境 test、生产环境 production，然后根据不同的环境进行个性配置
2. [nodemon](https://github.com/remy/nodemon)：热更新插件，可监听文件变化，自动启动服务，启动时占用控制台，只适用于本地开发
3. [pm2](https://github.com/remy/nodemon)：进程管理工具，可以用来简化应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，启动时后台运行，适用于线上部署

### 编辑配置文件

1. tsconfig.json 配置

   ```json
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "outDir": "dist", //生产环境输出目录
       "strict": true,
       "esModuleInterop": true,
       "experimentalDecorators": true,
       "emitDecoratorMetadata": true,
       "forceConsistentCasingInFileNames": true
     },
     "include": ["src/*"],
     "exclude": ["node_modules"]
   }
   ```

2. nodemon.json 配置
   ```json
   {
     "restartable": "rs",
     "ignore": [".git", "node_modules/**", "dist", ".cache", "logs"],
     "verbose": true,
     "execMap": {
       "": "node",
       "js": "node --harmony",
       "ts": "ts-node"
     },
     "events": {
       "start": "",
       "crash": "",
       "exit": "",
       "restart": ""
     },
     "ext": "js json ts tsx",
     "watch": ["./**"],
     "legacy-watch": false
   }
   ```
3. pm2config.json 配置

   ```json
   {
     "apps": [
       {
         "name": "node-typescript",
         "script": "./dist/app.js",
         "cwd": "./",
         "env": {
           "NODE_ENV": "development" //开发环境
         },
         "env_production": {
           "NODE_ENV": "production" //生产环境
         },
         "env_test": {
           "NODE_ENV": "test" //测试环境
         },
         "watch": true,
         "ignore_watch": ["node_modules", "logs"],
         "instances": 1,
         "error_file": "logs/err.log",
         "out_file": "logs/out.log",
         "log_date_format": "YYYY-MM-DD HH:mm:ss"
       }
     ]
   }
   ```

   > 注意：script 配置启动服务的脚本目录必须与编译输出目录一致，error_file 和 out_file 的日志文件目录可自定义位置

4. package.json 配置
   ```json
   {
     "scripts": {
       "build": "tsc",
       "start": "cross-env NODE_ENV=development nodemon  ./src/app.ts",
       "pm2": "npm run build && pm2 start pm2config.json --env production",
       "pm2test": "npm run build && pm2 start pm2config.json --env test"
     }
   }
   ```
   > 注意: 生产环境中需要先进行编译，启动时需要配置相关环境变量与 pm2config.json 中的 env 进行匹配，如果在生产环境中不进行编译的话，node 应用的效率会慢很多。

### 构建 MVC

1.  创建应用配置，目前只包括数据库的配置
    ```typescript
    // src/types/config.ts
    export interface Database {
      // ip 地址
      host: string;
      // 数据库名字
      database: string;
      // 数据库用户名
      username: string;
      // 数据库密码
      password: string;
      // 模型入口
      entities: string[];
      // 数据库类型
      type?: string;
      // 端口
      port?: number;
      // 模型与数据库的表同步更新
      synchronize?: boolean;
    }
    ```
    ```typescript
    // src/config/db.ts
    import path from "path";
    import { Database } from "../types/config"; // 定义的配置接口
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
      entities: [path.join(__dirname, "..", "models/*{.ts,.js}")],
      synchronize: true,
    };
    // 正式配置
    const prodConfig: Database = {
      database: "my_test", // 数据库
      username: "mysql", // 用户名
      password: "sxx123456", // 口令
      host: "47.107.96.127", // 主机名
      port: 3306, // 端口号
      entities: [path.join(__dirname, "..", "models/*{.ts,.js}")],
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
    ```
    > 注意：生产环境中 entities 配置的路径必须是完整路径，不然 pm2 启动时无法找到对应的模型
2.  编写数据库连接类，使用 typeorm 连接数据库

    ```typescript
    // src/libs/connect_db.ts
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
    ```

    > 注意：想要连接数据库，你得先有库，本项目用的 mysql，也可以选择其他的，不过要自己下插件

3.  创建应用服务文件

    ```typescript
    // src/app.ts
    import Koa from "koa";
    import bodyParser from "koa-bodyparser";
    import routers from "./routers/index";
    import DB from "./libs/connect_db";
    import dbConfig from "./config/db";
    import "reflect-metadata";

    const app = new Koa();
    const db = new DB(dbConfig);

    // 对于任何请求，app将调用该异步函数处理请求：
    app.use(async (ctx, next) => {
      await next();
    });
    // 处理post数据
    app.use(bodyParser());
    // 注册路由
    app.use(routers.routes()).use(routers.allowedMethods());

    // 在端口3000监听:
    app.listen(3000);
    ```

    > 注意：这里只是最简单的服务应用，你可以选择其他中间件或自己编写中间件，完善更多的功能，比如统一的请求处理中间件、响应中间件、日志文件、异常错误处理等

4.  在 models 中建立模型
   
    ![](https://starshi.github.io/my-images/blog/model.png)

    ```typescript
    // src/models/user_model.ts
    // 用户模型
    import {
      Entity,
      Column,
      PrimaryGeneratedColumn,
      CreateDateColumn,
      UpdateDateColumn,
      ManyToMany,
      BaseEntity,
      JoinTable,
    } from "typeorm";
    import Role from "./role_model";

    @Entity("user_table") // 对应数据库中表的名字，Entity会自动将模型同步到数据库的表中
    export default class User extends BaseEntity {
      @PrimaryGeneratedColumn()
      public id!: number;

      @Column()
      public name!: string;

      @Column()
      public password!: string;

      @Column({
        type: "json",
        nullable: true, //字段可以为空
      })
      @ManyToMany(() => Role, (role) => role.users) // 多对多
      @JoinTable()
      public roles!: Role[];

      @Column({
        default: true, // 给预设值
      })
      public is_active!: boolean;

      @CreateDateColumn()
      public create_time!: Date;

      @UpdateDateColumn()
      public updete_time!: Date;
    }
    ```

    ```typescript
    // src/models/user_model.ts
    // 角色模型
    import {
      Entity,
      Column,
      PrimaryGeneratedColumn,
      CreateDateColumn,
      UpdateDateColumn,
      BaseEntity,
      ManyToMany,
    } from "typeorm";

    import User from "./user_model";

    @Entity("role_table")
    export default class Role extends BaseEntity {
      @PrimaryGeneratedColumn()
      public id!: number;

      @Column()
      public role!: string;

      @Column({
        type: "json",
        nullable: true, //字段可以为空
      })
      @ManyToMany(() => User, (user) => user.roles) // 多对多
      public users!: User[];

      @CreateDateColumn({ type: "datetime" })
      public create_time!: Date;

      @UpdateDateColumn({ type: "datetime" })
      public updete_time!: Date;
    }
```

1.  在 controllers 中创建控制器，处理模型逻辑

    ```typescript
    // src/controllers/user_controllers.ts
    import { Context } from "koa";
    import User from "../models/user_model";
    import Role from "../models/role_model";

    export default class UserController {
      // 添加用户
      public async addUser(ctx: Context) {
        let user = new User();
        user.name = ctx.request.query.name;
        user.password = ctx.request.query.password;
        user.roles = await Role.findByIds([1], { select: ["id", "role"] });
        return await user.save();
      }
      // 查询用户
      public async searchUser(ctx: Context) {
        ctx.body = await User.find();
      }
    }
    ```

6. 编写路由，绑定控制器中的处理函数，实现简单的 api 接口

   ```typescript
   import Router from "koa-router";
   import UserController from "../../controllers/user_controller";
   import RoleController from "../../controllers/role_controller";

   const router = new Router();
   const userController = new UserController();
   const roleController = new RoleController();

   router.prefix("/api/user"); // 路由前缀
   router.get("/add_user", userController.addUser); // 注册接口
   router.get("/search_user", userController.searchUser);
   router.get("/add_role", roleController.addRole);
   router.get("/search_role", roleController.searchRole);
   export default router;
   ```

   > 注意：以上为了方便在浏览器中直接测试，没有遵循 restful 规范，真实项目中应按照团队要求，编写接口；同时，这里也没有使用其他中间件来实现自动注册接口路由，如有需要，可自行添加；我认为如果直接在控制器中，利用装饰器来注册路由，虽然省去了编写路由文件的步骤，但后期维护起来较为麻烦

7. 视图文件
   
   为了方便前端项目环境的搭建以及开发，在此将 views 放在根目录下，可根据具体的项目需要来进行配置，如果是前后端分离的单页面应用，则此文件可不要，如果是多页面应用，则需配置静态文件目录，并将打包后的 html 页面放置在 views 下，并配置相应的路由，如果是 SSR 项目，则可直接用 SSR 框架。

### 结语

至此，typescript + koa + typeorm + mysql的开发环境的搭建算是初步完成，在后续的使用过程中，还会对该脚手架进行完善和补充，如果你有好的建议，欢迎联系~

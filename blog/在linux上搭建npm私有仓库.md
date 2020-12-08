# 在 linux 上搭建 npm 私有仓库

cnpm 是企业内部搭建 npm 镜像和私有 npm 仓库的开源方案。

## 前期准备

1. 安装 node
2. 安装 mysql
3. 安装 git
4. 安装 nginx（用于代理仓库服务，可选）

## 部署安装

### cnpmjs 安装

1. 获取 cnpmjs 源代码

   ```
   cd /usr/local
   mkdir cnpm
   git clone git://github.com/cnpm/cnpmjs.org.git
   ```

2. 登录 mysql 后，创建 mysql 库

   ```
   mysql -uroot -p

   // 创建数据库
   CREATE DATABASE cnpmjs DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci

   // 授权给mysql用户
   grant all privileges on cnpmjs.* to 'mysql'@'%' identified by '123456'

   // 使配置生效
   flush privileges
   ```

3. 导入数据库文件

   ```
   use cnpmjs
   // 源码拉取的位置
   source /usr/local/cnpm/cnpmjs.org/docs/db.sql
   ```

### cnpmjs 配置

1. 修改 cnpmjs.org/config/index.js 配置如下：

   ```javascript
   var config = {
     registryPort: 7001, // 仓库端口
     webPort: 7002, // web 网页端口
     admins: {
       // 名字: 邮箱，在发布是使用
       admin: "shixin007@foxmail.com",
     },
     // 数据库配置
     database: {
       db: "pingthe_cnpmjs",
       username: "mysql",
       password: "sxx123456",
       // 支持 'mysql', 'sqlite', 'postgres', 'mariadb'
       dialect: "mysql",
       storage: path.join(dataDir, "data.mysql"),
     },
     // 配置 nginx 代理指向的域名
     // 也可以是ip 地址，但需要开放7001、 7002的端口
     registryHost: "cnpm.test.com",
     // 设置 true 之后，只有配置的管理员可以发布 package
     enablePrivate: true,
     // none - 永远不同步 cnpm 和 npm 上的 package
     syncModel: "none",
     // 必须设置，否则会报错，无法拉取上传的 package
     enableAbbreviatedMetadata: true,
     // 设置包前缀
     scopes: ["@cnpm", "@cnpmtest", "@cnpm-test"],
   };
   ```

2. 设置 nginx 代理，无需暴露 7001，7002 端口（可选）
   ```
   server{
     listen 80;
     server_name cnpm.test.com;
     location /{
     proxy_pass http://127.0.0.1:7001;
           proxy_redirect off;
     }
   }
   ```

### 启动 cnpmjs

1. 初始化

   ```
   npm install
   ```

2. 启动

   ```
   npm run start
   ```

3. 停止

   ```
   npm run stop
   ```

4. 查看启动状态

   ```
   npm run stuts
   ```

## 本地使用

### 发布

1. 新建包项目 demo

   ```
   cd demo
   npm init
   ```

2. 新建 index.js

   ```javascript
   function sum(a, b) {
     return a + b;
   }
   export default sum;
   ```

3. 发布

   ```
   npm install -g cnpm

   // 设置指向私有仓库
   cnpm set registry http://cnpm.test.com

   // 注册，输入服务器上设置的账号和邮箱，密码自定义
   cnpm adduser

   // 登录
   cnpm login

   // 登录成功之后，即可在项目中使用发布命令
   cnpm publish
   ```

4. 删除发布

   ```
   cnpm unpublish demo
   ```

   > 注意：如果不嫌弃换源麻烦的话，这里可以直接使用 npm 代替 cnpm ;

### 获取私有仓库的包

1.  cnpm 获取

    ```
    cnpm install demo
    ```

2.  npm 获取
    ```
    cnpm install demo --registry http://cnpm.test.com
    ```

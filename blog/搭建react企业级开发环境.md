# 搭建 react 企业级开发环境

## 环境介绍

1. 框架 react + typescript
2. 状态管理 redux + react-redux + redux-thunk + redux-logger
3. 路由 react-router-dom
4. UI 框架 ant-design
5. 请求 axios

## 前期准备

1. 安装 create-react-app

   ```
   npx create-react-app antd-admin-typescript --typescript
   ```

2. 安装 ant-design

   ```
   yarn add antd -S
   ```

3. 安装 @craco/craco 、craco-less，对 antd 进行高级配置

   ```
   yarn add @craco/craco craco-less -D
   ```

4. 安装 env-cmd ，配置不同的环境

   ```
   yarn add env-cmd -D
   ```

5. 安装 redux 、react-redux 、redux-thunk 、 redux-logger
   ```
   yarn add redux react-redux redux-thunk redux-logger @types/react-redux @types/redux-thunk  @types/redux-logger -S
   ```

## 搭建

### 创建项目

```
npx create-react-app antd-admin-typescript --typescript
```

### 引入组件库

#### 创建 craco.config.js

项目根目录创建一个 craco.config.js 用于修改默认配置。

```javascript
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

#### 修改 package.json 中的启动命令

```json
"scripts": {
   "start": "craco start",
   "build": "craco build",
   "test": "craco test",
}
```

### 开发、生产环境配置

#### 创建 .env-cmdrc

项目根目录创建一个 .env-cmdrc 文件用于配置不同的打包环境

```json
{
  "development": {
    "NODE_ENV": "development",
    "PORT": 8080,
    "REACT_APP_API_URL": "development_url"
  },
  "production": {
    "NODE_ENV": "production",
    "REACT_APP_API_URL": "production_url"
  }
}
```

> 注意：自定义变量需要加上 REACT*APP*前缀，才可通过 process.env 读取。

#### 修改 package.json 中的启动命令

```json
"scripts": {
    "start": "env-cmd -e development craco start",
    "build": "env-cmd -e production craco build",
    "test": "env-cmd -e development craco test",
    "eject": "react-scripts eject"
}
```

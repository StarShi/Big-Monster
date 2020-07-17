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

6. 安装 axios
   
   ```
   yarn add axios
   ```

7. 安装 react-router-dom

   ```
   yarn add react-router-dom @types/react-router-dom react-router-config  @types/react-router-config
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

### 状态管理

#### 创建目录

actions：集中管理 action 操作动作

constants：集中管理 action 常量命名

reducers：集中管理 reducer 函数

![](https://starshi.github.io/my-images/blog/react_project.png)

#### 合并不同模块的 reducers

```typescript
// redux/reducer.ts
import { combineReducers } from "redux";
import thunkReducer from "./reducers";

const rootReducer = combineReducers({
  ...thunkReducer,
});

export default rootReducer;
```

#### 编辑 redux/index.ts

```typescript
// redux/index.ts
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducer";

// 增强调试
const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk, logger))
);

export default store;
```

#### 示例

创建一个 common 模块的状态管理，具体步骤如下：

1. 在 constants/index.ts 中创建操作常量

   ```typescript
   // constants/index.ts
   export const SET_USER_INFO = "setUserInfo"; // 设置用户信息
   ```

2. 在 actions/common.ts 中定义对应的操作

   ```typescript
   // actions/common.ts
   import { Dispatch } from "redux";
   import { SET_USER_INFO } from "../constants";

   export const setUserInfo = (userInfo: any) => ({
     type: SET_USER_INFO,
     payload: userInfo,
   });

   export const setUserInfoAsync = (userInfo: any) => {
     return (dispatch: Dispatch) => {
       setTimeout(() => {
         dispatch(setUserInfo(userInfo));
       }, 2000);
     };
   };
   ```

3. 在 reducers/common.ts 中根据对应的操作，修改 state 中数据的状态

   ```typescript
   // actions/common.ts
   import { AnyAction } from "redux";
   import { SET_USER_INFO } from "../constants";

   const initState = {
     userInfo: {},
   };
   export default function (state: object = initState, action: AnyAction) {
     switch (action.type) {
       case SET_USER_INFO:
         return Object.assign({}, state, {
           userInfo: action.payload,
         });

       default:
         return state;
     }
   }
   ```

4. 在函数组件中使用

   ```typescript
   import React from "react";
   import { Button } from "antd";
   import "./App.less";
   import { useSelector, useDispatch } from "react-redux";
   import { setUserInfo, setUserInfoAsync } from "./redux/actions/common";

   function App() {
     // 获取 dispatch
     const dispatch = useDispatch();
     // 获取 state 中公共模块定义的数据
     // IState 需要在 interface/redux.d.ts 中进行声明
     // 如果新增模块需在声明中进行添加，否则类型推导会报错
     const { userInfo } = useSelector((state: IState) => state.commonReducer);
     // 同步状态管理
     const handleUserInfo = () => {
       let userInfo: any = {
         name: "同步",
         age: 18,
       };
       dispatch(setUserInfo(userInfo));
     };
     // 异步状态管理
     const handleUserInfoAsync = () => {
       let userInfo: any = {
         name: "异步",
         age: 81,
       };
       dispatch(setUserInfoAsync(userInfo));
     };
     return (
       <div>
         <Button type="primary" onClick={handleUserInfo}>
           展示数据
         </Button>
         <Button type="primary" onClick={handleUserInfoAsync}>
           异步展示数据
         </Button>
         <p>姓名:{userInfo.name}</p>
         <p>年龄:{userInfo.age}</p>
       </div>
     );
   }

   export default App;
   ```

### 封装请求

### 路由


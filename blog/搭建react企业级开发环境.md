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

#### 编辑 redux/index.ts ,创建状态管理仓库

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

#### 全局绑定状态管理仓库

```tsx
// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux";

// 使用 Provider 绑定 store 状态管理仓库
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
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

基于 axios 实现请求类的封装，通过类来实现主要是考虑项目中可能存在需要从多个域名获取数据的情况。不同的域名，构造不同的请求实例即可。

```typescript
// request/http.ts

import Axios, {
  AxiosStatic,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { message } from "antd";
import config from "../config";
import { SuccessResponse } from "../interface/axios";
import store from "../redux";

export class Http {
  // 请求对象
  private axios: AxiosStatic = Axios;

  constructor(url?: string) {
    const { axios } = this;
    // 超时时间
    axios.defaults.timeout = 10000;

    // 请求连接
    axios.defaults.baseURL = url || config.apiUrl;

    // post请求头
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded;charset=UTF-8";

    // 执行请求拦截器
    this.useInterceptRequest();

    // 执行响应拦截器
    this.useInterceptResponse();
  }

  // 请求拦截器
  private useInterceptRequest() {
    this.axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = store.getState().commonReducer.token;
        token && (config.headers["ACCESS-TOKEN"] = token);
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
  // 响应拦截器
  private useInterceptResponse() {
    this.axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = "请求错误(400)";
              break;
            case 401:
              error.message = "未授权，请重新登录(401)";
              break;
            case 403:
              error.message = "拒绝访问(403)";
              break;
            case 404:
              error.message = "请求出错(404)";
              break;
            case 408:
              error.message = "请求超时(408)";
              break;
            case 429:
              error.message = "服务器繁忙，请稍后再试(429)";
              break;
            case 500:
              error.message = "服务器错误(500)";
              break;
            case 501:
              error.message = "服务未实现(501)";
              break;
            case 502:
              error.message = "网络错误(502)";
              break;
            case 503:
              error.message = "服务不可用(503)";
              break;
            case 504:
              error.message = "网络超时(504)";
              break;
            case 505:
              error.message = "HTTP版本不受支持(505)";
              break;
            default:
              error.message = `连接出错(${error.response.status})!`;
          }
        } else {
          error.message = "连接服务器失败!";
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description 封装请求函数
   * @param {string} method 请求类型
   * @param {string} url 请求地址
   * @param {*} [option] 请求参数
   * @param {AxiosRequestConfig} [selfConfig={}]
   * @return 返回pro
   */
  private fetchData(
    method: string,
    url: string,
    option?: any,
    selfConfig: AxiosRequestConfig = {}
  ) {
    let httpDefault = {
      method: method,
      url: url,
      params: method === "GET" || method === "DELETE" ? option : null,
      data: method === "POST" || method === "PUT" ? option : null,
    };
    let requestConfig = Object.assign(httpDefault, selfConfig);
    return new Promise<SuccessResponse>((resolve, reject) => {
      this.axios(requestConfig)
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          message.error(error.message);
        });
    });
  }

  /**
   * @description get 请求
   * @param {string} url 请求地址
   * @param {*} option 请求参数
   * @return Promise<SuccessResponse> 返回Promise对象，携带后台返回的数据
   */
  public get(url: string, option: any = {}) {
    return this.fetchData("GET", url, option);
  }

  /**
   * @description post 请求
   * @param {string} url 请求地址
   * @param {*} option 请求参数
   * @return Promise<SuccessResponse> 返回Promise对象，携带后台返回的数据
   */
  public post(url: string, option: any = {}) {
    return this.fetchData("POST", url, option);
  }

  /**
   * @description put 请求
   * @param {string} url 请求地址
   * @param {*} option 请求参数
   * @return Promise<SuccessResponse> 返回Promise对象，携带后台返回的数据
   */
  public put(url: string, option: any = {}) {
    return this.fetchData("PUT", url, option);
  }

  /**
   * @description delete 请求
   * @param {string} url 请求地址
   * @param {*} option 请求参数
   * @return Promise<SuccessResponse> 返回Promise对象，携带后台返回的数据
   */
  public del(url: string, option: any = {}) {
    return this.fetchData("DELETE", url, option);
  }

  /**
   * @description post 请求 上传文件
   * @param {string} url 请求地址
   * @param {*} option 请求参数
   * @return Promise<SuccessResponse> 返回Promise对象，携带后台返回的数据
   */
  public upload(url: string, option: any = {}) {
    let selfConfig: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    let formData: FormData = new FormData();
    let keys: string[] = Object.keys(option);
    for (let key of keys) {
      formData.append(key, option[key]);
    }
    return this.fetchData("POST", url, formData, selfConfig);
  }
}
```

### 路由

#### 创建路由配置文件

利用 react-router-config 提供的路由配置类型，进行路由配置

```typescript
// router/index.ts
import { RouteConfig } from "react-router-config";
import RouteWithSubRouters from "./RouteWithSubRouters";
import Article from "../views/blog/article/Article";
import ArticleTab from "../views/blog/article_tab/ArticleTab";

// 包含了一级路由和子路由
const routes: RouteConfig[] = [
  {
    path: "/",
    name: "首页",
    exact: true,
    component: require("../views/home/Home").default,
  },
  {
    path: "/login",
    name: "登录",
    exact: true,
    component: require("../views/login/Login").default,
  },
  {
    path: "/blog",
    name: "博客管理",
    component: RouteWithSubRouters,
    routes: [
      {
        path: "/article",
        name: "文章管理",
        exact: true,
        component: Article,
      },
      {
        path: "/article_tab",
        name: "标签管理",
        exact: true,
        component: ArticleTab,
      },
    ],
  },
];

export default routes;
```

#### 实现处理嵌套路由的组件 RouteWithSubRouters

利用 react-router-config 提供的 RouteConfigComponentProps 类型，读取当前匹配路由的子路由列表也即是路由配置中的 routes，遍历子路由列表，实现对路由地址的拼接，根据相应的路由配置返回具体的路由导航。

```tsx
// router/RouteWithSubRouters.tsx
import React from "react";
import { Switch, Route } from "react-router-dom";
import { RouteConfigComponentProps, RouteConfig } from "react-router-config";

// 处理子路由的组件 返回具体的路由导航
const RouteWithSubRouters = (props: RouteConfigComponentProps) => {
  const { route, match } = props;
  if (route) {
    if (route.routes) {
      return (
        <Switch>
          {route.routes.map((childRoute: RouteConfig, childIndex: number) => {
            return (
              <Route
                key={childRoute.key || childIndex}
                path={`${match.path}${childRoute.path || ""}`}
                exact={childRoute.exact}
                strict={childRoute.strict}
                render={(props: RouteConfigComponentProps) => {
                  if (childRoute.render) {
                    return childRoute.render({
                      ...props,
                      route: childRoute.routes,
                    });
                  }
                  if (childRoute.component) {
                    return (
                      <childRoute.component
                        {...props}
                        route={childRoute.routes}
                      ></childRoute.component>
                    );
                  }
                  return null;
                }}
              ></Route>
            );
          })}
        </Switch>
      );
    }
  }
  return null;
};

export default RouteWithSubRouters;
```

#### 注册使用

```tsx
// app.tsx
import React from "react";
import "./App.less";
import { BrowserRouter } from "react-router-dom";
import routes from "./router";
import { renderRoutes } from "react-router-config";
// import ScrollToTop from "./components/scroll_to_top/ScrollToTop"; // 路由跳转时，实现滚动条重置，暂时不用

function App() {
  return (
    <>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </>
  );
}

export default App;
```

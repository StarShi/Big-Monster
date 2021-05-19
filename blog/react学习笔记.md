# react 学习笔记

## 一、搭建 React 项目

1.  全局安装 dva-cli（基于[roadhog](https://github.com/sorrycc/roadhog),类似 vue-cli）

        npm install dva-cli -g

2.  初始化项目

        dva new demo-app

3.  运行项目

        npm start / npm run build

## 二、创建虚拟 dom 方式

### 不使用 jsx 语法创建原生 DOM

1.  创建

        let vDOM = React.createElement('h2',{id:'test1'},'hello world')

2.  渲染

        ReactDOM.render(vDOM,document.getElementById('app'))

### 使用 jsx 语法创建 DOM

1.  创建

        let vDOM = <h2 id="test2"></h2>

2.  渲染

        ReactDOM.render(vDOM,document.getElementById('app'))

## jsx

React 定义的一种类似 XML 的 js 扩展语法:XML + JS

语法规则：

> 1.  遇见<开头的代码以标签语法解析，html 同名标签转换成 html 同名元素，自定义组件标签需要特别解析
> 2.  遇见{开头的代码以 js 语法进行解析：标签中的 js 表达式必须用{}包含
> 3.  只能有一个根标签
> 4.  如果想写样式，必须使用 className,因为 class 是 jsd 的保留字

# 三、React 组件编程

## 创建组件

#### 工厂函数创建组件

1. 创建

   ```js
   function MyComponent(){
       console.log(this);//此处的this是undefined 因为babel编译时使用的时严格模式
   	retrun <h2>工厂函数组件</h2>
   }
   ```

2. 渲染

   ```js
   //React 自动调用与标签同名的工厂函数
   React.render(<MyComponent />);
   ```

#### ES6 类创建组件（ES6 的类默认使用严格模式）

1. 创建

   ```js
   class MyComponent extends React.Component {
     render() {
       //重写父类的render方法、
       console.log(this); //指向实力对象
       return <h2>ES6类组件</h2>;
     }
   }
   ```

2. 渲染

   ```js
   //React 自动调用与标签同名的组件类，生成实例组件，随后自动调用其render方法
   React.render(<MyComponent />);
   ```

## 组件的三大属性

#### 状态（state）

1. 初始化状态

   ```js
   constructor(props) {
       super(props);
       this.state = {
           propertyName1: value1,
           propertyName2: value2,
       };
   }
   ```

2. 读取某个状态的值

   ```js
   this.state.propertyName1;
   ```

3. 更新状态

   ```js
   this.setState({
     propertyName1: value1,
     propertyName2: value2,
   });
   ```

   注意：

   > 1. 组件内置方法中的 this 指向组件对象，比如 render 和 constructor
   > 2. 组件中自定义的方法中 this 被 React 修改为 undefined,可在构造器通过 bind 强制绑定 this 或使用箭头函数让 this 指向当前对象
   > 3. 状态数据不可直接修改或更新，若想修改必须使用变量缓存状态，通过修改变量的值，然后用 setState 更新

4. 代码示例：

   ```js
   class Weather extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
         isHot: true,
       };
       this.change = this.change.bind(this);
     }
     //React 将自定义的方法中的this 全部改成了undefined
     change() {
       let { isHot } = this.state;
       isHot = !isHot;
       //状态不能直接更新，状态也不可直接修改，若想修改必须使用变量缓存状态，修改变量的值，用setState更新
       //更新状态时，必须使用setState方法，否则React不能被监听到
       this.setState({ isHot });
     }
     render() {
       let { isHot } = this.state;
       return (
         <h1 onClick={this.change}>今天天气很{isHot ? "炎热" : "凉爽"}</h1>
       );
     }
   }
   ```

5. 简写：

   ```js
   class Weather extends React.Component {
     state = {
       isHot: true,
     };
     change = () => {
       let { isHot } = this.state;
       isHot = !isHot;
       this.setState({ isHot });
     };
     render() {
       let { isHot } = this.state;
       return (
         <h1 onClick={this.change}>今天天气很{isHot ? "炎热" : "凉爽"}</h1>
       );
     }
   }
   ```

#### 参数（props）

1.  调用组件时，设置组件的属性值即可传递参数

    ```js
    <People name="张三" age={18} />
    ```

2.  组件内通过 props 读取参数

    ```js
    this.props.paramName;
    ```

3.  代码示例

    ```js
    class People extends React.Component {
      render() {
        let { name, age } = this.props;
        return (
          <div>
            <ul>
              <li>姓名：{name}</li>
              <li>年龄：{age}</li>
            </ul>
            <hr />
          </div>
        );
      }
    }

    let people = {
      name: "张三",
      age: "18",
    };

    ReactDom.render(
      <People name={people.name} age={people.age} />,
      document.getElementById("app")
    );
    ```

4.  传参限制

    ```js
    import PropTypes from "prop-types"
    class People extends React.Component{
        //参数类型限制
        static propTypes = {
            name:PropTypes.string.isRequired,
            age:PropTypes.number
        },
        //默认值限制
        static defaultProps = {
            age:18
        }
    }
    ```

state 与 props 的区别

1. state 是组件自身内部可变化的数据

2. props 从组件外部想组件内部传递的数据，组件内部自读不可修改

#### 操作 dom（refs）

原始方式：

1.  创建

    ```js
    //挂载到this.refs上
    <input type="text" ref="inputName" />
    ```

2.  使用

    ```js
    this.refs.inputName;
    ```

回调方式：

1.  创建

    ```js
    //挂载到this上
    <input type="text" ref={(el) => (this.inputName = el)} />
    ```

2.  使用

    ```js
    this.inputName;
    ```

    createRef 方式：

3.  创建

    ```js
    <input type="text" ref="this.inputName" />
    constructor(props){
        super(props);
        // 创建一个 ref 来存储 input 的 DOM 元素
        this.inputName = React.createRef();
    }

    ```

4.  使用

    ```js
    this.inputName.current;
    ```

代码示例

```js
class UseInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputName = React.createRef();
  }
  clickHandler = () => {
    console.log(this.refs.inputName1);
    console.log(this.inputName2);
    console.log(this.inputName3);
  };
  render() {
    return (
      <div>
        <input type="text" ref="inputName1" />
        <input type="text" ref={(el) => (this.inputName2 = el)} />
        <input type="text" ref={this.inputName3} />
        <button onClick={this.clickHandler}>点击</button>
      </div>
    );
  }
}
```

## 生命周期

1. 参数限制 static propTypes、static defaultProps
2. 构造函数 contructor()
3. 即将挂载 componentWillMount()--React17 即将弃用
4. 渲染 render()
5. 挂载完成 componentDidMount()
6. 接收参数 componentWillReceiveProps()--React17 即将弃用
7. 判断是否更新组件 shouldComponentUpdate()
8. 即将更新 componentWillUpdate()--React17 即将弃用
9. 更新完成 componentDidUpdate()
10. 即将卸载 componentWillUnmount()
11. 卸载组件 unmountComponentAtNode()
12. 即将挂载 getDerivedStateFromProps(nextProps, prevState)--React16 新增 不能与 3、6、8 混用
13. 即将更新 getSnapshotBeforeUpdate(prevProps, prevState)--React16 新增 不能与 3、6、8 混用

#### 创建

触发条件：ReactDom.render();

> 1. static propTypes、static defaultProps
> 2. contructor()
> 3. componentWillMount() / getDerivedStateFromProps(nextProps, prevState)
> 4. render()
> 5. componentDidMount()

#### 更新

触发条件：props 改变或 state 改变，this.setState({});

> 0. componentWillReceiveProps() / getDerivedStateFromProps(nextProps, prevState)
> 1. shouldComponentUpdate()
> 2. componentWillUpdate() / getSnapshotBeforeUpdate(prevProps, prevState)
> 3. render()
> 4. componentDidUpdate()

#### 卸载

触发条件：unmountComponentAtNode();

> 1. componentWillUnmount()

React 生命周期图如下：

![](https://i.imgur.com/7vsNkrH.jpg)

## 组件通信

1. props
2. 消息订阅(subscribe)与发布(publish)机制

   ```js
   import PubSub from "pubsub-js";
   PubSub.subscribe("EventName", function (msg, data) {}); //订阅
   PubSub.publish("EventName", data); //发布
   ```

3. redux

#### 父子组件

1. 父 to 子 ：直接写标签属性，即可传递

2. 子 to 父 :传递非函数数据，父传子一个方法

#### 兄弟组件

1. 借助共同的父组件

2. 消息的发布订阅

## 状态管理（Redux ）

1.  创建 reducer

    ```js
    const ADD_COUNT =  'add';

    //reducer 只是一个接收 state 和 action，并返回新的 state 的函数
    //约定action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作

    export function reducer(state={count:0},action){
        switch(action.type){
            case ADD_COUNT :
               return Object.assign({}, state, {
                        count: action.count
                    })
        }
    }
    //同步更新状态
    export function addClick(count){
        return {type:ADD_COUNT,count}
    }
    //异步更新状态
    export function addClickAsync(count) {
        return dispatch=>{
            setTimeout(()=>{
                dispatch(addClick(count))
            }),2000);
        }
    }
    ```

2.  创建 store

    ```js
    import { createStore } from "redux";
    const store = createStore(reducer); //在最上层渲染界面引入reducer
    ```

3.  获取 state

    ```js
    const state = store.getState();
    ```

4.  订阅 view 变化

    ```js
    store.subscribe(render); //执行render函数 重新渲染
    ```

5.  同步更新 state

    ```js
    //底层组件，根据上层组件的所传的参数更新数据状态

    let addClick = this.props.addClick;
    store.dispatch(addClick(count)); //更新数据状态
    ```

6.  异步更新 state (redux-thunk)

        npm i -S redux-thunk //安装异步更新中间件

    ```js
    import thunk from "redux-thunk";
    import { createStore, applyMiddleware } from "redux"; //applyMiddleware管理中间件
    const store = createStore(reducer, applyMiddleware(thunk)); //需引入之前创建的reducer函数

    //更新方式与同步更新一致，只是actionCreator即是：addClickAsync函数）返回的是一个函数
    //而同步更新的actionCreator（即是：addClick函数）返回的仅仅一个含有type键的对象

    //底层组件，根据上层组件的所传的参数更新数据状态

    let addClickAsync = this.props.addClickAsync;
    store.dispatch(addClickAsync(count)); //更新数据状态
    ```

7.  调试

    > 下载谷歌插件[redux-devtools-extension](https://github.com/reduxjs/redux-devtools.git)，`npm i && npm run build:extension`，然后找到 build 文件夹，在浏览器安装扩展程序
    >
    > 在项目中安装 npm 包，`npm i -S redux-devtools-extension`

    ```js
    import { createStore } from "redux";
    import { composeWithDevTools } from "redux-devtools-extension";
    const store = createStore(reducer, compose(composeWithDevTools())); //在最上层渲染界面引入reducer
    ```

8.  react-redux

    > 安装 `npm i -S react-redux`
    >
    > 提供 Provider 组件：订阅 store 状态的变化
    >
    > 提供 connect 方法：访问 store 数据，分发 action 更新数据状态

    ```js
    import thunk from "redux-thunk";
    import { Provider } from "react-redux"; //Provider可以订阅store状态的变化
    import { createStore, applyMiddleware, compose } from "redux"; //applyMiddleware管理中间件
    import { composeWithDevTools } from "redux-devtools-extension";

    const store = createStore(
      reducer,
      compose(applyMiddleware(thunk), composeWithDevTools())
    ); //在最上层渲染界面引入reducer

    ReactDom.render(
      <Provider store={store}>
        <ReduxCom />
      </Provider>,
      document.getElementById("root")
    );
    ```

9.  代码示例

    ```js
    //reducer.js--文件内容

    import Redux from "redux";

    const ADD_COUNT = "add";

    export function reducer(state = { count: 0 }, action) {
      switch (action.type) {
        case ADD_COUNT:
          return Object.assign({}, state, {
            count: state.count + action.count,
          });
        default:
          return state;
      }
    }
    export function addClick(count) {
      return { type: ADD_COUNT, count };
    }

    export function addClickAsync(count) {
      return (dispatch) => {
        setTimeout(() => {
          dispatch(addClick(count));
        }, 2000);
      };
    }
    ```

    ```js
    //app.jsx--文件内容

    import React from "react";
    import ReactDom from "react-dom";
    import ReduxCom from "./redux/Redux.jsx"; //测试组件
    import thunk from "redux-thunk"; //异步更新state的中间件
    import { Provider } from "react-redux"; //Provider可以订阅store状态的变化
    import { createStore, applyMiddleware, compose } from "redux"; //applyMiddleware管理中间件
    import { composeWithDevTools } from "redux-devtools-extension"; //redux调试工具
    import { reducer } from "./redux/index.redux.js"; //reducer

    const store = createStore(
      reducer,
      compose(applyMiddleware(thunk), composeWithDevTools())
    ); //在最上层渲染界面引入reducer

    ReactDom.render(
      <Provider store={store}>
        <ReduxCom />
      </Provider>,
      document.getElementById("root")
    );
    ```

    ```js
    //测试组件--文件内容

    import React from "react";
    import { connect } from "react-redux"; //Provider可以订阅store状态的变化
    import { addClick, addClickAsync } from "./index.redux.js";
    class ReduxCom extends React.Component {
      render() {
        return (
          <div>
            <h1>点击了{this.props.count}</h1>
            <button
              onClick={() => {
                this.props.addClickAsync(1);
              }}
            >
              点击
            </button>
          </div>
        );
      }
    }
    //需要绑定的数据
    const mapStateToProps = (state) => {
      return { count: state.count };
    };
    //需要绑定的函数
    const actionCreators = { addClick, addClickAsync };
    ReduxCom = connect(mapStateToProps, actionCreators)(ReduxCom); //将对应的数据和更改数据状态的函数绑定到props上
    export default ReduxCom;
    ```

## 路由（React-Router4）

1. 安装

   npm i -S react-router-dom

2. 使用

   ```html
   <BrowserRouter>
     <link to="/index" />首页<link /> <link to="/contact" />联系<link />
     <Route path="/index" component="{Index}"> </Route>
     <Route path="/contact" component="{Contact}"> </Route>
     <Redirect to="/idnex"></Redirect>
   </BrowserRouter>
   ```

<!--
 * @description: 源码分析
 * @author: Star Shi
 * @Date: 2020-08-03 14:37:52
 * @LastEditTime: 2020-08-03 20:52:06
-->

# vue2.0 源码分析

## 数据驱动

### 数据驱动模型 MVVM

数据驱动就是当数据发生变化的时候，用户界面发生相应的变化，开发者不需要手动的去修改 dom。

vue 的数据驱动是通过 MVVM 这种框架来实现的，MVVM 框架主要包含 3 个部分:Model、View 和 ViewModel:

- Model:指的是数据部分，对应到前端就是 javascript 对象

- View:指的是视图部分，对应前端就是 dom

- ViewModel:就是连接视图与数据的中间件，即观察者

数据(Model)和视图(View)是不能直接通讯的，而是需要通过 ViewModel 来实现双方的通讯。当数据变化的时候， ViewModel 能够监听到这种变化，并及时的通知 View 做出修改。同样的，当页面有事件触发时， ViewModel 也能够监听到事件，并通知 Model 进行响应。 ViewModel 就相当于一个观察者，监控着双方的动作，并及时通知对方进行相应的操作。

> MVC：主要包含 Model、View 和 Controller 三部分，在 MVC 中，所有通信都是单向的，View 接收用户传入的数据，传送指令到 Controller，Controller 完成业务逻辑后，要求 Model 改变状态，Model 将新的数据发送到 View，更新视图。

### 数据驱动原理

1. 获取模板
2. 获取数据
3. 数据和模板结合，得到 dom 元素
4. 更新页面

### 数据驱动的普通实现

1. 创建模板

   ```html
   <div id="app">
     <p>{{name}}</p>
     <p>{{age}}</p>
   </div>
   ```

2. 获取模板和数据

   ```javascript
   let tempNode = document.querySelector("#app");
   let data = {
     name: "张三",
     age: 18,
   };
   ```

3. 将数据放入模板中

   ```javascript
   // 渲染标识 双花括号
   let renderMark = /\{\{(.+?)\}\}/g;
   // template 为 dom 元素
   function compiler(template, data) {
     let childNodes = template.childNodes;
     for (let i = 0, len = childNodes.length; i < len; i++) {
       let type = childNodes[i].nodeType;
       if (type === 3) {
         //文本节点
         let text = childNodes[i].nodeValue; //文本内容 该属性只有文本节点有意义
         // replace 匹配一次，函数执行一次
         // 该函数的第一个参数，表示匹配到的内容
         // 函数的第 n 个参数，表示正则中第 n 组的值，即使第 n 个小括号的值
         text = text.replace(renderMark, function (_, g) {
           // 去除空格
           let key = g.trim();
           // 获取数据
           let value = data[key];
           return value;
         });
         // 渲染文本
         childNodes[i].nodeValue = text;
       } else if (type === 1) {
         // 元素节点
         compiler(childNodes[i], data);
       }
     }
   }
   // dom 元素为引用类型，使用前需要进行拷贝
   let newNode = tempNode.cloneNode(true);
   // 处理模板，替换成相应的数据
   compiler(newNode, data);
   // 新节点替换老节点，进行渲染
   tempNode.parentNode.replaceChild(newNode, tempNode);
   ```

   > 问题：
   >
   > - 这里使用的是真实 dom 而 vue 使用的是虚拟 dom
   > - 只考虑绑定的数据是 data 属性的情况{{name}}，没有考虑绑定的数据是多层级属性的情况，即{{user.name}}
   > - 代码没有整合封装

### 仿 vue 封装实现数据驱动

1. 封装并处理数据的层级问题

   ```javascript
   // 内部变量以下划线开头，只读数据以$符号开头
   function LikeVue(opt) {
     // 获取数据
     this._data = opt.data || {};
     // 获取模板
     this._el = opt.el || "#app";
     this._templateDom = document.querySelector(this._el);
     this._parent = this._templateDom.parentNode;

     // 渲染
     this.render();
   }
   // 将模板与数据结合得到真正的 dom 元素，并渲染到页面中
   LikeVue.prototype.render = function () {
     this.compiler();
   };

   // 编译，将模板与数据结合得到真正的 dom 元素
   LikeVue.protoptype.compiler = function () {
     let realDom = this._templateDom.childNode(true); // 拷贝 dom
     compiler(realDom, this._data);
     this.update(realDom);
   };

   // 更新，将 dom 元素放到页面之中
   LikeVue.protoptype.update = function (tempNode) {
     this._parent.replaceChild(tempNode, this._templateDom);
   };

   let renderMark = /\{\{(.+?)\}\}/g;
   function compiler(template, data) {
     let childNodes = template.childNodes;
     for (let i = 0, len = childNodes.length; i < len; i++) {
       let type = childNodes[i].nodeType;
       if (type === 3) {
         let text = childNodes[i].nodeValue;
         text = text.replace(renderMark, function (_, g) {
           let key = g.trim();
           // 分隔渲染层级 {{user.name}} 获取数据
           let value = getValueByPath(data, key);
           return value;
         });
         childNodes[i].nodeValue = text;
       } else if (type === 1) {
         compiler(childNodes[i], data);
       }
     }
   }
   // 参数 obj = {user:{name}};
   // 参数 path = "user.name";
   function getValueByPath(obj, path) {
     let paths = path.split(".");
     let res = obj;
     for (let i = 0, len = paths.length; i < len; i++) {
       res = res[path[i]];
     }
     return res;
   }
   ```

2. 虚拟 dom

   思路：

   - 真实 dom 转化成虚拟 dom
   - 虚拟 dom 转化成真实 dom

   实现虚拟 dom 的数据结构：

   ```javascript
   // 虚拟 dom
   function VNode(tag, data, value, type) {
     this.tag = tag;
     this.data = data;
     this.value = value;
     this.type = type;
     this.children = [];
   }
   // 添加节点
   VNode.prototype.appendChild = function (vNode) {
     this.children.push(vNode);
   };
   ```

   真实 dom 节点转换虚拟 dom 节点：

   ```javascript
   function getVNode(node) {
     let nodeType = node.nodeType;
     let _vNode = null;
     if (nodeType === 1) {
       // 如果是元素节点
       let nodeName = node.nodeName;
       let attrs = node.attributes; // 获取到的是属性节点的列表 nodeType = 2
       let _attrObj = {};
       for (let i = 0, len = attrs.length; i < len; i++) {
         // 属性名 attrs[i].nodeName 属性值 attrs[i].nodeValue
         _attrObj[attrs[i].nodeName] = attrs[i].nodeValue;
       }
       _vNode = new VNode(nodeName, _attrObj, undefined, nodeType);
       // 考虑其子元素
       let childNodes = node.childNodes;
       for (let i = 0, len = childNodes.length; i < len; i++) {
         _vNode.appendChild(getVNode(childNodes[i]));
       }
     } else if (nodeType === 3) {
       // 如果是文本结点
       _vNode = new VNode(undefined, undefined, node.nodeValue, nodeType);
     }
     return _vNode;
   }
   ```

   虚拟 dom 节点转换真实 dom 节点：

   ```javascript
   function parseVNode(vNode) {
     let nodeType = vNode.nodeType;
     let _node = null;
     if (nodeType === 1) {
       // 如果是元素节点
       let nodeName = vNode.tag;
       _node = document.createElement(nodeName);
       let _attrObj = vNode.data;
       for (let key of _attrObj) {
         // 属性名 attrs[i].nodeName 属性值 attrs[i].nodeValue
         _node.setAttribute(key, _attrObj[key]);
       }
       // 考虑其子元素节点
       let children = vNode.children;
       for (let i = 0, len = children.length; i < len; i++) {
         _node.appendChild(parseVNode(children[i]));
       }
     } else if (nodeType === 3) {
       // 如果是文本结点
       _node = document.createTextNode(node.value);
     }
     return _node;
   }
   ```

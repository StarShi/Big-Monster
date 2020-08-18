<!--
 * @description:
 * @author: Star Shi
 * @Date: 2020-08-03 14:37:52
 * @LastEditTime: 2020-08-18 14:20:21
-->
<!--
 * @description: 源码分析
 * @author: Star Shi
 * @Date: 2020-08-03 14:37:52
 * @LastEditTime: 2020-08-18 10:42:49
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
     let type = vNode.type;
     let _node = null;
     if (type === 1) {
       // 如果是元素节点
       let nodeName = vNode.tag;
       _node = document.createElement(nodeName);
       let _attrObj = vNode.data;
       Object.keys(_attrObj).forEach((key) => {
         _node.setAttribute(key, _attrObj[key]);
       });
       // 考虑其子元素节点
       let children = vNode.children;
       for (let i = 0, len = children.length; i < len; i++) {
         _node.appendChild(parseVNode(children[i]));
       }
     } else if (type === 3) {
       // 如果是文本结点
       _node = document.createTextNode(node.value);
     }
     return _node;
   }
   ```

## 函数柯里化与渲染模型

### 函数柯里化

一个函数原本有多个参数，只传入一个参数，返回一个新的函数，由这个新函数接收剩下的参数来运行得到结果。

> 为什么使用柯里化？
>
> 柯里化的可以缓存数据，提升性能。

#### 示例一：判断元素

普通实现，如果有 6 个内置标签，而模板中有 10 个标签需要判断，那么就需要循环 60 次判断。

```javascript
let tags = "div,p,ul,li,a,img".split(",");
function isHTMLTag(tagName) {
  if (tags.indexOf(tagName) > -1) return true;
  return false;
}
```

柯里化实现，循环在构建柯里化函数时执行一次，之后会缓存在内存中，供以调用。

```javascript
let tags = "div,p,ul,li,a,img".split(",");
function makeMap(tags) {
  let set = {};
  tags.forEach((tag) => {
    set[tag] = true;
  });
  return function (tagName) {
    return !!set[tagName.toLowerCase()];
  };
}

let isHTMLTag = makeMap(tags); // 返回函数
```

#### 示例二：虚拟 dom 的 render 方法

1. 模板 -> AST(抽象语法树)

2. AST -> VNode(虚拟 dom)

3. VNode -> dom

在 vue 中，模板是不会变的，通过模板生成的 AST 也不会变，vue 通过函数柯里化将虚拟 AST 缓存起来，生成一个函数，该函数只需要传入数据，就可以得到新的虚拟 dom，新的虚拟 dom 与 旧的虚拟 dom 对比，通过 diff 算法，将新的虚拟 dom 的变化更新到旧的虚拟 dom 上，由于旧的虚拟 dom 与 真正的 dom 存在对应关系，所以真正的 dom 会随着旧虚拟 dom 的改变而改变。

> 注意：上述没有利用新的虚拟 dom 直接更新，是因为旧的虚拟 dom 与真正的虚拟 dom 存在一一对应的关系，如果使用新的虚拟 dom 进行跟更新，需要重建这个对应关系

```javascript
function LikeVue(opt) {
  // 获取数据
  this._data = opt.data || {};
  // 获取模板
  this._el = opt.el || "#app";
  this._templateDom = document.querySelector(this._el);
  this._parent = this._templateDom.parentNode;
  this.mount(); // 挂载
}

LikeVue.prototype.mount = function () {
  this.render = this.createRenderFn();
  this.mountComponent();
};

LikeVue.prototype.mountComponent = function () {
  let mount = function () {
    this.update(this.render());
  };
  mount.call(this);
};

// 生成 render 函数，目的是缓存抽象语法树(该处简化：由于没有 AST 算法，故而直接利用待渲染的虚拟 dom 来模拟实现AST，)
LikeVue.prototype.createRenderFn = function () {
  // vue：将 AST + data => 新的VNode
  // 模拟：将待渲染的虚拟dom + data => 新的VNode
  let ast = getVNode(this._templateDom);
  return function () {
    return combine(ast, this._data);
  };
};

// 将虚拟 dom 渲染到页面中，diff 算法（该处简化：利用新的虚拟dom 直接更新）
LikeVue.prototype.update = function (vNode) {
  let realDom = parseVNode(vNode);
  // this._parent.replaceChild(realDom, this._templateDom);
  // 需要重新获取元素节点，因为每次 replaceChild 后生成的节点都是新的节点
  this._parent.replaceChild(realDom, document.querySelector(this._el));
};

let renderMark = /\{\{(.+?)\}\}/g;
// 将待渲染的虚拟dom 结合 data 生产新的虚拟 dom
function combine(vNode, data) {
  let _type = vNode.type;
  let _data = vNode.data;
  let _value = vNode.value;
  let _tag = vNode.tag;
  let _children = vNode.children;

  let _vNode = null;
  if (_type === 3) {
    // 文本节点的处理
    _value = _value.replace(renderMark, function (_, g) {
      let key = g.trim();
      // 分隔渲染层级 {{user.name}} 获取数据
      let value = getValueByPath(data, key);
      return value;
    });
    _vNode = new VNode(_tag, _data, _value, _type);
  } else if (_type === 1) {
    // 元素节点处理
    _vNode = new VNode(_tag, _data, _value, _type);
    _children.forEach((_subVNode) => {
      _vNode.appendChild(combine(_subVNode));
    });
  }
  return _vNode;
}
```

## 响应式原理

### 数据劫持

语法

```javascript
Object.defineProperty(obj, key, {
  writeable, // 控制属性是否可读写，若与get、set 同时存在，则无需设置writeable
  configable, // 控制属性是否可被 defineProperty 设置，是否可被删除
  enumerable, // 控制对象属性是否可枚举，即能否被 for in 遍历
  value, // 属性值
  get() {},
  set(newValue) {},
});
```

使用

```javascript
let people = {};
people.name = 0;
let _age;
Object.defineProperty(people, "age", {
  configable: true,
  enumerable: true,
  get() {
    return _age;
  },
  set(newValue) {
    _age = newValue;
  },
});
```

> 注意：想要同时使用 get 、set 方法 ，必须使用一个全局变量来缓存属性值

仿 vue 中的封装

```javascript
// 简化后的版本
function defineReactive(target, key, value, enumerable) {
  //函数内部相当于一个局部作用域，value 在函数内部使用，用来缓存属性值
  Object.defineProperty(target, key, {
    configable: true,
    enumerable: !!enumerable,
    get() {
      return value;
    },
    set(newValue) {
      value = newValue;
    },
  });
}
```

对多层级对象或数组 进行深层递归，实现响应式

```javascript
function reactify(obj) {
  let keys = Object.keys(obj);
  let len = keys.length();
  for (let i = 0; i < len; i++) {
    let key = keys[i];
    let value = obj[key];
    if (Array.isArray(value)) {
      for (let j = 0; j < value.length; j++) {
        reactify(value[j]);
      }
    } else if (Object.prototype.toString.call(value) === "[object Object]") {
      reactify(value);
    } else {
      defineReactive(obj, key, value, true);
    }
  }
}
```

对数组的方法进行处理，使得数组的方法也变成响应式的如 push ,pop 等方法

- 不能直接修改 Array.prototype，这会使所有数组的方法都会改变
- 修改要进行响应式的数组的原型 \_\_ proto \_\_
- 原来的继承 myArr.\_\_ proto \_\_ -> Array.prototype
- 新增一层 myArr.\_\_ proto \_\_ -> array_methods -> Array.prototype

```javascript
let myArr = [];
// 定义要修改数组方法的列表
const ARRAY_METHODS = ["push", "pop"];
// 获取数组原型的所有方法
let array_methods = Object.create(Array.prototype);
// 遍历定义的方法列表
ARRAY_METHODS.forEach((method) => {
  // 重新扩展方法的功能
  array_methods[method] = function () {
    console.log("扩展的功能");
    // 使得传入数组方法的数据响应式
    for (let i; i < arguments.length; i++) {
      reactify(arguments[i]);
    }
    // 调用原有功能
    array_methods[method].apply(this, arguments);
  };
});
myArr.__proto__ = array_methods;

// 增加数组响应式
function reactify(obj) {
  let keys = Object.keys(obj);
  let len = keys.length();
  for (let i = 0; i < len; i++) {
    let key = keys[i];
    let value = obj[key];
    if (Array.isArray(value)) {
      // 拦截数组的原型方法，扩展响应功能
      value.__proto__ = array_methods;
      for (let j = 0; j < value.length; j++) {
        reactify(value[j]);
      }
    } else if (Object.prototype.toString.call(value) === "[object Object]") {
      reactify(value);
    } else {
      defineReactive(obj, key, value, true);
    }
  }
}
```

扩展函数功能的技巧

- 定义一个临时变量存储原来的函数
- 重新定义原来的函数
- 在新定义的函数里，实现扩展功能
- 调用临时函数中的功能

```javascript
function func() {
  console.log("原有的函数功能");
}
let tempFunc = func;
func = function () {
  tempFunc();
  console.log("扩展的函数功能");
};
func(); // 打印 原有的函数功能 扩展的函数功能
```

### 数据代理

实现 vue 实例也可以访问 data 属性的功能，即把 vm.\_data.name 的访问方式，转换成 vm.name，由于 vm.\_data.name 的数据已经是响应式的，所以只需在调用 vm.name 时，去读取 vm.\_data.name 的值便可。

```javascript
//  target 对象，src 访问路径，prop 读取的属性
function proxy(target, src, props) {
  Object.defineProperty(target, props, {
    configable: true,
    enumerable: !!enumerable,
    get() {
      return target[src][props];
    },
    set(newValue) {
      target[src][props] = newValue;
    },
  });
}

app.name = proxy(app, _data, name);
```

### 抽取 initData

对 LikeVue 进行抽取封装如下：

```javascript
// 内部变量以下划线开头，只读数据以$符号开头
function LikeVue(opt) {
  // 获取数据
  this._data = opt.data || {};
  // 获取模板
  this._el = opt.el || "#app";
  this._templateDom = document.querySelector(this._el);
  this._parent = this._templateDom.parentNode;

  //响应数据
  this.initData();

  // 挂载
  this.mount();
}

// 抽取数据初始化
LikeVue.prototype.initData = function () {
  let keys = Object.keys(this._data);
  // 响应式化
  for (let i = 0, len = keys.length; i < len; i++) {
    reactify(this._data, this);
  }

  // 将对象属性的访问 映射 到实例上，利用实例可直接访问数据
  for (let i = 0, len = keys.length; i < len; i++) {
    proxy(this, _data, key);
  }
};

LikeVue.prototype.mount = function () {
  this.render = this.createRenderFn();
  this.mountComponent();
};

LikeVue.prototype.mountComponent = function () {
  let mount = function () {
    this.update(this.render());
  };
  mount.call(this);
};

// 生成 render 函数，目的是缓存抽象语法树(该处简化：由于没有 AST 算法，故而直接利用待渲染的虚拟 dom 来模拟实现AST，)
LikeVue.prototype.createRenderFn = function () {
  // vue：将 AST + data => 新的VNode
  // 模拟：将待渲染的虚拟dom + data => 新的VNode
  let ast = getVNode(this._templateDom);
  return function () {
    return combine(ast, this._data);
  };
};

// 将虚拟 dom 渲染到页面中，diff 算法（该处简化：利用新的虚拟dom 直接更新）
LikeVue.prototype.update = function (vNode) {
  let realDom = parseVNode(vNode);
  // this._parent.replaceChild(realDom, this._templateDom);
  // 需要重新获取元素节点，因为每次 replaceChild 后生成的节点都是新的节点
  this._parent.replaceChild(realDom, document.querySelector(this._el));
};

let renderMark = /\{\{(.+?)\}\}/g;
// 将待渲染的虚拟dom 结合 data 生产新的虚拟 dom
function combine(vNode, data) {
  let _type = vNode.type;
  let _data = vNode.data;
  let _value = vNode.value;
  let _tag = vNode.tag;
  let _children = vNode.children;

  let _vNode = null;
  if (_type === 3) {
    // 文本节点的处理
    _value = _value.replace(renderMark, function (_, g) {
      let key = g.trim();
      // 分隔渲染层级 {{user.name}} 获取数据
      let value = getValueByPath(data, key);
      return value;
    });
    _vNode = new VNode(_tag, _data, _value, _type);
  } else if (_type === 1) {
    // 元素节点处理
    _vNode = new VNode(_tag, _data, _value, _type);
    _children.forEach((_subVNode) => {
      _vNode.appendChild(combine(_subVNode));
    });
  }
  return _vNode;
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

// 增加数组响应式
function reactify(obj, vm) {
  let keys = Object.keys(obj);
  let len = keys.length();
  for (let i = 0; i < len; i++) {
    let key = keys[i];
    let value = obj[key];
    if (Array.isArray(value)) {
      // 拦截数组的原型方法，扩展响应功能
      value.__proto__ = array_methods;
      for (let j = 0; j < value.length; j++) {
        reactify(value[j], vm);
      }
    } else if (Object.prototype.toString.call(value) === "[object Object]") {
      reactify(value, vm);
    } else {
      defineReactive(obj, key, value, true);
    }
  }
}

// 响应式
function defineReactive(target, key, value, enumerable) {
  //函数内部相当于一个局部作用域，value 在函数内部使用，用来缓存属性值
  Object.defineProperty(target, key, {
    configable: true,
    enumerable: !!enumerable,
    get() {
      return value;
    },
    set(newValue) {
      if (typeof newValue === "object" && newValue !== null) {
        reactify(newValue);
      }
      value = newValue;
    },
  });
}
```

> 注意：由于原始的 reactify 存在递归，如果在其中绑定 proxy,如果内层对象的属性和外层对象的属性有重合，则响应式时，内层对象的属性会覆盖外层对象的属性，例如：{name:"张三",child:{name:"李四"}}。需要另一个循环来实现对象映射读取，即如 initData 中的写法

### reactify 改写 observer

reactify 存在缺陷，不能对 obj 本身进行响应式处理，需要改写成 observer

```javascript
// 先判断 obj 的类型
// 如果是数组，就直接对数据的每一项进行响应式处理
// 如果是对象，则的对象中的属性进行响应式处理，因为存在递归，所以对象的子对象或子数组的所有成员进行响应式处理
function observer(obj, vm) {
  if (Array.isArray(obj)) {
    obj.__proto__ = array_methods;
    for (let i = 0; i < obi.length; i++) {
      observer(obj[i], vm);
    }
  } else {
    let keys = Object.keys(obj);
    let len = keys.length();
    for (let i = 0; i < len; i++) {
      let prop = keys[i];
      let value = obj[prop];
      defineReactive.call(vm, obj, prop, value, true);
    }
  }
}

function defineReactive(target, key, value, enumerable) {
  if (typeof value === "object" && value !== null) {
    observer(value, this);
  }
  Object.defineProperty(target, key, {
    configable: true,
    enumerable: !!enumerable,
    get() {
      return value;
    },
    set(newValue) {
      if (typeof newValue === "object" && newValue !== null) {
        observer(newValue, this);
      }
      value = newValue;
    },
  });
}
```

### 发布订阅模式与事件模型

事件模型

- event 对象
- on、off、emit 方法

实现

- event 是一个全局对象
- event.on("事件名",处理函数)，订阅事件
- event.off(),移除所有事件、或者某一类型的事件、或者某一类型事件的处理函数
- event.emit("事件名",处理函数)，发布事件，之前订阅事件的处理函数会依次执行

```javascript
window.event = (function () {
  var eventObjs = {};
  return {
    // 注册或订阅事件 ，可以注册多个事件
    on: function (type, handler) {
      if (!eventObjs[type]) {
        eventObjs[type] = [];
      }
      eventObjs[type].push(handler);
      //  vue 的写法
      //  (eventObjs[type] || (eventObjs[type] = [])).push(handler)
    },
    // 移除事件
    // 如果没有参数，移除所有事件
    // 如果带有一个参数，表示移除该事件类型下的所有事件
    // 如果带有两个参数，表示移除该事件类型下的具体事件
    off: function (type, handler) {
      if (arguments.length === 0) {
        eventObjs = {};
      } else if (arguments.length === 1) {
        eventObjs[type] = [];
      } else if (arguments.length === 2) {
        let _events = eventObjs[type];
        if (!_events) return;
        for (let i = _events.length - 1; i > 0; i--) {
          if (handler === _events[i]) _events.splice(i, 1);
        }
      }
    },

    // 触发或发布事件，包装参数，传递给事件处理函数
    emit: function (type) {
      let args = Array.prototype.slice.call(arguments, 1);
      let _events = eventObjs[type];
      if (!_events) return;
      for (let i = _events.length - 1; i > 0; i--) {
        if (handler === _events[i]) _events[i].apply(null, args);
      }
    },
  };
})();
```

订阅事件

```javascript
event.on("test", function () {
  console.log("事件代码块");
});
```

发布事件

```javascript
event.emit("test");
```

### 依赖收集与派发更新

发布订阅模式的形式不仅仅局限于函数，其形式也可以是对象等。

特征：

- 需要中间的全局容器，用来存储可以被触发的东西，例如：函数、对象等
- 需要定义方法，可以往容器中传入东西
- 需要定义方法，可以将容器中的东西取出来使用，例如：函数调用，对象的调用等

vue 中的依赖收集与派发更新就是基于发布订阅模式实现的，其思路如下：

1. 当数据读取的时候，会调用 depend 方法，将 data 对应的 watcher 存入全局的容器中，

2. 当数据变更的时候，会调用 notify 方法，将全局容器中的所有 watcher 取出一一触发

3. 当数据更新完毕后，会将 watcher 从全局容器中移除

依赖收集：将 watcher 存入全局的容器的过程

派发更新：将全局容器中的 watcher 取出一一触发的过程

> 注意：将每个组件拆分成对应的 watcher 可以提升性能，第一次渲染时，所有 watcher 都会存入全局容器，渲染一一触发，但每当数据有所改变时，只有改变数据对应的 watcher 会放入全局容器，等待更新触发。

### 新增 watcher

原来的 array_methods 是无法传递 vue 实例（this）的，新增 watcher 使得 array_methods 中的 observer 函数调用可以传递 vue 实例（this）；可以将 array_methods 封装的代码，放入 observer 中，但这样就无法体现封装性，也可以使用高阶函数来返回一个函数实现该功能，但 vue 源码中使用的是名为 Watcher 的构造函数。

Watcher 构造函数具有一些方法：

- get 方法，内部方法，用来计算和执行处理函数
- update 方法，公共的外部方法，用来触发内部的 run 方法
- run 方法，用来判断内部是使用异步运行还是同步运动，最终会调用内部的 get 方法
- cleanupDep 方法，清除队列

```javascript
class Watcher {
  /**
   * @param {Object} target vue 实例
   * @param {Srting | Function}  expOfFn 如果是渲染 watcher 传的就是渲染函数，如果是计算 watcher 传的就是路径表达式
   */
  constructor(target, expOfFn) {
    this.vm = target;
    this.getter = expOfFn;
    this.deps = []; // 依赖收集
    this.depIds = {}; // 是一个set类型，用来保证依赖的唯一性
    // 一开始就需要渲染，在 vue 中是：this.lazy ? undefined : this.get();
    this.get();
  }
  // 计算，触发 getter
  private get() {
    this.getter.call(this.vm, this.vm); // 目前只考虑 expOfFn 是函数的情况，解决了上下文的问题；
  }
  // 执行，并判断是懒加载，还是同步执行，还是异步执行
  // 我们现在只考虑同步执行，在 vue 中是调用 queueWatcher，来触发nextTick进行异步执行
  private run() {
    this.get();
  }
  // 对外公开的函数，用于触发 run 的执行
  public update(){
    this.run();
  }
  // 清空依赖队列
  cleanupDep(){
     this.deps = [];
  }
}
```

> 注意：watcher 指得是 Watcher 实例

### 引入 Dep

该对象提供依赖收集（depend）功能和派发更新（notify）功能，在 notify 中去调用 update 方法。

依赖收集实际上收集的就是属性，那如何将属性与 watcher 关联起来？

- 在全局准备一个容器 targetStack（可用数组模拟），存储收集到的 watcher
- 当 Watcher 调用 get 方法的时候，将当前的 Watcher 实例放到全局的容器中去，当 get 结束时，从容器中将该实例移除
- push 方法，进栈
- pop 方法，出栈
- 每一个属性中都含有一个 Dep 对象，存储（data 与 watcher 的对应关系）

```javascript
class Dep {
  constructor() {
    this.subs = []; // 存储的是与当前 Dep 关联的 watcher
  }
  // 添加一个 watcher
  addSub() {}
  // 移除一个 watcher
  removeSub() {}
  // 将当前 Dep 与 watcher 关联
  depend() {}
  // 触发与之关联的所有 watcher 的 update 方法，起到更新作用
  notify() {}
}
```

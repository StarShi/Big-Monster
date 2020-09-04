# es6 学习笔记

## 简介

### ECMAScript 发展历史

- 1995 年：ECMAScript 诞生；
- 1997 年：ECMAScript 标准确立；
- 1999 年：ES3 出现，与此同时 IE5 风靡一时；
- 2009 年：ES5 发布；
- 2015 年 6 月：ES6 正式发布；

### ECMAScript 的各大版本

- ES5：2009 年发布
- ES6：2015 年发布
- ES7：2016 年发布
- ES8：2017 年发布

## ES5 语法

### ES5 中的严格模式

除了正常的运行模式（混杂模式）外，ES5 添加的第二中运行模式：“严格模式”（strict mode），顾名思义，这种模式使得 JavaScript 在更严格的语法条件下运行。

目的：

- 消除 JavaScript 语法的一些不合理、不严谨之处，减少一些怪异的行为；
- 消除代码运行的一些不安全之处；
- 为未来新版本的 JavaScript 做好铺垫；

用法：

在脚本文件，或函数体的第一行，添加`"use strict";`，整个脚本文件或函数体就会根据严格模式来运行。

语法和行为的改变：

- 必须使用 var 声明变量；
- 禁止自定义函数中的 this 指向 window；
- 创建 eval 作用域；
- 对象不能有重名的属性；

严格模式和普通模式的区别：

- 严格模式中的变量必须使用 var 显式声明，不存在隐式声明；
- 严格模式中的函数内部禁止 this 指向 window 对象，默认为 undefined；
- 严格模式中禁止使用 with 语句；
- 严格模式中的构造函数必须通过 new 实例化对象；
- 在普通模式中，如果有多个重名属性，最后赋值的那个属性会覆盖前面的值，在严格模式中会报错，不能存在重名属性；
- 严格模式中函数必须声明在顶层；
- 严格模式中新增了一些关键字，例如：implements、interface、let、package、private、protected、publick、static、yield 等；

### ES5 的扩展

#### JSON 对象

对象或数组 -> 对象字符串或数组字符串

```javascript
JSON.stringify(obj);
```

对象字符串或数组字符串 -> 对象或数组

```javascript
JSON.parse(obj);
```

#### Object 扩展

创建对象：以指定对象为原型，创建新的对象，同时，如果传入第二个参数的话，可以为新的对象添加属性。

```javascript
Object.create(proptotype, [descriptiors]);
```

例如：

```javascript
let obj1 = { name: "张三", age: 18 };

let obj2 = Object.create(obj1, {
  phone: {
    value: 123,
    writable: true,
    enumerable: true,
    configurable: true,
  },
  nick: {
    writable: true,
    enumerable: true,
    configurable: true,
    get() {
      return "小三";
    },
    set(value) {
      nick = value;
    },
  },
});
//  obj2 = { phone:123 ,nick:"小三"}
//  obj2.__proto__ = obj1
```

#### 数组的扩展

- indexOf
- lastIndexOf
- forEach
- map
- filter

#### 函数的扩展

- bind

## ES6 语法

### 变量

#### 定义

ES6 中新增了 let 和 const 来定义变量:

- var：ES5 和 ES6 中定义全局变量；
- let：定义局部变量，代替 var；
- const：定义常量，定义后不可修改；

特点：

- 不存在变量提升；
- 暂时性死区，支持块级作用域；
- 不允许重复声明；

#### 解构赋值

1. 数组的解构赋值

   ```javascript
   let [a, b, c] = [1, 2, 3]; // a = 1, b = 2, c = 3
   // 允许默认值
   let [a, b, c, d = 4] = [1, 2, 3]; // a = 1, b = 2, c = 3, d = 4
   ```

2. 对象的解构赋值

   ```javascript
   let { bar, foo } = { foo: "aaa", bar: "bbb" }; // foo = "aaa",bar =  "bbb"
   // 允许默认值
   let { bar, foo, default = "default" } = { foo: "aaa", bar: "bbb" }; // foo = "aaa", bar =  "bbb", default = "default"
   ```

   > 注意：对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

3. 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构

   ```javascript
   let arr = [1, 2, 3];
   let { 0: first, [arr.length - 1]: last } = arr;
   first; // 1
   last; // 3
   ```

4. 字符串的解构赋值

   ```javascript
   const [a, b, c, d, e] = "hello";
   a; // "h"
   b; // "e"
   c; // "l"
   d; // "l"
   e; // "o"
   ```

5. 函数参数的解构

   ```javascript
   function add([x = 0, y = 1]) {
     return x + y;
   }
   add([1, 2]); // 3
   add(); // 1
   ```

解构赋值的作用：

- 交换变量的值
- 函数返回多个返回值时，方便取值
- 函数参数的定义
- 提取 json 数据
- 函数参数的默认值
- 遍历 Map 接口

### 字符串的扩展

#### 字符的 Unicode 表示法

ES6 加强了对 Unicode 的支持，允许采用\uxxxx 形式表示一个字符，其中 xxxx 表示字符的 Unicode 码点。

```javascript
"\u20BB7";
// " 7"

"\uD842\uDFB7";
// "𠮷"

```

> 注意：超出\u0000~\uFFFF 的字符，必须用两个双字节的形式表示

大括号表示法:

```javascript
"\u{20BB7}";
// "𠮷"

"\u{41}\u{42}\u{43}";
// "ABC"

"\u{1F680}" === "\uD83D\uDE80";
// true 说明大括号表示法与四字节的 UTF-16 编码是等价的
```

#### 字符串遍历器接口

ES6 为字符串添加了遍历器接口，使得字符串可以被 for...of 循环遍历。

```javascript
for (let codePoint of "foo") {
  console.log(codePoint);
}
// "f"
// "o"
// "o"
```

#### 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识，它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```javascript
let world = "world";
let str = `hello ${world}`; // hello world
```

#### 标签模板

模板字符串紧跟在一个函数名后面，则该函数将被调用来处理这个模板字符串。

```javascript
alert`hello`;
// 等同于
alert(["hello"]);
```

#### 新增方法

fromCodePoint()：从 Unicode 码点返回对应字符；弥补了 fromCharCode() 方法不能识别码点大于 0xFFFF 的字符的不足。

row()：返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串。

codePointAt()：返回 32 位的 UTF-16 字符的码点；弥补了 charCodeAt() 方法不能识别 32 位的 UTF-16 字符的不足。

normalize():字符串的合成或分解，不过目前不能识别三个或三个以上字符的合成

includes()：返回布尔值，表示是否找到了参数字符串。

startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

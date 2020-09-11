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

- fromCodePoint()：从 Unicode 码点返回对应字符；弥补了 fromCharCode() 方法不能识别码点大于 0xFFFF 的字符的不足。
- row()：返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串。
- codePointAt()：返回 32 位的 UTF-16 字符的码点；弥补了 charCodeAt() 方法不能识别 32 位的 UTF-16 字符的不足。
- normalize():字符串的合成或分解，不过目前不能识别三个或三个以上字符的合成
- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
- repeat()：返回一个新字符串，表示将原字符串重复 n 次。
- padStart()：用于头部补全。
- padEnd()：用于尾部补全。
- trimStart()：去除头部空格。
- trimEnd()：去除尾部空格。
- matchAll()：返回一个正则表达式在当前字符串的所有匹配。

### 正则的扩展

#### RegExp 构造函数

```javascript
let regex = new RegExp("xyz", "i");
let regex = new RegExp(/xyz/i);
// 等价于
let regex = /xyz/i;
new RegExp(/abc/gi, "i");
```

> 注意：如果 RegExp 构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

#### 字符串的正则方法

- match()
- replace()
- search()
- split()

#### u 修饰符

支持识别 32 位 unicode 字符。

#### unicode 属性

表示是否设置了 u 修饰符。

```javascript
RegExp.prototype.unicode;
```

#### y 修饰符

确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。

#### sticky 属性

表示是否设置了 y 修饰符。

```javascript
RegExp.prototype.sticky;
```

#### flags 属性

返回正则表达式的修饰符。

```javascript
RegExp.prototype.flags;
```

#### s 修饰符

使得.可以匹配任意单个字符。

#### dotAll 属性

dotAll 模式，表示是否设置了 s 修饰符

```javascript
RegExp.prototype.flags;
```

#### 后行断言

- 先行断言：指的是，x 只有在 y 前面才匹配，必须写成/x(?=y)/。比如，只匹配百分号之前的数字，要写成/\d+(?=%)/
- 先行否定断言：指的是，x 只有不在 y 前面才匹配，必须写成/x(?!y)/
- 后行断言：指的是，x 只有在 y 后面才匹配，必须写成/(?<=y)x/
- 后行否定断言：指的是，x 只有不在 y 后面才匹配，必须写成/(?<!y)x/

#### Unicode 属性类

ES2018 引入了一种新的类的写法\p{...}和\P{...}，允许正则表达式匹配符合 Unicode 某种属性的所有字符。

Unicode 属性类要指定属性名和属性值。

```javascript
\p{UnicodePropertyName=UnicodePropertyValue}
```

例如：匹配希腊文字

```javascript
const regexGreekSymbol = /\p{Script=Greek}/u;
regexGreekSymbol.test("π"); // true
```

例如：匹配所有的箭头字符

```javascript
const regexArrows = /^\p{Block=Arrows}+$/u;
regexArrows.test("←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩"); // true
```

#### 具名组匹配

ES2018 引入了具名组匹配（Named Capture Groups），允许为每一个组（即是正则中的圆括号）匹配指定一个名字，既便于阅读代码，又便于引用。

```javascript
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const matchObj = RE_DATE.exec("2020-02-02");
const year = matchObj.groups.year; // 2020
const month = matchObj.groups.month; // 02
const day = matchObj.groups.day; // 02
```

具名组匹配在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（?\<year>），然后就可以在 exec 方法返回结果的 groups 属性上引用该组名，同时，组的数字序号（matchObj[1]）依然有效，如果具名组没有匹配，对应的 groups 上的属性依旧存在，值为 undefined

#### 解构赋值和替换

有了具名组匹配以后，可以使用解构赋值直接从匹配结果上为变量赋值。

```javascript
let {
  groups: { one, two },
} = /^(?<one>.*):(?<two>.*)$/u.exec("foo:bar");
one; // foo
two; // bar
```

字符串替换时，使用\$<组名>引用具名组。

```javascript
let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
"2020-02-02".replace(re, "$<day>/$<month>/$<year>");
// '02/02/2020'
```

#### 正则内部的应用

如果要在正则表达式内部引用某个“具名组匹配”，可以使用\k<组名>的写法。

```javascript
const regTwice = /^(?<word>[a-z]+)!\k<word>$/;
regTwice.test("abc!abc"); // true
regTwice.test("abc!ab"); // false
```

还可以同时使用数字序号的引用（\1）。

```javascript
const regThree = /^(?<word>[a-z]+)!\k<word>!\1$/;
regThree.test("abc!abc!abc"); // true
regThree.test("abc!abc!ab"); // false
```

#### indices 属性

正则实例的 exec()方法，返回结果有一个 index 属性，可以获取整个匹配结果的开始位置，但是如果包含组匹配，每个组匹配的开始位置，很难拿到。

为 exec()方法的返回结果加上 indices 属性，在这个属性上面可以拿到匹配的开始位置和结束位置，如果正则表达式包含组匹配，那么 indices 属性对应的数组就会包含多个成员，提供每个组匹配的开始位置和结束位置

```javascript
const result = /ab+(cd)/.exec("zabbcdef");
result.index; // 1
result.indices; // [ [ 1, 6 ], [ 4, 6 ] ]
```

#### matchAll 方法

可以一次性取出所有匹配。不过它返回的是一个遍历器（Iterator），而不是数组。

```javascript
String.prototype.matchAll;
```

```javascript
// 转为数组方法一
[...string.matchAll(regex)];

// 转为数组方法二
Array.from(string.matchAll(regex));
```

### 数值的扩展

#### 二进制和八进制表示法

二进制和八进制分别使用 0b（或 0B）和 0o（或 0O）表示。如果要将 0b 和 0o 前缀的字符串数值转为十进制，要使用 Number 方法。

#### 新增方法

- Number.isFinite()：用来检查一个数值是否为有限的（finite），即不是 Infinity。
- Number.isNaN()：用来检查一个值是否为 NaN。

> 它们与传统的全局方法 isFinite()和 isNaN()的区别在于，传统方法先调用 Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，

- Number.parseInt()
- Number.parseFloat()
- Number.isInteger()：用来判断一个数值是否为整数。
- Number.EPSILON：实际上是 JavaScript 能够表示的最小精度，可以用来设置“能够接受的误差范围”，比如，误差范围设为 2 的-50 次方（即 Number.EPSILON \* Math.pow(2, 2)），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等，解决 0.1 + 0.2 === 0.3 结果为 false 的问题。
- 安全整数和 Number.isSafeInteger()：Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 这两个常量，用来表示这个范围的上下限，isSafeInteger()用来判断一个整数是否落在这个范围之内。

#### Math 对象的扩展

- Math.trunc()：用于去除一个数的小数部分，返回整数部分。
- Math.sign()：用来判断一个数到底是正数、负数、还是零。
- Math.cbrt()：用于计算一个数的立方根。
- Math.clz32()：返回一个数的 32 位无符号整数形式有多少个前导 0。
- Math.hypot()：返回所有参数的平方和的平方根。

### 函数的扩展

#### 函数参数的默认值

```javascript
function sum(x = 0, y = 0) {
  return x + y;
}
sum(1, 2); // 3
sum(1); // 1
sum(); // 0
```

> 注意：
>
> - 参数变量是默认声明的，所以不能用 let 或 const 再次声明；
> - 使用参数默认值时，函数不能有同名参数；
> - 指定了默认值以后，函数的 length 属性，将返回没有指定默认值的参数个数；
> - 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context），不会影响全局的作用域或函数内部的作用域；

#### rest 参数

rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用 arguments 对象 ，其变量是一个数组，该变量将多余的参数放入数组中。

```javascript
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}
add(1, 2, 3); // 6
```

#### 箭头函数

ES6 允许使用“箭头”（=>）定义函数。

```javascript
let add = (x, y) => {
  return x + y;
};
add(1, 2); // 6
```

如果参数只有一个可以省略圆括号，如果函数体只有一条语句可以省略花括号和 return。

```javascript
let add4 = (x) => x + 4;
add(1); // 5
```

使用箭头函数的注意事项：

- 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

- 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。

- 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数

除了 this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。于箭头函数没有自己的 this，所以当然也就不能用 call()、apply()、bind()这些方法去改变 this 的指向。

#### 双冒号运算符

函数绑定运算符是并排的两个冒号（::），用来取代 call、apply、bind 调用，双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即 this 对象），绑定到右边的函数上面。

#### 函数参数的尾逗号

ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。

#### catch 命令的参数省略

ES2019 允许 catch 语句省略参数。

```javascript
try {
  // ...
} catch (e) {
  // ...
}

// 允许省略参数

try {
  // ...
} catch {
  // ...
}
```

### 数组的扩展

#### 扩展运算符

扩展运算符（spread）是三个点（...）,将一个数组转为用逗号分隔的参数序列。

#### 新增方法

- Array.from():用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象
- Array.of()：Array.of 方法用于将一组值，转换为数组。
- copyWithin(target, start = 0, end = this.length)：在当前数组内部，将指定位置的成员复制到其他位置。
  - target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
  - start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
  - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
- 数组实例方法 find()：找出第一个符合条件的数组成员，它的参数是一个回调函数。
- 数组实例方法 findIndex()：返回第一个符合条件的数组成员的位置，它的参数也是一个回调函数。
- 数组实例方法 fill()：使用给定值，填充一个数组，其还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
- 数组实例方法 entries()：对键值对的遍历，返回一个遍历器对象，可以用 for...of 循环进行遍历。
- 数组实例方法 keys()：对键名的遍历，返回一个遍历器对象，可以用 for...of 循环进行遍历。
- 数组实例方法 values()：对键值的遍历，返回一个遍历器对象，可以用 for...of 循环进行遍历。

#### 数组空位

ES6 则是明确将空位转为 undefined。

#### 增加 sort 排序的稳定性

原来的默认排序算法是否稳定，是留给浏览器自己决定，导致某些实现是不稳定的，ES2019 明确规定，Array.prototype.sort()的默认排序算法必须稳定。

### 对象的扩展

#### 简洁表示法

直接用变量名作属性名。

```javascript
let a = "123";
let b = { a };

// 等同于
let b = { a: a };
```

#### 属性名表达式

可以用[表达式]作为对象的属性名。

```javascript
let obj = {};
obj["a" + "bc"] = 123; // {"abc":123}
```

#### 方法的 name 属性

对象也是函数，返回方法名。

```javascript
const person = {
  say() {
    console.log("hello!");
  },
};

person.say.name; // "say"
```

#### super 关键字

新增了一个关键字 super，指向当前对象的原型对象。super 关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

#### 扩展运算符号

对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

#### 链式判断运算符

如果读取对象内部的某个属性，往往需要判断一下该对象是否存在。比如，要读取 a.b.c.d，安全的写法应该时：

```javascript
let value = (a && a.b && a.b.c && a.b.c.d) || "default";
```

这样的层层判断非常麻烦，因此 ES2020 引入了“链判断运算符”（optional chaining operator）?.，简化上面的写法:

```javascript
let value = a?.b?.c?.d || "default";
```

#### Null 判断运算符

如果某个属性的值是 null 或 undefined，有时候需要为它们指定默认值。常见做法是通过 || 运算符指定默认值。

```javascript
let value = obj.a || "default";
```

但是属性的值如果为空字符串或 false 或 0，默认值也会生效。为了避免这种情况，ES2020 引入了一个新的 Null 判断运算符 ??。它的行为类似 ||，但是只有运算符左侧的值为 null 或 undefined 时，才会返回右侧的值。

```javascript
let value = obj.a ?? "default";
```

> ??运算符有一个运算优先级问题，它与 && 和 || 的优先级孰高孰低。现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。

#### 新增方法

- Object.is()：与===行为相同，不同之处只有两个：一是+0 不等于-0，二是 NaN 等于自身。
- Object.assign()：用于对象的合并，将源对象（source）的所有可枚举属性，浅复制到目标对象（target）。如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
- Object.getOwnPropertyDescriptors()：返回指定对象所有自身属性（非继承属性）的描述对象。
- Object.setPrototypeOf()：读取对象的原型。
- Object.getPrototypeOf()：设置对象的原型。
- Object.entries()：对键值对的遍历，返回一个遍历器对象，可以用 for...of 循环进行遍历。
- Object.keys()：对键名的遍历，返回一个遍历器对象，可以用 for...of 循环进行遍历。
- Object.values()：对键值的遍历，返回一个遍历器对象，可以用 for...of 循环进行遍历。
- Object.fromEntries():entries()方法的逆操作，将一个键值对数组转为对象。

### Symbol

#### 创建

Symbol 是一种新的原始数据类型，表示独一无二的值，它是 JavaScript 语言的第七种数据类型 undefined、null、Boolean、String、Number、Object

Symbol 值通过 Symbol()函数生成。

```javascript
// 可以带参数表示区分，如果参数相同，生成的Symbol类型的值也不一样
let s1 = Symbol();
let s2 = Symbol("foo");
let s3 = Symbol("foo");
s1 === s2; // false
s2 === s3; // false
```

> 注意:
>
> - Symbol 值不能与其他类型的值进行运算，会报错。
> - Symbol 值可以显式转为字符串。
> - Symbol 值也可以转为布尔值，但是不能转为数值。

#### description 属性

ES2019 提供了一个实例属性 description，直接返回 Symbol 的描述。

```javascript
let s1 = Symbol("foo");
s1.description; // "foo"
```

#### 用作属性名

Symbol 值作为对象属性名时，不能用点运算符，只能用[]运算符，并且该属性还是公开属性，不是私有属性。

#### 属性名的遍历

只有 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名，返回类型数组。

#### Symbol 方法

- Symbol.for()：接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
- Symbol.keyFor()：方法接收一个字符串作为参数，返回该字符串已登记的 Symbol 类型值的 key，如果未登记，则返回 undefined;

### Set 和 Map

#### Set

Set 是新的数据结构，类似于数组，但是成员的值都是唯一的，没有重复的值。

Set 本身是一个构造函数，用来生成 Set 数据结构，构造函数可接收一个类数组作为参数。

```javascript
const set = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach((x) => set.add(x));

for (let i of s) {
  // 输出 2,3,4,5 表明 Set 结构不会添加重复的值
  console.log(set);
}
```

Set 实例的属性和方法：

- Set.prototype.constructor：构造函数，默认就是 Set 函数。
- Set.prototype.size：返回 Set 实例的成员总数。
- Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
- Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- Set.prototype.has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
- Set.prototype.clear()：清除所有成员，没有返回值。

#### WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合，但 WeakSet 的成员只能是对象，而不能是其他类型的值，而且 WeakSet 中的对象都是弱引用，也即是说垃圾回收机制回收引用时会忽略 WeakSet 对该对象的引用。

创建与 Set 类似，实例化对象时可接收一个类数组作为参数。

```javascript
const arr = [
  [1, 2],
  [3, 4],
];
const weakSet = new WeakSet(arr);
// weakSet {[1, 2], [3, 4]}
```

WeakSet 实例的属性和方法：

- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在。

#### Map

Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

Map 构造函数可接收一个类数组作为参数。

```javascript
const map = new Map();

// 或者

const map = new Map([
  ["name", "张三"],
  ["title", "Author"],
]);

map.size; // 2
map.has("name"); // true
map.get("name"); // "张三"
```

Map 实例的属性和方法：

- Map.prototype.size 属性：返回 Map 结构的成员总数。
- Map.prototype.set(key, value)：设置键名 key 对应的键值为 value，如果 key 已经有值，则键值会被更新，否则就新生成该键。
  set 方法返回的是当前的 Map 对象，因此可以采用链式写法。
- Map.prototype.get(key)：get 方法读取 key 对应的键值，如果找不到 key，返回 undefined。
- Map.prototype.has(key)：返回一个布尔值，表示某个键是否在当前 Map 对象之中。
- Map.prototype.delete(key):删除某个键，返回 true。如果删除失败，返回 false。
- Map.prototype.clear():清除所有成员，没有返回值。
- Map.prototype.keys()：返回键名的遍历器。
- Map.prototype.values()：返回键值的遍历器。
- Map.prototype.entries()：返回所有成员的遍历器。
- Map.prototype.forEach()：遍历 Map 的所有成员。

#### WeakMap

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。与 Map 不同，WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名；其次，WeakMap 的键名所指向的对象，不计入垃圾回收机制。

WeakMap 实例的属性和方法：

- Map.prototype.set(key, value)：设置键名 key 对应的键值为 value，如果 key 已经有值，则键值会被更新，否则就新生成该键。
  set 方法返回的是当前的 Map 对象，因此可以采用链式写法。
- Map.prototype.get(key)：get 方法读取 key 对应的键值，如果找不到 key，返回 undefined。
- Map.prototype.has(key)：返回一个布尔值，表示某个键是否在当前 Map 对象之中。
- Map.prototype.delete(key):删除某个键，返回 true。如果删除失败，返回 false。

### Proxy

#### 概述

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

Proxy 本身是一个构造函数，接收两个参数，用来生成代理实例。

- target：目标对象，可以是任何类型的对象，包括对象、数组、函数，甚至是另一个代理。

- handler：接收一个处理对象，其属性是当执行一个操作时，定义代理行为的函数。

```javascript
let p = new Proxy(target, handler);
```

例如：

```javascript
let person = {
  name: "张三",
};
// 设置 person 的代理对象
let proxy = new Proxy(person, {
  // 代理获取属性事件
  get: function (target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError('Property "' + property + '" does not exist.');
    }
  },
  // 代理设置属性事件
  set: function (target, property, value) {
    if (property in target) {
      target[property] = value;
    } else {
      throw new ReferenceError('Property "' + property + '" does not exist.');
    }
  },
});

proxy.name; // "张三"
proxy.age; // 抛出一个错误
```

> 注意：要让 Proxy 起作用，必须针对 Proxy 实例（上例是 proxy 对象）进行操作，而不是针对目标对象（上例是空对象）进行操作

Proxy 支持的拦截操作如下：

- get(target, propKey, receiver)：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。
- set(target, propKey, value, receiver)：拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。
- has(target, propKey)：拦截 propKey in proxy 的操作，返回一个布尔值。
- deleteProperty(target, propKey)：拦截 delete proxy[propKey]的操作，返回一个布尔值。
- ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy)、Object.- - getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
- getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
- defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
- preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值。
- getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象。
- isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值。
- setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)，返回的必须是一个对象。

#### Proxy.revocable()

返回一个可取消的 Proxy 实例。

```javascript
let target = {};
let handler = {};

let { proxy, revoke } = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo; // 123

revoke();
proxy.foo; // TypeError: Revoked
```

使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

#### this 问题

Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理，this 指向的变化，会导致 Proxy 无法代理目标对象。这是需要我们手动改变 this 指向原对象。

例如：

```javascript
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// this 指向 proxy ，所以无法调用 getDate 方法
// TypeError: this is not a Date object.
```

改变 this 指向：

```javascript
const target = new Date();
const handler = {
  get(target, property) {
    return target.getDate.bind(target); // 将 this 绑定原始对象
  },
};
const proxy = new Proxy(target, handler);

proxy.getDate();
```

### Reflect

反射，是一个内置对象，提供了可拦截 JavaScript 操作的方法，Reflect 不是一个构造函数，因此它不能通过 new 关键字进行实例化。

Reflect 设计的目的：

- 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法。
- 修改某些 Object 方法的返回结果，让其变得更合理。
- 让 Object 操作都变成函数行为。比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name)和 Reflect.deleteProperty(obj, name)让它们变成了函数行为
- Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。不管 Proxy 怎么修改默认行为，都通过 Reflect 获取默认行为。

Reflect 的静态方法：

- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

例子：

```javascript
let obj = {
  foo: 1,
  bar: 1,
  get baz() {
    return this.foo + this.bar;
  },
};

let myReceiver = {
  foo: 2,
  bar: 2,
};
Reflect.get(obj, "baz"); // 2
Reflect.get(obj, "baz", myReceiver); // 4
```

> 注意：当 get 和 set 方法传入 receiver 参数时，原对象 （target） 中的 this 指向会变成 receiver。

### Promise

#### 概述

所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

特点：

- 对象的状态不受外界影响。Promise 有三种状态： pending（进行中）、fulfilled（已成功）和 rejected（已失败）

- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。

缺点：

- 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
- 当处于 pending 状态时，无法得知目前进展到哪一个阶段。

#### 创建

Promise 对象是一个构造函数，用来生成 Promise 实例。该构造函数接收一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。

```javascript
const promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

> resolve 函数的作用主要是将 Promise 对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved）；reject 函数的作用是，将 Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected）。

#### 实例属性和方法

- Promise.prototype.then()：then 方法的第一个参数是 resolved 状态的回调函数，第二个参数（可选）是 rejected 状态的回调函数。then 方法返回的是一个新的 Promise 实例，可以采用链式调用。
- Promise.prototype.catch()：是.then(null, rejection)的别名，用于指定发生错误时的回调函数。建议总是使用 catch 方法，而不使用 then 方法的第二个参数。
- Promise.prototype.finally()：用于指定不管 Promise 对象最后状态如何，都会执行的操作。
- Promise.all()：用于将多个成功的 Promise 实例，包装成一个新的 Promise 实例。全部的 Promise 实例的状态都变成 fulfilled，包装实例的状态才会变成 fulfilled。只要有一个被 rejected，包装实例的状态就变成 rejected，此时第一个被 reject 的实例的返回值，就传递给包装实例的回调函数。
- Promise.race()：用于将多个 Promise 实例，包装成一个新的 Promise 实例。多个 Promise 实例中有一个实例率先改变状态，包装实例的状态就跟着改变，那个率先改变的 Promise 实例的返回值，就传递给包装实例的回调函数。
- Promise.any()：用于将多个 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成 fulfilled 状态，包装实例就会变成 fulfilled 状态；如果所有参数实例都变成 rejected 状态，包装实例就会变成 rejected 状态。
- Promise.resolve()：将现有对象转为 Promise 对象，该实例的状态为 resolved。
- Promise.reject()：会返回一个新的 Promise 实例，该实例的状态为 rejected。

### Iterator

Iterator（遍历器）是一种接口，为各种不同的数据结构提供统一的访问机制

Iterator 的遍历过程是这样的：

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

2. 第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员。

3. 第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。

4. 不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。

每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 value 和 done 两个属性的对象。其中，value 属性是当前成员的值，done 属性是一个布尔值，表示遍历是否结束。

创建遍历器：

```javascript
function idMaker() {
  let index = 0;
  return {
    next: function () {
      return { value: index++, done: false };
    },
  };
}
let it = idMaker();
it.next().value; // 0
it.next().value; // 1
it.next().value; // 2
// ...
```

idMaker 是一个遍历器生成函数，作用就是返回一个遍历器对象，即是指针对象；

#### 默认的 Iterator 接口

默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，Symbol.iterator 属性本身是一个函数，就是当前数据结构默认的遍历器生成函数，执行这个函数，就会返回一个遍历器。

```javascript
const obj = {
  [Symbol.iterator]: function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true,
        };
      },
    };
  },
};
```

上面代码中，对象 obj 是可遍历的（iterable），因为具有 Symbol.iterator 属性。执行这个属性对应的方法，就会返回一个遍历器对象。该对象的根本特征就是具有 next 方法，每次调用 next 方法，都会返回一个代表当前成员的信息对象，具有 value 和 done 两个属性。

原生具备 Iterator 接口的数据结构如下：

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

例如数组：

```javascript
let arr = ["a", "b", "c"];
let iter = arr[Symbol.iterator]();

iter.next(); // { value: 'a', done: false }
iter.next(); // { value: 'b', done: false }
iter.next(); // { value: 'c', done: false }
iter.next(); // { value: undefined, done: true }
```

调用数组 Symbol.iterator 属性对应的方法，即可创建一个遍历对象，对数组进行遍历。

#### return() 和 throw()

遍历器函数生成的遍历器对象除了 next 方法以外，还有 return 方法和 throw 方法。

在循环遍历的过程中，如果 for...of 循环提前退出（通常是因为出错，或者有 break 语句），就会调用遍历器对象的 return 方法。

#### for...of 循环

一个数据结构可以用 for...of 循环遍历它的成员，必须要具有 Symbol.iterator 属性，因为 for...of 循环的内部实现，调用的就是数据结构的 Symbol.iterator 属性。

> 注意：并不是所有拥有 Symbol.iterator 属性的数据结构都可以被 for...of 循环遍历。例如我们上述自定义的 obj，他虽然具有 Symbol.iterator 属性，但这个属性对应的函数并不是真正意义上的遍历器对象的生成函数。只有 Symbol.iterator 所对应的属性值，是通过生成器（Generator）方式实现的函数，才能被 for...of 循环遍历。

例如：

```javascript
const obj = {
  // 用生成器实现遍历器生成函数
  [Symbol.iterator]: function* () {
    yield 1;
  },
};
```

### Generator

#### 概述

Generator 函数是一个状态机，封装了多个内部状态。

Generator 是一个普通的函数，但是有两个特征：

- function 关键字与函数名之间有一个星号；
- 函数体内部使用 yield 表达式，定义不同的内部状态（yield 在英语里的意思就是“产出”）；

```javascript
function* foo() {
  yield "start";
  yield "middle";
  return "end";
}
let fooIterator = foo();
fooIterator.next(); // {value: "start", done: false}
fooIterator.next(); // {value: "middle", done: false}
fooIterator.next(); // {value: "end", done: true}  如果没有return语句，则value属性的值为undefined
fooIterator.next(); // {value: undefined, done: true}
```

定义了一个 Generator 函数 foo，它内部有两个 yield 表达式（start 和 middle 和 return 语句（结束执行）。该函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，即是遍历器对象（Iterator Object）。

#### yield 表达式

由于 Generator 函数返回的遍历器对象，只有调用 next 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数，yield 表达式就是暂停标志。

next 方法的运行逻辑如下：

- 遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值；
- 下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式；
- 如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值；
- 如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined

值得注意的是，yield 表达式后面的表达式，只有当调用 next 方法、内部指针指向该语句时才会执行（惰性求值）。例如：

```javascript
function* add() {
  yield 123 + 456;
}
```

yield 后面的表达式 123 + 456，不会立即求值，只会在 next 方法将指针移到这一句时，才会求值。

#### next 方法

yield 表达式本身没有返回值，或者说总是返回 undefined。next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值。

```javascript
function* add() {
  let y = 0;
  while (true) {
    let nextArg = yield ++y; // a 为 undefined
    if (nextArg) {
      y = 0;
    }
  }
}
let g = add();
g.next(); // { value: 1, done: false }
g.next(); // { value: 2, done: false }
g.next(); // { value: 3, done: false }
g.next(true); // { value: 1, done: false }
```

上面代码先定义了一个可以无限运行的 Generator 函数 add，如果 next 方法没有参数，每次运行到 yield 表达式，变量 nextArg 的值总是 undefined。当 next 方法带一个参数 true 时，变量 nextArg 就被重置为这个参数（即 true），因此 y 会等于 0，下一轮循环就会从 0 开始递增。

> 注意，由于 next 方法的参数表示上一个 yield 表达式的返回值，所以在第一次使用 next 方法时，传递参数是无效的。

#### throw 方法

Generator 函数返回的遍历器对象，都有一个 throw 方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。

```javascript
function* add() {
  try {
    yield;
  } catch (e) {
    console.log("内部捕获", e);
  }
}
let g = add();
g.next();
try {
  g.throw("a");
  g.throw("b");
} catch (e) {
  console.log("外部捕获", e);
}
// 内部捕获 a
// 外部捕获 b
```

遍历器对象 g 连续抛出两个错误。第一个错误被 Generator 函数体内的 catch 语句捕获。g 第二次抛出错误，由于 Generator 函数内部的 catch 语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的 catch 语句捕获。

throw 方法可以接受一个参数，该参数会被 catch 语句捕获，建议抛出 Error 对象的实例。

> 注意：
>
> - 遍历器对象的 throw()方法。和全局的 throw() 是不一样的，后者只能被函数体外的 catch 语句捕获。
> - Generator 函数内部没有部署 try...catch 代码块，所以抛出的错误直接被外部 catch 代码块捕获。
> - 如果 Generator 函数内部和外部，都没有部署 try...catch 代码块，那么程序将报错，直接中断执行。
> - throw 方法抛出的错误必须至少执行过一次 next 方法才能被内部捕获。

#### return 方法

Generator 函数返回的遍历器对象，还有一个 return 方法，可以返回给定的值，并且终结遍历 Generator 函数。

```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

let g = gen();

g.next(); // { value: 1, done: false }
g.return("foo"); // { value: "foo", done: true }
g.next(); // { value: undefined, done: true }
```

如果 return 方法调用时，不提供参数，则返回值的 value 属性为 undefined。

#### yield\*

如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。yield\*表达式，可以用来在一个 Generator 函数里面执行另一个 Generator 函数。

```javascript
function* a() {
  yield 1;
  yield 2;
}

function* b() {
  yield* a();
}
```

#### Generator 函数中的 this

Generator 函数不是普通的构造函数，也不能跟 new 命令一起使用，否则会报错。

```javascript
function* F() {
  yield (this.x = 2);
  yield (this.y = 3);
}

new F();
// TypeError: F is not a constructor
```

如果想用 next 方法，又能获得正常的 this，需要对 Generator 函数进行改造。

方法一：生成一个空对象，并使用 call 方法将其绑定给 Generator 函数。

```javascript
function* F() {
  yield (this.x = 2);
  yield (this.y = 3);
}

let f = F.call({});
```

方法二：原理同一，使用 call 方法将 F.prototype 绑定给 Generator 函数。

```javascript
function* F() {
  yield (this.x = 2);
  yield (this.y = 3);
}

let f = F.call(F.prototype);
```

### async

#### 概述

async 是 Generator 的语法糖，async 与 Generator 的区别就是， async 函数将 Generator 函数的星号（\*）替换成 async，将 yield 替换成 await，仅此而已。

```javascript
async function F() {
  await promiseFunction();
}
```

特点：

- 内置执行器：Generator 函数的执行必须靠执行器，所以才有了 co 模块，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，方法名后面跟圆括号即可。
- 更好的语义：async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
- 更广的适用性：co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象。
- 返回值是 Promise。

基本用法：

```javascript
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName("goog").then((result) => {
  console.log(result);
});
```

#### 错误处理

如果 await 后面的异步操作出错，那么等同于 async 函数返回的 Promise 对象被 reject，导致 async 函数的 catch 方法的回调函数可以被调用。

为了防止出错，可用 try...catch 结构进行捕获处理，果有多个 await 命令，可以统一放在 try...catch 结构中。

```javascript
async function getStockPriceByName(name) {
  try {
    const symbol = await getStockSymbol(name);
    const stockPrice = await getStockPrice(symbol);
    return stockPrice;
  } catch (e) {
    throw new Error("出错了");
  }
}

// 如果异步执行成功，则打印价格结果，如果执行出错，则打印错误对象
getStockPriceByName("goog")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
```

### Class

ES5 中生成实例对象的传统方法是通过构造函数：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.toString = function () {
  return "(" + this.name + ", " + this.age + ")";
};

let p = new Person("张三", 18);
```

ES6 中提供了语法糖 class 让对象原型的写法更清晰，更像面向对象编程的语法：

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  toString() {
    return "(" + this.name + ", " + this.age + ")";
  }
}

let p = new Person("张三", 18);
```

其中，constructor 就是构造函数，而 this 关键字则代表实例对象。

构造函数的 prototype 属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的 prototype 属性上面，例如：

```javascript
class Person {
  constructor() {}

  toString() {}
}

// 等同于

Person.prototype = {
  constructor() {},
  toString() {},
};
```

在类的实例上面调用方法，其实就是调用原型上的方法，但 ES6 中定义的类的方法是不可枚举的，而用采用 ES5 的方式定义原型方法则是可枚举的。

#### constructor 方法

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，会默认添加一个空的 constructor 方法。

```javascript
class Person {}

// 等同于

class Person {
  constructor() {}
}
```

> 注意：constructor 方法默认返回实例对象（即 this），但也可以指定返回其他对象。

#### 类的实例

生成类的实例的写法，与 ES5 完全一样，也是使用 new 命令。

与 ES5 一样，实例的属性除非显式定义在其本身（即定义在 this 对象上），否则都是定义在原型上（即定义在 class 上）。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  toString() {
    return "(" + this.name + ", " + this.age + ")";
  }
}

let p = new Person("张三", 18);
p.hasOwnProperty("x"); // true
p.hasOwnProperty("y"); // true
p.hasOwnProperty("toString"); // false
p.__proto__.hasOwnProperty("toString"); // true
```

name 和 age 都是实例对象 point 自身的属性（因为定义在 this 变量上），所以 hasOwnProperty 方法返回 true，而 toString 是原型对象的属性（因为定义在 Point 类上），所以 hasOwnProperty 方法返回 false。这些都与 ES5 的行为保持一致。

与 ES5 一样，类的所有实例共享一个原型对象。

```javascript
let p1 = new Person("张三", 18);
let p2 = new Person("李四", 18);

p1.__proto__ === p2.__proto__; //true
```

p1 和 p2 的原型都是 Person.prototype，所以\_\_proto\_\_属性是相等的，这也意味着可以通过实例的\_\_proto\_\_属性为“类”添加方法。

但为了避免对环境产生依赖，通常不建议这么做，而是使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再为原型添加方法/属性。

#### 取值函数（getter）和存值函数（setter）

在“类”的内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class Person {
  constructor(name, age) {
    this.name = name; // 执行setter
    this.age = age;
  }

  get name() {
    console.log("getter");
    return name + "haha"; // 变量名和函数名相同才能读取原来的值
  }

  set name(value) {
    console.log("setter");
    name = value + "123"; // 变量名和函数名相同才能被赋值
  }
}
let p = new Person("张三", 18);
p.name; // "getter" "张三123haha"
p.name = "李四"; // "setter"
p.name; // "getter" "李四123haha"
```

属性有对应的存值函数和取值函数，因此赋值和读取行为都被拦截了。

注意：

- 类和模块的内部，默认是严格模式；
- 类不存在变量提升（hoist）；
- 类的 name 属性总是返回紧跟在 class 关键字后面的类名；
- 如果类的某个方法之前加上星号（\*），就表示该方法是一个 Generator 函数；
  > - 类的方法内部的 this 默认指向类的实例。

#### 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

静态方法不能被类的实例调用，只能由类来直接调用。

```javascript
class People {
  static say() {
    return "hello";
  }
  say() {
    return "hi";
  }
}

People.say(); // 'hello'

var p = new People();
p.say();
// TypeError: p.sayis not a function
```

> 注意，
>
> - 如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例。
> - 静态方法可以与非静态方法重名。

父类的静态方法，可以被子类继承，也可以从 super 对象上调用的。

```javascript
class People {
  static say() {
    return "hello";
  }
}

class Student extends People {}

class Teacher extends People {
  // 重写 say 方法，调用原来的方法，并增加特有的内容
  static say() {
    return super.say() + " everyone";
  }
}
Student.say(); // 'hello'
Teacher.say(); // 'hello everyone'
```

#### 属性置顶

实例属性除了定义在 constructor()方法里面的 this 上面，也可以定义在类的最顶层。

```javascript
class Foo {
  constructor() {
    this.bar = "hello";
    this.baz = "world";
  }
}

// 或者

class Foo {
  bar = "hello";
  baz = "world";

  constructor() {}
}
```

#### 静态属性

与静态方法相似，只能通过类自身来调用。

```javascript
class People {
  static myStaticProp = "hello world";
  constructor() {
    console.log(MyClass.myStaticProp); // "hello world"
  }
}
```

#### new.target 属性

new 是从构造函数生成实例对象的命令。ES6 为 new 命令引入了一个 new.target 属性，该属性一般用在构造函数之中，返回 new 命令作用于的那个构造函数。如果构造函数不是通过 new 命令或 Reflect.construct()调用的，new.target 会返回 undefined，因此这个属性可以用来确定构造函数是怎么调用的。

### Class 继承

Class 可以通过 extends 关键字实现继承。

```javascript
class People {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  toString() {
    return this.name + "-" + this.age; // 调用父类的toString()
  }
}
class Student extends People {
  constructor(name, age, sex) {
    super(name, age); // 调用父类的constructor(x, y)
    this.sex = sex;
  }

  toString() {
    return super.toString() + "-" + this.sex; // 调用父类的toString()
  }
}
```

constructor 方法和 toString 方法之中，都出现了 super 关键字，它在这里表示父类的构造函数，用来新建父类的 this 对象。

子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。

> 注意：
>
> - 如果子类没有定义 constructor 方法，则默认添加的 constructor 会自己隐式的调用 super(...arguments)。
> - 子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错。

#### Object.getPrototypeOf()

该方法可以用来从子类上获取父类，因此可以使用这个方法判断，一个类是否继承了另一个类。

```javascript
Object.getPrototypeOf(Student) === People; // true
```

#### super 关键字

super 这个关键字，既可以当作函数使用，也可以当作对象使用：

- super 作为函数调用时，只能用在子类的构造函数之中，代表父类的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B 的实例。

- super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

super 作为对象时，由于 super 指向父类的原型对象，所以定义在父类实例上（constructor 函数内部）的方法或属性，是无法通过 super 调用的。下面代码中，p 是父类 A 实例的属性，super.p 就引用不到它。

```javascript
class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}

let b = new B();
b.m; // undefined
```

在子类普通方法中通过 super 对象调用父类的方法时，方法内部的 this 指向当前的子类实例。即，如果子类和父类具有同名实例属性（构造函数中的属性），并且在子类普通方法中调用父类读取该属性的方法时，获取到的是子类实例的值。

```javascript
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m(); // 2
```

上面代码中，super.print()虽然调用的是 A.prototype.print()，但是 A.prototype.print()内部的 this 指向子类 B 的实例，导致输出的是 2，而不是 1。也就是说，实际上执行的是 super.print.call(this)。

#### 类的 prototype 属性和 \_\_proto\_\_ 属性

ES5 中每一个对象都有 \_\_proto\_\_ 属性，指向对应的构造函数的 prototype 属性。Class 作为构造函数的语法糖，同时有 prototype 属性和 \_\_proto\_\_ 属性，因此同时存在两条继承链。

- 子类的 \_\_proto\_\_ 属性，表示构造函数的继承，总是指向父类

- 子类 prototype 属性的 \_\_proto\_\_ 属性，表示方法的继承，总是指向父类的 prototype 属性。

例如：

```javascript
class A {}

class B extends A {}

B.__proto__ === A; // true
B.prototype.__proto__ === A.prototype; // true
```

#### 实例的 \_\_proto\_\_ 属性

子类实例的 \_\_proto\_\_ 属性的 \_\_proto\_\_ 属性，指向父类实例的 \_\_proto\_\_ 属性。也就是说，子类实例的原型的原型，是父类的原型。

```javascript
class A {}

class B extends A {}

let a = new A();
let b = new B();

b.__proto__ === a.__proto__; // false
b.__proto__.__proto__ === a.__proto__; // true
```

#### 原生构造函数的继承

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

以前，这些原生构造函数是无法继承的，比如，不能自己定义一个 Array 的子类。之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过 Array.apply()或者分配给原型对象都不行。原生构造函数会忽略 apply 方法传入的 this，也就是说，原生构造函数的 this 无法绑定，导致拿不到内部属性。

ES5 是先新建子类的实例对象 this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。

ES6 则是先新建父类的实例对象 this，然后再用子类的构造函数修饰 this，使得父类的所有行为都可以继承。

> 注意：继承 Object 的子类，有一个行为差异，继承 Object 的子类，无法通过 super 方法向父类 Object 传参，因为 ES6 改变了 Object 构造函数的行为，一旦发现 Object 方法不是通过 new Object()这种形式调用，ES6 规定 Object 构造函数会忽略参数。

#### Mixin 模式的实现

将多个类的接口“混入”（mix in）另一个类。

```javascript
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  // 读取对象的所有属性
  for (let key of Reflect.ownKeys(source)) {
    // 复制属性
    if (key !== "constructor" && key !== "prototype" && key !== "name") {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```

### Module

#### 概述

ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，再通过 import 命令输入。

优势：

- “编译时加载”或者静态加载。
- 不再需要 UMD 模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者 navigator 对象的属性。
- 不再需要对象作为命名空间（比如 Math 对象），未来这些功能可以通过模块提供。

#### 严格模式

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。

- 主要有以下限制：
- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用 with 语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量 delete prop，会报错，只能删除属性 delete global[prop]
- eval 不会在它的外层作用域引入变量
- eval 和 arguments 不能被重新赋值
- arguments 不会自动反映函数参数的变化
- 不能使用 arguments.callee(用于引用该函数的函数体内当前正在执行的函数)
- 不能使用 arguments.caller(函数对象的一个属性，用于保存调用当前函数的函数)
- 禁止 this 指向全局对象
- 不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈
- 增加了保留字（比如 protected、static 和 interface）

#### export 命令 和 improt 命令

模块功能主要由两个命令构成：export 和 import。export 命令用于规定模块的对外接口，import 命令用于输入其他模块提供的功能。

导出：

```javascript
// profile.js
var firstName = "Michael";
var lastName = "Jackson";
var year = 1958;

export { firstName, lastName, year };
```

引入：

```javascript
// main.js
import { firstName, lastName, year } from "./profile.js";
```

#### 模块的整体加载

用星号（\*）指定一个对象，所有输出值都加载在这个对象上面。

```javascript
// main.js
import * as user from "./profile.js";
user.firstName; // "Michael"
user.lastName; // "Jackson"
user.year; // 1958
```

#### export default 命令

export default 命令，为模块指定默认输出，其他模块加载该模块时，import 命令可以为默认模块指定任意名字。

导出时：

```javascript
// foo.js
function foo() {
  console.log("foo");
}
export default foo;
```

引入时:

```javascript
// zoo.js
import zoo from "./foo.js";
zoo(); // "foo"
```

export default 命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此 export default 命令只能使用一次。

export default 命令可以和 export 同时使用，表示一个模块既有默认导出，也是其他导出。

导出时：

```javascript
// foo.js
function foo() {
  console.log("foo");
}
function coo() {
  console.log("coo");
}
export { coo };
export default foo;
```

引入时:

```javascript
// zoo.js
import zoo, { coo } from "./foo.js";
zoo(); // "foo"
coo(); // "coo"
```

#### import() 方法

ES2020 提案 引入 import()函数，支持动态加载模块。

用途：

- 按需加载。
- 条件加载。
- 动态的模块路径。

### Decorator

装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。

#### 类的装饰

如下，testable 就是一个装饰器。它修改了 A 这个类的行为，为它加上了静态属性 isTestable。testable 函数的参数 target 是 A 类本身。

```javascript
@testable
class A {
  // ...
}

function testable(target) {
  target.isTestable = true; // 添加静态属性
}

A.isTestable; // true
```

装饰器其实就是一个对类进行处理的函数，装饰器函数的第一个参数，就是所要装饰的目标类。

如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。

```javascript
function testable(isTestable) {
  return function (target) {
    target.isTestable = isTestable; // 添加静态属性
    target.prototype.isWriteable = true; // 添加实例属性
  };
}

@testable(true)
class A {
  // ...
}
```

通过 Object.assign 合并的方式，实现混入装饰器：

```javascript
function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}

const List = {
  foo() {
    console.log("foo");
  },
};

@mixins(List)
class MyClass {}
let obj = new MyClass();
obj.foo(); // 'foo'
```

#### 方法的装饰

装饰器不仅可以装饰类，还可以装饰类的属性。

```javascript
class Person {
  @readonly
  name() {
    return `${this.first} ${this.last}`;
  }
}
function readonly(target, name, descriptor) {
  descriptor.writable = false; // 使得被装饰的属性或方法只读
  return descriptor;
}
```

与装饰类不同，装饰类的属性时，装饰器函数 readonly 一共可以接受三个参数。

- 第一个参数是类的原型对象；
- 第二个参数是所要装饰的属性名；
- 第三个参数是该属性的描述对象；

如果同一个方法有多个装饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。

```javascript
function desc(id) {
  console.log("test start", id);
  return (target, property, descriptor) => console.log("test end", id);
}

class Example {
  @desc(1)
  @desc(2)
  method() {}
}
// test start 1
// test start 2
// test end 2
// test end 1
```

#### 不能装饰函数

因为存在函数提升，装饰器只能用于类和类的方法，不能用于函数。如果一定要用装饰函数，可以采用高阶函数的形式直接执行。

```javascript
// 函数
function sayHello(name) {
  console.log("Hello, " + name);
}
// 利用高阶函数，包装原始函数
function loggingDecorator(wrapped) {
  return function () {
    console.log("Start");// 加入日志
    const result = wrapped.apply(this, arguments);// 执行sayHello
    console.log("End");
    return result;
  };
}

const wrapped = loggingDecorator(sayHello);
wrapped("张三");
// Start
// Hello, 张三
// End
```

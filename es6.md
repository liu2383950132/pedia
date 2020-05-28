# let 和 const 命令
<!-- 
  let 命令
  块级作用域
  const 命令
  顶层对象的属性
  globalThis 对象
-->

## let 命令
### var
> MDN : var declarations, wherever they occur, are processed before any code is executed.This is called hoisting 这 就是**提升**!!!
> var语句 执行在任何代码之前
> The scope of a variable declared with var is its current execution context and closures thereof, which is either the enclosing function and functions declared within it, or, for variables declared outside any function, global
> 函数外 var语句 声明的变量 作用域是全局
> 函数内 var语句 声明的变量 作用域是函数
// 1.
function fn() { var i = 0 }
console.log(i)// i is not defined
// 2.
{ var i = 0 }
console.log(i)// 0
// 3.
for (var i = 0; i < 3; i++) {}
console.log(i)// 3
// 4.
for (var x = 0; x < 3; x++) { var i = x * 2 }
console.log(i)
console.log(x)
// 4 3
> Duplicate variable declarations using var will not trigger an error(even in strict mode), and the variable will not lose its value, unless another assignment is performed.
> var重复声明1个变量不会报错，若第1次声明同时赋值，第2次声明(不同时赋值)不会覆盖该值
```js
var i = 'golden wind!!!'
var i
console.log(i)// 'golden wind!!!'
```
给全局添加成员的方法
```js
a = 1 // [[configurable]] === true
var b = 2 // [[configurable]] === false
window.c = 3 // [[configurable]] === true
delete a
delete b
delete c
a // a is not defined
b // 2
c // c is not defined
```
### for
var a = []
for (var i = 0; i < 10; i++) {
  a[i] = function () { console.log(i) }
}
a[4]() // 10
a[8]() // 10

for节奏 12 432 432 ...

1 var i = 0
2 i < 10

4 a[i] ...
3 i++
2 i < 10

432 432 ...

最后1次432
4 : a[9] = ...
3 : i++ => i===10;
2 : i < 10 返回 false;

for循环结束
一共10个函数，分别是a[0]~a[9]

for循环第1步var i = 0
并不是在函数内声明
所以i是全局变量

每个a[i]函数的执行都需要有i
因为var i 声明的i是全局变量
每个函数自己的上下文中并没有i

当需要函数执行时 a[4](); a[8]()
顺着作用域链找到全局变量i
该全局变量i已经是10( for 循环结束 )

a[0]() ~ a[9]()// 10

solution :
在全局变量i是10( for 循环结束 )之前
当全局作用域i分别是0 ~ 9的时候
就将 a[0] ~ a[9] 直接执行掉
那 a[0] ~ a[9] 拿到的i就是对应的正确(我们所期望)i

var a = []
for (var i = 0; i < 10; i++) {
  (function (i/*形参，可以同下面2个i一起改成其他标识符如j或者k*/) {
    a[i] = function () { console.log(i) }
  }(i/*实参,传的是i的值, 0~9*/))
}
a[4]()// 4
a[8]()// 8

### let语句
痛点
1.变量i泄露到全局
2.十个for循环，就有10个变量泄露
3.浪费资源(内存)
4.还可能和自己的其他变量发生名称冲突
5.IIFE的写法十分老太太裹脚布

solution :
> MDN : let和const声明的变量是有块级作用域的

var a = []
for (let i = 0; i < 10; i++) {
  a[i] = function () { console.log(i) }
}
a[4]() // 4
a[8]() // 8

每个a[i]函数的执行都需要有i
因为let声明的i有块级作用域
不会泄露到全局
这次每个函数自己的上下文中这次都有自己的i啦
不用顺着作用域链找全局i啦
// 这里的解释不够精准甚至有误
// 因为这里的重点是突出let对于var的对抗性
// 下面有深层的纠正
// 以及for循环的底层机制和let的化学反应
// 请耐心往下看

for循环的特点
for循环
  **设置循环变量** 部分 是一个父作用域
  **循环体** 内部 是一个单独的子作用域

for (father scope) {child scope}

prove :
同1块级作用域内部 let不可重复声明同1变量
{
  let i = 0
  let i = 1// Uncaught SyntaxError: Identifier 'i' has already been declared

  function fn(arg) { let arg; }
  // Uncaught SyntaxError: Identifier 'arg' has already been declared
}

{
  let i = '起飞'
  {
    let i = '芜湖'
    console.log(i)// '芜湖'
  }
  console.log(i)// '起飞'
}

for (let i = 0; i < 3; i++) {
  let i = 'wabiwabi'  
  console.log(i)
}// wabiwabi wabiwabi wabiwabi
 
说明**设置循环变量**部分 和 **循环体** 不是同1块级作用域
for循环抽象解构如下
(还记得**for节奏**吧 : 12 432 432 ...)
{
  // 12
  let i = 0
  i < 3

  // 432
  {
    let i = 'wabiwabi'  
    console.log(i)
  }
  i++
  i < 3

  // 432
  {
    let i = 'wabiwabi'  
    console.log(i)
  }
  i++
  i < 3

  ...
}

再看1个 : 
var a = []
for (let i = 0; i < 10; i++) {
  a[i] = function () { console.log(i) }
}
a[4]() // 4
a[8]() // 8

var a = []
for (let i = 0; i < 10;) {
  a[i] = function () { console.log(i) }
  i++
}
a[4]() // 5
a[8]() // 9

// i++ 在**设置循环变量**部分
{
  // 12
  let i = 0
  i < 10

  // 432
  {
    // 执行循环体之前
    // i 在循环体的上下文中 会被重新声明及初始化
    // 隐式地 i = 0
    a[i] = function () { console.log(i) }
    // a[0] 的作用域中的 i === 0
    // a[0]() 结果是 0
  }
  i++// i = i + 1 => i === 1
  i < 10

  // 432
  {
    // 隐式地 i = 1
    a[i] = function () { console.log(i) }
    // a[0] 的作用域中的 i === 1
    // a[0]() 结果是 1
  }
  i++
  i < 10

  ...
}

// i++ 在**循环体**
{
  // 12
  let i = 0
  i < 10

  // 42(无3)
  {
    // 隐式地 i = 0
    a[i] = function () { console.log(i) }
    i++// i = i + 1 => i === 1
    // a[0] 的作用域中的 i === 1
    // a[0]() 结果是 1
  }
  i < 10

  // 42(无3)
  {
    // 隐式地 i = 1
    a[i] = function () { console.log(i) }
    i++// i = i + 1 => i === 2
    // a[1] 的作用域中的 i === 2
    // a[1]() 结果是 2
  }
  i++
  i < 10

  ...
}


还记得 var语句的功能吗
> MDN : var declarations, wherever they occur, are processed **before any code** is executed.This is called hoisting 这 就是**提升**!!!
> var语句 执行在任何代码之前

是不是有些过于简单粗暴
类似样式的!important
很爽地解决了问题 但是后患无穷

var的这种变量声明提升
即变量可以在声明之前使用，值为undefined
其实是有些不太严谨

let就是为了渐渐替代var而出现
{
  var a = 1
  window.a // 1
  let b = 1
  window.b // undefined
}
let声明的变量不属于顶层对象window的成员
let语句所在块级作用域
let语句 **操作** 的变量不能在该语句前使用
// 这里使用 **操作** 1词，是因为let的行为有较大争议性，下面会讨论

{
  console.log(foo);// undefined
  var foo = 2

  console.log(bar)// bar is not defined
  bar
  {
    console.log(bar)
    // Uncaught ReferenceError: Cannot access 'bar' before **initialization**
    let bar = 2
  }
}

变量3个行为
  creation/declaration 创建/声明
  initialization 初始化
  assignment 赋值

// var 行为
{
  // 创建/声明 提升到顶部
  // 初始化 提升到顶部 跟随在 创建/声明 之后
  // 初始化值为undefined
  console.log(foo)// undefined
  var **foo = 2**// 这1步才是 **赋值** !!
}

// let 行为
{
  // 创建/声明 提升到顶部
  console.log(foo)
  // Uncaught ReferenceError: Cannot access 'foo' before **initialization**
  // 你没看错 报的错是 : 不能在foo**初始化**前访问foo!!
  let **foo = 2**// 这1步是 **初始化** !!
  // 如果仅仅 var foo, 则隐式 初始化 为值undefined
  foo = 'eren yeager'// 这1步是 **赋值**
}

// const 行为(类似let)
{
  // 创建/声明 提升到顶部
  console.log(foo)
  // Uncaught ReferenceError: Cannot access 'foo' before **initialization**
  const **foo = 2**// 这1步是 **初始化** !!
  foo = 2// Uncaught TypeError: **Assignment** to constant variable
  // const 声明的常量 **不可赋值**
  // 啰嗦1句就是相当于 不可赋值版本的let
}

let 还有1个特别有趣的行为(const同理)
根据上面我们的讨论
我们知道let的初始化机会只有1次
就是在let所在的整个语句
如果这次初始化失败了的话...
{
  let x = y
  // Uncaught ReferenceError: y is not defined

  // 或者...
  let x = (msg => {throw msg})('an error occur')
  // Uncaught an error occur

  // 或者...
  let x = undefined()
  // Uncaught TypeError: undefined is not a function

  let [x = y, y = 1] = []
  // 解构赋值失败
  // ReferenceError: bar is not defined


  如果let初始化失败
  该变量会处于
  *x is not defined* 和 *Identifier 'x' has already been declared*
  之间的1种 "奇妙" 状态
  x// Uncaught ReferenceError: x is not defined
  var x// Uncaught SyntaxError: Identifier 'x' has already been declared
  let x// Uncaught SyntaxError: Identifier 'x' has already been declared
  x = 2// Uncaught ReferenceError: x is not defined
  // 急了急了 x急了
}

虽然这种情况很少见
但是1个script元素内出错，其他script元素会继续执行
此时如果其他script元素引用了该变量x
就会导致其他script元素内js代码出错
<script>let x = foo;</script>
<script>typeof x</script>

**暂时性死区**
TDZ : temporary dead zone
TDZ本身不真实存在
只是用来总结1个现象的概念
本身没有过于复杂的含义
es6标准中没有出现这个短语

简而言之就是 let/const 语句的所在块级作用域里
let/const 语句 初始化的变量
在 let/const 语句 之前 不可访问(access)
在 let/const 语句 之前区域对于这些变量来说 就是tdz

function do_something() {
  // tdz 开始
  typeof foo// Cannot access 'foo' before initialization
  console.log(foo)// Cannot access 'foo' before initialization
  let foo // tdz 结束 隐式初始化成undefined
  console.log(foo)// undefined
}

{
  es6之前 typeof可以随便用 甚至可以用来操作未声明变量
  typeof foo// undefined
  var bar
  typeof bar// undefined
  // let/const 夺走了它的安全性
  typeof x// Cannot access 'x' before initialization
  let x

  但是可以用delete 操作x 尽管没有任何意义
  delete x // delete : 'tdz 是个什么东西？'
  let x = 'levi ackerman'
}

有些“死区”比较隐蔽，不太容易发现。
function bar(x = y, y = 2) {
  return [x, y];
}
bar(); // 报错

function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]


es5 只有全局作用域, 函数作用域
function f() {
  // 声明和初始化(隐式初始化为undefined) 提升到函数作用域顶部
  console.log(foo)// undefined
  // 由于没有块级作用域
  // if{}内部var 无视if{}
  if (0) { var foo = 'bar' }
}
f() // undefined

es6 块级作用域
function fn1() {
  let foo = 1
  if (1) { let foo = 2 }
  console.log(foo)
}
fn1()// 1


### 块级作用域之中声明函数

ES5 规定，函数不能在块级作用域声明

// 违法
if (true) { function f() {} }

为了兼容es5之前代码
浏览器没有遵守该规定
块级作用域之中声明函数不会报错

ES6 规定
允许函数在块级作用域声明
函数在块级作用域声明 行为类似于let

为了兼容以前的旧代码
ES6 在附录 B里面规定
**浏览器的实现**可以不遵守规定
ES6 的浏览器中函数声明类似于var

// es5 期望(规定)
function fn() { console.log('outer') }
(function () {
  if (0) { function fn() { console.log('inner') } }
  // 函数声明只能在全局和函数作用域 该函数声明按规定无效
  fn ? fn() : console.log('fn : ', fn)
}())// outer

// es5 实际(违规)
function fn() { console.log('outer') }
(function () {
  // 函数声明语句 声明&初始化&赋值 全提升
  if (0) { function fn() { console.log('inner') } }
  fn ? fn() : console.log('fn : ', fn)
}())// inner

// es6 期望(规定)
// 加上'use strict'可实现
function fn() { console.log('outer') }
(function () {
  if (0) { function fn() { console.log('inner') } }
  // === if (0) { let fn = function () {console.log('inner')} }
  fn ? fn() : console.log('fn : ', fn)
}())// outer

// es6 浏览器(附录)
function fn() { console.log('outer') }
(function () {
  // 声明&初始化 2提升
  if (0) { function fn() { console.log('inner') } }
  // === if (0) { var fn = function () {console.log('inner')} }
  fn ? fn() : console.log('fn : ', fn)
}())// undefined

不要在块级作用域内声明函数!
不要在块级作用域内声明函数!
不要在块级作用域内声明函数!
如果确实需要 写成函数表达式 而不是函数声明语句

{
  let f = function () { return 'f'; }
  function f1() { return 'f1' }
  // 块级作用域里用函数声明语句，不好!
  // 块级作用域里用函数表达式，好！
}



另外，还有一个需要注意的地方。ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。

if (true) let x = 1 
// Uncaught SyntaxError: 
// Lexical declaration cannot appear in a single-statement context

如果单语句 声明x变量无意义
如果多语句 必然要加上大括号


'use strict';
if (true) function f() {}
// Uncaught SyntaxError: 
// In strict mode code, functions can only be declared at top level or inside a block.

## const 
const 只能显式初始化
const foo;
// SyntaxError: Missing initializer in const declaration

const声明引用类型时，变量值是该引用类型指针，变量值/指针不可变，但是该引用类型的结构可变

const foo = {};
foo = {}; // TypeError: "foo" is read-only


浅冻结
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;

深冻结(循环冻结)
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
const constantize = obj => {
  Object.freeze(obj)
  Object.keys(obj).forEach(
    (key, i) => typeof obj[key] === 'object' && constantize(obj[key])
  )
}

## ES6 声明变量的六种方法
var function let const import class

## 顶层对象的属性
顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。ES5 之中，顶层对象的属性与全局变量是等价的。

顶层对象的属性与全局变量挂钩
没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）
开发者很容易不知不觉地就创建了全局变量（比如打字出错）
顶层对象的属性是到处可以读写的，这非常不利于模块化编程
window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。

ES6 规定
为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性
let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性

ES6 开始，全局变量将逐步与顶层对象的属性脱钩


globalThis 对象
JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域）
所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
Node 里面，顶层对象是global，但其他环境都不支持。
同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this变量，但是有局限性。

全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。
函数单纯作为函数运行 函数里面的this会指向顶层对象
严格模式下，这时this会返回undefined

不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象
但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么eval、new Function这些方法都可能无法使用


勉强可以使用的方法 在所有情况下，都取到顶层对象
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};

ES2020 在语言标准的层面，引入globalThis作为顶层对象
任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。

垫片库global-this模拟了这个提案，可以在所有环境拿到globalThis


# 解构（Destructuring）
  ES6 规定 按照一定模式 从引用类型 提取值对变量进行赋值
  等号两边的模式相同，左边的变量就会被赋予对应的值
<!--
  变量的解构赋值
  数组的解构赋值
  对象的解构赋值
  字符串的解构赋值
  数值和布尔值的解构赋值
  函数参数的解构赋值
  圆括号问题
  用途
  数组的解构赋值
-->
## 数组解构

let [a, b, c] = [1, 2, 3]

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []


### 解构失败: 变量===undefined

let [foo] = []
foo // undefined
let [bar, foo] = [1]
foo // undefined


### 不完全解构(左少右多)

let [x, y] = [1, 2, 3]
x // 1
y // 2

let [ , , third] = ["foo", "bar", "baz"]
third // "baz"

let [a, [b], d] = [1, [2, 3], 4]
a // 1
b // 2
d // 4

### 报错 等号右边 不可遍历的结构(无 Iterator接口)
// 转为对象以后不具备 Iterator 接口
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
// 本身就不具备 Iterator 接口
let [foo] = {};
// Uncaught TypeError: {} is not iterable


### 数据结构具有 Iterator 接口，都可以采用数组形式解构赋值

1. 对于 Set 使用数组解构赋值
let [x, y, z] = new Set(['a', 'b', 'c'])
x // "a"

2. Generator 函数具有 Iterator 接口 解构赋值会依次从这个接口获取值
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5

### 默认值
let [foo = true] = []
foo // true

### 当一个数组成员严格等于undefined，默认值生效
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

let [x = 1] = [undefined]
x // 1

let [x = 1] = [null]
x // null

### 表达式默认值 惰性求值
function f() { console.log('aaa') }
let [x = f()] = [1]
// === 
x = [1][0] === undefined ? f() : [1][0]

### 默认值可以引用解构赋值的其他 已初始化的变量
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined

## 对象的解构赋值
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"
数组解构:元素取值由它的位置决定
对象解构:元素取值由属性名决定

let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined

### 解构失败 变量值 === undefined
let {foo} = {bar: 'baz'};
foo // undefined

### 抽取对象成员
let { log, sin, cos } = Math;
const { log } = console;


### 对象解构赋值 被赋值的是值，而不是键


let { first: f, last: l } = { first: 'hello', last: 'world' }
f // 'hello'
l // 'world'
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined


### 嵌套结构的对象解构

let obj = {
  p: [ 'Hello', { y: 'World' } ]
};
let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
下面是另一个例子。

const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};
let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // { start: Object }
start // { line: 1, column: 5 }

### 嵌套赋值
let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj // {prop:123}
arr // [true]

// 报错
let {foo: {bar}} = {baz: 'baz'}
// Uncaught TypeError: Cannot read property 'bar' of undefined
foo解构失败undefined，undefined取子属性报错


### **对象解构赋值可以取到继承的属性**
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2)
const { foo } = obj1;
foo // "bar"
对象obj1的原型对象是obj2 obj1的属性foo继承自obj2 解构赋值可以取到这个属性

### 默认值
var {x = 3} = {};
x // 3
var {x, y = 5} = {x: 1};
x // 1
y // 5
var {x: y = 3} = {};
y // 3
var {x: y = 3} = {x: 5};
y // 5

对象属性值 === undefined 默认值生效
var {x = 3} = {x: undefined};
x // 3
var {x = 3} = {x: null};
x // null

### 括号

let x;
{x} = {x: 1};
// SyntaxError
JavaScript 引擎会将{x}理解成一个代码块

let x;
({x} = {x: 1});

### 左空右多 毫无意义但合法可行
({} = [true, false]);
({} = 'abc');
({} = []);

### 数组解构 赋值给类数组对象

let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3


## SNB的解构赋值
### 字符串被转换成 类数组对象

const [a, b, c, d, e] = 'hello'
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

类数组对象都有length属性
let {length : len} = 'hello';
len // 5

### 数值和布尔值的解构赋值
等号右边是数值和布尔值 先转为对象

数值和布尔值的包装对象都有toString属性，因此变量s都能取到值
let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true

### 解构赋值的规则 只要等号右边的值不是对象或数组，就先将其转为对象

### undefined和null 解构赋值
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError


## 函数参数的解构赋值
函数参数表面上是一个数组
但传入参数的那一刻，数组参数就被解构成变量x和y
对于函数内部的代码来说，它们能感受到的参数就是x和y

function add([x, y]){ return x + y; }
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b)
// [ 3, 7 ]

### 默认值
对对象进行解构
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

为函数move的参数指定默认值
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

undefined触发函数参数的默认值
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]

### 圆括号
ES6 规定 只要有可能导致解构的歧义，就不得使用圆括号
#### 不能使用圆括号的情况
1. 变量声明语句，模式不能使用圆括号。
let [(a)] = [1];
let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};
let { o: ({ p: p }) } = { o: { p: 2 } };

2. 函数参数也属于变量声明，因此不能带有圆括号
function f([(z)]) { return z; }
function f([z,(x)]) { return x; }

3. 赋值语句的模式
整个模式放在圆括号之中
({ p: a }) = { p: 42 };
([a]) = [5];
一部分模式放在圆括号之中
[({ p: a }), { x: c }] = [{}, {}];

#### 可以使用圆括号
可以使用圆括号的情况只有一种
赋值语句的非模式部分，可以使用圆括号。

[(b)] = [3];
({ p: (d) } = {});
[(parseInt.prop)] = [3];
上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致。

左空右多 毫无意义但合法可行
({} = [true, false]);
({} = 'abc');
({} = []);

let x;
{x} = {x: 1};
// SyntaxError
JavaScript 引擎会将{x}理解成一个代码块
let x;
({x} = {x: 1})
x // 1


## 用途

交换变量的值
let x = 1;
let y = 2;
[x, y] = [y, x];

从函数返回多个值
function example() { return [1, 2, 3]; }
let [a, b, c] = example();

function example() {
  return { foo: 1, bar: 2 };
}
let { foo, bar } = example();

将一组参数与变量名对应起来
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});


提取 JSON 数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);
// 42, "OK", [867, 5309]

函数参数的默认值
指定参数默认值
避免函数体内部短路语句 var foo = config.foo || 'default foo'
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};

遍历 Map 结构
任何部署了 Iterator 接口的对象，都可以用for...of循环遍历
Map 结构原生支持 Iterator 接口
配合变量的解构赋值，获取键名和键值就非常方便。

const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
for (let [key] of map) {}// 获取键名
for (let [,value] of map) {}// 获取键值

输入模块的指定方法
加载模块时，往往需要指定输入哪些方法
const { SourceMapConsumer, SourceNode } = require("source-map")

# 字符串的扩展
字符的 Unicode 表示法
字符串的遍历器接口
直接输入 U+2028 和 U+2029
JSON.stringify() 的改造
模板字符串
实例：模板编译
标签模板
模板字符串的限制

## 字符的 Unicode 表示法
ES6 加强了对 Unicode 的支持
**\uxxxx形式** 表示1个字符
xxxx 表示字符的 **Unicode 码点**
"\u0061" // "a"

\u后面跟上超过0xFFFF的数值（比如\u20BB7）
JavaScript 会理解成\u20BB+7
\u20BB是一个不可打印字符
最终显示一个空格，后面跟着一个7
"\u20BB7" // " 7"

码点超出\u0000~\uFFFF范围的字符 用2个双字节的形式表示
"\uD842\uDFB7" // "𠮷"

ES6 规定 将码点放入大括号，就能正确解读该字符
"\u{20BB7}" // "𠮷"
"\u{41}\u{42}\u{43}" // "ABC"
let hello = 123;
hell\u{6F} // 123

大括号表示法与四字节的 UTF-16 编码是等价的
'\u{1F680}' === '\uD83D\uDE80'// true

现在JavaScript表示1个字符共有 6 种方法
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true

## 字符串的遍历器接口
ES6 为字符串添加了遍历器接口
字符串可以被for...of循环遍历

for (let codePoint of 'foo') { console.log(codePoint) }
// "f" "o" "o"

for循环无法识别大于0xFFFF的码点 遍历器可以
let text = String.fromCodePoint(0x20BB7)
for (let i = 0; i < text.length; i++) {
  console.log(text[i])
}
// " "
// " "
for (let i of text) { console.log(i); }
// "𠮷"
字符串text只有一个字符
for循环会认为它包含两个字符（都不可打印）
for...of循环会正确识别出这一个字符

## 直接输入 U+2028 和 U+2029
JavaScript 字符串
允许直接输入字符 或者 输入字符的转义形式

“中”的 Unicode 码点是 U+4e2d
直接在字符串里面输入这个汉字 等价 输入它的转义形式\u4e2d
'中' === '\u4e2d' // true

JavaScript 规定5个字符 不能在字符串里面直接使用 只能使用转义形式
U+005C：反斜杠（reverse solidus)
U+000D：回车（carriage return）
U+2028：行分隔符（line separator）
U+2029：段分隔符（paragraph separator）
U+000A：换行符（line feed）

字符串里面不能直接包含反斜杠，一定要转义写成\\或者\u005c

JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）
服务器输出的 JSON 被JSON.parse解析，就有可能直接报错
const json = '"\u2028"';
JSON.parse(json); // 可能报错

JSON 格式已经冻结（RFC 7159），没法修改
ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）
const PS = eval("'\u2029'");

模板字符串现在就允许直接输入这两个字符
正则表达式依然不允许直接输入这两个字符
这是没有问题的，因为 JSON 本来就不允许直接包含正则表达式

## JSON.stringify() 的改造

UTF-8 标准规定，0xD800到0xDFFF之间的码点，不能单独使用，必须配对使用
\uD834\uDF06是两个码点，但是必须放在一起配对使用，代表字符𝌆
表示码点大于0xFFFF的字符的一种变通方法
单独使用\uD834和\uDFO6这两个码点是不合法的

JSON.stringify()可能返回0xD800到0xDFFF之间的单个码点
JSON.stringify('\u{D834}') // "\u{D834}"
根据标准，JSON 数据必须是 UTF-8 编码
JSON.stringify()方法有可能返回不符合 UTF-8 标准的字符串

为了确保返回的是合法的 UTF-8 字符，ES2019 改变了JSON.stringify()的行为。如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。

JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""

## 模板字符串 template string
使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中
console.log(`string text line 1
string text line 2`)

trim方法消除空格和换行
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim())

大括号可放入任意 JavaScript 表达式
进行运算
引用对象属性
function authorize(user, action) {
  if (!user.hasPrivilege(action)) {
    throw new Error( `User ${user.name} is not authorized to do ${action}.`);
  }
}
let obj = {x: 1, y: 2}
`${obj.x + obj.y}`// "3"

模板字符串调用函数
function fn() { return "Hello World"; }
`foo ${fn()} bar`
// foo Hello World bar

大括号中表达式的值不是字符串
按照一般规则转为字符串
如大括号中是一个对象，将默认调用对象的toString方法
console.log(`${ {toString : function () {return 'hh'}} }`)// hh

模板字符串的变量中嵌入了另一个模板字符串
const one = 1
const two = 2
console.log(`name : ${one + `${two}`}`)// 12

模板字符串写成函数
let func = name => `Hello ${name}!`
func('Jack') // "Hello Jack!"

## 模板编译
通过模板字符串，生成正式模板的实例。
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;

1 将其转换为 JavaScript 表达式字符串
echo('<ul>');
for(let i=0; i < data.supplies.length; i++) {
  echo('<li>');
  echo(data.supplies[i]);
  echo('</li>');
};
echo('</ul>');

这个转换使用正则表达式就行了
let evalExpr = /<%=(.+?)%>/g;
let expr = /<%([\s\S]+?)%>/g;

template = template
  .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
  .replace(expr, '`); \n $1 \n  echo(`');

template = 'echo(`' + template + '`);';
然后，将template封装在一个函数里面返回

let script =
`(function parse(data){
  let output = "";

  function echo(html){
    output += html;
  }

  ${ template }

  return output;
})`;

return script;
将上面的内容拼装成一个模板编译函数compile。

function compile(template){
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  let script =
  `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}
compile函数的用法如下。

let parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>

## 标签模板 tagged template
模板字符串紧跟在一个函数名后面
该函数将被调用来处理这个模板字符串

本质
let a = 5
let b = 10
method`Hello ${ a + b } world ${ a * b }`// =>
// method(strArr = [..., raw : Array], ...values)
method(['Hello ', ' world ', '', raw : [...]], a+b, a*b)

例子
function passthru(literals) {
  let result = '', i = 0
  while (i < literals.length) {
    result += literals[i++];
    (i < arguments.length) && result += arguments[i]
  }
  return result
}
let total = 30,
    msg = passthru`The total is ${total} (${total*1.05} with tax)`
msg // "The total is 30 (31.5 with tax)"

采用 rest 参数的写法
function passthru(literals, ...values) {
  let output = "", index
  for (index = 0; index < values.length; index++) {
    output += literals[index] + values[index];
  }
  output += literals[index]
  return output
}

过滤 HTML 字符串，防止用户输入恶意内容
function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
let sender = '<script>alert("abc")</script>'; // 恶意代码
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;
// <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
用户提供sender变量 经过SaferHTML函数处理 里面的特殊字符都会被转义

**模板处理函数的第一个参数（模板字符串数组），还有一个raw属性**
为了取得转义之前的原始模板而设计的

console.log`123`// ["123", raw: Array[1]]
console.log接受的参数 模板字符串数组 有一个raw属性 保存转义后的原字符串

tag`First line\nSecond line`
function tag(strings) {
  console.log(strings.raw[0]);
  // 输出结果 "First line\nSecond line"
  // 真实值为 "First line\\nSecond line"
}

多语言转换（国际化处理）
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
// "欢迎访问xxx，您是第xxxx位访问者！"
模板字符串本身并不能取代 Mustache 之类的模板库
因为没有条件判断和循环处理功能
通过标签函数，可以添加这些功能

// 下面的hashTemplate函数
// 是一个自定义的模板处理函数
let libraryHtml = hashTemplate`
  <ul>
    #for book in ${myBooks}
      <li><i>#{book.title}</i> by #{book.author}</li>
    #end
  </ul>
`;

甚至可以使用标签模板，在 JavaScript 语言之中嵌入其他语言。
通过jsx函数，将一个 DOM 字符串转为 React 对象
jsx`
  <div>
    <input
      ref='input'
      onChange='${this.handleChange}'
      defaultValue='${this.state.value}' />
      ${this.state.value}
   </div>
`

通过java函数，在 JavaScript 代码之中运行 Java 代码。
java`
class HelloWorldApp {
  public static void main(String[] args) {
    System.out.println("Hello World!"); // Display the string.
  }
}
`
HelloWorldApp.main()


## 模板字符串的限制
前面提到标签模板里面，可以内嵌其他语言
但是，模板字符串默认会将字符串转义，导致无法嵌入其他语言。

举例来说，标签模板里面可以嵌入 LaTEX 语言。

function latex(strings) {
  // ...
}

let document = latex`
  \newcommand{\fun}{\textbf{Fun!}}  // 正常工作
  \newcommand{\unicode}{\textbf{Unicode!}} // 报错
  \newcommand{\xerxes}{\textbf{King!}} // 报错
  Breve over the h goes \u{h}ere // 报错
`
变量document内嵌的模板字符串
对于 LaTEX 语言来说完全是合法的
但是 JavaScript 引擎会报错
原因就在于字符串的转义

模板字符串会将\u00FF和\u{42}当作 Unicode 字符进行转义，所以\unicode解析时报错；而\x56会被当作十六进制字符串转义，所以\xerxes会报错。也就是说，\u和\x在 LaTEX 里面有特殊含义，但是 JavaScript 将它们转义了。

为了解决这个问题，ES2018 放松了对标签模板里面的字符串转义的限制。如果遇到不合法的字符串转义，就返回undefined，而不是报错，并且从raw属性上面可以得到原始字符串。

function tag(strs) {
  strs[0] === undefined
  strs.raw[0] === "\\unicode and \\u{55}";
}
tag`\unicode and \u{55}`

模板字符串原本该报错
但是由于放松了对字符串转义的限制，所以不报错了，JavaScript 引擎将第一个字符设置为undefined，但是raw属性依然可以得到原始字符串，因此tag函数还是可以对原字符串进行处理。

注意，这种对字符串转义的放松，只在标签模板解析字符串时生效，不是标签模板的场合，依然会报错。

let bad = `bad escape sequence: \unicode`; // 报错

# 字符串的新增方法
<!--
  String.fromCodePoint()
  String.raw()
  实例方法：codePointAt()
  实例方法：normalize()
  实例方法：includes(), startsWith(), endsWith()
  实例方法：repeat()
  实例方法：padStart()，padEnd()
  实例方法：trimStart()，trimEnd()
  实例方法：matchAll()
-->

## String.fromCodePoint()
String.fromCharCode(0x20BB7)// "ஷ"
由 Unicode 码点返回对应字符
不能识别码点大于0xFFFF的字符
0x20BB7发生了溢出，最高位2被舍弃了
最后返回码点U+0BB7对应的字符

ES6 提供方法 识别码点大于0xFFFF的字符
弥补了 **String.fromCharCode** 的不足
在作用上与 **codePointAt** 方法相反
String.fromCodePoint(0x20BB7)// "𠮷"
String.fromCodePoint方法有多个参数，则被合并成一个字符串返回
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'// true

**fromCodePoint** 方法定义在 String对象
**codePointAt** 方法定义在 字符串的实例对象

## String.raw()
往往用于处理模板字符串
会将所有变量替换
返回 展示意义上完全一致的字符串

String.raw`Hi\n${2+3}!`
// 结果"Hi\n5!"; 实际"Hi\\n5!" \被转义

String.raw`Hi\u000A!`;
// 结果"Hi\u000A!"; 实际"Hi\\u000A!" \被转义

String.raw`Hi\\n`
// 结果"Hi\\n"; 实际"Hi\\\\n" \\被转义
String.raw`Hi\\n` === "Hi\\\\n" // true


本质
String.raw`foo${1 + 2}bar`// =>
String.raw(strArr, ...values)
String.raw(['foo ', 'bar'], 1 + 2)
String.raw = function () { console.log(arguments) }
String.raw`foo${1 + 2}bar`


`foo${1 + 2}bar`// 等同于
String.raw({ raw: ['foo', 'bar'] }, 1 + 2) // "foo3bar"


String.raw代码实现
第1个参数是个对象, 具有值为数组的raw成员

String.raw = (strings, ...values) => {
  let output = '', index
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }
  output += strings.raw[index]
  return output;
}

## codePointAt
JavaScript 内部
字符以 UTF-16 的格式储存
1个字符固定为2个字节

需要 4个字节储存的字符
即 Unicode 码点大于0xFFFF的字符
JavaScript 会解析成2个字符 

var s = "𠮷";
s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271

𠮷 4个字节储存的字符
𠮷 Unicode 码点0x20BB7
UTF-16 编码为0xD842 0xDFB7（十进制为55362 57271）

JavaScript 将其长度会误判为2
charAt()方法无法读取整个字符
charCodeAt()方法只能分别返回前2个字节和后2个字节的值

ES6 **codePointAt**
正确处理 4 个字节储存的字符 返回Unicode 码点0x20BB7
正确返回 32 位的 UTF-16 字符的码点

let s = '𠮷a'
s.codePointAt(0) // 134071
s.codePointAt(1) // 57271
s.codePointAt(2) // 97

𠮷a 被引擎解析为3个字符
codePointAt 在第1个字符上正确识别 𠮷
返回其十进制码点 134071（十六进制 Unicode 码点0x20BB7）
返回的是码点的十进制值 可用toString转换十六进制

在第2和第3个字符上，codePointAt()方法的结果与charCodeAt()方法相同
2字节储存的常规字符 codePointAt与charCodeAt返回结果相同

codePointAt的参数仍然是不正确的
字符a在字符串s的正确位置序号应该是 1

for...of循环正确识别 32 位的 UTF-16 字符
for (let ch of '𠮷a') {
  console.log(ch.codePointAt(0).toString(16))
}
// 20bb7
// 61

扩展运算符正确识别 32 位的 UTF-16 字符
let arr = [...'𠮷a']; // arr.length === 2
arr.forEach( ch => console.log(ch.codePointAt(0).toString(16)) )
// 20bb7
// 61

codePointAt 是测试 2字节字符 还是 4字节字符 的最简单方法

function is32Bit(c) { return c.codePointAt(0) > 0xFFFF; }
is32Bit("𠮷") // true
is32Bit("a") // false

## normalize()
为了表示欧洲语言语调符号和重音符号
Unicode 提供了两种方法
1. 直接提供带重音符号的字符，比如Ǒ（\u01D1）
2. 提供合成符号（combining character）
即原字符与重音符号的合成 
比如O（\u004F）和ˇ（\u030C）
合成Ǒ（\u004F\u030C）1个字符

JavaScript 不能识别 将合成字符视为两个字符
'\u01D1'==='\u004F\u030C' //false
'\u01D1'.length // 1
'\u004F\u030C'.length // 2

ES6 字符串实例的normalize
将字符的不同表示方法统一为同样形式
称为 Unicode 正规化。

'\u01D1'.normalize() === '\u004F\u030C'.normalize()// true

1个参数来指定normalize的方式

NFC 默认参数
表示“标准等价合成”（Normalization Form Canonical Composition）
返回多个简单字符的合成字符
所谓“标准等价”指的是视觉和语义上的等价

NFD
表示“标准等价分解”（Normalization Form Canonical Decomposition）
在标准等价的前提下
返回合成字符分解的多个简单字符

NFKC
表示“兼容等价合成”（Normalization Form Compatibility Composition）
返回合成字符
所谓“兼容等价”指的是语义上存在等价
但视觉上不等价，比如“囍”和“喜喜”
（这只是用来举例，normalize方法不能识别中文。）

NFKD
表示“兼容等价分解”（Normalization Form Compatibility Decomposition）
即在兼容等价的前提下，返回合成字符分解的多个简单字符

'\u004F\u030C'.normalize('NFC').length // 1
'\u004F\u030C'.normalize('NFD').length // 2
NFC参数返回字符的合成形式，NFD参数返回字符的分解形式

normalize方法目前不能识别大于2个字符的合成
只能使用正则表达式，通过 Unicode 编号区间判断

## includes(), startsWith(), endsWith()
只有indexOf确定一个字符串是否包含在另一个字符串中

ES6
返回布尔值
includes 是否包含参数字符串
startsWith 参数字符串是否在原字符串的头部
endsWith 参数字符串是否在原字符串的尾部

let s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true


第二个参数，表示开始搜索的位置
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false

使用第二个参数n
endsWith针对 前n个字符
其他2方法针对 从第n个位置直到字符串结束

## repeat()
返回一个新字符串

'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

参数如果是小数，会被取整。
'na'.repeat(2.9) // "nana"

参数是负数或者Infinity，会报错
'na'.repeat(Infinity)// RangeError
'na'.repeat(-1)// RangeError

0 到-1 之间的小数，取整以后等于-0，repeat视同为 0
'na'.repeat(-0.9) // ""
参数NaN等同于 0
'na'.repeat(NaN) // ""

参数是字符串，则会先转换成数字
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"

## padStart()，padEnd()
ES2017 字符串补全长度

'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

第二个参数默认空格
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '

字符串长度不小于参数 返回原字符串
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

原字符串优先级大于参数字符串
'abc'.padStart(10, '0123456789')
// '0123456abc'

用途
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"

## trimStart()，trimEnd()
ES2019
返回新字符串，不会修改原始字符串
tab 键、换行符等不可见的空白符号也有效
const s = '  abc  ';
s.trim() // "abc"
s.trimStart() // "abc  "
s.trimLeft() // "abc  "
s.trimEnd() // "  abc"
s.trimRight() // "  abc"

## matchAll()
matchAll 返回1个正则表达式在当前字符串的所有匹配


# 正则的扩展

# 数值的扩展

# 函数
函数参数的默认值
rest 参数
严格模式
name 属性
箭头函数
尾调用优化
函数参数的尾逗号
Function.prototype.toString()
catch 命令的参数省略

## 函数参数的默认值
ES6 规定 函数参数设置默认值

优势
1.可省参数
2.拿掉参数 代码可运行
function log(x, y = 'World') { console.log(x, y) }
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello

function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
const p = new Point();
p // { x: 0, y: 0 }

参数变量是默认初始化的
不能用let或const再次声明
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}

使用参数默认值 函数不能有同名参数
说明给参数加上默认值 参数上下文就变成es6模式
function foo(x, x, y) {}
function foo(x, x, y = 1) {}// Uncaught SyntaxError:
// Duplicate parameter name not allowed in this context

惰性求值的参数默认值
默认值表达式 每次都重新计算
每次调用函数foo，都会重新计算p
function foo(p = Math.random()) { console.log(p) }
foo() // 0.252863082234148
foo() // 0.17106357635067138

对象参数的解构赋值默认值
function foo({x, y = 5}) { console.log(x, y); }
foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined

对象参数的解构赋值默认值
无参时 默认参数将无参当做undefined进行解构
undefined无法添加成员x 报错

函数参数的默认值
function foo({x, y = 5} = {}) { console.log(x, y) }
foo() // undefined 5
无参时 默认参数将{}解构
{}没有成员x, 结果undefined

function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method)
}
fetch('http://example.com', {})// "GET"
fetch('http://example.com')
// Uncaught TypeError: Cannot read property 'body' of undefined
无参时 默认参数把无参当做undefined进行解构
undefined无法添加body成员

双重默认值
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method)
}
fetch('http://example.com')// "GET"


function m1({x = 0, y = 0} = {}) { return [x, y]; }
function m2({x, y} = { x: 0, y: 0 }) { return [x, y]; }
// 无参
m1() // [0, 0]
m2() // [0, 0]
// 全值
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]
// 单值
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]
// 无值
m1({}) // [0, 0];
m2({}) // [undefined, undefined]


默认值参数应该是函数的尾参数
非尾部参数没法省略 默认值无意义
除非显式输入undefined

非尾部参数没法省略
function f(x = 1, y) { return [x, y]; }
f(, 1) // Uncaught SyntaxError: Unexpected token ','

function f(x, y = 5, z) { return [x, y, z]; }
f(1, ,2) // Uncaught SyntaxError: Unexpected token ','
f(1, undefined, 2) // [1, undefined, 2]
f() // [undefined, 5, undefined]


函数的 length 属性含义
无默认值形参个数
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2

rest 参数也不会计入length属性
(function(...args) {}).length // 0

length属性 不计设置默认值的参数 后面的参数
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1

## 作用域
一旦设置了参数的默认值
函数进行声明初始化时
参数会形成一个单独的作用域（context）
等到初始化结束，这个作用域就会消失
这种语法行为，在不设置参数默认值时，是不会出现的

let x = 1;
function f(y = x) {
  let x = 2;
  console.log(y);
}
f() // 1

函数f调用时，参数y = x形成一个单独的作用域
作用域里面，变量x本身没有定义，所以指向外层的全局变量x
如果此时，全局变量x不存在，就会报错。

function f(y = x) {
  let x = 2;
  console.log(y);
}
f() // ReferenceError: x is not defined

var x = 1;
function foo(x = x) {}
foo() // ReferenceError: x is not defined


默认值是一个函数，该函数的作用域也遵守这个规则
let foo = 'outer';
function bar(func = () => foo) {
  // let foo = 'inner';
  console.log(foo)// outer
  console.log(func());
}
bar();// outer
函数参数形成的单独作用域里面，并没有定义变量foo
foo指向外层的全局变量foo，因此输出outer


function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
bar() // ReferenceError: foo is not defined
匿名函数里面的foo指向函数外层，但是函数外层并没有声明变量foo

var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}
foo() // 3

function foo1(x, y = function() { x = 2; }) {
  y();
  console.log(x);
}
foo1() // 2

var x = 1;
function foo2(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}
foo2() // 2


## 应用

利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
function throwIfMissing() {
  throw new Error('Missing parameter');
}
function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
foo()// Error: Missing parameter


参数的默认值不是在定义时执行，而是在运行时执行
如果参数已经赋值，默认值中的函数就不会运行。

将参数默认值设为undefined，表明这个参数可以省略
function foo(optional = undefined) { ··· }

rest 参数
ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
上面代码的add函数是一个求和函数，利用 rest 参数，可以向该函数传入任意数目的参数。

下面是一个 rest 参数代替arguments变量的例子。

// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
上面代码的两种写法，比较后可以发现，rest 参数的写法更自然也更简洁。

arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。下面是一个利用 rest 参数改写数组push方法的例子。

function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)
注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

// 报错
function f(a, ...b, c) {
  // ...
}
函数的length属性，不包括 rest 参数。

(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1


ES2016 规定
函数参数使用了默认值、解构赋值、或者扩展运算符
函数内部就不能显式设定为严格模式

function doSomething(a, b = a) {
  'use strict';
}
const doSomething = function ({a, b}) {
  'use strict';
}
const doSomething = (...a) => {
  'use strict';
  // code
}
const obj = {
  doSomething({a, b}) { 'use strict'; }
}
// Uncaught SyntaxError:
// Illegal 'use strict' directive in function with non-simple parameter list

函数内部的严格模式，同时适用于函数体和函数参数
函数执行的时候，先执行函数参数，然后再执行函数体
只有从函数体之中，才能知道参数是否应该以严格模式执行
参数却先于函数体执行
参数部分可能有不合法es5语句

function doSomething(value = 070) {
  'use strict';
  return value;
}
严格模式下不能用前缀0表示八进制
但实际上JavaScript 引擎会先成功执行value = 070
然后进入函数体内部，发现需要用严格模式执行，才会报错

虽然可以先解析函数体代码，再执行参数代码，但是增加了复杂性
标准索性禁止了这种用法
只要参数使用了默认值、解构赋值、或者扩展运算符，就不能显式指定严格模式

规避这种限制的方法
1 设定全局性的严格模式
'use strict';
function doSomething(a, b = a) {}
2 把函数包在一个无参数的立即执行函数里面
const doSomething = (function () {
  'use strict';
  return function(value = 42) { return value; }
}())

函数的name属性，返回该函数的函数名
function foo() {}
foo.name // "foo"
这个属性早就被浏览器广泛支持，但是直到 ES6，才将其写入了标准

匿名函数
var f = function () {};
// ES5
f.name // ""
// ES6
f.name // "f"

具名函数
const bar = function baz() {};
// ES5
bar.name // "baz"
// ES6
bar.name // "baz"

Function构造函数返回的函数实例 name属性的值为anonymous。

(new Function).name // "anonymous"

bind返回的函数，name属性值会加上bound前缀
function foo() {};
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "

## 箭头函数

如果箭头函数的代码块部分多于一条语句
就要使用大括号将它们括起来
并且使用return语句返回
var sum = (num1, num2) => { return num1 + num2 }

由于大括号被解释为代码块 
箭头函数直接返回一个对象
必须在对象外面加上括号
let getTempItem = id => { id: id, name: "Temp" }
// Uncaught SyntaxError: Unexpected token ':'
let getTempItem = id => ({ id: id, name: "Temp" })

特殊情况
let foo = () => { a: 1 }
foo() // undefined

引擎认为大括号是代码块
执行了一行语句a: 1
a被解释为语句的标签
实际执行的语句是1

箭头函数只有一行语句，且不需要返回值
const numbers = (...nums) => nums
numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];
((head, ...tail) => {return [head, tail]}(1, 2, 3, 4, 5))
// [1,[2,3,4,5]]

箭头函数注意点
1
函数体内的this对象
===  定义时所在对象
!==  使用时所在对象
2
不可以当作构造函数
不可以使用new命令
const selfpow = x => x**x
new selfpow()// Uncaught TypeError: selfpow is not a constructor
3
函数体内不存在arguments对象 可以用 rest 参数代替
4
不可以使用yield命令 因此箭头函数不能用作 Generator 函数。

箭头函数中this是固定的
function foo() {
  // const obj = { id : 'outer' }
  setTimeout(() => {
    console.log(this);
    // console.log('id:', this.id);
  }, 100);
}
foo()// window
var id = 21;
foo.call({ id: 42 });// { id: 42 }

setTimeout的参数是一个箭头函数
定义生效是在foo函数生成时
真正执行要等到 100 毫秒后

普通函数，执行时this应该指向全局对象window，这时应该输出21
箭头函数导致this总是指向**函数定义生效时所在的对象** 输出的是42

箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。下面是另一个例子。

function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0
上面代码中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。所以，3100 毫秒之后，timer.s1被更新了 3 次，而timer.s2一次都没更新。

箭头函数可以让this指向固定化，这种特性很有利于封装回调函数。下面是一个例子，DOM 事件的回调函数封装在一个对象里面。

var handler = {
  id: '123456',

  init: function() {
    document.addEventListener('click',
      event => this.doSomething(event.type), false);
  },

  doSomething: function(type) {
    console.log('Handling ' + type  + ' for ' + this.id);
  }
};
上面代码的init方法中，使用了箭头函数，这导致这个箭头函数里面的this，总是指向handler对象。否则，回调函数运行时，this.doSomething这一行会报错，因为此时this指向document对象。

this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。

所以，箭头函数转成 ES5 的代码如下。

// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
上面代码中，转换后的 ES5 版本清楚地说明了，箭头函数里面根本没有自己的this，而是引用外层的this。

请问下面的代码之中有几个this？

function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
上面代码之中，只有一个this，就是函数foo的this，所以t1、t2、t3都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。

除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。

function foo() {
  setTimeout(() => {
    console.log('args:', arguments);
  }, 100);
}

foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]
上面代码中，箭头函数内部的变量arguments，其实是函数foo的arguments变量。

另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });
// ['outer']
上面代码中，箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。

长期以来，JavaScript 语言的this对象一直是一个令人头痛的问题，在对象方法中使用this，必须非常小心。箭头函数”绑定”this，很大程度上解决了这个困扰。

不适用场合
由于箭头函数使得this从“动态”变成“静态”，下面两个场合不应该使用箭头函数。

第一个场合是定义对象的方法，且该方法内部包括this。

const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
上面代码中，cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。

第二个场合是需要动态this的时候，也不应使用箭头函数。

var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。

另外，如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。

嵌套的箭头函数
箭头函数内部，还可以再使用箭头函数。下面是一个 ES5 语法的多重嵌套函数。

function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]
上面这个函数，可以使用箭头函数改写。

let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1); //[1, 2, 3]
下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。

const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5)
// 12
如果觉得上面的写法可读性比较差，也可以采用下面的写法。

const plus1 = a => a + 1;
const mult2 = a => a * 2;

mult2(plus1(5))
// 12
箭头函数还有一个功能，就是可以很方便地改写 λ 演算。

// λ演算的写法
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

// ES6的写法
var fix = f => (x => f(v => x(x)(v)))
               (x => f(v => x(x)(v)));
上面两种写法，几乎是一一对应的。由于 λ 演算对于计算机科学非常重要，这使得我们可以用 ES6 作为替代工具，探索计算机科学。

## **尾调用(Tail Call)优化**
函数式编程的一个重要概念
函数的最后一步是调用另一个函数

function f(x){ return g(x) }

不属于尾调用情况
function f(x){
  let y = g(x);
  return y;
}
function f(x){ return g(x) + 1; }
function f(x){ g(x); } === function f(x){ g(x); return undefined; }

函数m和n都属于尾调用 它们都是函数f的最后一步操作
function f(x) {
  if (x > 0) { return m(x) }
  return n(x)
}

尾调用优化
尾调用之所以与其他调用不同，就在于它 **特殊的调用位置**

函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除f(x)的调用帧，只保留g(3)的调用帧。

这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。

function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。

注意，目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持。

尾递归
函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120
上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。

如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1) // 120
还有一个比较著名的例子，就是计算 Fibonacci 数列，也能充分说明尾递归优化的重要性。

非尾递归的 Fibonacci 数列实现如下。

function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时
尾递归优化过的 Fibonacci 数列实现如下。

function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
由此可见，“尾调用优化”对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。ES6 亦是如此，第一次明确规定，所有 ECMAScript 的实现，都必须部署“尾调用优化”。这就是说，ES6 中只要使用尾递归，就不会发生栈溢出（或者层层递归造成的超时），相对节省内存。

递归函数的改写
尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。比如上面的例子，阶乘函数 factorial 需要用到一个中间变量total，那就把这个中间变量改写成函数的参数。这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？

两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数。

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}

factorial(5) // 120
上面代码通过一个正常形式的阶乘函数factorial，调用尾递归函数tailFactorial，看起来就正常多了。

函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

factorial(5) // 120
上面代码通过柯里化，将尾递归函数tailFactorial变为只接受一个参数的factorial。

第二种方法就简单多了，就是采用 ES6 的函数默认值。

function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120
上面代码中，参数total有默认值1，所以调用时不用提供这个值。

总结一下，递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。对于其他支持“尾调用优化”的语言（比如 Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。

严格模式
ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

func.arguments：返回调用时函数的参数。
func.caller：返回调用当前函数的那个函数。
尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

function restricted() {
  'use strict';
  restricted.caller;    // 报错
  restricted.arguments; // 报错
}
restricted();
尾递归优化的实现
尾递归优化只在严格模式下生效，那么正常模式下，或者那些不支持该功能的环境中，有没有办法也使用尾递归优化呢？回答是可以的，就是自己实现尾递归优化。

它的原理非常简单。尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

下面是一个正常的递归函数。

function sum(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1);
  } else {
    return x;
  }
}

sum(1, 100000)
// Uncaught RangeError: Maximum call stack size exceeded(…)
上面代码中，sum是一个递归函数，参数x是需要累加的值，参数y控制递归次数。一旦指定sum递归 100000 次，就会报错，提示超出调用栈的最大次数。

蹦床函数（trampoline）可以将递归执行转为循环执行。

function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
上面就是蹦床函数的一个实现，它接受一个函数f作为参数。只要f执行后返回一个函数，就继续执行。注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。

然后，要做的就是将原来的递归函数，改写为每一步返回另一个函数。

function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}
上面代码中，sum函数的每次执行，都会返回自身的另一个版本。

现在，使用蹦床函数执行sum，就不会发生调用栈溢出。

trampoline(sum(1, 100000))
// 100001
蹦床函数并不是真正的尾递归优化，下面的实现才是。

function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001
上面代码中，tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，总是有值的，这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。


## 函数参数的尾逗号
ES2017 允许函数最后参数有尾逗号（trailing comma）。

function clownsEverywhere( param1, param2, ) {}
clownsEverywhere( 'foo', 'bar', )
如果在param2或bar后面加一个逗号，就会报错。

在原来最后一个参数后面添加一个逗号
对于版本管理系统来说，就会显示添加逗号的那一行也发生了变动
新的语法允许定义和调用时，尾部直接有一个逗号

function clownsEverywhere(
  param1,
  param2,
) { /* ... */ }
clownsEverywhere(
  'foo',
  'bar',
)

这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。

## Function.prototype.toString()
ES2019 修改 函数实例的toString()方法

function /* foo comment */ foo () {}
foo.toString()// function foo() {}
省略 注释 和 函数名foo和圆括号之间空格

toString()方法 修改后 返回一模一样原始代码
function /* foo comment */ foo () {}
foo.toString()// "function /* foo comment */ foo () {}"

## catch 命令的参数省略
JavaScript 语言的try...catch结构
明确要求catch命令后面必须跟参数
接受try代码块抛出的错误对象
try {
  // ...
} catch (err) {
  // 处理错误
}

catch代码块可能用不到这个参数
ES2019 允许catch语句省略参数
try {
  // ...
} catch {
  // ...
}

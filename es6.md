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


# 数值的扩展
二进制和八进制表示法
Number.isFinite(), Number.isNaN()
Number.parseInt(), Number.parseFloat()
Number.isInteger()
Number.EPSILON
安全整数和 Number.isSafeInteger()
Math 对象的扩展
指数运算符
BigInt 数据类型

## 二进制和八进制表示法
ES6 提供2进制和8进制数值的新写法
0b111110111 === 503 // true
0o767 === 503 // true

8进制
ES5 严格模式 不允许使用前缀0表示
ES6 规定使用前缀0o表示

// 非严格模式
(function(){ console.log(0o11 === 011) })() // true

// 严格模式
(function(){
  'use strict';
  console.log(0o11 === 011);
})() // Uncaught SyntaxError: Octal literals are not allowed in strict mode.

将0b和0o前缀的字符串数值转为10进制
Number('0b111')  // 7
Number('0o10')  // 8

## Number.isFinite(), Number.isNaN()
传统全局方法isFinite()和isNaN()
先调用Number()将非数值的值转为数值 再进行判断

ES6 新方法只对数值有效
参数类型不是数值返回false

Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false
isFinite('15'); // true
isFinite(true); // true

Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true
Number.isNaN("NaN") // false
isNaN("NaN") // true

## Number.parseInt(), Number.parseFloat()
ES6 将全局方法parseInt()和parseFloat()移植到Number对象上面
行为完全保持不变
逐步减少全局性方法，使得语言逐步模块化
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true

## Number.isInteger()
判断一个数值是否为整数

JavaScript 内部
整数和浮点数采用的是同样的储存方法
25 和 25.0 被视为同一个值
Number.isInteger(25) // true
Number.isInteger(25.0) // true

Number.isInteger(25) // true
Number.isInteger(25.1) // false

不是数值返回false
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false

JavaScript 采用 IEEE 754 标准
数值存储为64位双精度格式
数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）
如果数值的精度超过这个限度
第54位及后面的位就会被丢弃
这种情况下，Number.isInteger可能会误判
Number.isInteger(3.0000000000000002) // true
这个小数的精度达到了小数点后16个十进制位
转成二进制位超过了53个二进制位，导致最后的那个2被丢弃

一个数值的绝对值小于Number.MIN_VALUE（5E-324）
即小于 JavaScript 能够分辨的最小值
会被自动转为 0
Number.isInteger也会误判
Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true

对数据精度高要求 不建议使用Number.isInteger()判断一个数值是否为整数

## Number.EPSILON
ES6 在Number新增
1个极小的常量Number.EPSILON
表示 1 与大于 1 的最小浮点数之间的**差**

对于 64 位浮点数来说，大于 1 的最小浮点数相当于
2进制的1.00..001，小数点后面有连续 51 个零
这个值减去 1 之后，就等于 2**-52

Number.EPSILON === Math.pow(2, -52)// true
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// "0.00000000000000022204"

Number.EPSILON是 JavaScript 能够表示的最小精度
误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了
引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围
因为浮点数计算是不精确

0.1 + 0.2
// 0.30000000000000004

0.1 + 0.2 - 0.3
// 5.551115123125783e-17

5.551115123125783e-17.toFixed(20)
// '0.00000000000000005551'
上面代码解释了，为什么比较0.1 + 0.2与0.3得到的结果是false。

0.1 + 0.2 === 0.3 // false
Number.EPSILON可以用来设置“能够接受的误差范围”。比如，误差范围设为 2 的-50 次方（即Number.EPSILON * Math.pow(2, 2)），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。

5.551115123125783e-17 < Number.EPSILON * Math.pow(2, 2)
// true
因此，Number.EPSILON的实质是一个可以接受的最小误差范围。

function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true

1.1 + 1.3 === 2.4 // false
withinErrorMargin(1.1 + 1.3, 2.4) // true
上面的代码为浮点数运算，部署了一个误差检查函数。

安全整数和 Number.isSafeInteger()
JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。

Math.pow(2, 53) // 9007199254740992

9007199254740992  // 9007199254740992
9007199254740993  // 9007199254740992

Math.pow(2, 53) === Math.pow(2, 53) + 1
// true
上面代码中，超出 2 的 53 次方之后，一个数就不精确了。

ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。

Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true
上面代码中，可以看到 JavaScript 能够精确表示的极限。

Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
这个函数的实现很简单，就是跟安全整数的两个边界值比较一下。

Number.isSafeInteger = function (n) {
  return (typeof n === 'number' &&
    Math.round(n) === n &&
    Number.MIN_SAFE_INTEGER <= n &&
    n <= Number.MAX_SAFE_INTEGER);
}
实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。

Number.isSafeInteger(9007199254740993)
// false
Number.isSafeInteger(990)
// true
Number.isSafeInteger(9007199254740993 - 990)
// true
9007199254740993 - 990
// 返回结果 9007199254740002
// 正确答案应该是 9007199254740003
上面代码中，9007199254740993不是一个安全整数，但是Number.isSafeInteger会返回结果，显示计算结果是安全的。这是因为，这个数超出了精度范围，导致在计算机内部，以9007199254740992的形式储存。

9007199254740993 === 9007199254740992
// true
所以，如果只验证运算结果是否为安全整数，很可能得到错误结果。下面的函数可以同时验证两个运算数和运算结果。

function trusty (left, right, result) {
  if (
    Number.isSafeInteger(left) &&
    Number.isSafeInteger(right) &&
    Number.isSafeInteger(result)
  ) {
    return result;
  }
  throw new RangeError('Operation cannot be trusted!');
}

trusty(9007199254740993, 990, 9007199254740993 - 990)
// RangeError: Operation cannot be trusted!

trusty(1, 2, 3)
// 3
Math 对象的扩展
ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。

Math.trunc()
Math.trunc方法用于去除一个数的小数部分，返回整数部分。

Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
对于非数值，Math.trunc内部使用Number方法将其先转为数值。

Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
对于空值和无法截取整数的值，返回NaN。

Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN
对于没有部署这个方法的环境，可以用下面的代码模拟。

Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};
Math.sign()
Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

它会返回五种值。

参数为正数，返回+1；
参数为负数，返回-1；
参数为 0，返回0；
参数为-0，返回-0;
其他值，返回NaN。
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回NaN。

Math.sign('')  // 0
Math.sign(true)  // +1
Math.sign(false)  // 0
Math.sign(null)  // 0
Math.sign('9')  // +1
Math.sign('foo')  // NaN
Math.sign()  // NaN
Math.sign(undefined)  // NaN
对于没有部署这个方法的环境，可以用下面的代码模拟。

Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};
Math.cbrt()
Math.cbrt()方法用于计算一个数的立方根。

Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948732
对于非数值，Math.cbrt()方法内部也是先使用Number()方法将其转为数值。

Math.cbrt('8') // 2
Math.cbrt('hello') // NaN
对于没有部署这个方法的环境，可以用下面的代码模拟。

Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
};
Math.clz32()
Math.clz32()方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。

Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2
上面代码中，0 的二进制形式全为 0，所以有 32 个前导 0；1 的二进制形式是0b1，只占 1 位，所以 32 位之中有 31 个前导 0；1000 的二进制形式是0b1111101000，一共有 10 位，所以 32 位之中有 22 个前导 0。

clz32这个函数名就来自”count leading zero bits in 32-bit binary representation of a number“（计算一个数的 32 位二进制形式的前导 0 的个数）的缩写。

左移运算符（<<）与Math.clz32方法直接相关。

Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2
对于小数，Math.clz32方法只考虑整数部分。

Math.clz32(3.2) // 30
Math.clz32(3.9) // 30
对于空值或其他类型的值，Math.clz32方法会将它们先转为数值，然后再计算。

Math.clz32() // 32
Math.clz32(NaN) // 32
Math.clz32(Infinity) // 32
Math.clz32(null) // 32
Math.clz32('foo') // 32
Math.clz32([]) // 32
Math.clz32({}) // 32
Math.clz32(true) // 31
Math.imul()
Math.imul方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。

Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4
如果只考虑最后 32 位，大多数情况下，Math.imul(a, b)与a * b的结果是相同的，即该方法等同于(a * b)|0的效果（超过 32 位的部分溢出）。之所以需要部署这个方法，是因为 JavaScript 有精度限制，超过 2 的 53 次方的值无法精确表示。这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值。

(0x7fffffff * 0x7fffffff)|0 // 0
上面这个乘法算式，返回结果为 0。但是由于这两个二进制数的最低位都是 1，所以这个结果肯定是不正确的，因为根据二进制乘法，计算结果的二进制最低位应该也是 1。这个错误就是因为它们的乘积超过了 2 的 53 次方，JavaScript 无法保存额外的精度，就把低位的值都变成了 0。Math.imul方法可以返回正确的值 1。

Math.imul(0x7fffffff, 0x7fffffff) // 1
Math.fround()
Math.fround方法返回一个数的32位单精度浮点数形式。

对于32位单精度格式来说，数值精度是24个二进制位（1 位隐藏位与 23 位有效位），所以对于 -224 至 224 之间的整数（不含两个端点），返回结果与参数本身一致。

Math.fround(0)   // 0
Math.fround(1)   // 1
Math.fround(2 ** 24 - 1)   // 16777215
如果参数的绝对值大于 224，返回的结果便开始丢失精度。

Math.fround(2 ** 24)       // 16777216
Math.fround(2 ** 24 + 1)   // 16777216
Math.fround方法的主要作用，是将64位双精度浮点数转为32位单精度浮点数。如果小数的精度超过24个二进制位，返回值就会不同于原值，否则返回值不变（即与64位双精度值一致）。

// 未丢失有效精度
Math.fround(1.125) // 1.125
Math.fround(7.25)  // 7.25

// 丢失精度
Math.fround(0.3)   // 0.30000001192092896
Math.fround(0.7)   // 0.699999988079071
Math.fround(1.0000000123) // 1
对于 NaN 和 Infinity，此方法返回原值。对于其它类型的非数值，Math.fround 方法会先将其转为数值，再返回单精度浮点数。

Math.fround(NaN)      // NaN
Math.fround(Infinity) // Infinity

Math.fround('5')      // 5
Math.fround(true)     // 1
Math.fround(null)     // 0
Math.fround([])       // 0
Math.fround({})       // NaN
对于没有部署这个方法的环境，可以用下面的代码模拟。

Math.fround = Math.fround || function (x) {
  return new Float32Array([x])[0];
};
Math.hypot()
Math.hypot方法返回所有参数的平方和的平方根。

Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3
上面代码中，3 的平方加上 4 的平方，等于 5 的平方。

如果参数不是数值，Math.hypot方法会将其转为数值。只要有一个参数无法转为数值，就会返回 NaN。

对数方法
ES6 新增了 4 个对数相关方法。

（1） Math.expm1()

Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。

Math.expm1(-1) // -0.6321205588285577
Math.expm1(0)  // 0
Math.expm1(1)  // 1.718281828459045
对于没有部署这个方法的环境，可以用下面的代码模拟。

Math.expm1 = Math.expm1 || function(x) {
  return Math.exp(x) - 1;
};
（2）Math.log1p()

Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。

Math.log1p(1)  // 0.6931471805599453
Math.log1p(0)  // 0
Math.log1p(-1) // -Infinity
Math.log1p(-2) // NaN
对于没有部署这个方法的环境，可以用下面的代码模拟。

Math.log1p = Math.log1p || function(x) {
  return Math.log(1 + x);
};
（3）Math.log10()

Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。

Math.log10(2)      // 0.3010299956639812
Math.log10(1)      // 0
Math.log10(0)      // -Infinity
Math.log10(-2)     // NaN
Math.log10(100000) // 5
对于没有部署这个方法的环境，可以用下面的代码模拟。

Math.log10 = Math.log10 || function(x) {
  return Math.log(x) / Math.LN10;
};
（4）Math.log2()

Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。

Math.log2(3)       // 1.584962500721156
Math.log2(2)       // 1
Math.log2(1)       // 0
Math.log2(0)       // -Infinity
Math.log2(-2)      // NaN
Math.log2(1024)    // 10
Math.log2(1 << 29) // 29
对于没有部署这个方法的环境，可以用下面的代码模拟。

Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LN2;
};
双曲函数方法
ES6 新增了 6 个双曲函数方法。

Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
指数运算符
ES2016 新增了一个指数运算符（**）。

2 ** 2 // 4
2 ** 3 // 8
这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。

// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
上面代码中，首先计算的是第二个指数运算符，而不是第一个。

指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。

let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;
BigInt 数据类型
简介
JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity。

// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024) // Infinity
ES2020 引入了一种新的数据类型 BigInt（大整数），来解决这个问题。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。

const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b // 33334444555566667777n

// 普通整数无法保持精度
Number(a) * Number(b) // 33334444555566670000
为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n。

1234 // 普通整数
1234n // BigInt

// BigInt 的运算
1n + 2n // 3n
BigInt 同样可以使用各种进制表示，都要加上后缀n。

0b1101n // 二进制
0o777n // 八进制
0xFFn // 十六进制
BigInt 与普通整数是两种值，它们之间并不相等。

42n === 42 // false
typeof运算符对于 BigInt 类型的数据返回bigint。

typeof 123n // 'bigint'
BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突。

-42n // 正确
+42n // 报错
JavaScript 以前不能计算70的阶乘（即70!），因为超出了可以表示的精度。

let p = 1;
for (let i = 1; i <= 70; i++) {
  p *= i;
}
console.log(p); // 1.197857166996989e+100
现在支持大整数了，就可以算了，浏览器的开发者工具运行下面代码，就OK。

let p = 1n;
for (let i = 1n; i <= 70n; i++) {
  p *= i;
}
console.log(p); // 11978571...00000000n
BigInt 对象
JavaScript 原生提供BigInt对象，可以用作构造函数生成 BigInt 类型的数值。转换规则基本与Number()一致，将其他类型的值转为 BigInt。

BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n
BigInt()构造函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错。

new BigInt() // TypeError
BigInt(undefined) //TypeError
BigInt(null) // TypeError
BigInt('123n') // SyntaxError
BigInt('abc') // SyntaxError
上面代码中，尤其值得注意字符串123n无法解析成 Number 类型，所以会报错。

参数如果是小数，也会报错。

BigInt(1.5) // RangeError
BigInt('1.5') // SyntaxError
BigInt 对象继承了 Object 对象的两个实例方法。

BigInt.prototype.toString()
BigInt.prototype.valueOf()
它还继承了 Number 对象的一个实例方法。

BigInt.prototype.toLocaleString()
此外，还提供了三个静态方法。

BigInt.asUintN(width, BigInt)： 给定的 BigInt 转为 0 到 2width - 1 之间对应的值。
BigInt.asIntN(width, BigInt)：给定的 BigInt 转为 -2width - 1 到 2width - 1 - 1 之间对应的值。
BigInt.parseInt(string[, radix])：近似于Number.parseInt()，将一个字符串转换成指定进制的 BigInt。
const max = 2n ** (64n - 1n) - 1n;

BigInt.asIntN(64, max)
// 9223372036854775807n
BigInt.asIntN(64, max + 1n)
// -9223372036854775808n
BigInt.asUintN(64, max + 1n)
// 9223372036854775808n
上面代码中，max是64位带符号的 BigInt 所能表示的最大值。如果对这个值加1n，BigInt.asIntN()将会返回一个负值，因为这时新增的一位将被解释为符号位。而BigInt.asUintN()方法由于不存在符号位，所以可以正确返回结果。

如果BigInt.asIntN()和BigInt.asUintN()指定的位数，小于数值本身的位数，那么头部的位将被舍弃。

const max = 2n ** (64n - 1n) - 1n;

BigInt.asIntN(32, max) // -1n
BigInt.asUintN(32, max) // 4294967295n
上面代码中，max是一个64位的 BigInt，如果转为32位，前面的32位都会被舍弃。

下面是BigInt.parseInt()的例子。

// Number.parseInt() 与 BigInt.parseInt() 的对比
Number.parseInt('9007199254740993', 10)
// 9007199254740992
BigInt.parseInt('9007199254740993', 10)
// 9007199254740993n
上面代码中，由于有效数字超出了最大限度，Number.parseInt方法返回的结果是不精确的，而BigInt.parseInt方法正确返回了对应的 BigInt。

对于二进制数组，BigInt 新增了两个类型BigUint64Array和BigInt64Array，这两种数据类型返回的都是64位 BigInt。DataView对象的实例方法DataView.prototype.getBigInt64()和DataView.prototype.getBigUint64()，返回的也是 BigInt。

转换规则
可以使用Boolean()、Number()和String()这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。

Boolean(0n) // false
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // "1"
上面代码中，注意最后一个例子，转为字符串时后缀n会消失。

另外，取反运算符（!）也可以将 BigInt 转为布尔值。

!0n // true
!1n // false
数学运算
数学运算方面，BigInt 类型的+、-、*和**这四个二元运算符，与 Number 类型的行为一致。除法运算/会舍去小数部分，返回一个整数。

9n / 5n
// 1n
几乎所有的数值运算符都可以用在 BigInt，但是有两个例外。

不带符号的右移位运算符>>>
一元的求正运算符+
上面两个运算符用在 BigInt 会报错。前者是因为>>>运算符是不带符号的，但是 BigInt 总是带有符号的，导致该运算无意义，完全等同于右移运算符>>。后者是因为一元运算符+在 asm.js 里面总是返回 Number 类型，为了不破坏 asm.js 就规定+1n会报错。

BigInt 不能与普通数值进行混合运算。

1n + 1.3 // 报错
上面代码报错是因为无论返回的是 BigInt 或 Number，都会导致丢失精度信息。比如(2n**53n + 1n) + 0.5这个表达式，如果返回 BigInt 类型，0.5这个小数部分会丢失；如果返回 Number 类型，有效精度只能保持 53 位，导致精度下降。

同样的原因，如果一个标准库函数的参数预期是 Number 类型，但是得到的是一个 BigInt，就会报错。

// 错误的写法
Math.sqrt(4n) // 报错

// 正确的写法
Math.sqrt(Number(4n)) // 2
上面代码中，Math.sqrt的参数预期是 Number 类型，如果是 BigInt 就会报错，必须先用Number方法转一下类型，才能进行计算。

asm.js 里面，|0跟在一个数值的后面会返回一个32位整数。根据不能与 Number 类型混合运算的规则，BigInt 如果与|0进行运算会报错。

1n | 0 // 报错
其他运算
BigInt 对应的布尔值，与 Number 类型一致，即0n会转为false，其他值转为true。

if (0n) {
  console.log('if');
} else {
  console.log('else');
}
// else
上面代码中，0n对应false，所以会进入else子句。

比较运算符（比如>）和相等运算符（==）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。

0n < 1 // true
0n < true // true
0n == 0 // true
0n == false // true
0n === 0 // false
BigInt 与字符串混合运算时，会先转为字符串，再进行运算。

'' + 123n // "123"
留言
back to topedit上一章下一章
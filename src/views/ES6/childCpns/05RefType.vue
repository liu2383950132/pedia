<template>
<div class="ref-type">
<pre>
# 函数的扩展
  ## 函数参数的默认值
  ### 基本用法
  **1**
  ES6 之前，
  不能直接为函数的参数指定默认值，
  只能采用变通的方法。

  function log(x, y) {
    y = y || 'World';
    console.log(x, y);
  }

  log('Hello') // Hello World
  log('Hello', 'China') // Hello China
  log('Hello', '') // Hello World
  上面代码检查函数log的参数y有没有赋值，
  如果没有，
  则指定默认值为World。

  这种写法的缺点在于，
  如果参数y赋值了，
  但是对应的布尔值为false，
  则该赋值不起作用。

  就像上面代码的最后一行，
  参数y等于空字符，
  结果被改为默认值。

  为了避免这个问题，
  通常需要先判断一下参数y是否被赋值，
  如果没有，
  再等于默认值。

  if (typeof y === 'undefined') {
    y = 'World';
  }

  **2**
  ES6 允许为函数的参数设置默认值，
  即直接写在参数定义的后面。

  function log(x, y = 'World') {
    console.log(x, y);
  }

  log('Hello') // Hello World
  log('Hello', 'China') // Hello China
  log('Hello', '') // Hello

  function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  const p = new Point();
  p // { x: 0, y: 0 }

  **3**
  ES6 的写法有3个好处
  简洁；
  阅读代码的人，
  可以立刻意识到哪些参数是可以省略的，
  不用查看函数体或文档；
  其次，有利于将来的代码优化，
  即使未来的版本在对外接口中，
  彻底拿掉这个参数，
  也不会导致以前的代码无法运行。

  **4**
  参数变量是默认声明的，
  所以不能用let或const再次声明。

  function foo(x = 5) {
    let x = 1; // error
    const x = 2; // error
  }
  上面代码中，
  参数变量x是默认声明的，
  在函数体中，
  不能用let或const再次声明，
  否则会报错。

  使用参数默认值时，
  函数不能有同名参数。

  // 不报错
  function foo(x, x, y) {
    // ...
  }

  // 报错
  function foo(x, x, y = 1) {
    // ...
  }
  // SyntaxError: Duplicate parameter name not allowed in this context

  参数默认值不是传值的，
  而是每次都重新计算默认值表达式的值。
  也就是说，
  参数默认值是惰性求值的。

  let x = 99;
  function foo(p = x + 1) {
    console.log(p);
  }

  foo() // 100

  x = 100;
  foo() // 101

  上面代码中，
  参数p的默认值是x + 1。
  这时，
  每次调用函数foo，
  都会重新计算x + 1，
  而不是默认p等于 100。

  **5**
  与解构赋值默认值结合使用
  参数默认值可以与解构赋值的默认值，
  结合起来使用。

  function foo({x, y = 5}) {
    console.log(x, y);
  }

  foo({}) // undefined 5
  foo({x: 1}) // 1 5
  foo({x: 1, y: 2}) // 1 2
  foo() // TypeError: Cannot read property 'x' of undefined
  上面代码只使用了对象的解构赋值默认值，
  没有使用函数参数的默认值。
  只有当函数foo的参数是一个对象时，
  变量x和y才会通过解构赋值生成。
  如果函数foo调用时没提供参数，
  变量x和y就不会生成，
  从而报错。
  通过提供函数参数的默认值，
  就可以避免这种情况。

  function foo({x, y = 5} = {}) {
    console.log(x, y);
  }

  foo() // undefined 5
  上面代码指定，
  如果没有提供参数，
  函数foo的参数默认为一个空对象。

  下面是另一个解构赋值默认值的例子。

  function fetch(url, { body = '', method = 'GET', headers = {} }) {
    console.log(method);
  }

  fetch('http://example.com', {})
  // "GET"

  fetch('http://example.com')
  // 报错
  上面代码中，
  如果函数fetch的第二个参数是一个对象，
  就可以为它的三个属性设置默认值。这种写法不能省略第二个参数，
  如果结合函数参数的默认值，
  就可以省略第二个参数。这时，
  就出现了双重默认值。

  function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
    console.log(method);
  }

  fetch('http://example.com')
  // "GET"
  上面代码中，
  函数fetch没有第二个参数时，
  函数参数的默认值就会生效，
  然后才是解构赋值的默认值生效，
  变量method才会取到默认值GET。

  作为练习，
  请问下面两种写法有什么差别？

  // 写法一
  function m1({x = 0, y = 0} = {}) {
    return [x, y];
  }

  // 写法二
  function m2({x, y} = { x: 0, y: 0 }) {
    return [x, y];
  }
  上面两种写法都对函数的参数设定了默认值，
  区别是写法一函数参数的默认值是空对象，
  但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，
  但是没有设置对象解构赋值的默认值。

  // 函数没有参数的情况
  m1() // [0, 0]
  m2() // [0, 0]

  // x 和 y 都有值的情况
  m1({x: 3, y: 8}) // [3, 8]
  m2({x: 3, y: 8}) // [3, 8]

  // x 有值，
  y 无值的情况
  m1({x: 3}) // [3, 0]
  m2({x: 3}) // [3, undefined]

  // x 和 y 都无值的情况
  m1({}) // [0, 0];
  m2({}) // [undefined, undefined]

  m1({z: 3}) // [0, 0]
  m2({z: 3}) // [undefined, undefined]
  参数默认值的位置
  通常情况下，
  定义了默认值的参数，
  应该是函数的尾参数。因为这样比较容易看出来，
  到底省略了哪些参数。如果非尾部的参数设置默认值，
  实际上这个参数是没法省略的。

  // 例一
  function f(x = 1, y) {
    return [x, y];
  }

  f() // [1, undefined]
  f(2) // [2, undefined]
  f(, 1) // 报错
  f(undefined, 1) // [1, 1]

  // 例二
  function f(x, y = 5, z) {
    return [x, y, z];
  }

  f() // [undefined, 5, undefined]
  f(1) // [1, 5, undefined]
  f(1, ,2) // 报错
  f(1, undefined, 2) // [1, 5, 2]
  上面代码中，
  有默认值的参数都不是尾参数。这时，
  无法只省略该参数，
  而不省略它后面的参数，
  除非显式输入undefined。

  如果传入undefined，
  将触发该参数等于默认值，
  null则没有这个效果。

  function foo(x = 5, y = 6) {
    console.log(x, y);
  }

  foo(undefined, null)
  // 5 null
  上面代码中，
  x参数对应undefined，
  结果触发了默认值，
  y参数等于null，
  就没有触发默认值。

  **6**
  函数的 length 属性
  指定了默认值以后，
  函数的length属性，
  将返回没有指定默认值的参数个数。也就是说，
  指定了默认值后，
  length属性将失真。

  (function (a) {}).length // 1
  (function (a = 5) {}).length // 0
  (function (a, b, c = 5) {}).length // 2
  上面代码中，
  length属性的返回值，
  等于函数的参数个数减去指定了默认值的参数个数。
  比如，
  上面最后一个函数，
  定义了 3 个参数，
  其中有一个参数c指定了默认值，
  因此length属性等于3减去1，
  最后得到2。

  这是因为length属性的含义是，
  该函数预期传入的参数个数。某个参数指定默认值以后，
  预期传入的参数个数就不包括这个参数了。
  同理，
  后文的 rest 参数也不会计入length属性。

  (function(...args) {}).length // 0
  如果设置了默认值的参数不是尾参数，
  那么length属性也不再计入后面的参数了。

  (function (a = 0, b, c) {}).length // 0
  (function (a, b = 1, c) {}).length // 1

  **7**
  作用域
  一旦设置了参数的默认值，
  函数进行声明初始化时，
  参数会形成一个单独的作用域（context）。等到初始化结束，
  这个作用域就会消失。这种语法行为，
  在不设置参数默认值时，
  是不会出现的。

  var x = 1;

  function f(x, y = x) {
    console.log(y);
  }

  f(2) // 2
  上面代码中，
  参数y的默认值等于变量x。调用函数f时，
  参数形成一个单独的作用域。在这个作用域里面，
  默认值变量x指向第一个参数x，
  而不是全局变量x，
  所以输出是2。

  再看下面的例子。

  let x = 1;

  function f(y = x) {
    let x = 2;
    console.log(y);
  }

  f() // 1
  上面代码中，
  函数f调用时，
  参数y = x形成一个单独的作用域。这个作用域里面，
  变量x本身没有定义，
  所以指向外层的全局变量x。函数调用时，
  函数体内部的局部变量x影响不到默认值变量x。

  如果此时，
  全局变量x不存在，
  就会报错。

  function f(y = x) {
    let x = 2;
    console.log(y);
  }

  f() // ReferenceError: x is not defined
  下面这样写，
  也会报错。

  var x = 1;

  function foo(x = x) {
    // ...
  }

  foo() // ReferenceError: x is not defined
  上面代码中，
  参数x = x形成一个单独作用域。实际执行的是let x = x，
  由于暂时性死区的原因，
  这行代码会报错”x 未定义“。

  如果参数的默认值是一个函数，
  该函数的作用域也遵守这个规则。请看下面的例子。

  let foo = 'outer';

  function bar(func = () => foo) {
    let foo = 'inner';
    console.log(func());
  }

  bar(); // outer
  上面代码中，
  函数bar的参数func的默认值是一个匿名函数，
  返回值为变量foo。函数参数形成的单独作用域里面，
  并没有定义变量foo，
  所以foo指向外层的全局变量foo，
  因此输出outer。

  如果写成下面这样，
  就会报错。

  function bar(func = () => foo) {
    let foo = 'inner';
    console.log(func());
  }

  bar() // ReferenceError: foo is not defined
  上面代码中，
  匿名函数里面的foo指向函数外层，
  但是函数外层并没有声明变量foo，
  所以就报错了。

  下面是一个更复杂的例子。

  var x = 1;
  function foo(x, y = function() { x = 2; }) {
    var x = 3;
    y();
    console.log(x);
  }

  foo() // 3
  x // 1
  上面代码中，
  函数foo的参数形成一个单独作用域。这个作用域里面，
  首先声明了变量x，
  然后声明了变量y，
  y的默认值是一个匿名函数。这个匿名函数内部的变量x，
  指向同一个作用域的第一个参数x。函数foo内部又声明了一个内部变量x，
  该变量与第一个参数x由于不是同一个作用域，
  所以不是同一个变量，
  因此执行y后，
  内部变量x和外部全局变量x的值都没变。

  如果将var x = 3的var去除，
  函数foo的内部变量x就指向第一个参数x，
  与匿名函数内部的x是一致的，
  所以最后输出的就是2，
  而外层的全局变量x依然不受影响。

  var x = 1;
  function foo(x, y = function() { x = 2; }) {
    x = 3;
    y();
    console.log(x);
  }

  foo() // 2
  x // 1

  **8**
  应用
  利用参数默认值，
  可以指定某一个参数不得省略，
  如果省略就抛出一个错误。

  function throwIfMissing() {
    throw new Error('Missing parameter');
  }

  function foo(mustBeProvided = throwIfMissing()) {
    return mustBeProvided;
  }

  foo()
  // Error: Missing parameter
  上面代码的foo函数，
  如果调用的时候没有参数，
  就会调用默认值throwIfMissing函数，
  从而抛出一个错误。

  从上面代码还可以看到，
  参数mustBeProvided的默认值等于throwIfMissing函数的运行结果（注意函数名throwIfMissing之后有一对圆括号），
  这表明参数的默认值不是在定义时执行，
  而是在运行时执行。如果参数已经赋值，
  默认值中的函数就不会运行。

  另外，
  可以将参数默认值设为undefined，
  表明这个参数是可以省略的。

  function foo(optional = undefined) { ··· }

  ### rest 参数
  ES6 引入 rest 参数（形式为...变量名），
  用于获取函数的多余参数，
  这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，
  该变量将多余的参数放入数组中。

  function add(...values) {
    let sum = 0;

    for (var val of values) {
      sum += val;
    }

    return sum;
  }

  add(2, 5, 3) // 10
  上面代码的add函数是一个求和函数，
  利用 rest 参数，
  可以向该函数传入任意数目的参数。

  下面是一个 rest 参数代替arguments变量的例子。

  // arguments变量的写法
  function sortNumbers() {
    return Array.prototype.slice.call(arguments).sort();
  }

  // rest参数的写法
  const sortNumbers = (...numbers) => numbers.sort();
  上面代码的两种写法，
  比较后可以发现，
  rest 参数的写法更自然也更简洁。

  arguments对象不是数组，
  而是一个类似数组的对象。所以为了使用数组的方法，
  必须使用Array.prototype.slice.call先将其转为数组。rest 参数就不存在这个问题，
  它就是一个真正的数组，
  数组特有的方法都可以使用。下面是一个利用 rest 参数改写数组push方法的例子。

  function push(array, ...items) {
    items.forEach(function(item) {
      array.push(item);
      console.log(item);
    });
  }

  var a = [];
  push(a, 1, 2, 3)
  注意，
  rest 参数之后不能再有其他参数（即只能是最后一个参数），
  否则会报错。

  // 报错
  function f(a, ...b, c) {
    // ...
  }
  函数的length属性，
  不包括 rest 参数。

  (function(a) {}).length  // 1
  (function(...a) {}).length  // 0
  (function(a, ...b) {}).length  // 1

  ### 严格模式
  从 ES5 开始，
  函数内部可以设定为严格模式。

  function doSomething(a, b) {
    'use strict';
    // code
  }
  ES2016 做了一点修改，
  规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，
  那么函数内部就不能显式设定为严格模式，
  否则会报错。

  // 报错
  function doSomething(a, b = a) {
    'use strict';
    // code
  }

  // 报错
  const doSomething = function ({a, b}) {
    'use strict';
    // code
  };

  // 报错
  const doSomething = (...a) => {
    'use strict';
    // code
  };

  const obj = {
    // 报错
    doSomething({a, b}) {
      'use strict';
      // code
    }
  };
  这样规定的原因是，
  函数内部的严格模式，
  同时适用于函数体和函数参数。但是，
  函数执行的时候，
  先执行函数参数，
  然后再执行函数体。这样就有一个不合理的地方，
  只有从函数体之中，
  才能知道参数是否应该以严格模式执行，
  但是参数却应该先于函数体执行。

  // 报错
  function doSomething(value = 070) {
    'use strict';
    return value;
  }
  上面代码中，
  参数value的默认值是八进制数070，
  但是严格模式下不能用前缀0表示八进制，
  所以应该报错。但是实际上，
  JavaScript 引擎会先成功执行value = 070，
  然后进入函数体内部，
  发现需要用严格模式执行，
  这时才会报错。

  虽然可以先解析函数体代码，
  再执行参数代码，
  但是这样无疑就增加了复杂性。因此，
  标准索性禁止了这种用法，
  只要参数使用了默认值、解构赋值、或者扩展运算符，
  就不能显式指定严格模式。

  两种方法可以规避这种限制。第一种是设定全局性的严格模式，
  这是合法的。

  'use strict';

  function doSomething(a, b = a) {
    // code
  }
  第二种是把函数包在一个无参数的立即执行函数里面。

  const doSomething = (function () {
    'use strict';
    return function(value = 42) {
      return value;
    };
  }());

  ### name 属性
  函数的name属性，
  返回该函数的函数名。

  function foo() {}
  foo.name // "foo"
  这个属性早就被浏览器广泛支持，
  但是直到 ES6，
  才将其写入了标准。

  需要注意的是，
  ES6 对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，
  ES5 的name属性，
  会返回空字符串，
  而 ES6 的name属性会返回实际的函数名。

  var f = function () {};

  // ES5
  f.name // ""

  // ES6
  f.name // "f"
  上面代码中，
  变量f等于一个匿名函数，
  ES5 和 ES6 的name属性返回的值不一样。

  如果将一个具名函数赋值给一个变量，
  则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。

  const bar = function baz() {};

  // ES5
  bar.name // "baz"

  // ES6
  bar.name // "baz"
  Function构造函数返回的函数实例，
  name属性的值为anonymous。

  (new Function).name // "anonymous"
  bind返回的函数，
  name属性值会加上bound前缀。

  function foo() {};
  foo.bind({}).name // "bound foo"

  (function(){}).bind({}).name // "bound "
  ### 箭头函数
  **1**
  基本用法
  ES6 允许使用“箭头”（=>）定义函数。

  var f = v => v;

  // 等同于
  var f = function (v) {
    return v;
  };
  如果箭头函数不需要参数或需要多个参数，
  就使用一个圆括号代表参数部分。

  var f = () => 5;
  // 等同于
  var f = function () { return 5 };

  var sum = (num1, num2) => num1 + num2;
  // 等同于
  var sum = function(num1, num2) {
    return num1 + num2;
  };
  如果箭头函数的代码块部分多于一条语句，
  就要使用大括号将它们括起来，
  并且使用return语句返回。

  var sum = (num1, num2) => { return num1 + num2; }
  由于大括号被解释为代码块，
  所以如果箭头函数直接返回一个对象，
  必须在对象外面加上括号，
  否则会报错。

  // 报错
  let getTempItem = id => { id: id, name: "Temp" };

  // 不报错
  let getTempItem = id => ({ id: id, name: "Temp" });
  下面是一种特殊情况，
  虽然可以运行，
  但会得到错误的结果。

  let foo = () => { a: 1 };
  foo() // undefined
  上面代码中，
  原始意图是返回一个对象{ a: 1 }，
  但是由于引擎认为大括号是代码块，
  所以执行了一行语句a: 1。这时，
  a可以被解释为语句的标签，
  因此实际执行的语句是1;，
  然后函数就结束了，
  没有返回值。

  如果箭头函数只有一行语句，
  且不需要返回值，
  可以采用下面的写法，
  就不用写大括号了。

  let fn = () => void doesNotReturn();
  箭头函数可以与变量解构结合使用。

  const full = ({ first, last }) => first + ' ' + last;

  // 等同于
  function full(person) {
    return person.first + ' ' + person.last;
  }
  箭头函数使得表达更加简洁。

  const isEven = n => n % 2 === 0;
  const square = n => n * n;
  上面代码只用了两行，
  就定义了两个简单的工具函数。如果不用箭头函数，
  可能就要占用多行，
  而且还不如现在这样写醒目。

  箭头函数的一个用处是简化回调函数。

  // 正常函数写法
  [1,2,3].map(function (x) {
    return x * x;
  });

  // 箭头函数写法
  [1,2,3].map(x => x * x);
  另一个例子是

  // 正常函数写法
  var result = values.sort(function (a, b) {
    return a - b;
  });

  // 箭头函数写法
  var result = values.sort((a, b) => a - b);
  下面是 rest 参数与箭头函数结合的例子。

  const numbers = (...nums) => nums;

  numbers(1, 2, 3, 4, 5)
  // [1,2,3,4,5]

  const headAndTail = (head, ...tail) => [head, tail];

  headAndTail(1, 2, 3, 4, 5)
  // [1,[2,3,4,5]]

  **2**
  使用注意点
  箭头函数有几个使用注意点。

  （1）函数体内的this对象，
  就是定义时所在的对象，
  而不是使用时所在的对象。

  （2）不可以当作构造函数，
  也就是说，
  不可以使用new命令，
  否则会抛出一个错误。

  （3）不可以使用arguments对象，
  该对象在函数体内不存在。如果要用，
  可以用 rest 参数代替。

  （4）不可以使用yield命令，
  因此箭头函数不能用作 Generator 函数。

  上面四点中，
  第一点尤其值得注意。this对象的指向是可变的，
  但是在箭头函数中，
  它是固定的。

  function foo() {
    setTimeout(() => {
      console.log('id:', this.id);
    }, 100);
  }

  var id = 21;

  foo.call({ id: 42 });
  // id: 42
  上面代码中，
  setTimeout的参数是一个箭头函数，
  这个箭头函数的定义生效是在foo函数生成时，
  而它的真正执行要等到 100 毫秒后。如果是普通函数，
  执行时this应该指向全局对象window，
  这时应该输出21。但是，
  箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），
  所以输出的是42。

  箭头函数可以让setTimeout里面的this，
  绑定定义时所在的作用域，
  而不是指向运行时所在的作用域。下面是另一个例子。

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
  上面代码中，
  Timer函数内部设置了两个定时器，
  分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），
  后者的this指向运行时所在的作用域（即全局对象）。所以，
  3100 毫秒之后，
  timer.s1被更新了 3 次，
  而timer.s2一次都没更新。

  箭头函数可以让this指向固定化，
  这种特性很有利于封装回调函数。下面是一个例子，
  DOM 事件的回调函数封装在一个对象里面。

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
  上面代码的init方法中，
  使用了箭头函数，
  这导致这个箭头函数里面的this，
  总是指向handler对象。否则，
  回调函数运行时，
  this.doSomething这一行会报错，
  因为此时this指向document对象。

  this指向的固定化，
  并不是因为箭头函数内部有绑定this的机制，
  实际原因是箭头函数根本没有自己的this，
  导致内部的this就是外层代码块的this。正是因为它没有this，
  所以也就不能用作构造函数。

  所以，
  箭头函数转成 ES5 的代码如下。

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
  上面代码中，
  转换后的 ES5 版本清楚地说明了，
  箭头函数里面根本没有自己的this，
  而是引用外层的this。

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
  上面代码之中，
  只有一个this，
  就是函数foo的this，
  所以t1、t2、t3都输出同样的结果。因为所有的内层函数都是箭头函数，
  都没有自己的this，
  它们的this其实都是最外层foo函数的this。

  除了this，
  以下三个变量在箭头函数之中也是不存在的，
  指向外层函数的对应变量：arguments、super、new.target。

  function foo() {
    setTimeout(() => {
      console.log('args:', arguments);
    }, 100);
  }

  foo(2, 4, 6, 8)
  // args: [2, 4, 6, 8]
  上面代码中，
  箭头函数内部的变量arguments，
  其实是函数foo的arguments变量。

  另外，
  由于箭头函数没有自己的this，
  所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

  (function() {
    return [
      (() => this.x).bind({ x: 'inner' })()
    ];
  }).call({ x: 'outer' });
  // ['outer']
  上面代码中，
  箭头函数没有自己的this，
  所以bind方法无效，
  内部的this指向外部的this。

  长期以来，
  JavaScript 语言的this对象一直是一个令人头痛的问题，
  在对象方法中使用this，
  必须非常小心。箭头函数”绑定”this，
  很大程度上解决了这个困扰。

  **3**
  不适用场合
  由于箭头函数使得this从“动态”变成“静态”，
  下面两个场合不应该使用箭头函数。

  第一个场合是定义对象的方法，
  且该方法内部包括this。

  const cat = {
    lives: 9,
    jumps: () => {
      this.lives--;
    }
  }
  上面代码中，
  cat.jumps()方法是一个箭头函数，
  这是错误的。调用cat.jumps()时，
  如果是普通函数，
  该方法内部的this指向cat；如果写成上面那样的箭头函数，
  使得this指向全局对象，
  因此不会得到预期结果。这是因为对象不构成单独的作用域，
  导致jumps箭头函数定义时的作用域就是全局作用域。

  第二个场合是需要动态this的时候，
  也不应使用箭头函数。

  var button = document.getElementById('press');
  button.addEventListener('click', () => {
    this.classList.toggle('on');
  });
  上面代码运行时，
  点击按钮会报错，
  因为button的监听函数是一个箭头函数，
  导致里面的this就是全局对象。如果改成普通函数，
  this就会动态指向被点击的按钮对象。

  另外，
  如果函数体很复杂，
  有许多行，
  或者函数内部有大量的读写操作，
  不单纯是为了计算值，
  这时也不应该使用箭头函数，
  而是要使用普通函数，
  这样可以提高代码可读性。

  **4**
  嵌套的箭头函数
  箭头函数内部，
  还可以再使用箭头函数。下面是一个 ES5 语法的多重嵌套函数。

  function insert(value) {
    return {into: function (array) {
      return {after: function (afterValue) {
        array.splice(array.indexOf(afterValue) + 1, 0, value);
        return array;
      }};
    }};
  }

  insert(2).into([1, 3]).after(1); //[1, 2, 3]
  上面这个函数，
  可以使用箭头函数改写。

  let insert = (value) => ({into: (array) => ({after: (afterValue) => {
    array.splice(array.indexOf(afterValue) + 1, 0, value);
    return array;
  }})});

  insert(2).into([1, 3]).after(1); //[1, 2, 3]
  下面是一个部署管道机制（pipeline）的例子，
  即前一个函数的输出是后一个函数的输入。

  const pipeline = (...funcs) =>
    val => funcs.reduce((a, b) => b(a), val);

  const plus1 = a => a + 1;
  const mult2 = a => a * 2;
  const addThenMult = pipeline(plus1, mult2);

  addThenMult(5)
  // 12
  如果觉得上面的写法可读性比较差，
  也可以采用下面的写法。

  const plus1 = a => a + 1;
  const mult2 = a => a * 2;

  mult2(plus1(5))
  // 12
  箭头函数还有一个功能，
  就是可以很方便地改写 λ 演算。

  // λ演算的写法
  fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

  // ES6的写法
  var fix = f => (x => f(v => x(x)(v)))
                (x => f(v => x(x)(v)));
  上面两种写法，
  几乎是一一对应的。由于 λ 演算对于计算机科学非常重要，
  这使得我们可以用 ES6 作为替代工具，
  探索计算机科学。

  ### 尾调用优化
  **1**
  什么是尾调用？
  尾调用（Tail Call）是函数式编程的一个重要概念，
  本身非常简单，
  一句话就能说清楚，
  就是指某个函数的最后一步是调用另一个函数。

  function f(x){
    return g(x);
  }
  上面代码中，
  函数f的最后一步是调用函数g，
  这就叫尾调用。

  以下三种情况，
  都不属于尾调用。

  // 情况一
  function f(x){
    let y = g(x);
    return y;
  }

  // 情况二
  function f(x){
    return g(x) + 1;
  }

  // 情况三
  function f(x){
    g(x);
  }
  上面代码中，
  情况一是调用函数g之后，
  还有赋值操作，
  所以不属于尾调用，
  即使语义完全一样。情况二也属于调用后还有操作，
  即使写在一行内。情况三等同于下面的代码。

  function f(x){
    g(x);
    return undefined;
  }
  尾调用不一定出现在函数尾部，
  只要是最后一步操作即可。

  function f(x) {
    if (x > 0) {
      return m(x)
    }
    return n(x);
  }
  上面代码中，
  函数m和n都属于尾调用，
  因为它们都是函数f的最后一步操作。

  **2**
  尾调用优化
  尾调用之所以与其他调用不同，
  就在于它的特殊的调用位置。

  我们知道，
  函数调用会在内存形成一个“调用记录”，
  又称“调用帧”（call frame），
  保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，
  那么在A的调用帧上方，
  还会形成一个B的调用帧。等到B运行结束，
  将结果返回到A，
  B的调用帧才会消失。如果函数B内部还调用函数C，
  那就还有一个C的调用帧，
  以此类推。所有的调用帧，
  就形成一个“调用栈”（call stack）。

  尾调用由于是函数的最后一步操作，
  所以不需要保留外层函数的调用帧，
  因为调用位置、内部变量等信息都不会再用到了，
  只要直接用内层函数的调用帧，
  取代外层函数的调用帧就可以了。

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
  上面代码中，
  如果函数g不是尾调用，
  函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，
  函数f就结束了，
  所以执行到最后一步，
  完全可以删除f(x)的调用帧，
  只保留g(3)的调用帧。

  这就叫做“尾调用优化”（Tail call optimization），
  即只保留内层函数的调用帧。如果所有函数都是尾调用，
  那么完全可以做到每次执行时，
  调用帧只有一项，
  这将大大节省内存。这就是“尾调用优化”的意义。

  注意，
  只有不再用到外层函数的内部变量，
  内层函数的调用帧才会取代外层函数的调用帧，
  否则就无法进行“尾调用优化”。

  function addOne(a){
    var one = 1;
    function inner(b){
      return b + one;
    }
    return inner(a);
  }
  上面的函数不会进行尾调用优化，
  因为内层函数inner用到了外层函数addOne的内部变量one。

  注意，
  目前只有 Safari 浏览器支持尾调用优化，
  Chrome 和 Firefox 都不支持。

  **3**
  尾递归
  函数调用自身，
  称为递归。如果尾调用自身，
  就称为尾递归。

  递归非常耗费内存，
  因为需要同时保存成千上百个调用帧，
  很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，
  由于只存在一个调用帧，
  所以永远不会发生“栈溢出”错误。

  function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
  }

  factorial(5) // 120
  上面代码是一个阶乘函数，
  计算n的阶乘，
  最多需要保存n个调用记录，
  复杂度 O(n) 。

  如果改写成尾递归，
  只保留一个调用记录，
  复杂度 O(1) 。

  function factorial(n, total) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
  }

  factorial(5, 1) // 120
  还有一个比较著名的例子，
  就是计算 Fibonacci 数列，
  也能充分说明尾递归优化的重要性。

  非尾递归的 Fibonacci 数列实现如下。

  function Fibonacci (n) {
    if ( n &lt;= 1 ) {return 1};

    return Fibonacci(n - 1) + Fibonacci(n - 2);
  }

  Fibonacci(10) // 89
  Fibonacci(100) // 超时
  Fibonacci(500) // 超时
  尾递归优化过的 Fibonacci 数列实现如下。

  function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
    if( n &lt;= 1 ) {return ac2};

    return Fibonacci2 (n - 1, ac2, ac1 + ac2);
  }

  Fibonacci2(100) // 573147844013817200000
  Fibonacci2(1000) // 7.0330367711422765e+208
  Fibonacci2(10000) // Infinity
  由此可见，
  “尾调用优化”对递归操作意义重大，
  所以一些函数式编程语言将其写入了语言规格。ES6 亦是如此，
  第一次明确规定，
  所有 ECMAScript 的实现，
  都必须部署“尾调用优化”。这就是说，
  ES6 中只要使用尾递归，
  就不会发生栈溢出（或者层层递归造成的超时），
  相对节省内存。

  **4**
  递归函数的改写
  尾递归的实现，
  往往需要改写递归函数，
  确保最后一步只调用自身。做到这一点的方法，
  就是把所有用到的内部变量改写成函数的参数。比如上面的例子，
  阶乘函数 factorial 需要用到一个中间变量total，
  那就把这个中间变量改写成函数的参数。这样做的缺点就是不太直观，
  第一眼很难看出来，
  为什么计算5的阶乘，
  需要传入两个参数5和1？

  两个方法可以解决这个问题。方法一是在尾递归函数之外，
  再提供一个正常形式的函数。

  function tailFactorial(n, total) {
    if (n === 1) return total;
    return tailFactorial(n - 1, n * total);
  }

  function factorial(n) {
    return tailFactorial(n, 1);
  }

  factorial(5) // 120
  上面代码通过一个正常形式的阶乘函数factorial，
  调用尾递归函数tailFactorial，
  看起来就正常多了。

  函数式编程有一个概念，
  叫做柯里化（currying），
  意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

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
  上面代码通过柯里化，
  将尾递归函数tailFactorial变为只接受一个参数的factorial。

  第二种方法就简单多了，
  就是采用 ES6 的函数默认值。

  function factorial(n, total = 1) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
  }

  factorial(5) // 120
  上面代码中，
  参数total有默认值1，
  所以调用时不用提供这个值。

  总结一下，
  递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，
  所有的循环都用递归实现，
  这就是为什么尾递归对这些语言极其重要。对于其他支持“尾调用优化”的语言（比如 Lua，
  ES6），
  只需要知道循环可以用递归代替，
  而一旦使用递归，
  就最好使用尾递归。

  **5**
  严格模式
  ES6 的尾调用优化只在严格模式下开启，
  正常模式是无效的。

  这是因为在正常模式下，
  函数内部有两个变量，
  可以跟踪函数的调用栈。

  func.arguments：返回调用时函数的参数。
  func.caller：返回调用当前函数的那个函数。
  尾调用优化发生时，
  函数的调用栈会改写，
  因此上面两个变量就会失真。严格模式禁用这两个变量，
  所以尾调用模式仅在严格模式下生效。

  function restricted() {
    'use strict';
    restricted.caller;    // 报错
    restricted.arguments; // 报错
  }
  restricted();

  **6**
  尾递归优化的实现
  尾递归优化只在严格模式下生效，
  那么正常模式下，
  或者那些不支持该功能的环境中，
  有没有办法也使用尾递归优化呢？回答是可以的，
  就是自己实现尾递归优化。

  它的原理非常简单。尾递归之所以需要优化，
  原因是调用栈太多，
  造成溢出，
  那么只要减少调用栈，
  就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

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
  上面代码中，
  sum是一个递归函数，
  参数x是需要累加的值，
  参数y控制递归次数。一旦指定sum递归 100000 次，
  就会报错，
  提示超出调用栈的最大次数。

  蹦床函数（trampoline）可以将递归执行转为循环执行。

  function trampoline(f) {
    while (f && f instanceof Function) {
      f = f();
    }
    return f;
  }
  上面就是蹦床函数的一个实现，
  它接受一个函数f作为参数。只要f执行后返回一个函数，
  就继续执行。注意，
  这里是返回一个函数，
  然后执行该函数，
  而不是函数里面调用函数，
  这样就避免了递归执行，
  从而就消除了调用栈过大的问题。

  然后，
  要做的就是将原来的递归函数，
  改写为每一步返回另一个函数。

  function sum(x, y) {
    if (y > 0) {
      return sum.bind(null, x + 1, y - 1);
    } else {
      return x;
    }
  }
  上面代码中，
  sum函数的每次执行，
  都会返回自身的另一个版本。

  现在，
  使用蹦床函数执行sum，
  就不会发生调用栈溢出。

  trampoline(sum(1, 100000))
  // 100001
  蹦床函数并不是真正的尾递归优化，
  下面的实现才是。

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
  上面代码中，
  tco函数是尾递归优化的实现，
  它的奥妙就在于状态变量active。默认情况下，
  这个变量是不激活的。一旦进入尾递归优化的过程，
  这个变量就激活了。然后，
  每一轮递归sum返回的都是undefined，
  所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，
  总是有值的，
  这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，
  而后一轮的参数会取代前一轮的参数，
  保证了调用栈只有一层。

  ### 函数参数的尾逗号
  ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。

  此前，
  函数定义和调用时，
  都不允许最后一个参数后面出现逗号。

  function clownsEverywhere(
    param1,
    param2
  ) { /* ... */ }

  clownsEverywhere(
    'foo',
    'bar'
  );
  上面代码中，
  如果在param2或bar后面加一个逗号，
  就会报错。

  如果像上面这样，
  将参数写成多行（即每个参数占据一行），
  以后修改代码的时候，
  想为函数clownsEverywhere添加第三个参数，
  或者调整参数的次序，
  就势必要在原来最后一个参数后面添加一个逗号。这对于版本管理系统来说，
  就会显示添加逗号的那一行也发生了变动。这看上去有点冗余，
  因此新的语法允许定义和调用时，
  尾部直接有一个逗号。

  function clownsEverywhere(
    param1,
    param2,
  ) { /* ... */ }

  clownsEverywhere(
    'foo',
    'bar',
  );
  这样的规定也使得，
  函数参数与数组和对象的尾逗号规则，
  保持一致了。

  ### Function.prototype.toString()
  ES2019 对函数实例的toString()方法做出了修改。

  toString()方法返回函数代码本身，
  以前会省略注释和空格。

  function /* foo comment */ foo () {}

  foo.toString()
  // function foo() {}
  上面代码中，
  函数foo的原始代码包含注释，
  函数名foo和圆括号之间有空格，
  但是toString()方法都把它们省略了。

  修改后的toString()方法，
  明确要求返回一模一样的原始代码。

  function /* foo comment */ foo () {}

  foo.toString()
  // "function /* foo comment */ foo () {}"

  ### catch 命令的参数省略
  JavaScript 语言的try...catch结构，
  以前明确要求catch命令后面必须跟参数，
  接受try代码块抛出的错误对象。

  try {
    // ...
  } catch (err) {
    // 处理错误
  }
  上面代码中，
  catch命令后面带有参数err。

  很多时候，
  catch代码块可能用不到这个参数。但是，
  为了保证语法正确，
  还是必须写。ES2019 做出了改变，
  允许catch语句省略参数。

  try {
    // ...
  } catch {
    // ...
  }
</pre>
<pre>
数组的扩展
  ### 扩展运算符
  **1**
  含义
  扩展运算符（spread）是三个点（...）。
  好比 rest 参数的逆运算，
  将一个数组转为用逗号分隔的参数序列。

  console.log(...[1, 2, 3])
  // 1 2 3

  console.log(1, ...[2, 3, 4], 5)
  // 1 2 3 4 5

  [...document.querySelectorAll('div')]
  // [&lt;div>, &lt;div>, &lt;div>]
  该运算符主要用于函数调用。

  function push(array, ...items) {
    array.push(...items);
  }

  function add(x, y) {
    return x + y;
  }

  const numbers = [4, 38];
  add(...numbers) // 42
  上面代码中，
  array.push(...items)和add(...numbers)这两行，
  都是函数的调用，
  它们都使用了扩展运算符。该运算符将一个数组，
  变为参数序列。

  扩展运算符与正常的函数参数可以结合使用，
  非常灵活。

  function f(v, w, x, y, z) { }
  const args = [0, 1];
  f(-1, ...args, 2, ...[3]);
  扩展运算符后面还可以放置表达式。

  const arr = [
    ...(x > 0 ? ['a'] : []),
    'b',
  ];
  如果扩展运算符后面是一个空数组，
  则不产生任何效果。

  [...[], 1]
  // [1]
  注意，
  只有函数调用时，
  扩展运算符才可以放在圆括号中，
  否则会报错。

  (...[1, 2])
  // Uncaught SyntaxError: Unexpected number

  console.log((...[1, 2]))
  // Uncaught SyntaxError: Unexpected number

  console.log(...[1, 2])
  // 1 2
  上面三种情况，
  扩展运算符都放在圆括号里面，
  但是前两种情况会报错，
  因为扩展运算符所在的括号不是函数调用。

  **2**
  替代函数的 apply 方法
  由于扩展运算符可以展开数组，
  所以不再需要apply方法，
  将数组转为函数的参数了。

  // ES5 的写法
  function f(x, y, z) {
    // ...
  }
  var args = [0, 1, 2];
  f.apply(null, args);

  // ES6的写法
  function f(x, y, z) {
    // ...
  }
  let args = [0, 1, 2];
  f(...args);
  下面是扩展运算符取代apply方法的一个实际的例子，
  应用Math.max方法，
  简化求出一个数组最大元素的写法。

  // ES5 的写法
  Math.max.apply(null, [14, 3, 77])

  // ES6 的写法
  Math.max(...[14, 3, 77])

  // 等同于
  Math.max(14, 3, 77);
  上面代码中，
  由于 JavaScript 不提供求数组最大元素的函数，
  所以只能套用Math.max函数，
  将数组转为一个参数序列，
  然后求最大值。有了扩展运算符以后，
  就可以直接用Math.max了。

  另一个例子是通过push函数，
  将一个数组添加到另一个数组的尾部。

  // ES5的 写法
  var arr1 = [0, 1, 2];
  var arr2 = [3, 4, 5];
  Array.prototype.push.apply(arr1, arr2);

  // ES6 的写法
  let arr1 = [0, 1, 2];
  let arr2 = [3, 4, 5];
  arr1.push(...arr2);
  上面代码的 ES5 写法中，
  push方法的参数不能是数组，
  所以只好通过apply方法变通使用push方法。有了扩展运算符，
  就可以直接将数组传入push方法。

  下面是另外一个例子。

  // ES5
  new (Date.bind.apply(Date, [null, 2015, 1, 1]))
  // ES6
  new Date(...[2015, 1, 1]);

  **3**
  扩展运算符的应用
  （1）复制数组

  数组是复合的数据类型，
  直接复制的话，
  只是复制了指向底层数据结构的指针，
  而不是克隆一个全新的数组。

  const a1 = [1, 2];
  const a2 = a1;

  a2[0] = 2;
  a1 // [2, 2]
  上面代码中，
  a2并不是a1的克隆，
  而是指向同一份数据的另一个指针。修改a2，
  会直接导致a1的变化。

  ES5 只能用变通方法来复制数组。

  const a1 = [1, 2];
  const a2 = a1.concat();

  a2[0] = 2;
  a1 // [1, 2]
  上面代码中，
  a1会返回原数组的克隆，
  再修改a2就不会对a1产生影响。

  扩展运算符提供了复制数组的简便写法。

  const a1 = [1, 2];
  // 写法一
  const a2 = [...a1];
  // 写法二
  const [...a2] = a1;
  上面的两种写法，
  a2都是a1的克隆。

  （2）合并数组

  扩展运算符提供了数组合并的新写法。

  const arr1 = ['a', 'b'];
  const arr2 = ['c'];
  const arr3 = ['d', 'e'];

  // ES5 的合并数组
  arr1.concat(arr2, arr3);
  // [ 'a', 'b', 'c', 'd', 'e' ]

  // ES6 的合并数组
  [...arr1, ...arr2, ...arr3]
  // [ 'a', 'b', 'c', 'd', 'e' ]
  不过，
  这两种方法都是浅拷贝，
  使用的时候需要注意。

  const a1 = [{ foo: 1 }];
  const a2 = [{ bar: 2 }];

  const a3 = a1.concat(a2);
  const a4 = [...a1, ...a2];

  a3[0] === a1[0] // true
  a4[0] === a1[0] // true
  上面代码中，
  a3和a4是用两种不同方法合并而成的新数组，
  但是它们的成员都是对原数组成员的引用，
  这就是浅拷贝。如果修改了引用指向的值，
  会同步反映到新数组。

  （3）与解构赋值结合

  扩展运算符可以与解构赋值结合起来，
  用于生成数组。

  // ES5
  a = list[0], rest = list.slice(1)
  // ES6
  [a, ...rest] = list
  下面是另外一些例子。

  const [first, ...rest] = [1, 2, 3, 4, 5];
  first // 1
  rest  // [2, 3, 4, 5]

  const [first, ...rest] = [];
  first // undefined
  rest  // []

  const [first, ...rest] = ["foo"];
  first  // "foo"
  rest   // []
  如果将扩展运算符用于数组赋值，
  只能放在参数的最后一位，
  否则会报错。

  const [...butLast, last] = [1, 2, 3, 4, 5];
  // 报错

  const [first, ...middle, last] = [1, 2, 3, 4, 5];
  // 报错
  （4）字符串

  扩展运算符还可以将字符串转为真正的数组。

  [...'hello']
  // [ "h", "e", "l", "l", "o" ]
  上面的写法，
  有一个重要的好处，
  那就是能够正确识别四个字节的 Unicode 字符。

  'x\uD83D\uDE80y'.length // 4
  [...'x\uD83D\uDE80y'].length // 3
  上面代码的第一种写法，
  JavaScript 会将四个字节的 Unicode 字符，
  识别为 2 个字符，
  采用扩展运算符就没有这个问题。因此，
  正确返回字符串长度的函数，
  可以像下面这样写。

  function length(str) {
    return [...str].length;
  }

  length('x\uD83D\uDE80y') // 3
  凡是涉及到操作四个字节的 Unicode 字符的函数，
  都有这个问题。因此，
  最好都用扩展运算符改写。

  let str = 'x\uD83D\uDE80y';

  str.split('').reverse().join('')
  // 'y\uDE80\uD83Dx'

  [...str].reverse().join('')
  // 'y\uD83D\uDE80x'
  上面代码中，
  如果不用扩展运算符，
  字符串的reverse操作就不正确。

  （5）实现了 Iterator 接口的对象

  任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），
  都可以用扩展运算符转为真正的数组。

  let nodeList = document.querySelectorAll('div');
  let array = [...nodeList];
  上面代码中，
  querySelectorAll方法返回的是一个NodeList对象。它不是数组，
  而是一个类似数组的对象。这时，
  扩展运算符可以将其转为真正的数组，
  原因就在于NodeList对象实现了 Iterator 。

  Number.prototype[Symbol.iterator] = function*() {
    let i = 0;
    let num = this.valueOf();
    while (i &lt; num) {
      yield i++;
    }
  }

  console.log([...5]) // [0, 1, 2, 3, 4]
  上面代码中，
  先定义了Number对象的遍历器接口，
  扩展运算符将5自动转成Number实例以后，
  就会调用这个接口，
  就会返回自定义的结果。

  对于那些没有部署 Iterator 接口的类似数组的对象，
  扩展运算符就无法将其转为真正的数组。

  let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
  };

  // TypeError: Cannot spread non-iterable object.
  let arr = [...arrayLike];
  上面代码中，
  arrayLike是一个类似数组的对象，
  但是没有部署 Iterator 接口，
  扩展运算符就会报错。这时，
  可以改为使用Array.from方法将arrayLike转为真正的数组。

  （6）Map 和 Set 结构，
  Generator 函数

  扩展运算符内部调用的是数据结构的 Iterator 接口，
  因此只要具有 Iterator 接口的对象，
  都可以使用扩展运算符，
  比如 Map 结构。

  let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
  ]);

  let arr = [...map.keys()]; // [1, 2, 3]
  Generator 函数运行后，
  返回一个遍历器对象，
  因此也可以使用扩展运算符。

  const go = function*(){
    yield 1;
    yield 2;
    yield 3;
  };

  [...go()] // [1, 2, 3]
  上面代码中，
  变量go是一个 Generator 函数，
  执行后返回的是一个遍历器对象，
  对这个遍历器对象执行扩展运算符，
  就会将内部遍历得到的值，
  转为一个数组。

  如果对没有 Iterator 接口的对象，
  使用扩展运算符，
  将会报错。

  const obj = {a: 1, b: 2};
  let arr = [...obj]; // TypeError: Cannot spread non-iterable object

  ### Array.from()
  Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

  下面是一个类似数组的对象，
  Array.from将它转为真正的数组。

  let arrayLike = {
      '0': 'a',
      '1': 'b',
      '2': 'c',
      length: 3
  };

  // ES5的写法
  var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

  // ES6的写法
  let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
  实际应用中，
  常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，
  以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。

  // NodeList对象
  let ps = document.querySelectorAll('p');
  Array.from(ps).filter(p => {
    return p.textContent.length > 100;
  });

  // arguments对象
  function foo() {
    var args = Array.from(arguments);
    // ...
  }
  上面代码中，
  querySelectorAll方法返回的是一个类似数组的对象，
  可以将这个对象转为真正的数组，
  再使用filter方法。

  只要是部署了 Iterator 接口的数据结构，
  Array.from都能将其转为数组。

  Array.from('hello')
  // ['h', 'e', 'l', 'l', 'o']

  let namesSet = new Set(['a', 'b'])
  Array.from(namesSet) // ['a', 'b']
  上面代码中，
  字符串和 Set 结构都具有 Iterator 接口，
  因此可以被Array.from转为真正的数组。

  如果参数是一个真正的数组，
  Array.from会返回一个一模一样的新数组。

  Array.from([1, 2, 3])
  // [1, 2, 3]
  值得提醒的是，
  扩展运算符（...）也可以将某些数据结构转为数组。

  // arguments对象
  function foo() {
    const args = [...arguments];
  }

  // NodeList对象
  [...document.querySelectorAll('div')]
  扩展运算符背后调用的是遍历器接口（Symbol.iterator），
  如果一个对象没有部署这个接口，
  就无法转换。Array.from方法还支持类似数组的对象。所谓类似数组的对象，
  本质特征只有一点，
  即必须有length属性。因此，
  任何有length属性的对象，
  都可以通过Array.from方法转为数组，
  而此时扩展运算符就无法转换。

  Array.from({ length: 3 });
  // [ undefined, undefined, undefined ]
  上面代码中，
  Array.from返回了一个具有三个成员的数组，
  每个位置的值都是undefined。扩展运算符转换不了这个对象。

  对于还没有部署该方法的浏览器，
  可以用Array.prototype.slice方法替代。

  const toArray = (() =>
    Array.from ? Array.from : obj => [].slice.call(obj)
  )();
  Array.from还可以接受第二个参数，
  作用类似于数组的map方法，
  用来对每个元素进行处理，
  将处理后的值放入返回的数组。

  Array.from(arrayLike, x => x * x);
  // 等同于
  Array.from(arrayLike).map(x => x * x);

  Array.from([1, 2, 3], (x) => x * x)
  // [1, 4, 9]
  下面的例子是取出一组 DOM 节点的文本内容。

  let spans = document.querySelectorAll('span.name');

  // map()
  let names1 = Array.prototype.map.call(spans, s => s.textContent);

  // Array.from()
  let names2 = Array.from(spans, s => s.textContent)
  下面的例子将数组中布尔值为false的成员转为0。

  Array.from([1, , 2, , 3], (n) => n || 0)
  // [1, 0, 2, 0, 3]
  另一个例子是返回各种数据的类型。

  function typesOf () {
    return Array.from(arguments, value => typeof value)
  }
  typesOf(null, [], NaN)
  // ['object', 'object', 'number']
  如果map函数里面用到了this关键字，
  还可以传入Array.from的第三个参数，
  用来绑定this。

  Array.from()可以将各种值转为真正的数组，
  并且还提供map功能。这实际上意味着，
  只要有一个原始的数据结构，
  你就可以先对它的值进行处理，
  然后转成规范的数组结构，
  进而就可以使用数量众多的数组方法。

  Array.from({ length: 2 }, () => 'jack')
  // ['jack', 'jack']
  上面代码中，
  Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。

  Array.from()的另一个应用是，
  将字符串转为数组，
  然后返回字符串的长度。因为它能正确处理各种 Unicode 字符，
  可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，
  算作两个字符的 bug。

  function countSymbols(string) {
    return Array.from(string).length;
  }

  ### Array.of()
  Array.of方法用于将一组值，
  转换为数组。

  Array.of(3, 11, 8) // [3,11,8]
  Array.of(3) // [3]
  Array.of(3).length // 1
  这个方法的主要目的，
  是弥补数组构造函数Array()的不足。因为参数个数的不同，
  会导致Array()的行为有差异。

  Array() // []
  Array(3) // [, , ,]
  Array(3, 11, 8) // [3, 11, 8]
  上面代码中，
  Array方法没有参数、一个参数、三个参数时，
  返回结果都不一样。只有当参数个数不少于 2 个时，
  Array()才会返回由参数组成的新数组。参数个数只有一个时，
  实际上是指定数组的长度。

  Array.of基本上可以用来替代Array()或new Array()，
  并且不存在由于参数不同而导致的重载。它的行为非常统一。

  Array.of() // []
  Array.of(undefined) // [undefined]
  Array.of(1) // [1]
  Array.of(1, 2) // [1, 2]
  Array.of总是返回参数值组成的数组。如果没有参数，
  就返回一个空数组。

  Array.of方法可以用下面的代码模拟实现。

  function ArrayOf(){
    return [].slice.call(arguments);
  }

  ### 数组实例的 copyWithin()
  数组实例的copyWithin()方法，
  在当前数组内部，
  将指定位置的成员复制到其他位置（会覆盖原有成员），
  然后返回当前数组。也就是说，
  使用这个方法，
  会修改当前数组。

  Array.prototype.copyWithin(target, start = 0, end = this.length)
  它接受三个参数。

  target（必需）：从该位置开始替换数据。如果为负值，
  表示倒数。
  start（可选）：从该位置开始读取数据，
  默认为 0。如果为负值，
  表示从末尾开始计算。
  end（可选）：到该位置前停止读取数据，
  默认等于数组长度。如果为负值，
  表示从末尾开始计算。
  这三个参数都应该是数值，
  如果不是，
  会自动转为数值。

  [1, 2, 3, 4, 5].copyWithin(0, 3)
  // [4, 5, 3, 4, 5]
  上面代码表示将从 3 号位直到数组结束的成员（4 和 5），
  复制到从 0 号位开始的位置，
  结果覆盖了原来的 1 和 2。

  下面是更多例子。

  // 将3号位复制到0号位
  [1, 2, 3, 4, 5].copyWithin(0, 3, 4)
  // [4, 2, 3, 4, 5]

  // -2相当于3号位，
  -1相当于4号位
  [1, 2, 3, 4, 5].copyWithin(0, -2, -1)
  // [4, 2, 3, 4, 5]

  // 将3号位复制到0号位
  [].copyWithin.call({length: 5, 3: 1}, 0, 3)
  // {0: 1, 3: 1, length: 5}

  // 将2号位到数组结束，
  复制到0号位
  let i32a = new Int32Array([1, 2, 3, 4, 5]);
  i32a.copyWithin(0, 2);
  // Int32Array [3, 4, 5, 4, 5]

  // 对于没有部署 TypedArray 的 copyWithin 方法的平台
  // 需要采用下面的写法
  [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
  // Int32Array [4, 2, 3, 4, 5]

  ### 数组实例的 find() 和 findIndex()
  数组实例的find方法，
  用于找出第一个符合条件的数组成员。它的参数是一个回调函数，
  所有数组成员依次执行该回调函数，
  直到找出第一个返回值为true的成员，
  然后返回该成员。如果没有符合条件的成员，
  则返回undefined。

  [1, 4, -5, 10].find((n) => n &lt; 0)
  // -5
  上面代码找出数组中第一个小于 0 的成员。

  [1, 5, 10, 15].find(function(value, index, arr) {
    return value > 9;
  }) // 10
  上面代码中，
  find方法的回调函数可以接受三个参数，
  依次为当前的值、当前的位置和原数组。

  数组实例的findIndex方法的用法与find方法非常类似，
  返回第一个符合条件的数组成员的位置，
  如果所有成员都不符合条件，
  则返回-1。

  [1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
  }) // 2
  这两个方法都可以接受第二个参数，
  用来绑定回调函数的this对象。

  function f(v){
    return v > this.age;
  }
  let person = {name: 'John', age: 20};
  [10, 12, 26, 15].find(f, person);    // 26
  上面的代码中，
  find函数接收了第二个参数person对象，
  回调函数中的this对象指向person对象。

  另外，
  这两个方法都可以发现NaN，
  弥补了数组的indexOf方法的不足。

  [NaN].indexOf(NaN)
  // -1

  [NaN].findIndex(y => Object.is(NaN, y))
  // 0
  上面代码中，
  indexOf方法无法识别数组的NaN成员，
  但是findIndex方法可以借助Object.is方法做到。

  ### 数组实例的 fill()
  fill方法使用给定值，
  填充一个数组。

  ['a', 'b', 'c'].fill(7)
  // [7, 7, 7]

  new Array(3).fill(7)
  // [7, 7, 7]
  上面代码表明，
  fill方法用于空数组的初始化非常方便。数组中已有的元素，
  会被全部抹去。

  fill方法还可以接受第二个和第三个参数，
  用于指定填充的起始位置和结束位置。

  ['a', 'b', 'c'].fill(7, 1, 2)
  // ['a', 7, 'c']
  上面代码表示，
  fill方法从 1 号位开始，
  向原数组填充 7，
  到 2 号位之前结束。

  注意，
  如果填充的类型为对象，
  那么被赋值的是同一个内存地址的对象，
  而不是深拷贝对象。

  let arr = new Array(3).fill({name: "Mike"});
  arr[0].name = "Ben";
  arr
  // [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

  let arr = new Array(3).fill([]);
  arr[0].push(5);
  arr
  // [[5], [5], [5]]

  ### 数组实例的 entries()，keys() 和 values()
  ES6 提供三个新的方法——entries()，
  keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），
  可以用for...of循环进行遍历，
  唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，
  entries()是对键值对的遍历。

  for (let index of ['a', 'b'].keys()) {
    console.log(index);
  }
  // 0
  // 1

  for (let elem of ['a', 'b'].values()) {
    console.log(elem);
  }
  // 'a'
  // 'b'

  for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
  }
  // 0 "a"
  // 1 "b"
  如果不使用for...of循环，
  可以手动调用遍历器对象的next方法，
  进行遍历。

  let letter = ['a', 'b', 'c'];
  let entries = letter.entries();
  console.log(entries.next().value); // [0, 'a']
  console.log(entries.next().value); // [1, 'b']
  console.log(entries.next().value); // [2, 'c']

  ### 数组实例的 includes()
  Array.prototype.includes方法返回一个布尔值，
  表示某个数组是否包含给定的值，
  与字符串的includes方法类似。ES2016 引入了该方法。

  [1, 2, 3].includes(2)     // true
  [1, 2, 3].includes(4)     // false
  [1, 2, NaN].includes(NaN) // true
  该方法的第二个参数表示搜索的起始位置，
  默认为0。如果第二个参数为负数，
  则表示倒数的位置，
  如果这时它大于数组长度（比如第二个参数为-4，
  但数组长度为3），
  则会重置为从0开始。

  [1, 2, 3].includes(3, 3);  // false
  [1, 2, 3].includes(3, -1); // true
  没有该方法之前，
  我们通常使用数组的indexOf方法，
  检查是否包含某个值。

  if (arr.indexOf(el) !== -1) {
    // ...
  }
  indexOf方法有两个缺点，
  一是不够语义化，
  它的含义是找到参数值的第一个出现位置，
  所以要去比较是否不等于-1，
  表达起来不够直观。二是，
  它内部使用严格相等运算符（===）进行判断，
  这会导致对NaN的误判。

  [NaN].indexOf(NaN)
  // -1
  includes使用的是不一样的判断算法，
  就没有这个问题。

  [NaN].includes(NaN)
  // true
  下面代码用来检查当前环境是否支持该方法，
  如果不支持，
  部署一个简易的替代版本。

  const contains = (() =>
    Array.prototype.includes
      ? (arr, value) => arr.includes(value)
      : (arr, value) => arr.some(el => el === value)
  )();
  contains(['foo', 'bar'], 'baz'); // => false
  另外，
  Map 和 Set 数据结构有一个has方法，
  需要注意与includes区分。

  Map 结构的has方法，
  是用来查找键名的，
  比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
  Set 结构的has方法，
  是用来查找值的，
  比如Set.prototype.has(value)、WeakSet.prototype.has(value)。

  ### 数组实例的 flat()，
  flatMap()
  数组的成员有时还是数组，
  Array.prototype.flat()用于将嵌套的数组“拉平”，
  变成一维的数组。该方法返回一个新数组，
  对原数据没有影响。

  [1, 2, [3, 4]].flat()
  // [1, 2, 3, 4]
  上面代码中，
  原数组的成员里面有一个数组，
  flat()方法将子数组的成员取出来，
  添加在原来的位置。

  flat()默认只会“拉平”一层，
  如果想要“拉平”多层的嵌套数组，
  可以将flat()方法的参数写成一个整数，
  表示想要拉平的层数，
  默认为1。

  [1, 2, [3, [4, 5]]].flat()
  // [1, 2, 3, [4, 5]]

  [1, 2, [3, [4, 5]]].flat(2)
  // [1, 2, 3, 4, 5]
  上面代码中，
  flat()的参数为2，
  表示要“拉平”两层的嵌套数组。

  如果不管有多少层嵌套，
  都要转成一维数组，
  可以用Infinity关键字作为参数。

  [1, [2, [3]]].flat(Infinity)
  // [1, 2, 3]
  如果原数组有空位，
  flat()方法会跳过空位。

  [1, 2, , 4, 5].flat()
  // [1, 2, 4, 5]
  flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），
  然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，
  不改变原数组。

  // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
  [2, 3, 4].flatMap((x) => [x, x * 2])
  // [2, 4, 3, 6, 4, 8]
  flatMap()只能展开一层数组。

  // 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
  [1, 2, 3, 4].flatMap(x => [[x * 2]])
  // [[2], [4], [6], [8]]
  上面代码中，
  遍历函数返回的是一个双层的数组，
  但是默认只能展开一层，
  因此flatMap()返回的还是一个嵌套数组。

  flatMap()方法的参数是一个遍历函数，
  该函数可以接受三个参数，
  分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。

  arr.flatMap(function callback(currentValue[, index[, array]]) {
    // ...
  }[, thisArg])
  flatMap()方法还可以有第二个参数，
  用来绑定遍历函数里面的this。

  数组的空位
  数组的空位指，
  数组的某一个位置没有任何值。比如，
  Array构造函数返回的数组都是空位。

  Array(3) // [, , ,]
  上面代码中，
  Array(3)返回一个具有 3 个空位的数组。

  注意，
  空位不是undefined，
  一个位置的值等于undefined，
  依然是有值的。空位是没有任何值，
  in运算符可以说明这一点。

  0 in [undefined, undefined, undefined] // true
  0 in [, , ,] // false
  上面代码说明，
  第一个数组的 0 号位置是有值的，
  第二个数组的 0 号位置没有值。

  ES5 对空位的处理，
  已经很不一致了，
  大多数情况下会忽略空位。

  forEach(), filter(), reduce(), every() 和some()都会跳过空位。
  map()会跳过空位，
  但会保留这个值
  join()和toString()会将空位视为undefined，
  而undefined和null会被处理成空字符串。
  // forEach方法
  [,'a'].forEach((x,i) => console.log(i)); // 1

  // filter方法
  ['a',,'b'].filter(x => true) // ['a','b']

  // every方法
  [,'a'].every(x => x==='a') // true

  // reduce方法
  [1,,2].reduce((x,y) => x+y) // 3

  // some方法
  [,'a'].some(x => x !== 'a') // false

  // map方法
  [,'a'].map(x => 1) // [,1]

  // join方法
  [,'a',undefined,null].join('#') // "#a##"

  // toString方法
  [,'a',undefined,null].toString() // ",a,,"
  ES6 则是明确将空位转为undefined。

  Array.from方法会将数组的空位，
  转为undefined，
  也就是说，
  这个方法不会忽略空位。

  Array.from(['a',,'b'])
  // [ "a", undefined, "b" ]
  扩展运算符（...）也会将空位转为undefined。

  [...['a',,'b']]
  // [ "a", undefined, "b" ]
  copyWithin()会连空位一起拷贝。

  [,'a','b',,].copyWithin(2,0) // [,"a",,"a"]
  fill()会将空位视为正常的数组位置。

  new Array(3).fill('a') // ["a","a","a"]
  for...of循环也会遍历空位。

  let arr = [, ,];
  for (let i of arr) {
    console.log(1);
  }
  // 1
  // 1
  上面代码中，
  数组arr有两个空位，
  for...of并没有忽略它们。如果改成map方法遍历，
  空位是会跳过的。

  entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

  // entries()
  [...[,'a'].entries()] // [[0,undefined], [1,"a"]]

  // keys()
  [...[,'a'].keys()] // [0,1]

  // values()
  [...[,'a'].values()] // [undefined,"a"]

  // find()
  [,'a'].find(x => true) // undefined

  // findIndex()
  [,'a'].findIndex(x => true) // 0
  由于空位的处理规则非常不统一，
  所以建议避免出现空位。

  ### Array.prototype.sort() 的排序稳定性
  排序稳定性（stable sorting）是排序算法的重要属性，
  指的是排序关键字相同的项目，
  排序前后的顺序不变。

  const arr = [
    'peach',
    'straw',
    'apple',
    'spork'
  ];

  const stableSorting = (s1, s2) => {
    if (s1[0] &lt; s2[0]) return -1;
    return 1;
  };

  arr.sort(stableSorting)
  // ["apple", "peach", "straw", "spork"]
  上面代码对数组arr按照首字母进行排序。排序结果中，
  straw在spork的前面，
  跟原始顺序一致，
  所以排序算法stableSorting是稳定排序。

  const unstableSorting = (s1, s2) => {
    if (s1[0] &lt;= s2[0]) return -1;
    return 1;
  };

  arr.sort(unstableSorting)
  // ["apple", "peach", "spork", "straw"]
  上面代码中，
  排序结果是spork在straw前面，
  跟原始顺序相反，
  所以排序算法unstableSorting是不稳定的。

  常见的排序算法之中，
  插入排序、合并排序、冒泡排序等都是稳定的，
  堆排序、快速排序等是不稳定的。不稳定排序的主要缺点是，
  多重排序时可能会产生问题。假设有一个姓和名的列表，
  要求按照“姓氏为主要关键字，
  名字为次要关键字”进行排序。开发者可能会先按名字排序，
  再按姓氏进行排序。如果排序算法是稳定的，
  这样就可以达到“先姓氏，
  后名字”的排序效果。如果是不稳定的，
  就不行。

  早先的 ECMAScript 没有规定，
  Array.prototype.sort()的默认排序算法是否稳定，
  留给浏览器自己决定，
  这导致某些实现是不稳定的。ES2019 明确规定，
  Array.prototype.sort()的默认排序算法必须稳定。这个规定已经做到了，
  现在 JavaScript 各个主要实现的默认排序算法都是稳定的。
</pre>
<pre>
对象的扩展
  对象（object）是 JavaScript 最重要的数据结构。ES6 对它进行了重大升级，
  本章介绍数据结构本身的改变，
  下一章介绍Object对象的新增方法。

  ## 属性的简洁表示法
  ES6 允许在大括号里面，
  直接写入变量和函数，
  作为对象的属性和方法。这样的书写更加简洁。

  const foo = 'bar';
  const baz = {foo};
  baz // {foo: "bar"}

  // 等同于
  const baz = {foo: foo};
  上面代码中，
  变量foo直接写在大括号里面。这时，
  属性名就是变量名, 属性值就是变量值。下面是另一个例子。

  function f(x, y) {
    return {x, y};
  }

  // 等同于

  function f(x, y) {
    return {x: x, y: y};
  }

  f(1, 2) // Object {x: 1, y: 2}
  除了属性简写，
  方法也可以简写。

  const o = {
    method() {
      return "Hello!";
    }
  };

  // 等同于

  const o = {
    method: function() {
      return "Hello!";
    }
  };
  下面是一个实际的例子。

  let birth = '2000/01/01';

  const Person = {

    name: '张三',

    //等同于birth: birth
    birth,

    // 等同于hello: function ()...
    hello() { console.log('我的名字是', this.name); }

  };
  这种写法用于函数的返回值，
  将会非常方便。

  function getPoint() {
    const x = 1;
    const y = 10;
    return {x, y};
  }

  getPoint()
  // {x:1, y:10}
  CommonJS 模块输出一组变量，
  就非常合适使用简洁写法。

  let ms = {};

  function getItem (key) {
    return key in ms ? ms[key] : null;
  }

  function setItem (key, value) {
    ms[key] = value;
  }

  function clear () {
    ms = {};
  }

  module.exports = { getItem, setItem, clear };
  // 等同于
  module.exports = {
    getItem: getItem,
    setItem: setItem,
    clear: clear
  };
  属性的赋值器（setter）和取值器（getter），
  事实上也是采用这种写法。

  const cart = {
    _wheels: 4,

    get wheels () {
      return this._wheels;
    },

    set wheels (value) {
      if (value &lt; this._wheels) {
        throw new Error('数值太小了！');
      }
      this._wheels = value;
    }
  }
  简洁写法在打印对象时也很有用。

  let user = {
    name: 'test'
  };

  let foo = {
    bar: 'baz'
  };

  console.log(user, foo)
  // {name: "test"} {bar: "baz"}
  console.log({user, foo})
  // {user: {name: "test"}, foo: {bar: "baz"}}
  上面代码中，
  console.log直接输出user和foo两个对象时，
  就是两组键值对，
  可能会混淆。把它们放在大括号里面输出，
  就变成了对象的简洁表示法，
  每组键值对前面会打印对象名，
  这样就比较清晰了。

  注意，
  简写的对象方法不能用作构造函数，
  会报错。

  const obj = {
    f() {
      this.foo = 'bar';
    }
  };

  new obj.f() // 报错
  上面代码中，
  f是一个简写的对象方法，
  所以obj.f不能当作构造函数使用。

  ## 属性名表达式
  JavaScript 定义对象的属性，
  有两种方法。

  // 方法一
  obj.foo = true;

  // 方法二
  obj['a' + 'bc'] = 123;
  上面代码的方法一是直接用标识符作为属性名，
  方法二是用表达式作为属性名，
  这时要将表达式放在方括号之内。

  但是，
  如果使用字面量方式定义对象（使用大括号），
  在 ES5 中只能使用方法一（标识符）定义属性。

  var obj = {
    foo: true,
    abc: 123
  };
  ES6 允许字面量定义对象时，
  用方法二（表达式）作为对象的属性名，
  即把表达式放在方括号内。

  let propKey = 'foo';

  let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
  };
  下面是另一个例子。

  let lastWord = 'last word';

  const a = {
    'first word': 'hello',
    [lastWord]: 'world'
  };

  a['first word'] // "hello"
  a[lastWord] // "world"
  a['last word'] // "world"
  表达式还可以用于定义方法名。

  let obj = {
    ['h' + 'ello']() {
      return 'hi';
    }
  };

  obj.hello() // hi
  注意，
  属性名表达式与简洁表示法，
  不能同时使用，
  会报错。

  // 报错
  const foo = 'bar';
  const bar = 'abc';
  const baz = { [foo] };

  // 正确
  const foo = 'bar';
  const baz = { [foo]: 'abc'};
  注意，
  属性名表达式如果是一个对象，
  默认情况下会自动将对象转为字符串[object Object]，
  这一点要特别小心。

  const keyA = {a: 1};
  const keyB = {b: 2};

  const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
  };

  myObject // Object {[object Object]: "valueB"}
  上面代码中，
  [keyA]和[keyB]得到的都是[object Object]，
  所以[keyB]会把[keyA]覆盖掉，
  而myObject最后只有一个[object Object]属性。

  ## 方法的 name 属性
  函数的name属性，
  返回函数名。对象方法也是函数，
  因此也有name属性。

  const person = {
    sayName() {
      console.log('hello!');
    },
  };

  person.sayName.name   // "sayName"
  上面代码中，
  方法的name属性返回函数名（即方法名）。

  如果对象的方法使用了取值函数（getter）和存值函数（setter），
  则name属性不是在该方法上面，
  而是该方法的属性的描述对象的get和set属性上面，
  返回值是方法名前加上get和set。

  const obj = {
    get foo() {},
    set foo(x) {}
  };

  obj.foo.name
  // TypeError: Cannot read property 'name' of undefined

  const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

  descriptor.get.name // "get foo"
  descriptor.set.name // "set foo"
  有两种特殊情况：bind方法创造的函数，
  name属性返回bound加上原函数的名字；Function构造函数创造的函数，
  name属性返回anonymous。

  (new Function()).name // "anonymous"

  var doSomething = function() {
    // ...
  };
  doSomething.bind().name // "bound doSomething"
  如果对象的方法是一个 Symbol 值，
  那么name属性返回的是这个 Symbol 值的描述。

  const key1 = Symbol('description');
  const key2 = Symbol();
  let obj = {
    [key1]() {},
    [key2]() {},
  };
  obj[key1].name // "[description]"
  obj[key2].name // ""
  上面代码中，
  key1对应的 Symbol 值有描述，
  key2没有。

  ## 属性的可枚举性和遍历
  **1**
  可枚举性
  对象的每个属性都有一个描述对象（Descriptor），
  用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。

  let obj = { foo: 123 };
  Object.getOwnPropertyDescriptor(obj, 'foo')
  //  {
  //    value: 123,
  //    writable: true,
  //    enumerable: true,
  //    configurable: true
  //  }
  描述对象的enumerable属性，
  称为“可枚举性”，
  如果该属性为false，
  就表示某些操作会忽略当前属性。

  目前，
  有四个操作会忽略enumerable为false的属性。

  for...in循环：只遍历对象自身的和继承的可枚举的属性。
  Object.keys()：返回对象自身的所有可枚举的属性的键名。
  JSON.stringify()：只串行化对象自身的可枚举的属性。
  Object.assign()： 忽略enumerable为false的属性，
  只拷贝对象自身的可枚举的属性。
  这四个操作之中，
  前三个是 ES5 就有的，
  最后一个Object.assign()是 ES6 新增的。其中，
  只有for...in会返回继承的属性，
  其他三个方法都会忽略继承的属性，
  只处理对象自身的属性。实际上，
  引入“可枚举”（enumerable）这个概念的最初目的，
  就是让某些属性可以规避掉for...in操作，
  不然所有内部属性和方法都会被遍历到。比如，
  对象原型的toString方法，
  以及数组的length属性，
  就通过“可枚举性”，
  从而避免被for...in遍历到。

  Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
  // false

  Object.getOwnPropertyDescriptor([], 'length').enumerable
  // false
  上面代码中，
  toString和length属性的enumerable都是false，
  因此for...in不会遍历到这两个继承自原型的属性。

  另外，
  ES6 规定，
  所有 Class 的原型的方法都是不可枚举的。

  Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
  // false
  总的来说，
  操作中引入继承的属性会让问题复杂化，
  大多数时候，
  我们只关心对象自身的属性。所以，
  尽量不要用for...in循环，
  而用Object.keys()代替。

  **2**
  属性的遍历
  ES6 一共有 5 种方法可以遍历对象的属性。

  （1）for...in

  for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

  （2）Object.keys(obj)

  Object.keys返回一个数组，
  包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

  （3）Object.getOwnPropertyNames(obj)

  Object.getOwnPropertyNames返回一个数组，
  包含对象自身的所有属性（不含 Symbol 属性，
  但是包括不可枚举属性）的键名。

  （4）Object.getOwnPropertySymbols(obj)

  Object.getOwnPropertySymbols返回一个数组，
  包含对象自身的所有 Symbol 属性的键名。

  （5）Reflect.ownKeys(obj)

  Reflect.ownKeys返回一个数组，
  包含对象自身的（不含继承的）所有键名，
  不管键名是 Symbol 或字符串，
  也不管是否可枚举。

  以上的 5 种方法遍历对象的键名，
  都遵守同样的属性遍历的次序规则。

  首先遍历所有数值键，
  按照数值升序排列。
  其次遍历所有字符串键，
  按照加入时间升序排列。
  最后遍历所有 Symbol 键，
  按照加入时间升序排列。
  Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
  // ['2', '10', 'b', 'a', Symbol()]
  上面代码中，
  Reflect.ownKeys方法返回一个数组，
  包含了参数对象的所有属性。这个数组的属性次序是这样的，
  首先是数值属性2和10，
  其次是字符串属性b和a，
  最后是 Symbol 属性。

  ## super 关键字
  我们知道，
  this关键字总是指向函数所在的当前对象，
  ES6 又新增了另一个类似的关键字super，
  指向当前对象的原型对象。

  const proto = {
    foo: 'hello'
  };

  const obj = {
    foo: 'world',
    find() {
      return super.foo;
    }
  };

  Object.setPrototypeOf(obj, proto);
  obj.find() // "hello"
  上面代码中，
  对象obj.find()方法之中，
  通过super.foo引用了原型对象proto的foo属性。

  注意，
  super关键字表示原型对象时，
  只能用在对象的方法之中，
  用在其他地方都会报错。

  // 报错
  const obj = {
    foo: super.foo
  }

  // 报错
  const obj = {
    foo: () => super.foo
  }

  // 报错
  const obj = {
    foo: function () {
      return super.foo
    }
  }
  上面三种super的用法都会报错，
  因为对于 JavaScript 引擎来说，
  这里的super都没有用在对象的方法之中。第一种写法是super用在属性里面，
  第二种和第三种写法是super用在一个函数里面，
  然后赋值给foo属性。目前，
  只有对象方法的简写法可以让 JavaScript 引擎确认，
  定义的是对象的方法。

  JavaScript 引擎内部，
  super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。

  const proto = {
    x: 'hello',
    foo() {
      console.log(this.x);
    },
  };

  const obj = {
    x: 'world',
    foo() {
      super.foo();
    }
  }

  Object.setPrototypeOf(obj, proto);

  obj.foo() // "world"
  上面代码中，
  super.foo指向原型对象proto的foo方法，
  但是绑定的this却还是当前对象obj，
  因此输出的就是world。

  ## 对象的扩展运算符
  《数组的扩展》一章中，
  已经介绍过扩展运算符（...）。ES2018 将这个运算符引入了对象。

  **1**
  解构赋值
  对象的解构赋值用于从一个对象取值，
  相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，
  分配到指定的对象上面。所有的键和它们的值，
  都会拷贝到新对象上面。

  let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
  x // 1
  y // 2
  z // { a: 3, b: 4 }
  上面代码中，
  变量z是解构赋值所在的对象。它获取等号右边的所有尚未读取的键（a和b），
  将它们连同值一起拷贝过来。

  由于解构赋值要求等号右边是一个对象，
  所以如果等号右边是undefined或null，
  就会报错，
  因为它们无法转为对象。

  let { ...z } = null; // 运行时错误
  let { ...z } = undefined; // 运行时错误
  解构赋值必须是最后一个参数，
  否则会报错。

  let { ...x, y, z } = someObject; // 句法错误
  let { x, ...y, ...z } = someObject; // 句法错误
  上面代码中，
  解构赋值不是最后一个参数，
  所以会报错。

  注意，
  解构赋值的拷贝是浅拷贝，
  即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，
  而不是这个值的副本。

  let obj = { a: { b: 1 } };
  let { ...x } = obj;
  obj.a.b = 2;
  x.a.b // 2
  上面代码中，
  x是解构赋值所在的对象，
  拷贝了对象obj的a属性。a属性引用了一个对象，
  修改这个对象的值，
  会影响到解构赋值对它的引用。

  另外，
  扩展运算符的解构赋值，
  不能复制继承自原型对象的属性。

  let o1 = { a: 1 };
  let o2 = { b: 2 };
  o2.__proto__ = o1;
  let { ...o3 } = o2;
  o3 // { b: 2 }
  o3.a // undefined
  上面代码中，
  对象o3复制了o2，
  但是只复制了o2自身的属性，
  没有复制它的原型对象o1的属性。

  下面是另一个例子。

  const o = Object.create({ x: 1, y: 2 });
  o.z = 3;

  let { x, ...newObj } = o;
  let { y, z } = newObj;
  x // 1
  y // undefined
  z // 3
  上面代码中，
  变量x是单纯的解构赋值，
  所以可以读取对象o继承的属性；变量y和z是扩展运算符的解构赋值，
  只能读取对象o自身的属性，
  所以变量z可以赋值成功，
  变量y取不到值。ES6 规定，
  变量声明语句之中，
  如果使用解构赋值，
  扩展运算符后面必须是一个变量名，
  而不能是一个解构赋值表达式，
  所以上面代码引入了中间变量newObj，
  如果写成下面这样会报错。

  let { x, ...{ y, z } } = o;
  // SyntaxError: ... must be followed by an identifier in declaration contexts
  解构赋值的一个用处，
  是扩展某个函数的参数，
  引入其他操作。

  function baseFunction({ a, b }) {
    // ...
  }
  function wrapperFunction({ x, y, ...restConfig }) {
    // 使用 x 和 y 参数进行操作
    // 其余参数传给原始函数
    return baseFunction(restConfig);
  }
  上面代码中，
  原始函数baseFunction接受a和b作为参数，
  函数wrapperFunction在baseFunction的基础上进行了扩展，
  能够接受多余的参数，
  并且保留原始函数的行为。

  **2**
  扩展运算符
  对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，
  拷贝到当前对象之中。

  let z = { a: 3, b: 4 };
  let n = { ...z };
  n // { a: 3, b: 4 }
  由于数组是特殊的对象，
  所以对象的扩展运算符也可以用于数组。

  let foo = { ...['a', 'b', 'c'] };
  foo
  // {0: "a", 1: "b", 2: "c"}
  如果扩展运算符后面是一个空对象，
  则没有任何效果。

  {...{}, a: 1}
  // { a: 1 }
  如果扩展运算符后面不是对象，
  则会自动将其转为对象。

  // 等同于 {...Object(1)}
  {...1} // {}
  上面代码中，
  扩展运算符后面是整数1，
  会自动转为数值的包装对象Number{1}。由于该对象没有自身属性，
  所以返回一个空对象。

  下面的例子都是类似的道理。

  // 等同于 {...Object(true)}
  {...true} // {}

  // 等同于 {...Object(undefined)}
  {...undefined} // {}

  // 等同于 {...Object(null)}
  {...null} // {}
  但是，
  如果扩展运算符后面是字符串，
  它会自动转成一个类似数组的对象，
  因此返回的不是空对象。

  {...'hello'}
  // {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
  对象的扩展运算符等同于使用Object.assign()方法。

  let aClone = { ...a };
  // 等同于
  let aClone = Object.assign({}, a);
  上面的例子只是拷贝了对象实例的属性，
  如果想完整克隆一个对象，
  还拷贝对象原型的属性，
  可以采用下面的写法。

  // 写法一
  const clone1 = {
    __proto__: Object.getPrototypeOf(obj),
    ...obj
  };

  // 写法二
  const clone2 = Object.assign(
    Object.create(Object.getPrototypeOf(obj)),
    obj
  );

  // 写法三
  const clone3 = Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  )
  上面代码中，
  写法一的__proto__属性在非浏览器的环境不一定部署，
  因此推荐使用写法二和写法三。

  扩展运算符可以用于合并两个对象。

  let ab = { ...a, ...b };
  // 等同于
  let ab = Object.assign({}, a, b);
  如果用户自定义的属性，
  放在扩展运算符后面，
  则扩展运算符内部的同名属性会被覆盖掉。

  let aWithOverrides = { ...a, x: 1, y: 2 };
  // 等同于
  let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
  // 等同于
  let x = 1, y = 2, aWithOverrides = { ...a, x, y };
  // 等同于
  let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });
  上面代码中，
  a对象的x属性和y属性，
  拷贝到新对象后会被覆盖掉。

  这用来修改现有对象部分的属性就很方便了。

  let newVersion = {
    ...previousVersion,
    name: 'New Name' // Override the name property
  };
  上面代码中，
  newVersion对象自定义了name属性，
  其他属性全部复制自previousVersion对象。

  如果把自定义属性放在扩展运算符前面，
  就变成了设置新对象的默认属性值。

  let aWithDefaults = { x: 1, y: 2, ...a };
  // 等同于
  let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
  // 等同于
  let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);
  与数组的扩展运算符一样，
  对象的扩展运算符后面可以跟表达式。

  const obj = {
    ...(x > 1 ? {a: 1} : {}),
    b: 2,
  };
  扩展运算符的参数对象之中，
  如果有取值函数get，
  这个函数是会执行的。

  let a = {
    get x() {
      throw new Error('not throw yet');
    }
  }

  let aWithXGetter = { ...a }; // 报错
  上面例子中，
  取值函数get在扩展a对象时会自动执行，
  导致报错。

  ## 链判断运算符
  编程实务中，
  如果读取对象内部的某个属性，
  往往需要判断一下该对象是否存在。比如，
  要读取message.body.user.firstName，
  安全的写法是写成下面这样。

  const firstName = (message
    && message.body
    && message.body.user
    && message.body.user.firstName) || 'default';
  或者使用三元运算符?:，
  判断一个对象是否存在。

  const fooInput = myForm.querySelector('input[name=foo]')
  const fooValue = fooInput ? fooInput.value : undefined
  这样的层层判断非常麻烦，
  因此 ES2020 引入了“链判断运算符”（optional chaining operator）?.，
  简化上面的写法。

  const firstName = message?.body?.user?.firstName || 'default';
  const fooValue = myForm.querySelector('input[name=foo]')?.value
  上面代码使用了?.运算符，
  直接在链式调用的时候判断，
  左侧的对象是否为null或undefined。如果是的，
  就不再往下运算，
  而是返回undefined。

  链判断运算符有三种用法。

  obj?.prop // 对象属性
  obj?.[expr] // 同上
  func?.(...args) // 函数或对象方法的调用
  下面是判断对象方法是否存在，
  如果存在就立即执行的例子。

  iterator.return?.()
  上面代码中，
  iterator.return如果有定义，
  就会调用该方法，
  否则直接返回undefined。

  对于那些可能没有实现的方法，
  这个运算符尤其有用。

  if (myForm.checkValidity?.() === false) {
    // 表单校验失败
    return;
  }
  上面代码中，
  老式浏览器的表单可能没有checkValidity这个方法，
  这时?.运算符就会返回undefined，
  判断语句就变成了undefined === false，
  所以就会跳过下面的代码。

  下面是这个运算符常见的使用形式，
  以及不使用该运算符时的等价形式。

  a?.b
  // 等同于
  a == null ? undefined : a.b

  a?.[x]
  // 等同于
  a == null ? undefined : a[x]

  a?.b()
  // 等同于
  a == null ? undefined : a.b()

  a?.()
  // 等同于
  a == null ? undefined : a()
  上面代码中，
  特别注意后两种形式，
  如果a?.b()里面的a.b不是函数，
  不可调用，
  那么a?.b()是会报错的。a?.()也是如此，
  如果a不是null或undefined，
  但也不是函数，
  那么a?.()会报错。

  使用这个运算符，
  有几个注意点。

  （1）短路机制

  a?.[++x]
  // 等同于
  a == null ? undefined : a[++x]
  上面代码中，
  如果a是undefined或null，
  那么x不会进行递增运算。也就是说，
  链判断运算符一旦为真，
  右侧的表达式就不再求值。

  （2）delete 运算符

  delete a?.b
  // 等同于
  a == null ? undefined : delete a.b
  上面代码中，
  如果a是undefined或null，
  会直接返回undefined，
  而不会进行delete运算。

  （3）括号的影响

  如果属性链有圆括号，
  链判断运算符对圆括号外部没有影响，
  只对圆括号内部有影响。

  (a?.b).c
  // 等价于
  (a == null ? undefined : a.b).c
  上面代码中，
  ?.对圆括号外部没有影响，
  不管a对象是否存在，
  圆括号后面的.c总是会执行。

  一般来说，
  使用?.运算符的场合，
  不应该使用圆括号。

  （4）报错场合

  以下写法是禁止的，
  会报错。

  // 构造函数
  new a?.()
  new a?.b()

  // 链判断运算符的右侧有模板字符串
  a?.`{b}`
  a?.b`{c}`

  // 链判断运算符的左侧是 super
  super?.()
  super?.foo

  // 链运算符用于赋值运算符左侧
  a?.b = c
  （5）右侧不得为十进制数值

  为了保证兼容以前的代码，
  允许foo?.3:0被解析成foo ? .3 : 0，
  因此规定如果?.后面紧跟一个十进制数字，
  那么?.不再被看成是一个完整的运算符，
  而会按照三元运算符进行处理，
  也就是说，
  那个小数点会归属于后面的十进制数字，
  形成一个小数。

  ## Null 判断运算符
  读取对象属性的时候，
  如果某个属性的值是null或undefined，
  有时候需要为它们指定默认值。常见做法是通过||运算符指定默认值。

  const headerText = response.settings.headerText || 'Hello, world!';
  const animationDuration = response.settings.animationDuration || 300;
  const showSplashScreen = response.settings.showSplashScreen || true;
  上面的三行代码都通过||运算符指定默认值，
  但是这样写是错的。开发者的原意是，
  只要属性的值为null或undefined，
  默认值就会生效，
  但是属性的值如果为空字符串或false或0，
  默认值也会生效。

  为了避免这种情况，
  ES2020 引入了一个新的 Null 判断运算符??。它的行为类似||，
  但是只有运算符左侧的值为null或undefined时，
  才会返回右侧的值。

  const headerText = response.settings.headerText ?? 'Hello, world!';
  const animationDuration = response.settings.animationDuration ?? 300;
  const showSplashScreen = response.settings.showSplashScreen ?? true;
  上面代码中，
  默认值只有在属性值为null或undefined时，
  才会生效。

  这个运算符的一个目的，
  就是跟链判断运算符?.配合使用，
  为null或undefined的值设置默认值。

  const animationDuration = response.settings?.animationDuration ?? 300;
  上面代码中，
  response.settings如果是null或undefined，
  就会返回默认值300。

  这个运算符很适合判断函数参数是否赋值。

  function Component(props) {
    const enable = props.enabled ?? true;
    // …
  }
  上面代码判断props参数的enabled属性是否赋值，
  等同于下面的写法。

  function Component(props) {
    const {
      enabled: enable = true,
    } = props;
    // …
  }
  ??有一个运算优先级问题，
  它与&&和||的优先级孰高孰低。现在的规则是，
  如果多个逻辑运算符一起使用，
  必须用括号表明优先级，
  否则会报错。

  // 报错
  lhs && middle ?? rhs
  lhs ?? middle && rhs
  lhs || middle ?? rhs
  lhs ?? middle || rhs
  上面四个表达式都会报错，
  必须加入表明优先级的括号。

  (lhs && middle) ?? rhs;
  lhs && (middle ?? rhs);

  (lhs ?? middle) && rhs;
  lhs ?? (middle && rhs);

  (lhs || middle) ?? rhs;
  lhs || (middle ?? rhs);

  (lhs ?? middle) || rhs;
  lhs ?? (middle || rhs);
</pre>
<pre>
对象的新增方法
  ## Object.is()
  ES5 比较两个值是否相等，
  只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，
  前者会自动转换数据类型，
  后者的NaN不等于自身，
  以及+0等于-0。JavaScript 缺乏一种运算，
  在所有环境中，
  只要两个值是一样的，
  它们就应该相等。

  ES6 提出“Same-value equality”（同值相等）算法，
  用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，
  与严格比较运算符（===）的行为基本一致。

  Object.is('foo', 'foo')
  // true
  Object.is({}, {})
  // false
  不同之处只有两个：一是+0不等于-0，
  二是NaN等于自身。

  +0 === -0 //true
  NaN === NaN // false

  Object.is(+0, -0) // false
  Object.is(NaN, NaN) // true
  ES5 可以通过下面的代码，
  部署Object.is。

  Object.defineProperty(Object, 'is', {
    value: function(x, y) {
      if (x === y) {
        // 针对+0 不等于 -0的情况
        return x !== 0 || 1 / x === 1 / y;
      }
      // 针对NaN的情况
      return x !== x && y !== y;
    },
    configurable: true,
    enumerable: false,
    writable: true
  });

  ## Object.assign()
  **1**
  基本用法
  Object.assign方法用于对象的合并，
  将源对象（source）的所有可枚举属性，
  复制到目标对象（target）。

  const target = { a: 1 };

  const source1 = { b: 2 };
  const source2 = { c: 3 };

  Object.assign(target, source1, source2);
  target // {a:1, b:2, c:3}
  Object.assign方法的第一个参数是目标对象，
  后面的参数都是源对象。

  注意，
  如果目标对象与源对象有同名属性，
  或多个源对象有同名属性，
  则后面的属性会覆盖前面的属性。

  const target = { a: 1, b: 1 };

  const source1 = { b: 2, c: 2 };
  const source2 = { c: 3 };

  Object.assign(target, source1, source2);
  target // {a:1, b:2, c:3}
  如果只有一个参数，
  Object.assign会直接返回该参数。

  const obj = {a: 1};
  Object.assign(obj) === obj // true
  如果该参数不是对象，
  则会先转成对象，
  然后返回。

  typeof Object.assign(2) // "object"
  由于undefined和null无法转成对象，
  所以如果它们作为参数，
  就会报错。

  Object.assign(undefined) // 报错
  Object.assign(null) // 报错
  如果非对象参数出现在源对象的位置（即非首参数），
  那么处理规则有所不同。首先，
  这些参数都会转成对象，
  如果无法转成对象，
  就会跳过。这意味着，
  如果undefined和null不在首参数，
  就不会报错。

  let obj = {a: 1};
  Object.assign(obj, undefined) === obj // true
  Object.assign(obj, null) === obj // true
  其他类型的值（即数值、字符串和布尔值）不在首参数，
  也不会报错。但是，
  除了字符串会以数组形式，
  拷贝入目标对象，
  其他值都不会产生效果。

  const v1 = 'abc';
  const v2 = true;
  const v3 = 10;

  const obj = Object.assign({}, v1, v2, v3);
  console.log(obj); // { "0": "a", "1": "b", "2": "c" }
  上面代码中，
  v1、v2、v3分别是字符串、布尔值和数值，
  结果只有字符串合入目标对象（以字符数组的形式），
  数值和布尔值都会被忽略。这是因为只有字符串的包装对象，
  会产生可枚举属性。

  Object(true) // {[[PrimitiveValue]]: true}
  Object(10)  //  {[[PrimitiveValue]]: 10}
  Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
  上面代码中，
  布尔值、数值、字符串分别转成对应的包装对象，
  可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，
  这个属性是不会被Object.assign拷贝的。只有字符串的包装对象，
  会产生可枚举的实义属性，
  那些属性则会被拷贝。

  Object.assign拷贝的属性是有限制的，
  只拷贝源对象的自身属性（不拷贝继承属性），
  也不拷贝不可枚举的属性（enumerable: false）。

  Object.assign({b: 'c'},
    Object.defineProperty({}, 'invisible', {
      enumerable: false,
      value: 'hello'
    })
  )
  // { b: 'c' }
  上面代码中，
  Object.assign要拷贝的对象只有一个不可枚举属性invisible，
  这个属性并没有被拷贝进去。

  属性名为 Symbol 值的属性，
  也会被Object.assign拷贝。

  Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
  // { a: 'b', Symbol(c): 'd' }

  **2**
  注意点
  （1）浅拷贝

  Object.assign方法实行的是浅拷贝，
  而不是深拷贝。也就是说，
  如果源对象某个属性的值是对象，
  那么目标对象拷贝得到的是这个对象的引用。

  const obj1 = {a: {b: 1}};
  const obj2 = Object.assign({}, obj1);

  obj1.a.b = 2;
  obj2.a.b // 2
  上面代码中，
  源对象obj1的a属性的值是一个对象，
  Object.assign拷贝得到的是这个对象的引用。这个对象的任何变化，
  都会反映到目标对象上面。

  （2）同名属性的替换

  对于这种嵌套的对象，
  一旦遇到同名属性，
  Object.assign的处理方法是替换，
  而不是添加。

  const target = { a: { b: 'c', d: 'e' } }
  const source = { a: { b: 'hello' } }
  Object.assign(target, source)
  // { a: { b: 'hello' } }
  上面代码中，
  target对象的a属性被source对象的a属性整个替换掉了，
  而不会得到{ a: { b: 'hello', d: 'e' } }的结果。这通常不是开发者想要的，
  需要特别小心。

  一些函数库提供Object.assign的定制版本（比如 Lodash 的_.defaultsDeep方法），
  可以得到深拷贝的合并。

  （3）数组的处理

  Object.assign可以用来处理数组，
  但是会把数组视为对象。

  Object.assign([1, 2, 3], [4, 5])
  // [4, 5, 3]
  上面代码中，
  Object.assign把数组视为属性名为 0、1、2 的对象，
  因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。

  （4）取值函数的处理

  Object.assign只能进行值的复制，
  如果要复制的值是一个取值函数，
  那么将求值后再复制。

  const source = {
    get foo() { return 1 }
  };
  const target = {};

  Object.assign(target, source)
  // { foo: 1 }
  上面代码中，
  source对象的foo属性是一个取值函数，
  Object.assign不会复制这个取值函数，
  只会拿到值以后，
  将这个值复制过去。

  **3**
  常见用途
  Object.assign方法有很多用处。

  （1）为对象添加属性

  class Point {
    constructor(x, y) {
      Object.assign(this, {x, y});
    }
  }
  上面方法通过Object.assign方法，
  将x属性和y属性添加到Point类的对象实例。

  （2）为对象添加方法

  Object.assign(SomeClass.prototype, {
    someMethod(arg1, arg2) {
      ···
    },
    anotherMethod() {
      ···
    }
  });

  // 等同于下面的写法
  SomeClass.prototype.someMethod = function (arg1, arg2) {
    ···
  };
  SomeClass.prototype.anotherMethod = function () {
    ···
  };
  上面代码使用了对象属性的简洁表示法，
  直接将两个函数放在大括号中，
  再使用assign方法添加到SomeClass.prototype之中。

  （3）克隆对象

  function clone(origin) {
    return Object.assign({}, origin);
  }
  上面代码将原始对象拷贝到一个空对象，
  就得到了原始对象的克隆。

  不过，
  采用这种方法克隆，
  只能克隆原始对象自身的值，
  不能克隆它继承的值。如果想要保持继承链，
  可以采用下面的代码。

  function clone(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto), origin);
  }
  （4）合并多个对象

  将多个对象合并到某个对象。

  const merge =
    (target, ...sources) => Object.assign(target, ...sources);
  如果希望合并后返回一个新对象，
  可以改写上面函数，
  对一个空对象合并。

  const merge =
    (...sources) => Object.assign({}, ...sources);
  （5）为属性指定默认值

  const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
  };

  function processContent(options) {
    options = Object.assign({}, DEFAULTS, options);
    console.log(options);
    // ...
  }
  上面代码中，
  DEFAULTS对象是默认值，
  options对象是用户提供的参数。Object.assign方法将DEFAULTS和options合并成一个新对象，
  如果两者有同名属性，
  则options的属性值会覆盖DEFAULTS的属性值。

  注意，
  由于存在浅拷贝的问题，
  DEFAULTS对象和options对象的所有属性的值，
  最好都是简单类型，
  不要指向另一个对象。否则，
  DEFAULTS对象的该属性很可能不起作用。

  const DEFAULTS = {
    url: {
      host: 'example.com',
      port: 7070
    },
  };

  processContent({ url: {port: 8000} })
  // {
  //   url: {port: 8000}
  // }
  上面代码的原意是将url.port改成 8000，
  url.host不变。实际结果却是options.url覆盖掉DEFAULTS.url，
  所以url.host就不存在了。

  ## Object.getOwnPropertyDescriptors()
  ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了Object.getOwnPropertyDescriptors()方法，
  返回指定对象所有自身属性（非继承属性）的描述对象。

  const obj = {
    foo: 123,
    get bar() { return 'abc' }
  };

  Object.getOwnPropertyDescriptors(obj)
  // { foo:
  //    { value: 123,
  //      writable: true,
  //      enumerable: true,
  //      configurable: true },
  //   bar:
  //    { get: [Function: get bar],
  //      set: undefined,
  //      enumerable: true,
  //      configurable: true } }
  上面代码中，
  Object.getOwnPropertyDescriptors()方法返回一个对象，
  所有原对象的属性名都是该对象的属性名，
  对应的属性值就是该属性的描述对象。

  该方法的实现非常容易。

  function getOwnPropertyDescriptors(obj) {
    const result = {};
    for (let key of Reflect.ownKeys(obj)) {
      result[key] = Object.getOwnPropertyDescriptor(obj, key);
    }
    return result;
  }
  该方法的引入目的，
  主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。

  const source = {
    set foo(value) {
      console.log(value);
    }
  };

  const target1 = {};
  Object.assign(target1, source);

  Object.getOwnPropertyDescriptor(target1, 'foo')
  // { value: undefined,
  //   writable: true,
  //   enumerable: true,
  //   configurable: true }
  上面代码中，
  source对象的foo属性的值是一个赋值函数，
  Object.assign方法将这个属性拷贝给target1对象，
  结果该属性的值变成了undefined。这是因为Object.assign方法总是拷贝一个属性的值，
  而不会拷贝它背后的赋值方法或取值方法。

  这时，
  Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，
  就可以实现正确拷贝。

  const source = {
    set foo(value) {
      console.log(value);
    }
  };

  const target2 = {};
  Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
  Object.getOwnPropertyDescriptor(target2, 'foo')
  // { get: undefined,
  //   set: [Function: set foo],
  //   enumerable: true,
  //   configurable: true }
  上面代码中，
  两个对象合并的逻辑可以写成一个函数。

  const shallowMerge = (target, source) => Object.defineProperties(
    target,
    Object.getOwnPropertyDescriptors(source)
  );
  Object.getOwnPropertyDescriptors()方法的另一个用处，
  是配合Object.create()方法，
  将对象属性克隆到一个新对象。这属于浅拷贝。

  const clone = Object.create(Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj));

  // 或者

  const shallowClone = (obj) => Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  );
  上面代码会克隆对象obj。

  另外，
  Object.getOwnPropertyDescriptors()方法可以实现一个对象继承另一个对象。以前，
  继承另一个对象，
  常常写成下面这样。

  const obj = {
    __proto__: prot,
    foo: 123,
  };
  ES6 规定__proto__只有浏览器要部署，
  其他环境不用部署。如果去除__proto__，
  上面代码就要改成下面这样。

  const obj = Object.create(prot);
  obj.foo = 123;

  // 或者

  const obj = Object.assign(
    Object.create(prot),
    {
      foo: 123,
    }
  );
  有了Object.getOwnPropertyDescriptors()，
  我们就有了另一种写法。

  const obj = Object.create(
    prot,
    Object.getOwnPropertyDescriptors({
      foo: 123,
    })
  );
  Object.getOwnPropertyDescriptors()也可以用来实现 Mixin（混入）模式。

  let mix = (object) => ({
    with: (...mixins) => mixins.reduce(
      (c, mixin) => Object.create(
        c, Object.getOwnPropertyDescriptors(mixin)
      ), object)
  });

  // multiple mixins example
  let a = {a: 'a'};
  let b = {b: 'b'};
  let c = {c: 'c'};
  let d = mix(c).with(a, b);

  d.c // "c"
  d.b // "b"
  d.a // "a"
  上面代码返回一个新的对象d，
  代表了对象a和b被混入了对象c的操作。

  出于完整性的考虑，
  Object.getOwnPropertyDescriptors()进入标准以后，
  以后还会新增Reflect.getOwnPropertyDescriptors()方法。

  ## __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
  JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。

  **1**
  __proto__属性
  __proto__属性（前后各两个下划线），
  用来读取或设置当前对象的原型对象（prototype）。目前，
  所有浏览器（包括 IE11）都部署了这个属性。

  // es5 的写法
  const obj = {
    method: function() { ... }
  };
  obj.__proto__ = someOtherObj;

  // es6 的写法
  var obj = Object.create(someOtherObj);
  obj.method = function() { ... };
  该属性没有写入 ES6 的正文，
  而是写入了附录，
  原因是__proto__前后的双下划线，
  说明它本质上是一个内部属性，
  而不是一个正式的对外的 API，
  只是由于浏览器广泛支持，
  才被加入了 ES6。标准明确规定，
  只有浏览器必须部署这个属性，
  其他运行环境不一定需要部署，
  而且新的代码最好认为这个属性是不存在的。因此，
  无论从语义的角度，
  还是从兼容性的角度，
  都不要使用这个属性，
  而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。

  实现上，
  __proto__调用的是Object.prototype.__proto__，
  具体实现如下。

  Object.defineProperty(Object.prototype, '__proto__', {
    get() {
      let _thisObj = Object(this);
      return Object.getPrototypeOf(_thisObj);
    },
    set(proto) {
      if (this === undefined || this === null) {
        throw new TypeError();
      }
      if (!isObject(this)) {
        return undefined;
      }
      if (!isObject(proto)) {
        return undefined;
      }
      let status = Reflect.setPrototypeOf(this, proto);
      if (!status) {
        throw new TypeError();
      }
    },
  });

  function isObject(value) {
    return Object(value) === value;
  }
  如果一个对象本身部署了__proto__属性，
  该属性的值就是对象的原型。

  Object.getPrototypeOf({ __proto__: null })
  // null

  **2**
  Object.setPrototypeOf()
  Object.setPrototypeOf方法的作用与__proto__相同，
  用来设置一个对象的原型对象（prototype），
  返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。

  // 格式
  Object.setPrototypeOf(object, prototype)

  // 用法
  const o = Object.setPrototypeOf({}, null);
  该方法等同于下面的函数。

  function setPrototypeOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  }
  下面是一个例子。

  let proto = {};
  let obj = { x: 10 };
  Object.setPrototypeOf(obj, proto);

  proto.y = 20;
  proto.z = 40;

  obj.x // 10
  obj.y // 20
  obj.z // 40
  上面代码将proto对象设为obj对象的原型，
  所以从obj对象可以读取proto对象的属性。

  如果第一个参数不是对象，
  会自动转为对象。但是由于返回的还是第一个参数，
  所以这个操作不会产生任何效果。

  Object.setPrototypeOf(1, {}) === 1 // true
  Object.setPrototypeOf('foo', {}) === 'foo' // true
  Object.setPrototypeOf(true, {}) === true // true
  由于undefined和null无法转为对象，
  所以如果第一个参数是undefined或null，
  就会报错。

  Object.setPrototypeOf(undefined, {})
  // TypeError: Object.setPrototypeOf called on null or undefined

  Object.setPrototypeOf(null, {})
  // TypeError: Object.setPrototypeOf called on null or undefined
  Object.getPrototypeOf()

  **3**
  该方法与Object.setPrototypeOf方法配套，
  用于读取一个对象的原型对象。

  Object.getPrototypeOf(obj);
  下面是一个例子。

  function Rectangle() {
    // ...
  }

  const rec = new Rectangle();

  Object.getPrototypeOf(rec) === Rectangle.prototype
  // true

  Object.setPrototypeOf(rec, Object.prototype);
  Object.getPrototypeOf(rec) === Rectangle.prototype
  // false
  如果参数不是对象，
  会被自动转为对象。

  // 等同于 Object.getPrototypeOf(Number(1))
  Object.getPrototypeOf(1)
  // Number {[[PrimitiveValue]]: 0}

  // 等同于 Object.getPrototypeOf(String('foo'))
  Object.getPrototypeOf('foo')
  // String {length: 0, [[PrimitiveValue]]: ""}

  // 等同于 Object.getPrototypeOf(Boolean(true))
  Object.getPrototypeOf(true)
  // Boolean {[[PrimitiveValue]]: false}

  Object.getPrototypeOf(1) === Number.prototype // true
  Object.getPrototypeOf('foo') === String.prototype // true
  Object.getPrototypeOf(true) === Boolean.prototype // true
  如果参数是undefined或null，
  它们无法转为对象，
  所以会报错。

  Object.getPrototypeOf(null)
  // TypeError: Cannot convert undefined or null to object

  Object.getPrototypeOf(undefined)
  // TypeError: Cannot convert undefined or null to object

  ## Object.keys()，Object.values()，Object.entries()
  **1**
  Object.keys()
  ES5 引入了Object.keys方法，
  返回一个数组，
  成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

  var obj = { foo: 'bar', baz: 42 };
  Object.keys(obj)
  // ["foo", "baz"]
  ES2017 引入了跟Object.keys配套的Object.values和Object.entries，
  作为遍历一个对象的补充手段，
  供for...of循环使用。

  let {keys, values, entries} = Object;
  let obj = { a: 1, b: 2, c: 3 };

  for (let key of keys(obj)) {
    console.log(key); // 'a', 'b', 'c'
  }

  for (let value of values(obj)) {
    console.log(value); // 1, 2, 3
  }

  for (let [key, value] of entries(obj)) {
    console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
  }

  **2**
  Object.values()
  Object.values方法返回一个数组，
  成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

  const obj = { foo: 'bar', baz: 42 };
  Object.values(obj)
  // ["bar", 42]
  返回数组的成员顺序，
  与本章的《属性的遍历》部分介绍的排列规则一致。

  const obj = { 100: 'a', 2: 'b', 7: 'c' };
  Object.values(obj)
  // ["b", "c", "a"]
  上面代码中，
  属性名为数值的属性，
  是按照数值大小，
  从小到大遍历的，
  因此返回的顺序是b、c、a。

  Object.values只返回对象自身的可遍历属性。

  const obj = Object.create({}, {p: {value: 42}});
  Object.values(obj) // []
  上面代码中，
  Object.create方法的第二个参数添加的对象属性（属性p），
  如果不显式声明，
  默认是不可遍历的，
  因为p的属性描述对象的enumerable默认是false，
  Object.values不会返回这个属性。只要把enumerable改成true，
  Object.values就会返回属性p的值。

  const obj = Object.create({}, {p:
    {
      value: 42,
      enumerable: true
    }
  });
  Object.values(obj) // [42]
  Object.values会过滤属性名为 Symbol 值的属性。

  Object.values({ [Symbol()]: 123, foo: 'abc' });
  // ['abc']
  如果Object.values方法的参数是一个字符串，
  会返回各个字符组成的一个数组。

  Object.values('foo')
  // ['f', 'o', 'o']
  上面代码中，
  字符串会先转成一个类似数组的对象。字符串的每个字符，
  就是该对象的一个属性。因此，
  Object.values返回每个属性的键值，
  就是各个字符组成的一个数组。

  如果参数不是对象，
  Object.values会先将其转为对象。由于数值和布尔值的包装对象，
  都不会为实例添加非继承的属性。所以，
  Object.values会返回空数组。

  Object.values(42) // []
  Object.values(true) // []

  **3**
  Object.entries()
  Object.entries()方法返回一个数组，
  成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

  const obj = { foo: 'bar', baz: 42 };
  Object.entries(obj)
  // [ ["foo", "bar"], ["baz", 42] ]
  除了返回值不一样，
  该方法的行为与Object.values基本一致。

  如果原对象的属性名是一个 Symbol 值，
  该属性会被忽略。

  Object.entries({ [Symbol()]: 123, foo: 'abc' });
  // [ [ 'foo', 'abc' ] ]
  上面代码中，
  原对象有两个属性，
  Object.entries只输出属性名非 Symbol 值的属性。将来可能会有Reflect.ownEntries()方法，
  返回对象自身的所有属性。

  Object.entries的基本用途是遍历对象的属性。

  let obj = { one: 1, two: 2 };
  for (let [k, v] of Object.entries(obj)) {
    console.log(
      `${JSON.stringify(k)}: ${JSON.stringify(v)}`
    );
  }
  // "one": 1
  // "two": 2
  Object.entries方法的另一个用处是，
  将对象转为真正的Map结构。

  const obj = { foo: 'bar', baz: 42 };
  const map = new Map(Object.entries(obj));
  map // Map { foo: "bar", baz: 42 }
  自己实现Object.entries方法，
  非常简单。

  // Generator函数的版本
  function* entries(obj) {
    for (let key of Object.keys(obj)) {
      yield [key, obj[key]];
    }
  }

  // 非Generator函数的版本
  function entries(obj) {
    let arr = [];
    for (let key of Object.keys(obj)) {
      arr.push([key, obj[key]]);
    }
    return arr;
  }

  ## Object.fromEntries()
  Object.fromEntries()方法是Object.entries()的逆操作，
  用于将一个键值对数组转为对象。

  Object.fromEntries([
    ['foo', 'bar'],
    ['baz', 42]
  ])
  // { foo: "bar", baz: 42 }
  该方法的主要目的，
  是将键值对的数据结构还原为对象，
  因此特别适合将 Map 结构转为对象。

  // 例一
  const entries = new Map([
    ['foo', 'bar'],
    ['baz', 42]
  ]);

  Object.fromEntries(entries)
  // { foo: "bar", baz: 42 }

  // 例二
  const map = new Map().set('foo', true).set('bar', false);
  Object.fromEntries(map)
  // { foo: true, bar: false }
  该方法的一个用处是配合URLSearchParams对象，
  将查询字符串转为对象。

  Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
  // { foo: "bar", baz: "qux" }
</pre>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>

// jonasschmedtmann node.js
// 39

// 模組化 aka組件化 aka元件化
const Calculator1 = require('./cal-module-1');
const Calculator2 = require('./cal-module-2');
// Calculator1 = Calculator2 
// export 方法不同
const cal1 = new Calculator2();
console.log(cal1.add(3, 4));


// export方法有別於1.2
const cal2 = require('./cal-module-3');
console.log(cal2.minus(3, 4));
// 解構
const { add, minus, multiply, divide } = require('./cal-module-3');
console.log(multiply(3, 4));


// caching aka緩存 aka快取
require('./caching-module')();
require('./caching-module')();
require('./caching-module')();
// 只會載入1次module
// 但是是呼叫3次module





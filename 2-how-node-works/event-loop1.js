// jonasschmedtmann node.js
// 顯示順序
// 4
setTimeout(() => {
  console.log('success');
}, 0)
// 3
setImmediate(() => {
  console.log('immediate');
})
// 2
const fs = require('fs');
fs.readFile('test-file.txt', () => {
  console.log('i/o finished');
})

// 1
console.log('hello');
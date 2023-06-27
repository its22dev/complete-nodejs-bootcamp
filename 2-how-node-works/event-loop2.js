// jonasschmedtmann node.js
// 33
// 顯示順序
// 2
setTimeout(() => {
  console.log('success');
}, 0)
// 3
setImmediate(() => {
  console.log('immediate');
})

const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();
// setting threadpool大小 : 最多4 最少1
process.env.UV_THREADPOOL_SIZE = 1;

fs.readFile('test-file.txt', () => {
  // 4
  console.log('i/o finished\n-----------');
  // 7
  setTimeout(() => console.log('timer 2'), 2000)
  // 8
  setTimeout(() => console.log('timer 3'), 5000)
  // 6
  setImmediate(() => console.log('immediate 2'))
  // 5
  process.nextTick(() => console.log('process.nextTick'))
  // 在背景中執行完才印出
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'password encryptoed');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'password encryptoed');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'password encryptoed');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'password encryptoed');

  // in threadpool 
  // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  //   console.log(Date.now() - start, 'password encryptoed');
  // })
  // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  //   console.log(Date.now() - start, 'password encryptoed');
  // })
  // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  //   console.log(Date.now() - start, 'password encryptoed');
  // })
})

// 1
console.log('hello');
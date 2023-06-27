// jonasschmedtmann node.js
// 35
const EvenEmitter = require('events');

class Sales extends EvenEmitter {
  constructor() {
    super();
  }
}
const myEmitter1 = new Sales();
const myEmitter2 = new EvenEmitter();

// 如果myEmitter1被觸發
myEmitter1.on('newSale', (num) => {
  console.log('There was a new sale!');
  console.log(`number: ${num}`);
})
// 如果myEmitter2被觸發
myEmitter2.on('newSale', () => {
  console.log('myEmitter2在三秒後被觸發了');
})

// 呼叫myEmitter1
myEmitter1.emit('newSale', 9);

// 3秒後呼叫myEmitter2
setTimeout(() => {
  myEmitter2.emit('newSale')
}, 3000);

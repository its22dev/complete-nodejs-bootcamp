// jonasschmedtmann node.js
// 01 - 10 檔案寫入n匯出

const fs = require('fs');

// 同步
// 讀入檔案
const read1 = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log('同步' + read1);
// 匯出檔案
const op = `output\n ${read1}`;
fs.writeFileSync('./txt/output.txt', op);
console.log('同步 success');

// 非同步
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) return console.log('- error -');
  
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
      console.log(data3);

      // 匯出檔案
      fs.writeFile('./txt/final.txt', `${data2} \n ${data3}`, 'utf-8', (err) => {
        console.log('success');
      })

    })
  })
})
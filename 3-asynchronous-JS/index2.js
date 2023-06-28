// jonasschmedtmann node.js
// 42

const fs = require('fs');
const superagent = require('superagent');

// 有promise(then & catch)
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Hi. ${data}`);
  // #1 用superagent get data
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    // promise
    .then((results) => {
      console.log(results.body.message);

      // #2 將get data 寫入檔案
      fs.writeFile('dog-img.txt', results.body.message, (err) => {
        console.log('-----Success-----');
      })
    })
    .catch(err => {
      console.log(err);
    })
})

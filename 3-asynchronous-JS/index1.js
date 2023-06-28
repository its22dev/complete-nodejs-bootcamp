// jonasschmedtmann node.js
// 41

const fs = require('fs');
const superagent = require('superagent');

// 無promise(then)
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Hi. ${data}`);
  // #1 用superagent get data
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err);
      console.log(res.body.message);

      // #2 將get data 寫入檔案
      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        console.log('Success!');
      })
    })
})

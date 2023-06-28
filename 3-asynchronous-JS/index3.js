// jonasschmedtmann node.js
// 43

const fs = require('fs');
const superagent = require('superagent');

// #1 封裝一個新的method
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      // 失敗
      if (err) reject('Error for Reading File')
      // 成功
      resolve(data);
    })
  })
}

// #3 封裝一個新的method
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Error for Writing File')
      resolve('Success for Writing File')
    })
  })
}

// #2 使用readFilePro
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log('Hi,' + data);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((results) => {
    console.log(results.body.message);
    // #4 使用writeFilePro
    return writeFilePro('dog-img.txt', results.body.message);
  })
  .then(() => {
    console.log('-----Success-----');
  })
  .catch(err => {
    console.log(err);
  })


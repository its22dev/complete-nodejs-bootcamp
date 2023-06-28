// jonasschmedtmann node.js
// 45

const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Error for Reading File');
      resolve(data);
    })
  })
}

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Error for Writing File')
      resolve('Success for Writing File')
    })
  })
}


const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log('Hi,' + data);

    const results = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(results.body.message);

    await writeFilePro('dog-img.txt', results.body.message)
    console.log('-----Success-----');

  } catch (error) {
    console.log(error);
    throw error
  }
}

console.log('#1 Will get dog pic');

getDogPic()
  .then(res => {
    console.log(res);
    console.log('#2 DONE!');
  })
  .catch(err => {
    console.log(err);
  });
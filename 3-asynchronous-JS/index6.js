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

    const res1Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);

    const imgUrlArr = all.map(item => item.body.message)
    // console.log(imgUrlArr);

    await writeFilePro('dog-img.txt', imgUrlArr.join('\n'))
    console.log('-----Success-----');

  } catch (error) {
    console.log(error);
    throw error
  }
}

console.log('#1 Will get dog pic');

getDogPic()
  .then(res => {
    console.log('#2 DONE!');
  })
  .catch(err => {
    console.log(err);
  });
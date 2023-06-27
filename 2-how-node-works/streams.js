// jonasschmedtmann node.js
// 37

const fs = require('fs')
const server = require('http').createServer();

server.on('request', (req, res) => {
  // 方法1 : 使用原生buffer
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) console.log(err)
  //   res.end(data)
  // })

  // 方法2：使用stream讀文件
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', chunk => {
  //   res.write(chunk);
  // })
  // readable.on('end', () => {
  //   res.end();
  // })
  // readable.on('error', error => {
  //   console.log(error);
  //   res.statusCode = 500;
  //   res.end('File not found');
  // })

  // 方法3：使用pipe()
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res); // readalbe變數.pipe(目的地)

})

server.listen(8000, 'localhost', () => {
  console.log('requesting...');
})
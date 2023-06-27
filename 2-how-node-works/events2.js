const EvenEmitter = require('events');
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('request recieved');
  res.end('request recieved');
})

server.on('request', (req, res) => {
  console.log('Another Request\n----------------');
})

server.on('close', () => {
  console.log('server closed');
})

server.listen(8000, 'localhost', () => {
  console.log('requesting...');
})
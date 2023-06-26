// jonasschmedtmann node.js
// 17 componentize to file

// import module
const fs = require('fs');
const http = require('http');
const url = require('url');

// import 
const repalceTemplate = require('./modules/repalceTemplate');

// componentize (13)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// import template (15)
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

// repalceTemplate(15)
// componentize repalceTemplate (17)


// define n create server 
const server = http.createServer((request, response) => {
  // define path name in router (12)
  // const pathName = request.url;
  // * get the url query (16)
  // * 將12.pathName直接替代成從request.url解構
  // console.log(url.parse(request.url, true))
  const { query, pathname } = url.parse(request.url, true)

  if (pathname === '/' || pathname === '/overview') {
    // import template in each route
    response.writeHead(200, { 'Content-type': 'text/html' });
    const cardsHtml = dataObj.map((item) => repalceTemplate(tempCard, item)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
    response.end(output);

  } else if (pathname === '/product') {
    // (16)
    response.writeHead(200, { 'Content-type': 'text/html' });
    const target = dataObj[query.id];
    const output = repalceTemplate(tempProduct, target);
    response.end(output);

  } else if (pathname === '/api') {
    // import json to server (13)
    response.writeHead(200, { 'Content-type': 'application/json' });
    response.end(data);

  } else {
    response.writeHead(404, {
      // header (12)
      'Content-type': 'text/html',
      'my-own-header': 'hello this is own header!'
    });
    response.end('<h1>404 Page not found</h1>')

  }
})
server.listen(8000, 'localhost', () => {
  console.log('Listening on port 8000');
})



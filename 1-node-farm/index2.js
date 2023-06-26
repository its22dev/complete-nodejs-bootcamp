// jonasschmedtmann node.js
// 11-15

// 11 web (server/localhost)
// 12 route n header
// 13 read target json
// 14 html-template {%變數%}
// 15 import template

// import module
const fs = require('fs');
const http = require('http');
const url = require('url');

// componentize (13)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// import template (15)
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

// repalceTemplate(15)
const repalceTemplate = (tempCard, item) => {
  let output = tempCard.replace(/{%PRODUCTNAME%}/g, item.productName);
  output = output.replace(/{%IMAGE%}/g, item.image);
  output = output.replace(/{%FROM%}/g, item.from);
  output = output.replace(/{%NUTRIENTS%}/g, item.nutrients);
  output = output.replace(/{%QUANTITY%}/g, item.quantity);
  output = output.replace(/{%PRICE%}/g, item.price);
  output = output.replace(/{%DESCRIPTION%}/g, item.description);
  output = output.replace(/{%ID%}/g, item.id);
  if (!item.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }
  return output;
}


// define n create server 
const server = http.createServer((request, response) => {
  // define path name in router (12)
  const pathName = request.url;
  if (pathName === '/' || pathName === '/overview') {
    // import template in each route
    response.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj.map((item) => repalceTemplate(tempCard, item)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

    response.end(output);

  } else if (pathName === '/product') {
    response.end('Hello from the server');

  } else if (pathName === '/api') {
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



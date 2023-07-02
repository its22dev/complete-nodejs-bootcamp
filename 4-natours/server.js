// jonasschmedtmann node.js
// 63 路由分離4: 分離成新server

const app = require('./app10')

console.log(process.env.NODE_ENV);

const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

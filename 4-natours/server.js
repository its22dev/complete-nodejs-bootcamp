// jonasschmedtmann node.js
// 63 路由分離4: 分離成新server

const app = require('./app10')

const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

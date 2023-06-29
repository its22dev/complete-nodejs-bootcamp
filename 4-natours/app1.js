// jonasschmedtmann node.js
// 50

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({
      message: 'Hello World! from the server side!',
      app: '4-Notours'
    })
})

app.post('/', (req, res) => {
  res
    .status(200)
    .send('Success for posting...!')
})

const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

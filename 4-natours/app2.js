// jonasschmedtmann node.js
// 52

const express = require('express');
const app = express();

const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      results: tours.length,
      data: { 'tours': tours }
    })
})



const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

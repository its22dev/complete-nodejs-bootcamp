// jonasschmedtmann node.js
// 54 GET WITH params

const express = require('express');
const app = express();
app.use(express.json());

const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// GET
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      results: tours.length,
      data: { tours }
    })
})

// GET WITH id
app.get('/api/v1/tours/:id', (req, res) => {
  // get id
  const id = req.params.id * 1;
  const targetTour = tours.find(el => el.id === id);
  // check
  if (!targetTour) {
    return res
      .status(404)
      .json({
        status: 'fail',
        message: 'Invalid ID',
      })
  }
  // 
  res
    .status(200)
    .json({
      status: 'success',
      results: targetTour.length,
      data: { targetTour }
    })
})

// POST
app.post('/api/v1/tours', (req, res) => {
  // 傳入的資料req.body
  // console.log(req.body);
  const newId = tours[tours.length - 1]['id'] + 1;
  const newTour = Object.assign({ 'id': newId }, req.body)
  tours.push(newTour)

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res
      .status(201)
      .json({
        'status': 'success',
        data: { 'tour': newTour }
      })
  })

})


const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

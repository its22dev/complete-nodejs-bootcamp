// jonasschmedtmann node.js
// 57

const express = require('express');
const app = express();
app.use(express.json());

const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getTours = (req, res) => {
  if (JSON.stringify(req.params) !== '{}') {
    const id = req.params.id * 1;
    const targetTour = tours.find(el => el.id === id);

    if (!targetTour) {
      return res
        .status(404)
        .json({
          status: 'fail',
          message: 'Invalid ID',
        })
    }
    res
      .status(200)
      .json({
        status: 'success',
        results: targetTour.length,
        data: { targetTour }
      })
  } else {
    res
      .status(200)
      .json({
        status: 'success',
        results: tours.length,
        data: { tours }
      })
  }

}
const postTour = (req, res) => {
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
}
const patchTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res
      .status(404)
      .json({
        status: 'fail',
        message: 'Invalid ID',
      })
  }
  res
    .status(200)
    .json({
      status: 'success',
      data: req.body
    })
}
const deleteTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res
      .status(404)
      .json({
        status: 'fail',
        message: 'Invalid ID',
      })
  }
  res
    // .status(204)
    .status(200)
    .json({
      status: 'delete successly',
      data: req.body
    })
}


// app.get('/api/v1/tours', getTours)
// app.post('/api/v1/tours', postTour)
// app.get('/api/v1/tours/:id', getTours)
// app.patch('/api/v1/tours/:id', patchTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app
  .route('/api/v1/tours')
  .get(getTours)
  .post(postTour)

app
  .route('/api/v1/tours/:id')
  .get(getTours)
  .patch(patchTour)
  .delete(deleteTour)


const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

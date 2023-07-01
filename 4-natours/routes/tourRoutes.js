// jonasschmedtmann node.js
// 63 路由分離2: 分離成新檔案

const express = require('express');
const router = express.Router();

const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const getTours = (req, res) => {
  console.log(req.requestTime);
  if (JSON.stringify(req.params) !== '{}') {
    const id = req.params.id * 1;
    const targetTour = tours.find(el => el.id === id);

    if (!targetTour) {
      return res
        .status(404)
        .json({
          status: 'fail',
          requestAt: req.requestTime,
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

  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
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

router
  .route('/')
  .get(getTours)
  .post(postTour)
router
  .route('/:id')
  .get(getTours)
  .patch(patchTour)
  .delete(deleteTour)

module.exports = router;
// jonasschmedtmann node.js
// 63 路由分離3: 新建controller

const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// 64 分離方法
exports.checkID = (req, res, next, value) => {
  console.log(`Tour ID is ${value}`);
  if (Number(req.params.id) > tours.length) {
    console.log(`${value} is invalid ID`);
    return res
      .status(404)
      .json({
        status: 'fail',
        message: 'Invalid ID',
      })
  }
  // 64一定要有
  next();
}

exports.getTours = (req, res) => {
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
exports.postTour = (req, res) => {
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
exports.patchTour = (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      data: req.body
    })
}
exports.deleteTour = (req, res) => {
  res
    // .status(204)
    .status(200)
    .json({
      status: 'delete successly',
      data: req.body
    })
}

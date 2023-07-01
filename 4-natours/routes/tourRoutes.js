// jonasschmedtmann node.js
// 63 路由分離2: 分離成新檔案
// 64 分離controller方法

const express = require('express');
const router = express.Router();

// import controller
const tourController = require('../contronllers/tourController');
// 解構contorller方法
const { getTours, postTour, patchTour, deleteTour } = require('../contronllers/tourController');

// 64 分離checkID方法 才進行下一個步驟
// 只適用tourRouter
router.param('id', tourController.checkID)

// 065 挑戰
// create a checkBody mw
// check if body contains the name and price
// if not, send back 400(bad req)
// add it to the post handler stack
// tourController.checkBody,

// controller.方法名稱
router
  .route('/')
  // .get(tourController.getTours)
  .get(getTours)
  .post(tourController.checkBody, postTour)
router
  .route('/:id')
  .get(getTours)
  .patch(patchTour)
  .delete(deleteTour)

module.exports = router;
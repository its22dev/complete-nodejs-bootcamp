// jonasschmedtmann node.js
// 63 路由分離2: 分離成新檔案

const express = require('express');
const router = express.Router();
// import controller
const tourController = require('../contronllers/tourController');
// 解構contorller方法
const { getTours, postTour, patchTour, deleteTour } = require('../contronllers/tourController');

// controller.方法名稱
router
  .route('/')
  // .get(tourController.getTours)
  .get(getTours)
  .post(postTour)
router
  .route('/:id')
  .get(getTours)
  .patch(patchTour)
  .delete(deleteTour)

module.exports = router;
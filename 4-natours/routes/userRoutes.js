// jonasschmedtmann node.js
// 63 路由分離2: 分離成新檔案

const express = require('express');
const router = express.Router();
// import controller
const userController = require('../contronllers/userController');
// 解構controller方法
const { getUsers, postUser, patchUser, deleteUser } = require('../contronllers/userController');

router
  .route('/')
  // .get(userController.getUsers)
  .get(getUsers)
  .post(postUser)
router
  .route('/:id')
  .get(getUsers)
  .patch(patchUser)
  .delete(deleteUser)

module.exports = router; 
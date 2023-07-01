// jonasschmedtmann node.js
// 63 路由分離2: 分離成新檔案

const express = require('express');
const router = express.Router();

const getUsers = (req, res) => {
  res
    .status(500)
    .json({
      status: 'error',
      message: 'The route is not defined yet!'
    })
}
const postUser = (req, res) => {
  res
    .status(500)
    .json({
      status: 'error',
      message: 'The route is not defined yet!'
    })
}
const patchUser = (req, res) => {
  res
    .status(500)
    .json({
      status: 'error',
      message: 'The route is not defined yet!'
    })
}
const deleteUser = (req, res) => {
  res
    .status(500)
    .json({
      status: 'error',
      message: 'The route is not defined yet!'
    })
}

router
  .route('/')
  .get(getUsers)
  .post(postUser)
router
  .route('/:id')
  .get(getUsers)
  .patch(patchUser)
  .delete(deleteUser)

module.exports = router; 
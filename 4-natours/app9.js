// jonasschmedtmann node.js
// 63 路由分離2: 分離成新檔案

const express = require('express');
const morgan = require('morgan');

// import 分離的router檔案
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
})
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString().substring(0, 10);
  next();
})

// 保留app use
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter)

const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

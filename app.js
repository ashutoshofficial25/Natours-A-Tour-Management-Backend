const express = require('express');

const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//const app = require('express')
//express cant read data directly body
//so we use middleware

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from middle ware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

const express = require('express');

const morgan = require('morgan');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//const app = require('express')
//express cant read data directly body
//so we use middleware

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from middle ware');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//For handle undefined routes
app.all('*', (req, res, next) => {
  // const error = new Error(`Can't find ${req.originalUrl} on the server!`);
  // error.status = 'fail';
  // error.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

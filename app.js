const express = require('express');
const path = require('path');
const morgan = require('morgan');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParcer = require('cookie-parser');

const app = express();
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

//const app = require('express')
//express cant read data directly body
//so we use middleware

//Global Middlewares
// app.use(cors());
app.use(
  cors({
    origin: ['http://localhost:3001'],
    credentials: true,
  })
);

//serving static files
app.use(express.static(path.join(__dirname, 'public')));
//set Secutity http
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// limit request from /api
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: ' Too many request from this IP please try again in an hour',
});
app.use('/api', limiter);

//body parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParcer());
//Data samitazitation against NoSql query injection
app.use(mongoSanitize());

//Data sanitzation against xss
app.use(xss());

// Prevent Parameter Pollutions
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQunatity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// app.use((req, res, next) => {
//   console.log('Hello from middle ware');
//   next();
// });

//test middlewares
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  //console.log(req.headers);
  next();
});

//Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/review', reviewRouter);

//For handle undefined routes
app.all('*', (req, res, next) => {
  // const error = new Error(`Can't find ${req.originalUrl} on the server!`);
  // error.status = 'fail';
  // error.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

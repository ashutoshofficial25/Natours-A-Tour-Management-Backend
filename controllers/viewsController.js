const Tour = require('./../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  //1 Get tour data form collection
  const tours = await Tour.find();

  //2 Build templae

  //3 render that template using tour data from 1
  res.status(200).render('overview', {
    title: ' All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  //1 Get data, for the requested tour including reviews and guides
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fileds: 'review rating user',
  });

  //Builde template

  //render that template using tour data from 1

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.loginForm = (req, res) => {
  const login = {};

  res.status(200).render('login', {
    title: `Login in to your account`,
  });
};

const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const review = await Review.find();

  res.status(200).json({
    status: 'success',
    result: review.length,
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.getAReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review)
    return next(new AppError('No reviews found by particular ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});
exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id);
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return next(new AppError('No review found for youe ID', 404));

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

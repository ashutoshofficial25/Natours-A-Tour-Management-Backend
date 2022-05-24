const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have difficulty'],
  },

  maxGroupSize: {
    type: Number,
    required: [true, 'A Tour must have a group size'],
  },

  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQunatity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A toue must have a name'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, ' A tour must have a description'],
  },
  desctiption: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

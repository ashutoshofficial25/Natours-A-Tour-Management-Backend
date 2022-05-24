const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    //BUILD THE QUERY
    //filtering
    const queryObj = { ...req.query };
    const excludedFiled = ['page', 'sort', 'limit', 'fileds'];
    excludedFiled.forEach((el) => delete queryObj[el]);

    //Advanced filtering || Lecture 15 Problem
    let queryStr = JOSN.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JOSN.parse(queryStr));

    //{ difficulty: 'easy' , duration:{ $gte:5}}
    //{ difficulty:'easy' ,  durationL{ gte:5}}
    // gte, gt,lte, lt

    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    // });
    const query = Tour.find(JOSN.parse(queryObj));
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    //EXECUTE THE QUERY
    const tours = await query;
    //Send response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

//Get one tour
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({ _id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

//Create New Tour
exports.createTour = async (req, res) => {
  //const newTour = new Tour({});
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

//Update

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

//Delete request
exports.deleteTour = async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  try {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

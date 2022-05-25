const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    //BUILD THE QUERY
    //1..filtering
    const queryObj = { ...req.query };
    const excludedFiled = ['page', 'sort', 'limit', 'fileds'];
    excludedFiled.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    //Advanced filtering || Lecture 15 Problem
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //{ difficulty: 'easy' , duration:{ $gte:5} }
    //{ difficulty:'easy' ,  durationL{ gte:5}}
    // gte, gt,lte, lt

    let query = Tour.find(JSON.parse(queryStr));

    //2. Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
      //sort ('price averageRating)
    } else {
      query = query.sort('-createdAt');
    }

    //3 Field Limiting TODO: not working 17 lec
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      console.log(fields);
      query = query.select(fields);
    } else {
      query = query.select('name difficulty');
    }

    //4 Pagination

    // const page = req.qurey.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit);
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

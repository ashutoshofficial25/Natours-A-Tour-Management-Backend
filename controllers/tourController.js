const express = require('express');
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: tours,
  });
};

//Get one tour
exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id == id);

  // if (id > tours.length)
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: tour,
  });
};

//Create New Tour
exports.createTour = (req, res) => {
  //console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  //after pushing save the result in DB
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'succes',
        data: {
          tours: newTour,
        },
      });
    }
  );
};

//Update

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour>',
    },
  });
};

//Delete request
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

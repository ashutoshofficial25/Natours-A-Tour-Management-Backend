const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });
//console.log(process.env);
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>,process.env.DATABASE_PASSWORD'
// );
const DB = process.env.DATABASE;
//console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then((con) => console.log('Database connected Successfully'));

//Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//IMPORT data into database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Uploaded Successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//Delete all data from COLLECTION

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Uploaded delelted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

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

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A toue must have a name'] },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'the Forest Hik',
  rating: 4.7,
  price: 497,
});
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('Error💥💥💥💥💥', err);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening on port no ${port}`);
});

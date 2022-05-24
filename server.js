const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app');

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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening on port no ${port}`);
});

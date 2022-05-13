const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
//Server

//console.log(process.env);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening on port no ${port}`);
});

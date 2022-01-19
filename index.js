const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes');

// mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.DB_URL).then(mongoose => {
  console.log('connected to the db.');
}).catch(e => {
  console.log(e);
});

const app = express();


app.use(morgan("dev"));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get("/hi", (req, res, next) => {
  res.send("Hello world !!!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("connecting to port:" + port);
  // console.log(path.join(__dirname,'public'));
});

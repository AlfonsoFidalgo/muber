const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test'){
  mongoose.connect('mongodb://localhost/muber');
}

app.use(bodyParser.json()); //before routes!!
routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message});
});


module.exports = app;

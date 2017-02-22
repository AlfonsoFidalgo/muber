const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/muber');

app.use(bodyParser.json()); //before routes!!
routes(app);


module.exports = app;

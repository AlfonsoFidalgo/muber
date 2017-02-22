const express = require('express');
const routes = require('./routes/routes');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json()); //before routes!!
routes(app);

module.exports = app;

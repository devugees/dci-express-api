const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

module.exports = app;

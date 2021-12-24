'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/user');
const places = require('./routes/place');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", users);
app.use("/api", places);

module.exports = app;
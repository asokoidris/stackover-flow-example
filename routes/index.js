const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const userAuthRoutes = require('./userAuth')
const questionRoutes = require('./question');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('welcome to stack')
});
app.use('/', userAuthRoutes)
app.use('/', questionRoutes)

module.exports = app;
var dotenv = require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var mongoose = require('mongoose');
var usersController = require('./controllers/users.js');
var sessionsController = require('./controllers/sessions.js');
var destinationsController = require('./controllers/destinations.js')
// Access public directory
app.use(express.static('public'));
// Connect to db
var mongoURI = 'mongodb://localhost/travel-app';
mongoose.connect(mongoURI);
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
// Sessions
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false
}))
// Controllers
app.use('/users', usersController);
app.use('/sessions', sessionsController);
app.use('/destinations', destinationsController);
// Listen for requests
app.listen(process.env.PORT || 3000, function() {
  console.log('listening on 3000');
});

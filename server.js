var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var mongoose = require('mongoose');

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on 3000');
});

var express = require('express');
var router = express.Router({ mergeParams: true });

var City = require('../models/city.js');
var List = require('../models/list.js');
var User = require('../models/user.js');

module.exports = router;

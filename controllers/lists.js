var express = require('express');
var router = express.Router({ mergeParams: true });

var City = require('../models/city.js');
var List = require('../models/list.js');
var User = require('../models/user.js');

router.get('/', function(req, res){
  List.find()
  .populate('_cities')
  .exec(function(err, lists){
    res.json(lists);
  })
})

module.exports = router;

var express = require('express');
var router = express.Router({ mergeParams: true });

var City = require('../models/city.js');
var List = require('../models/list.js');
var User = require('../models/user.js');

router.get('/random', function(req, res){
  List.findOne()
    .populate('_cities')
    .exec(function(err, list){
      if (err) {
        console.log(err);
      }
      var city = list._cities[ Math.floor( Math.random() * list._cities.length )];

      res.json(city);
    })
})

router.get('/', function(req, res){
  List.findOne()
    .populate('_cities')
    .exec(function(err, list){
      if(err) {
        console.log(err);
      }
      res.json(list);
    })
})


module.exports = router;

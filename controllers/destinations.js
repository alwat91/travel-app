var express = require('express');
var router = express.Router({ mergeParams: true });

var City = require('../models/city.js');
var List = require('../models/list.js');
var User = require('../models/user.js');


router.get('/', function(req, res){
  res.send('destinations')
})

router.get('/random', function(req, res){
  List.findOne()
    .exec(function(err, list){
      if (err) {
        console.log(err);
      }
      var city = list.cities[ Math.floor( Math.random() * list.cities.length )];
      res.json(city);
    })

})


module.exports = router;

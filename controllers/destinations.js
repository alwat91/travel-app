var express = require('express');
var router = express.Router({ mergeParams: true });

var Destination = require('../models/destination.js');
var User = require('../models/user.js');


router.get('/', function(req, res){
  res.send('destinations')
})

router.get('/random', function(req, res){

  Destination.find()
    .exec(function(err, destinations){
      if (err) {
        console.log(err);
      }
      res.send(destinations);
    })

})


module.exports = router;

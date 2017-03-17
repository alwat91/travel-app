// access api keys
require('dotenv').config();
// set up request-json
var request = require('request-json');
var client = request.createClient('http://localhost:8888/');
var express = require('express');
var router = express.Router({ mergeParams: true });

var City = require('../models/city.js');
var List = require('../models/list.js');
var User = require('../models/user.js');

router.put('/:cityId', function(req, res){
  City.findById(req.params.cityId)
    .exec(function(err, city){
      if (err) {
        console.log(err);
      }
      city.description = req.body.description;
      return city
    })
    .then(function(city){
      client.get(`http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${city.description}&apiKey=${process.env.SKYSCANNER_KEY}`, function(err, res, body){
        city.skyscanner_id = body.Places[0].CityId.slice(0, -4);
        return city;
      })
      return city;
    })
    .then(function(city){
      city.save();
      console.log(city);
      res.json(city);
    })
    .catch(function(err){
      console.log(err);
    })

})

module.exports = router;

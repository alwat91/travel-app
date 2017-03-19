// access api keys
require('dotenv').config();
// set up request-json
var request = require('request-json');
var client = request.createClient('http://localhost:8888/');
var express = require('express');
var router = express.Router({ mergeParams: true });

var City = require('../models/city.js');
// City update
router.put('/:cityId', function(req, res){
  // Find the city
  City.findById(req.params.cityId)
    .exec(function(err, city){
      if (err) { console.log(err);}
      // Update description
      city.description = req.body.description;
      return city
    })
    // Get skyscanner_id
    .then(function(city){
      client.get(`http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${city.description}&apiKey=${process.env.SKYSCANNER_KEY}`, function(err, res, body){
        // Set skyscanner_id
        city.skyscanner_id = body.Places[0].CityId.slice(0, -4);
        return city;
      })
      return city;
    })
    // Save the city
    .then(function(city){
      city.save();
      console.log(city);
      res.json(city);
    })
    .catch(function(err){
      console.log(err);
    })

})
// Create new city
router.post('/', function(req, res){
  console.log(req.body);
  var city = new City(req.body);
  // Get skyscanner_id
  client.get(`http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${city.description}&apiKey=${process.env.SKYSCANNER_KEY}`)
    .then(function(skyscannerRes){
      // Set skyscanner_id
      city.skyscanner_id = skyscannerRes.body.Places[0].CityId.slice(0, -4);
      city.save();
      res.send(city);
    })
})

module.exports = router;

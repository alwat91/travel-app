// access api keys
// require('dotenv').config();
// set up request-json
var request = require('request-json');
var client = request.createClient('http://localhost:8888/');
var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../models/user.js');
var City = require('../models/city.js');
var authHelpers = require('../helpers/auth.js');
// Create new user
router.post('/', authHelpers.createSecure, function(req, res){
  var user = new User({
    email: req.body.email,
    password_digest: res.hashedPassword
  });

  var city = new City({
    description: req.body.origin
  })
  // Get skyscanner_id for departure city
  client.get(`http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${city.description}&apiKey=${process.env.SKYSCANNER_KEY}`)
  .then(function(response) {
    // check to see if the expected response is given
    if (response.body.Places[0]) {
      // set the skyscanner_id
      city.skyscanner_id = response.body.Places[0].CityId.slice(0, -4);
      return city;
    }
    else {
      console.log(response.body);
    }
  })
  .then(function(city){
    city.save();
    user.preferred_departure = city;
    user.save();
    res.json({status: 200, message: "User created"})
  })
  .catch(function(err){
    console.log(err);
  });
});

module.exports = router;

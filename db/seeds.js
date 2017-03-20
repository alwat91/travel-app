// access api keys
// require('dotenv').config();
// set up request-json
var request = require('request-json');
var client = request.createClient('http://localhost:8888/');
// connect to mongoose
var mongoose = require('mongoose');
// password encryptor
var bcrypt = require('bcrypt');
// server stuff
var express = require('express');
var router = express.Router();
// models
var City = require('../models/city');
var List = require('../models/list');
var User = require('../models/user');
// route for seeding
router.get('/', function(req, res){
  // Remove existing records
  City.remove({}, function(err){
    console.log(err);
  });



  // Cities to create for final seed
  var cities = ["Hong Kong, Hong Kong", "Singapore, Singapore", "Bangkok, Thailand", "London, UK", "Macau, Macau", "Kuala Lumpur, Malaysia", "Shenzhen, China", "New York City, New York", "Antalya, Turkey", "Paris, France", "Istanbul, Turkey", "Rome, Italy", "Dubai", "Guangzhou, China", "Phuket, Thailand", "Mecca, Saudi Arabia", "Pattaya, Thailand", "Taipei City, Taiwan", "Prague, Czech Republic", "Shanghai, China", "Las Vegas, Nevada", "Miami, Florida", "Barcelona, Spain", "Moscow, Russia", "Beijing, China", "Los Angeles, California", "Budapest, Hungary", "Vienna, Austria", "Amsterdam, Netherlands", "Sofia, Bulgaria", "Madrid, Spain", "Orlando, Florida", "Ho Chi Minh City, Vietnam", "Lima, Peru", "Berlin, Germany", "Tokyo, Japan", "Warsaw, Poland", "Chennai, India", "Cairo, Egypt", "Nairobi, Kenya", "Hangzhou, China", "Milan, Italy", "San Francisco, California", "Buenos Aires, Argentina", "Venice, Italy", "Mexico City, Mexico", "Dublin, Ireland", "Seoul, South Korea", "Mugla, Turkey", "Mumbai, India"];
  // Less cities for testing. Use this to minimize api requests
  // var cities = ["Hong Kong, Hong Kong", "Singapore, Singapore", "Bangkok, Thailand", "London"];

  // loop through cities
  cities.forEach(function(name){
    // create city object
    city = new City({
      description: name
    });
    // get skyScanner info, then get places info
    getSkyscanner(city)
  })


  function getSkyscanner(city){
    // request autosuggestion for city from skyscanner
    client.get(`http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${city.description}&apiKey=${process.env.SKYSCANNER_KEY}`)
    .then(function(response) {
      // check to see if the expected response is given
      if (response.body.Places[0]) {
        // set the skyscanner_id
        city.skyscanner_id = response.body.Places[0].CityId.slice(0, -4);
      }
      else {
        console.log(response.body);
      }
      // After adding skyscanner_id, get the places id
      getPlaces(city);
    })
    .catch(function(res){
      console.log(res);
    });
  }

  function getPlaces(city){
    // perform places search for city
    client.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?type=city&query=${city.description}&key=${process.env.PLACES_KEY}`)
    .then(function(res){
      // check to see if the results are as expected
      if(res.body.results){
        // set the places_id of the city
        city.places_id = res.body.results[0].photos[0].photo_reference;
        // get the location of the city
        city.location = [res.body.results[0].geometry.location.lat, res.body.results[0].geometry.location.lng];
        // save the city
        city.save(function(res){
          console.log(city, "created");
          // push the city to the list
        })
      }
      else {
        console.log(res);
      }
    })
    .catch(function(res){
      console.log(res);
    });
  }
  res.json({status: 200, message: "seeded"})
})

module.exports = router;

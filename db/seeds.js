// access api keys
require('dotenv').config();
// set up request-json
var request = require('request-json');
var client = request.createClient('http://localhost:8888/');
// connect to mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/travel-app');
// password encryptor
var bcrypt = require('bcrypt');
// models
var City = require('../models/city');
var List = require('../models/list');
var User = require('../models/user');
// Remove existing records
City.remove({}, function(err){
  console.log(err);
});
List.remove({}, function(err){
  console.log(err);
});
User.remove({}, function(err){
  console.log(err);
});
// create new user
var user1 = new User({
  email: "a@a.com",
  password_digest: bcrypt.hashSync("a", bcrypt.genSaltSync(10)),
  destinations: list,
  already_been: list
})

user1.save(function(err){
  if (err) {
    console.log(err);
  }
  console.log("User created!");
})
// Cities to create for final seed
// var cities = ["Hong Kong, Hong Kong", "Singapore, Singapore", "Bangkok, Thailand", "London, UK", "Macau, Macau", "Kuala Lumpur, Malaysia", "Shenzhen, China", "New York City, New York", "Antalya, Turkey", "Paris, France"];
// Less cities for testing. Use this to minimize api requests
var cities = ["Hong Kong, Hong Kong", "Singapore, Singapore", "Bangkok, Thailand", "London"];
// list to create
var list = new List({
  description: "Top 10"
})
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
          list.cities.push(city);
          // save the list
          saveList();
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


function saveList(){
  list.save(function(err){
    if (err) {
      console.log(err);
    }
    console.log("List created!");
  })
}

require('dotenv').config();
var request = require('request-json');
var client = request.createClient('http://localhost:8888/');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/travel-app');
var bcrypt = require('bcrypt');
var get = require('../helpers/req.js')

var City = require('../models/city');
var List = require('../models/list');
var User = require('../models/user');

City.remove({}, function(err){
  console.log(err);
});

List.remove({}, function(err){
  console.log(err);
});

User.remove({}, function(err){
  console.log(err);
});

var cities = ["Hong Kong, Hong Kong", "Singapore, Singapore", "Bangkok, Thailand", "London, UK", "Macau, Macau", "Kuala Lumpur, Malaysia", "Shenzhen, China", "New York City, New York", "Antalya, Turkey", "Paris, France"];

var list2 = new List({
  description: "Top 10"
})

cities.forEach(function(name){
  city = new City({
    description: name
  });
  getSkyscanner(city)
})


function getSkyscanner(city){
  client.get(`http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${city.description}&apiKey=${process.env.SKYSCANNER_KEY}`)
  .then(function(response) {
    if (response.body.Places[0]) {
      city.skyscanner_id = response.body.Places[0].CityId;
    }
    else {
      console.log(response.body);
    }
    getPlaces(city);
  })
  .catch(function(res){
    console.log(res);
  });
}

function getPlaces(city){
  client.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?type=city&query=${city.description}&key=${process.env.PLACES_KEY}`)
  .then(function(res){
    city.places_id = res.body.results[0].place_id;
    city.location = [res.body.results[0].geometry.location.lat, res.body.results[0].geometry.location.lng];
    getMaps(city);
  })
  .catch(function(res){
    console.log(res);
  });
}

function getMaps(city){
  console.log(city);
}

var nyc = new City({
  description: "New York, New York",
  places_id: "ChIJOwg_06VPwokRYv534QaPC8g",
  skyscanner_id: "NYCA-sky",
  location: [40.7128, -74.0059]
});

var dc = new City({
  description: "Washington, D.C.",
  skyscanner_id: "WASA-sky",
  places_id: "ChIJW-T2Wt7Gt4kRKl2I1CJFUsI",
  location: [38.9072, -77.0369]
})

var list = new List({
  description: "Murica",
  cities: [dc, nyc]
})

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

list.save(function(err){
  if (err) {
    console.log(err);
  }
  console.log("List created!");
})

nyc.save(function(err){
  if (err) {
    console.log(err);
  }
  console.log("NYC created!");
})

dc.save(function(err){
  if (err) {
    console.log(err);
  }
  console.log("DC created!");
})

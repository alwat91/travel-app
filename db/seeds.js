var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/travel-app');
var bcrypt = require('bcrypt');

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

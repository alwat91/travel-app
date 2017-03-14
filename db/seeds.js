var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/travel-app');

var AlreadyBeen = require('../models/already_been');
var Destination = require('../models/destination');
var User = require('../models/user');

AlreadyBeen.remove({}, function(err){
  console.log(err);
});

Destination.remove({}, function(err){
  console.log(err);
});

User.remove({}, function(err){
  console.log(err);
});

var nyc = new Destination({
  description: "New York, New York",
  places_id: "ChIJOwg_06VPwokRYv534QaPC8g",
  skyscanner_id: "NYCA-sky",
  location: [40.7128, -74.0059]
});

var dc = new AlreadyBeen({
  description: "Washington, D.C.",
  skyscanner_id: "WASA-sky",
  places_id: "ChIJW-T2Wt7Gt4kRKl2I1CJFUsI",
  location: [38.9072, -77.0369]
})

var user1 = new User({
  email: "a@a.com",
  password_digest: "a",
  destinations: [nyc],
  already_been: [dc]
})

user1.save(function(err){
  if (err) {
    console.log(err);
  }
  console.log("User created!");
})

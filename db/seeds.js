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
  airport_codes: ['JFK', 'LGA'],
  description: "New York, New York",
  places_id: "ChIJOwg_06VPwokRYv534QaPC8g"
});

var dc = new AlreadyBeen({
  airport_codes: ['DCA', 'IAD', 'BWI']
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

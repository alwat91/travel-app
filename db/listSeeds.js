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
  List.remove({}, function(err){
    console.log(err);
  });
  User.remove({}, function(err){
    console.log(err);
  });
  // list to create
  var everything = new List({
    description: "Everything",
    _cities: []
  })

  var top10 = new List({
    description: "Top 10",
    _cities: []
  })

  var pref = new List({
    description: "Best big cities",
    _cities: []
  })

  City.find()
    .then(function(cities){
      console.log("cities", cities);
      cities.forEach(function(el, i){
        everything._cities.push(el._id);

        if (i < 9){
          top10._cities.push(el._id);
        }
        if (i % 2 == 0){
          pref._cities.push(el._id);
        }
      })
    })
    .then(function(err){
      everything.save(function(err, list){
        if (err) {
          console.log(err);
        }
        console.log("List created!", list);
      })
    })
    .then(function(err){
      top10.save(function(err, list){
        if (err) {
          console.log(err);
        }
        console.log("List created!", list);
      })
    })
    .then(function(err){
      pref.save(function(err, list){
        if (err) {
          console.log(err);
        }
        console.log("List created!", list);
      })
    })


  // create new user
  var user1 = new User({
    email: "a@a.com",
    password_digest: bcrypt.hashSync("a", bcrypt.genSaltSync(10)),
    destinations: everything,
    already_been: top10
  })

  user1.save(function(err){
    if (err) {
      console.log(err);
    }
    console.log("User created!");
  })
  res.json({status: 200, message: "seeded"})
})

module.exports = router;

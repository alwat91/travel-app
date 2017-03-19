// access api keys
require('dotenv').config();
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
  var list = new List({
    description: "Top 10",
    _cities: []
  })

  City.find()
    .then(function(cities){
      console.log("cities", cities);
      cities.forEach(function(el){
        list._cities.push(el._id);
      })
    })
    .then(function(err){
      list.save(function(err, list){
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
    destinations: list,
    already_been: list
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

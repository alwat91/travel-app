// access api keys
require('dotenv').config();
// set up request-json
var request = require('request-json');
var client = request.createClient('http://localhost:8888/');
var express = require('express');
var router = express.Router({ mergeParams: true });

var City = require('../models/city.js');
var List = require('../models/list.js');
var User = require('../models/user.js');
// Get all lists
router.get('/', function(req, res){
  List.find()
  .populate('_cities')
  .exec(function(err, lists){
    res.json(lists);
  })
});
// Crete new list
router.post('/', function(req, res){
  var list = new List(req.body);

  list.save(function(err, list){
    if(err){ console.log(err); }
    res.send(list);
  })
})
// Remove city from list
router.delete('/:listId/:cityId', function(req, res){
  List.findById(req.params.listId)
    .exec(function(err, list){
      if (err) {
        console.log(err);
      }
      // Find index of city with given id
      var index = list._cities.indexOf(req.params.cityId);
      // Remove city id from cities array
      list._cities.splice(index, 1);
      list.save();
      res.json({status: 200, statusText: "OK"});
    })
});
// Add city to list
router.post('/:listId', function(req, res){
  var city = new City({
    description: req.body.description
  })
  // Get skyscanner id
  client.get(`http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${city.description}&apiKey=${process.env.SKYSCANNER_KEY}`)
  .then(function(skyscannerRes){
    // Set skyscanner_id
    city.skyscanner_id = skyscannerRes.body.Places[0].CityId.slice(0, -4);
    return city.save();
  })
  .then(function(city){
    // Find list
    List.findById(req.params.listId)
      .exec(function(err, list){
        if(err) {console.log(err);}
        // Push city id to the list
        list._cities.push(city._id)
        list.save(function(err, list){
          if(err){ console.log(err); }
          res.json({status: 200, statusText: "OK"})
        });
      })
    })
    .catch(function(err){
      console.log(err);
    })
})
// Delete list
router.delete('/:listId', function(req, res){
  List.findByIdAndRemove(req.params.listId)
    .exec(function(err){
      if(err) { console.log(err); }
      res.send({status: 200, statusText: "ok"});
    })
})

module.exports = router;

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

router.get('/maps/:cityDescription', function(req, res){
  res.redirect(`https://www.google.com/maps/embed/v1/place?key=${process.env.MAPS_KEY}
    &q=${req.params.cityDescription}`)
})

router.get('/:originId/:destinationId', function(req, res){
  client.get(`http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/${req.params.originId}/${req.params.destinationId}/anytime/anytime?apikey=${process.env.SKYSCANNER_KEY}`)
  .then(function(skyRes){
    var lowestQuote = skyRes.body.Quotes[0];
    skyRes.body.Quotes.forEach(function(el){
      if (el.MinPrice < lowestQuote.MinPrice) {
        lowestQuote = el;
      }
    });
    res.json(lowestQuote);
  })
})

module.exports = router;

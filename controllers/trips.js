// access api keys
// require('dotenv').config();
// set up request-json
var request = require('request-json');
var client = request.createClient('http://localhost:8888/');
var express = require('express');
var router = express.Router({ mergeParams: true });
// Get trip
router.get('/:originId/:destinationId', function(req, res){
  // Get skyscanner prices
  client.get(`http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/${req.params.originId}/${req.params.destinationId}/anytime/anytime?apikey=${process.env.SKYSCANNER_KEY}`)
  .then(function(skyRes){
    // Set starting lowestQuote value
    var lowestQuote = skyRes.body.Quotes[0];
    // Find lowest quote
    skyRes.body.Quotes.forEach(function(el){
      if (el.MinPrice < lowestQuote.MinPrice) {
        lowestQuote = el;
      }
    });
    res.json(lowestQuote);
  })
})

module.exports = router;

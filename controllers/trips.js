// access api keys
require('dotenv').config();
var express = require('express');
var router = express.Router({ mergeParams: true });

var City = require('../models/city.js');
var List = require('../models/list.js');
var User = require('../models/user.js');

router.get('/maps/:cityDescription', function(req, res){
  res.redirect(`https://www.google.com/maps/embed/v1/place?key=${process.env.MAPS_KEY}
    &q=${req.params.cityDescription}`)
})

module.exports = router;

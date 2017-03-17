var express = require('express');
var router = express.Router({ mergeParams: true });

var City = require('../models/city.js');
var List = require('../models/list.js');
var User = require('../models/user.js');

router.get('/', function(req, res){
  List.find()
  .populate('_cities')
  .exec(function(err, lists){
    res.json(lists);
  })
});

router.delete('/:listId/:cityId', function(req, res){
  List.findById(req.params.listId)
    .exec(function(err, list){
      if (err) {
        console.log(err);
      }
      console.log(list);
      var index = list._cities.indexOf(req.params.cityId);
      list._cities.splice(index, 1);
      console.log(list);
      list.save();
      res.json({status: 200, statusText: "OK"});
    })
})

module.exports = router;

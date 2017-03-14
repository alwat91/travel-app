var User = require('../models/user.js');
var bcrypt = require('bcrypt');

function createSecure(req, res, next){
  res.hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
}

function loginUser(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(function(user){
      if(user == null) {
        res.json({status: 401, data: "unauthorized"});
      }
      else if(bcrypt.compareSync(req.body.password, user.password_digest)){
        console.log('user', user);
        req.session.currentUser = user;
      }
      next();
    });
}

function authorize(req, res, next){
  var currentUser = req.session.currentUser;

  if(!currentUser || currentUser_id !== req.params.id ) {
    res.send({status: 401, data: "unauthorized"})
  }
  else {
    next();
  }
}

module.exports = {
  createSecure: createSecure,
  loginUser: loginUser,
  authorize: authorize
}

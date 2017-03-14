var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var DestinationSchema = new Schema({
  created_at: Date,
  updated_at: Date,
  description: String,
  places_id: String,
  skyscanner_id: String,
  location: {
    type: [Number],
    index: '2d'
  }
});

var AlreadyBeenSchema = new Schema({
  created_at: Date,
  updated_at: Date,
  description: String,
  places_id: String,
  skyscanner_id: String,
  location: {
    type: [Number],
    index: '2d'
  }
});

var UserSchema = new Schema({
  email: String,
  password_digest: String,
  created_at: Date,
  updated_at: Date,
  destinations: [DestinationSchema],
  already_been: [AlreadyBeenSchema]
});

function dateHelper(next){
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) {
    this.created_at = now;
  }
  next();
}

DestinationSchema.pre('save', dateHelper);
AlreadyBeenSchema.pre('save', dateHelper);
UserSchema.pre('save', dateHelper);

var AlreadyBeenModel = mongoose.model('AlreadyBeen', AlreadyBeenSchema);
var DestinationModel = mongoose.model('Destination', DestinationSchema);
var UserModel = mongoose.model('User', UserSchema);

module.exports = {
  AlreadyBeen: AlreadyBeenModel,
  Destination: DestinationModel,
  User: UserModel
}

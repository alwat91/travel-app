var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var CitySchema = new Schema({
  created_at: Date,
  updated_at: Date,
  description: { type: String, sparse: true},
  places_id: { type: String, sparse: true},
  skyscanner_id: { type: String, sparse: true},
  location: {
    type: [Number],
    index: '2d'
  }
});

var ListSchema = new Schema({
  description: String,
  created_at: Date,
  updated_at: Date,
  _cities: [{type: Schema.Types.ObjectId, ref: 'City'}]
})

var UserSchema = new Schema({
  email: String,
  password_digest: String,
  created_at: Date,
  updated_at: Date,
  destinations: [ListSchema],
  already_been: [ListSchema],
  preferred_departure: [CitySchema]
});

function dateHelper(next){
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) {
    this.created_at = now;
  }
  next();
}

CitySchema.pre('save', dateHelper);
ListSchema.pre('save', dateHelper);
UserSchema.pre('save', dateHelper);

var CityModel = mongoose.model('City', CitySchema);
var ListModel = mongoose.model('List', ListSchema);
var UserModel = mongoose.model('User', UserSchema);

module.exports = {
  City: CityModel,
  List: ListModel,
  User: UserModel
}

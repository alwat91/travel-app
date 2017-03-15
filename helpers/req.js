require('dotenv').config();
var request = require('request-json');
var client = request.createClient('http://localhost:8888/');

function getSkyscanner(name){
  // Make request to skyscanner
  client.get(`http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${name}&apiKey=${process.env.SKYSCANNER_KEY}`, function(err, res, body){
     // Return the city id for the first autosuggest result
     if (err) {
       console.log(err);
     }
     else {
       return console.log(body.Places[0].CityId);
     }
   });
}

function getPlaces(name){

}

function getMaps(name){

}

module.exports = {
  getSkyscanner: getSkyscanner,
  getPlaces: getPlaces,
  getMaps: getMaps
}

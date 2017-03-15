require('dotenv').config();
var request = require('request-json');
var client = request.createClient('http://localhost:8888/');

function getSkyscanner(name){
  client.get(`http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${name}&apiKey=${process.env.SKYSCANNER_KEY}`, function(err, res, body){
    // JSON.parse(body);
    console.log('body', body.Places);
  })
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

// require('dotenv').config();
// var request = require('request-json');
// var client = request.createClient('http://localhost:8888/');


function get(url) {
  return new Promise(function(resolve, reject) {
    var req = new JSONHttpRequest();
    req.open('GET', url);

    req.onload = function(){
      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(Error(req.statusText));
      }
    }
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    req.send();
  });
}

function getSkyscanner(name){
  get(`http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${name}&apiKey=${process.env.SKYSCANNER_KEY}`)
  .then(function(response) {
    return body.Places[0].CityId;
  })

  // // Make request to skyscanner
  // client.get(`http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${name}&apiKey=${process.env.SKYSCANNER_KEY}`, function(err, res, body){
  //    // Return the city id for the first autosuggest result
  //    if (err) {
  //      console.log(err);
  //    }
  //    else {
  //      return body.Places[0].CityId;
  //    }
  //  });
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

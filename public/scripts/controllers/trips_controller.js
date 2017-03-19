function TripsController($http){
  var self = this;

  function getCities(){
    $http.get('/destinations')
    .then(function(res){
      self.cities = res.data._cities;
    })
  }
  getCities();
  self.getCities = getCities;

  function randomTrip(origin){
    // Get origin json
    self.origin = JSON.parse(origin);
    // Randomly select destination
    self.destination = self.selectedList._cities[Math.floor( Math.random() * self.selectedList._cities.length )];
    // Get prices
    $http.get(`/trips/${self.origin.skyscanner_id}/${self.destination.skyscanner_id}`)
    .then(function(res){
      self.lowestQuote = res.data;
    })
  }
  self.randomTrip = randomTrip;
}

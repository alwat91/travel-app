function TripsController($http, $state){
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
    self.origin = JSON.parse(origin);

    $http.get('/destinations/random')
    .then(function(res){
      self.destination = res.data;
      getPrice();
    })
  }
  self.randomTrip = randomTrip

  function getPrice(){
    $http.get(`/trips/${self.origin.skyscanner_id}/${self.destination.skyscanner_id}`)
    .then(function(res){
      console.log(res.data);
      self.lowestQuote = res.data;
    })
  }
}

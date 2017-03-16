function DestinationsController($http, $state){
  var self = this;

  function getCities(){
    $http.get('/destinations')
    .then(function(res){
      self.cities = res.data.cities;
    })
  }
  getCities();
  self.getCities = getCities;

  function randomTrip(origin){
    self.origin = JSON.parse(origin);
    
  }
  self.randomTrip = randomTrip
}

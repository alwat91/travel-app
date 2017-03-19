function TripsController($http, $scope){
  var self = this;

  function getCities(){
    $http.get('/destinations')
    .then(function(res){
      self.cities = res.data._cities;
    })
  }
  getCities();
  self.getCities = getCities;

  function randomTrip(){
    // Randomly select destination
    self.destination = $scope.selectedList._cities[Math.floor( Math.random() * $scope.selectedList._cities.length )];
    // Create new city for origin
    $http.post('/cities', self.origin)
      .then(function(res){
        self.origin = res.data;
        // Get prices
        return $http.get(`/trips/${self.origin.skyscanner_id}/${self.destination.skyscanner_id}`)
      })
    .then(function(res){
      self.lowestQuote = res.data;
    })
  }
  self.randomTrip = randomTrip;
}

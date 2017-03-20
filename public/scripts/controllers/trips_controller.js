function TripsController($http, $scope){
  var self = this;

  function randomTrip(){
    // Clear lowest quote so that loading animation will show when button is clicked again
    if (self.lowestQuote) {
      self.lowestQuote = null;
    }
    // Randomly select destination
    self.destination = $scope.selectedList._cities[Math.floor( Math.random() * $scope.selectedList._cities.length )];
    // Create new city for origin
    $http.post('/cities', self.origin)
      .then(function(res){
        if(res.data.status == 400){
          Materialize.toast('Unable to find requested departure city, please try again', 4000);
          self.destination = null;
        }
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

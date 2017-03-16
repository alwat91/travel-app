function DestinationsController($http){
  var self = this;

  function getCities(){
    $http.get('/destinations')
    .then(function(res){
      console.log(res);
    })
  }
  getCities();
  self.getCities = getCities;
}

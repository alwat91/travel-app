function ListsController($http){
  var self = this;

  function getAllLists(){
    $http.get('/lists/')
      .then(function(res){
        self.allLists = res.data;
      })
  }
  getAllLists();
  self.getAllLists = getAllLists

  function removeCity(city, list){
    $http.delete(`/lists/${list._id}/${city._id}`)
      .then(function(res){
        console.log(res);
        getAllLists();
      })
  }
  self.removeCity = removeCity
}

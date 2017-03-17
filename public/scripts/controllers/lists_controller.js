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
}

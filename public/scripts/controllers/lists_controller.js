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

  function editCity(city){
    console.log(city._id);
    $http.put(`/cities/${city._id}`, city)
      .then(function(res){
        console.log(res);
        city = res.data;
        city.showEdit = false;
      })
  }
  self.editCity = editCity;

  function addCity(list){
    console.log(list);
  }
  self.addCity = addCity;
}

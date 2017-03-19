function ListsController($http, $state, $scope){
  var self = this;

  function getAllLists(){
    $http.get('/lists/')
      .then(function(res){
        self.allLists = res.data;
        $scope.$emit('gotLists', self.allLists);
      })
  }
  getAllLists();
  self.getAllLists = getAllLists

  function removeCity(city, list){
    $http.delete(`/lists/${list._id}/${city._id}`)
      .then(function(res){
        getAllLists();
      })
  }
  self.removeCity = removeCity

  function editCity(city){
    $http.put(`/cities/${city._id}`, city)
      .then(function(res){
        city = res.data;
        city.showEdit = false;
      })
  }
  self.editCity = editCity;

  function addCity(city, list){
    $http.post(`/lists/${list._id}`, city)
      .then(function(res){
        $state.reload();
      })
  }
  self.addCity = addCity;

  function addList(list){
    $http.post('/lists', list)
      .then(function(res){
        self.allLists.push(res.data);
        self.showAddList = false;
      })
  }
  self.addList = addList;

  function deleteList(list){
    $http.delete(`/lists/${list._id}`)
      .then(function(res){
        self.getAllLists();
      })
  }
  self.deleteList = deleteList;
}

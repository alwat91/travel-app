function HomeController($scope, $http) {
  var self = this;

  $scope.$on('userLoggedIn', function(event, data) {
    self.currentUser = data;
  })

  $scope.$on('userLoggedOut', function(event, data){
    self.currentUser = null;
  })

  $scope.$on('gotLists', function(event, data){
    self.allLists = data;
    $scope.allLists = data;
    $scope.selectedList = self.allLists[0];
  })
}

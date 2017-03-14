function AuthController($scope, $http, $state){
  var self = this;

  function signup(user) {
    $http.post('/users', user)
      .then(function(response) {
        $state.go('login');
    })
  }
  self.signup = signup;

  function login(user) {
    $http.post('/sessions/login', user)
      .then(function(res){
        $scope.$emit('userLoggedIn')
        $state.go('index');
    })
  }
  self.login = login;

  function logout() {
    $http.delete('/sessions')
      .then(function(res){
        $scope.$emit('userLoggedOut');
        $state.go('index');
    })
  }
  self.logout = logout;
}

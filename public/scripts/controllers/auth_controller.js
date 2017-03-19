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
        console.log(res.data);
        if (res.data.status == 401) {
          Materialize.toast('Incorrect username or password')
        }
        else {
          $scope.$emit('userLoggedIn', res.data.data)
          $state.go('index');
        }
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

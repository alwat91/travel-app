angular.module('travelApp', ['ui.router'])
  .config(TravelRouter);

  function TravelRouter($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('index', {
      url: '/'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/partials/login.html'
    })
    .state('sign_up', {
      url: '/sign_up',
      templateUrl: '/partials/sign_up.html'
    })
  }

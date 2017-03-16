angular.module('travelApp', ['ui.router'])
  .config(TravelRouter);

  function TravelRouter($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('index', {
      url: '/',
      templateUrl: '/partials/home.html',
      controller: 'TripsController as trips'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/partials/login.html',
      controller: 'AuthController as auth'
    })
    .state('sign_up', {
      url: '/sign_up',
      templateUrl: '/partials/sign_up.html',
      controller: 'AuthController as auth'
    })
    .state('preferences', {
      url: '/preferences',
      templateUrl: '/partials/preferences.html'
    })
  }

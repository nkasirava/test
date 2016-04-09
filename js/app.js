var myApp = angular.module('myApp',
  ['ngRoute', 'firebase'])
  .constant('FIREBASE_URL', 'https://elegantshorts.firebaseio.com/');


myApp.run(['$rootScope', '$location',
  function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
      function(event, next, previous, error) {
        if (error=='AUTH_REQUIRED') {
                 $location.path('/login');
        } // AUTH REQUIRED
      }); 
      
  }]); //run

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController',

    }).
  
  when('/', {
      redirectTo: '/links',
      
    }).
      when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/links', {
      templateUrl: 'views/links.html',
      controller: 'LinksController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
    }).
  otherwise({
       redirectTo: '/links',
        
    });
}]);

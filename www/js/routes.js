angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu.signup', {
    url: '/signup',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  .state('menu', {
    url: '/',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.face', {
    url: '/face',
    views: {
      'side-menu21': {
        templateUrl: 'templates/face.html',
        controller: 'faceCtrl'
      }
    }
  })

  .state('menu.speech', {
    url: '/speech',
    views: {
      'side-menu21': {
        templateUrl: 'templates/speech.html',
        controller: 'speechCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('//home')

  

});
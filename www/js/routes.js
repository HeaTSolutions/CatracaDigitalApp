angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('catracaTabController.register', {
    url: '/register',
    views: {
      'tab1': {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      }
    }
  })

  .state('catracaTabController.report', {
    url: '/report',
    views: {
      'tab2': {
        templateUrl: 'templates/report.html',
        controller: 'reportCtrl'
      }
    }
  })

  .state('catracaTabController.history', {
    url: '/history',
    views: {
      'tab3': {
        templateUrl: 'templates/history.html',
        controller: 'historyCtrl'
      }
    }
  })

  .state('catracaTabController', {
    url: '/tabs',
    templateUrl: 'templates/catracaTabController.html',
    abstract:true
  })

  .state('catracaTabController.info', {
    url: '/info',
    views: {
      'tab4': {
        templateUrl: 'templates/info.html',
        controller: 'infoCtrl'
      }
    }
  })

  .state('signUp', {
    url: '/signup',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

  .state('start', {
    url: '/start',
    templateUrl: 'templates/start.html',
    controller: 'startCtrl'
  })


$urlRouterProvider.otherwise('/start')

});

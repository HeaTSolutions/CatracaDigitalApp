angular.module('app.controllers', [])

.controller('registerCtrl', function($scope) {

})

.controller('reportCtrl', function($scope) {

})

.controller('historyCtrl', function($scope) {

})

.controller('infoCtrl', function($scope) {

})

.controller('signUpCtrl', function($scope) {

})

.controller('startCtrl', function($scope, $ionicLoading, $state, serverConfig) {

  $ionicLoading.show({template: 'Carregando...'});

  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");

    });
  };

  $scope.show();
  setTimeout($scope.hide, 3000);
  $state.go("signUp");

})

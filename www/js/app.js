angular
  .module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])
  .constant("serverEndpoint", "http://catracadigital.com.br/api")
  //.constant("serverEndpoint", "http://192.168.0.104:8000/api")
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

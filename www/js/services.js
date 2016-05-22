angular.module('app.services', ['ngResource'])

.factory('LocationService', ["$q","$cordovaGeolocation", function($q, $cordovaGeolocation) {
  var latLong = null;
  var getLocation = function(refresh, callback) {
    var deferred = $q.defer();
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    if( latLong === null || refresh ) {
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function(pos) {
          latLong = {
            'latitude' : pos.coords.latitude,
            'longitude' : pos.coords.longitude
          }
          callback(latLong);
          deferred.resolve(latLong);
        }, function(error) {
          latLong = null;
          deferred.reject('Failed to Get Lat Long');
          callback(latLong);
      });
    }
    else {
        deferred.resolve(latLong);
    }
    return deferred.promise;
  };

  return {
      getLocation : getLocation
  }
}])

.factory('Employee', ["serverEndpoint", "$resource", function(serverEndpoint, $resource) {
  return $resource(serverEndpoint + "/employee/:uuid");
}])

.factory('Register', ["serverEndpoint", "$resource",
  function(serverEndpoint, $resource) {
    return $resource(serverEndpoint + "/register/:uuid");
}])

.service('EmployeeService', ["serverEndpoint", "$http", function(serverEndpoint, $http) {
  this.isRegistered = function(uuid, isRegistered, notFound) {
    $http.get(serverEndpoint + "/employee/" + uuid).then(isRegistered, notFound);
  }
}]);


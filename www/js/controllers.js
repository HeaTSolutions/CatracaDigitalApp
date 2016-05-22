angular.module('app.controllers', ['ngCordova'])

  .controller('registerCtrl', function (serverEndpoint, $scope, $state, $window, $ionicPlatform, $ionicLoading,
                                        $ionicPopup, $cordovaDevice, $http, $timeout, Register, LocationService) {
    $scope.currentDate = new Date();
    $scope.shouldShowDelete = false;
    $scope.totalWorkedToday = "Carregando...";

    $ionicPlatform.ready(function () {
      loadRegisters = function () {
        $scope.registers = [];
        Register.get({uuid: $cordovaDevice.getDevice().uuid}, function (response) {
          angular.forEach(JSON.parse(JSON.stringify(response)).data, function (register, idx) {
            register.label = ['Entrada', 'Saída'][idx % 2];
            register.time = new Date(register.time);
            $scope.registers.push(register);
          });
        });
      }

      addRegisterCallback = function (location) {
        if (location != null) {
          Register.save({uuid: $cordovaDevice.getDevice().uuid}, location, function() {}, function() {
            $ionicPopup.alert({
             title: 'Ocorreu um erro',
             template: 'Não foi possível contactar o CatracaDigital. Assegure-se ' +
             'de que seu celular está com WiFi habilitado e conectado ou que' +
             'os serviços de dados do aparelho estejam ligados e tente novamente.'
           });
          });
        }
        else {
          $ionicPopup.alert({
           title: 'Ocorreu um erro',
           template: 'Não foi possível determinar sua localização. Favor habilitar ' +
           'os serviços de localização do aparelho e tentar novamente.'
         });
        }
        loadRegisters();
        $ionicLoading.hide();
      }

      addRegisterInit = function () {
        $ionicLoading.show({template: 'Marcando o ponto'});
        LocationService.getLocation(true, addRegisterCallback);
      }

      $scope.showRegisterConfirm = function () {
        $ionicPopup.confirm({
          title: 'Registrar ponto',
          template: 'Deseja registrar ponto neste momento?'
        }).then(function (res) {
          if (res) {
            addRegisterInit();
          }
        });
      };

      $scope.removeRegister = function (register, index) {
        $ionicPopup.confirm({
          title: 'Remover registro',
          template: 'Deseja remover o registro?'
        }).then(function (res) {
          if (res) {
            $ionicLoading.show({template: 'Removendo a marcação'});
            $http({
              method: 'DELETE',
              url: serverEndpoint + "/delete_register/" + register.pk
            }).then(function successCallback(response) {
              loadRegisters();
              $ionicLoading.hide();
            }, function errorCallback(response) {
              console.log("Could not remove entry.");
            });
          }
        });
      }

      getDuration = function (millis) {
        var seconds = Math.floor(millis / 1000);
        var minutes = Math.floor(seconds / 60);
        seconds %= 60;
        var hours = Math.floor(minutes / 60);
        minutes %= 60;

        if (seconds < 10) seconds = "0" + seconds;
        if (minutes < 10) minutes = "0" + minutes;
        if (hours < 10)  hours = "0" + hours;

        return hours + ":" + minutes + ":" + seconds;
    }

      tickClock = function() {
        registers = angular.copy($scope.registers);

        if (registers.length % 2 == 1) {
          var nowRegister = new Date();
          nowRegister.setHours(nowRegister.getHours() - 3);
          registers.push({time: nowRegister});
        }

        var sum = 0;
        for (var i = 1; i < registers.length; i += 2) {
            sum += (new Date(registers[i].time) - new Date(registers[i - 1].time));
        }

        $scope.totalWorkedToday = getDuration(sum);
        $timeout(tickClock, 1000);
      }

      loadRegisters();
      tickClock();
    });
  })

  .controller('reportCtrl', function ($scope) {
    
  })

  .controller('historyCtrl', function ($scope) {

  })

  .controller('infoCtrl', function ($scope, $ionicPlatform, $cordovaDevice, Employee) {
    $ionicPlatform.ready(function () {
      var device = $cordovaDevice.getDevice();
      var uuid = device.uuid.toUpperCase();

      $scope.employee = Employee.get({uuid: uuid}, function (employee) {
        $scope.company = employee.company;
        employee.admission_date = new Date(employee.admission_date);
      });
    });
  })

  .controller('signUpCtrl', function ($scope, $ionicPlatform, $cordovaDevice) {
    $ionicPlatform.ready(function () {
      var device = $cordovaDevice.getDevice();
      $scope.uuid = device.uuid.toUpperCase();
    });
  })

  .controller('startCtrl', function ($scope, $ionicLoading, $ionicPlatform, $state, $cordovaDevice, EmployeeService) {

    $ionicPlatform.ready(function () {
      $ionicLoading.show({template: 'Carregando...'});

      var device = $cordovaDevice.getDevice();
      EmployeeService.isRegistered(device.uuid, function () {
        $ionicLoading.hide();
        $state.go("catracaTabController.register");
      }, function () {
        $ionicLoading.hide();
        $state.go("signUp");
      });

    });

  })

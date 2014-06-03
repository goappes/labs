angular.module('app.app-ctrl', [])

.controller('AppCtrl', function ($scope, $state, auth) {
  $scope.$state = $state;
  $scope.auth = auth;
  $scope.online = false;

  document.addEventListener('online', function () {
    console.log('online')
    $scope.apply(function () {
      $scope.online = true;
    });
  }, false);

  document.addEventListener('offline', function () {
    console.log('offline')
    $scope.apply(function () {
      $scope.online = false;
    });
  }, false);
})
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .when('', '/')
    .otherwise('/');

  $stateProvider
    .state('root', {
      abstract: true,
      controller: 'AppCtrl',
      templateUrl: 'scripts/app/root.tpl.html',
      onEnter: function () {
        console.log('enter root');
      }
    })
});
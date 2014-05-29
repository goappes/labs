angular.module('app.app-ctrl', [])

.controller('AppCtrl', function ($scope, $state) {
  $scope.$state = $state;
})

.config(function ($stateProvider, $urlRouterProvider){
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
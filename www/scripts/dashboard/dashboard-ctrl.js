angular.module('app.dashboard.dashboard-ctrl', [])

.controller('DashboardCtrl', function ($scope, $http, $state) {
  $scope.dashboard = $http.get('http://192.168.0.117:3000/api/v1/dashboard')
    .then(function (res) {
      $scope.dashboard = res.data;
    });
})

.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('root.dashboard', {
      url: '/',
      controller: 'DashboardCtrl',
      templateUrl: 'scripts/dashboard/dashboard.tpl.html',
      onEnter: function () {
        console.log('enter root.dashboard');
      }
    })
});
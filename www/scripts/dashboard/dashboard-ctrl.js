angular.module('app.dashboard.dashboard-ctrl', [])

.controller('DashboardCtrl', function ($scope, $state) {
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
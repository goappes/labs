angular.module('app.connect.connect-ctrl', [])

.controller('ConnectCtrl', function ($scope, $state) {
})

.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('root.connect', {
      url: '/connect',
      controller: 'ConnectCtrl',
      templateUrl: 'scripts/connect/connect.tpl.html',
      onEnter: function () {
        console.log('enter root.connect');
      }
    })
});
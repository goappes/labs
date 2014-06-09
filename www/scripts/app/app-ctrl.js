angular.module('app.app-ctrl', [])

.controller('AppCtrl', function ($scope, $state, auth, device, storage) {
  $scope.$state = $state;
  $scope.auth = auth;
  $scope.device = device;
  // auth.getLoginStatus();
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
      resolve: {
        isLoggedIn: function (auth) {
          return auth.isLoggedIn();
        }
      },
      onEnter: function () {
        console.log('enter root');
      }
    })
});
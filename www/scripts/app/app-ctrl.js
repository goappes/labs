angular.module('app.app-ctrl', [])

.controller('AppCtrl', function ($scope, $state, auth, device, storage) {
  $scope.$state = $state;
  $scope.auth = auth;
  $scope.device = device;
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
})
.run(function ($rootScope, $state, auth) {
  $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
    console.log('ta logado?', auth.isLoggedIn())
    if (!auth.isLoggedIn() && toState.data && toState.data.requireLogin) {
      e.preventDefault();
      $state.go('login');
    }
  });
});
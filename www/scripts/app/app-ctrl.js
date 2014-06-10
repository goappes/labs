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
// .run(function ($rootScope, $state, $stateParams) {
//   $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
//     console.log('$stateChangeStart')
//   });
// });
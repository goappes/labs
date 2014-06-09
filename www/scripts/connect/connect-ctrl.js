angular.module('app.connect.connect-ctrl', [])

.controller('ConnectCtrl', function ($scope, $state, auth) {
  $scope.user = {
    login: 'joaopintoneto',
    password: 'dumba123'
  };
  
  $scope.signIn = function () {
    auth.login($scope.user.login, $scope.user.password)
      .then(function (data) {
        console.log(data)
      }, function (data) {
        console.log(data)
      });
  };
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

  $stateProvider
    .state('root.logout', {
      url: '/logout',
      onEnter: function ($state, auth) {
        auth.logout();
        $state.transitionTo('root.dashboard');
      }
    })
});
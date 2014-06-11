angular.module('app.connect.connect-ctrl', [])

.controller('ConnectCtrl', function ($scope, $state, auth) {
  $scope.user = {
    login: 'joaopintoneto',
    password: 'dumba123'
  };

  $scope.errors = {};
  
  $scope.signIn = function () {
    auth.login($scope.user.login, $scope.user.password)
      .then(function (data) {
        $state.go('root.dashboard');
      }, function (response) {
        if (response.data.error === 'invalid_grant') {
          $scope.errors['invalid_grant'] = 'Login ou senha inválida';
        }
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
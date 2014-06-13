angular.module('app.login.login-ctrl', [])

.controller('LoginCtrl', function ($scope, $state, auth) {
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
    .state('login', {
      // abstract: true,
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'scripts/login/login.tpl.html',
      onEnter: function () {
        console.log('enter login');
      }
    })

  $stateProvider
    .state('logout', {
      // abstract: true,
      url: '/logout',
      onEnter: function ($state, auth) {
        auth.logout();
        $state.transitionTo('root.dashboard');
      }
    })
});
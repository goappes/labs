angular.module('app.geolocation.geolocation-ctrl', [])

.controller('GeolocationCtrl', function ($scope, $state) {
})

.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('root.geolocation', {
      url: '/geolocation',
      controller: 'GeolocationCtrl',
      templateUrl: 'scripts/geolocation/geolocation.tpl.html',
      onEnter: function () {
        console.log('enter root.geolocation');
      }
    })
});
angular.module('app.search.search-ctrl', [])

.controller('SearchCtrl', function ($scope, $state) {
})

.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('root.search', {
      url: '/search',
      controller: 'SearchCtrl',
      templateUrl: 'scripts/search/search.tpl.html',
      onEnter: function () {
        console.log('enter root.search');
      }
    })
});
angular.module('app.search.search-ctrl', [])

.controller('SearchCtrl', function ($scope) {
})

.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('root.search', {
      url: '/search',
      data: {
        requireLogin: true
      },
      controller: 'SearchCtrl',
      templateUrl: 'scripts/search/search.tpl.html',
      onEnter: function () {
        console.log('enter root.search');
      }
    })
});
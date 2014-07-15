angular.module('app.root', [
  'app.conf',
  'app.templates',
  'app.storage',
  'app.device',
  'app.auth',
  'app.geolocation',
  'app.map',
  'app.app-ctrl'
]);

angular.module('app.templates',[]);

angular.module('app.dashboard', [
  'app.dashboard.dashboard-ctrl'
]);

angular.module('app.login', [
  'app.login.login-ctrl'
]);

angular.module('app.search', [
  'app.search.search-ctrl'
]);

angular.module('app', [
  'ionic',
  'app.root',
  'app.dashboard',
  'app.login',
  'app.search'
])
.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    // if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      // StatusBar.styleDefault();
    // }
  });
})

angular.element(document).on((window.cordova) ? 'deviceready' : 'ready',function () {
  angular.bootstrap(angular.element(document), ['app']);
  navigator.splashscreen.hide();
}, false);

// $scope.loading = $ionicLoading.show({
//   content: 'Getting current location...',
//   showBackdrop: false
// });
// $scope.loading.hide();


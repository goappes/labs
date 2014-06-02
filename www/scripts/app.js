angular.module('app.root', [
  'app.auth',
  'app.app-ctrl'
]);

angular.module('app.dashboard', [
  'app.dashboard.dashboard-ctrl'
]);

angular.module('app.connect', [
  'app.connect.connect-ctrl'
]);

angular.module('app.geolocation', [
  'app.geolocation.geolocation-ctrl'
]);

angular.module('app', [
  'ionic',
  'app.root',
  'app.dashboard',
  'app.connect',
  'app.geolocation'
])
.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if(window.cordova && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    // }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

document.addEventListener('deviceready', function () {
  setTimeout(function () {
    navigator.splashscreen.hide();
  }, 200);
}, false);

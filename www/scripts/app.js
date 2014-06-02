var app = {
  showMap: function() {
      var pins = [
      {
          lat: 49.28115,
          lon: -123.10450,
          title: "A Cool Title",
          snippet: "A Really Cool Snippet",
          icon: mapKit.iconColors.HUE_ROSE
      },
      {
          lat: 49.27503,
          lon: -123.12138,
          title: "A Cool Title, with no Snippet",
          icon: {
            type: "asset",
            resource: "www/img/logo.png", //an image in the asset directory
            pinColor: mapKit.iconColors.HUE_VIOLET //iOS only
          }
      },
      {
          lat: 49.28286,
          lon: -123.11891,
          title: "Awesome Title",
          snippet: "Awesome Snippet",
          icon: mapKit.iconColors.HUE_GREEN
      }];
      var error = function() {
        console.log(arguments);
      };
      var success = function() {
        mapKit.addMapPins(pins, function() { 
                                    console.log('adMapPins success');  
                                },
                                function() { console.log('error'); });
      };
      mapKit.showMap(success, error);
  },
  hideMap: function() {
      var success = function() {
        console.log('Map hidden');
      };
      var error = function() {
        console.log('error');
      };
      mapKit.hideMap(success, error);
  },
  clearMapPins: function() {
      var success = function() {
        console.log('Map Pins cleared!');
      };
      var error = function() {
        console.log('error');
      };
      mapKit.clearMapPins(success, error);
  },
  changeMapType: function() {
      var success = function() {
        console.log('Map Type Changed');
      };
      var error = function() {
        console.log('error');
      };
      mapKit.changeMapType(mapKit.mapType.MAP_TYPE_SATELLITE, success, error);
  }
}


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
  app.showMap()
}, false);


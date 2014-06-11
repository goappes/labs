angular.module('app.map', [])

.run(function ($rootScope, device) {
  window.handleMapApiLoad = function () {
    $rootScope.$apply(function () {
      console.log('googleMapsStatus -> loaded!!!');
      $rootScope.googleMapsStatus = 'loaded';
    });
  };

  function loadScript() {
    // $rootScope.$apply(function () {
      console.log('googleMapsStatus -> loading...');
      $rootScope.googleMapsStatus = 'loaging';
    // });

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = 'defer';
    script.async = 'async';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=handleMapApiLoad';
    document.body.appendChild(script);
  }

  device.on('online', function () {
    if (!$rootScope.googleMapsStatus || $rootScope.googleMapsStatus !== 'loaging') {
      loadScript();
    }
  });
})

.controller('MapCtrl', function ($scope, geolocation, device) {
  $scope.stopWatch = function () {
    geolocation.stopWatch();
  };

  $scope.setCenter = function (pos) {
    if (!$scope.map) return;
    $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
  };

  // geolocation.watchPosition()
  //   .on('position', $scope.setCenter)
  //   .on('error', function (error) {
  //     console.log('Unable to get location: ' + error.message);
  //   });
})

.directive('map', function () {
  return {
    restrict: 'EA',
    replace: true,
    template: '<div></div>',
    controller: 'MapCtrl',
    link: function (scope, element, attrs) {
      scope.$watch('googleMapsStatus', function (status) {
        if (status === 'loaded') {
          scope.map = new google.maps.Map(element[0], {
            center: new google.maps.LatLng(43.07493, -89.381388),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });

          // google.maps.event.addDomListener(scope.map, 'mousedown', function (e) {
          //   e.preventDefault();
          //   return false;
          // }, false);
        }
      });
    }
  };
});
angular.module('app.map', [])

.controller('MapCtrl', function ($scope, geolocation, device) {
  $scope.googleMarkers = [];

  $scope.$watch('coords', function (coords) {
    if (!$scope.map || !coords) return;
    $scope.map.setCenter(coords);
  });

  $scope.$watchCollection('markers', function (markers) {
    if (!$scope.map || !markers) return;
    $scope.clearMarkers();
    markers.forEach(function (marker) {
      $scope.placeMarker(marker);
    })
  });

  $scope.clearMarkers = function (map) {
    // @todo: remove marker event listeners
    $scope.googleMarkers.forEach(function (marker) {
      marker.setMap(null);
    });
    $scope.googleMarkers.length = 0;
  };

  $scope.placeMarker = function (config) {
    console.log(config);
    var marker = new google.maps.Marker({
      position: config.position,
      icon: new google.maps.MarkerImage('images/' + (config.type || 'marker') + '.svg', null, null, null, new google.maps.Size(25,25)),
      title: config.title,
      map: $scope.map
    });
    $scope.googleMarkers.push(marker);
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
    scope: {
      coords: '=',
      markers: '='
    },
    link: function (scope, element, attrs) {
      scope.map = new google.maps.Map(element[0], {
        disableDefaultUI: true,
        mapTypeControl: true,
        zoom: 11,
        center: new google.maps.LatLng(-23.6824124, -46.5952992),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGTH,
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
        }
      });

      // google.maps.event.addDomListener(scope.map, 'mousedown', function (e) {
      //   e.preventDefault();
      //   return false;
      // }, false);
    }
  };
});
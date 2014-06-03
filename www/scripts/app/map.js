angular.module('app.map', [])

.controller('MapCtrl', function ($scope, $ionicLoading, geolocation) {
  $scope.stopWatch = function () {
    geolocation.stopWatch();
  };

  $scope.setCenter = function (pos) {
    if (!$scope.map) return;
    $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
  };

  // Stop the side bar from dragging when mousedown/tapdown on the map
  google.maps.event.addDomListener(document.getElementById('map-canvas'), 'mousedown', function (e) {
    e.preventDefault();
    return false;
  }, false);

  geolocation.watchPosition()
    .on('position', $scope.setCenter)
    .on('error', function (error) {
      console.log('Unable to get location: ' + error.message);
    });
})

.directive('map', function () {
  return {
    restrict: 'EA',
    replace: true,
    template: '<div></div>',
    controller: 'MapCtrl',
    link: function (scope, element, attrs) {
      var options = {
        center: new google.maps.LatLng(43.07493, -89.381388),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      scope.map = new google.maps.Map(document.getElementById(attrs.id), options);
    }
  };
});
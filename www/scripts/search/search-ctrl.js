angular.module('app.search.search-ctrl', [])

// $ionicLoading.show({
//   content: 'Getting current location...',
//   showBackdrop: false
// });
// $ionicLoading.hide();

.controller('SearchCtrl', function ($scope, $http, $ionicModal, $ionicLoading, geolocation) {
  $scope.search_form = { location: {}, distance: 10000 };
  $scope.markers = [];

  $ionicModal.fromTemplateUrl('scripts/search/modal.tpl.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.searchModal = modal;
  });

  $scope.openSearchModal = function () {
    $scope.searchModal.show();
  };

  $scope.closeSearchModal = function() {
    $scope.searchModal.hide();
  };

  $scope.updatePosition = function () {
    $ionicLoading.show({
      content: 'Encontrando posição atual...',
      showBackdrop: false
    });

    geolocation.getCurrentPosition()
      .then(function (position) {
        $scope.currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        $scope.setFormData(position);
        $scope.addClientLocationMarker();
      })
      .finally(function () {
        $ionicLoading.hide();
      });
  };

  $scope.setFormData = function () {
    if (!$scope.currentPosition) return;
    geolocation.geoCoder({'latLng': $scope.currentPosition})
      .then(function (data) {
        $scope.search_form.location = data;
      });
  }

  $scope.addClientLocationMarker = function () {
    if ($scope.currentPosition) {
      $scope.markers.push({
        type: 'client-location',
        title: 'Sua posição',
        position: $scope.currentPosition
      });
    }
  };

  $scope.updateMarkers = function () {
    $scope.markers.length = 0;
    $scope.addClientLocationMarker();
  }

  $scope.getPartners = function () {
    var data = {
      position: $scope.search_form.location.latlng.join(','),
      distance: $scope.search_form.distance
    };

    // return $http.get('http://192.168.0.4:3000/api/v1/partners', {params: data})
    return $http.get('https://dev.dumba.com.br/api/v1/partners', {params: data})
      .then(function (res) {
        // $scope.partners = res.data;
        if (res.data.length) {
          console.log(res.data)
          res.data.forEach(function (partner) {
            console.log(partner.position)
            $scope.markers.push({
              type: 'marker',
              title: partner.name,
              position: new google.maps.LatLng(partner.loc.coordinates[0], partner.loc.coordinates[1])
            });
          });
        }
      });
  };

  $scope.searchPartners = function () {
    $ionicLoading.show({
      content: 'Buscando parceiros...',
      showBackdrop: false
    });
    geolocation.geoCoder({address: $scope.search_form.location.address })
      .then(function (data) {
        $scope.currentPosition = new google.maps.LatLng(data.latlng[0], data.latlng[1]);
        $scope.getPartners()
          .finally(function () {
            $ionicLoading.hide();
          });
      });
  };
  
  $scope.updatePosition();
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
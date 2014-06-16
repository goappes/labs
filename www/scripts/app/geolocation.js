angular.module('app.geolocation', [])

.factory('geolocation', function ($q) {
  return {
    watchId: null,
    queue: { position: [], error: [] },
    on: function (name, callback) {
      this.queue[name].push(callback);

      return this;
    },
    trigger: function (name, args) {
      var self = this;

      args = args || [];
      self.queue[name].forEach(function (fn) {
        fn.apply(self, args);
      });

      return self;
    },
    getCurrentPosition: function () {
      var deferred = $q.defer();

      navigator.geolocation.getCurrentPosition(function (geopos) {
        deferred.resolve(geopos);
      },
      function (err) {
        deferred.reject(geopos);
      });

      return deferred.promise;
    },
    geoCoder: function (params) {
      var deferred = $q.defer();
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode(params, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          deferred.resolve({
            address: results[0].formatted_address,
            latlng: [results[0].geometry.location.lat(), results[0].geometry.location.lng()]
          });
        } else {
          deferred.reject('No results');
        }
      });

      return deferred.promise;
    },
    watchPosition: function () {
      var self = this;

      self.watchId = navigator.geolocation.watchPosition(function () {
        self.trigger.call(self, 'position', arguments);
      },
      function () {
        self.trigger.call(self, 'error', arguments);
      });

      return self;
    },
    clearWatch: function () {
      this.watchId && navigator.geolocation.clearWatch(this.watchId);

      return this;
    }
  };
});
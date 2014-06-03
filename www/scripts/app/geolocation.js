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
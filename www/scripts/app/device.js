angular.module('app.device', [])

.factory('device', function ($rootScope) {
  var device = {
    queue: { online: [], offline: [], error: [] },
    online: false,
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
    }
  };

  document.addEventListener('online', function () {
    console.log('online');
    $rootScope.$apply(function () {
      device.online = true;
      device.trigger.call(device, 'online');
    });
  }, false);

  document.addEventListener('offline', function () {
    console.log('offline');
    $rootScope.$apply(function () {
      device.online = false;
      device.trigger.call(device, 'offline');
    });
  }, false);

  return device;
})
angular.module('app.conf', [])

.provider('conf', function () {
  var confService = {
    conf: {
      baseUrl: 'http://dumba.com.br'
    },
    get: function (key) {
      return this.conf[key];
    },
    getAll: function () {
      return this.conf;
    },
    set: function (key, value) {
      return this.conf[key] = value;
    }
  };

  this.$get = function () {
    return confService;
  };

  return confService;
})
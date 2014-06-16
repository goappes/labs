angular.module('app.conf', [])

.provider('conf', function () {
  this.conf = {
    baseUrl: 'https://dumba.com.br'
  };

  this.$get = function () {
    var conf = this.conf;
    return {
      get: function (key) {
        return conf[key];
      },
      getApiUrl: function () {
        return conf.baseUrl +
          (conf.port ? ':' + conf.port : '') +
          (conf.version ? '/' + conf.version : '');
      },
      getAll: function () {
        return conf;
      },
      set: function (key, value) {
        return conf[key] = value;
      }
    };
  };

  this.set = function (key, value) {
    return this.conf[key] = value;
  };
});
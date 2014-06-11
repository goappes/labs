angular.module('app.storage', [])

.factory('storage', function () {
  var storage = window.localStorage;

  return {
    get: function (key) {
      return JSON.parse(storage.getItem(key));
    },

    set: function (key, data) {
      storage.setItem(key, JSON.stringify(data));
    },

    remove: function (key) {
      storage.removeItem(key);
    },

    clearAll: function () {
      storage.clear();
    }
  }

});

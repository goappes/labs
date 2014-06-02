angular.module('app.auth', [])

.factory('auth', function () {
  return {
    login: function () {
      facebookConnectPlugin.login(["email"], 
        function (response) { console.log('login success' + JSON.stringify(response)) },
        function (response) { console.log('login success', response) })
    },
    logout: function () {
      facebookConnectPlugin.logout( 
        function (response) { console.log('logout success', response) },
        function (response) { console.log('logout success', response) });
    },
    getLoginStatus: function () {
      facebookConnectPlugin.getLoginStatus( 
        function (response) { console.log('getLoginStatus success' + JSON.stringify(response)) },
        function (response) { console.log('getLoginStatus error' + JSON.stringify(response)) });
    },
    getAccessToken: function () { 
      facebookConnectPlugin.getAccessToken( 
        function (response) { alert(JSON.stringify(response)) },
        function (response) { alert(JSON.stringify(response)) });
    }
  };
})

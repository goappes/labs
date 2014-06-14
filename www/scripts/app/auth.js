angular.module('app.auth', [])

.factory('auth', function ($rootScope, $http, $q, $state, conf, storage) {
  return {
    user: null,
    reset: function () {
      this.user = null;
      storage.remove('authenticated');
      storage.remove('token.access_token');
      storage.remove('token.refresh_token');
      storage.remove('token.expires_at');
    },
    isLoggedIn: function () {
      return !!storage.get('authenticated');
    },
    login: function (login, password) {
      var self = this;
      // var req = $http.post('https://dev.dumba.com.br/api/v1/token', {
      var req = $http.post('http://192.168.0.6:3000/api/v1/token', {
        'grant_type': 'password',
        'client_id': 'dumba.labs',
        'client_secret': 'dumb4.l4b$.m0b1l3.s3cr3t',
        'username': login,
        'password': password
      });
      
      req.then(function (res) {
        var data = res.data;
        storage.set('authenticated', true);

        self.setAccessToken(data.access_token);
        self.setRefreshToken(data.refresh_token);
        self.setTokenExpirationDate(data.expires_in);

        self.userInfo();
        self.redirectToAttemptedUrl();
      }, function (err) {
        $rootScope.$broadcast('auth.error', err);
        self.reset();
      });
      
      return req;
    },
    refreshToken: function () {
      var self = this;
      var refreshToken = self.getRefreshToken();

      if (!refreshToken) return $q.reject('refresh token not exists');

      // var req = $http.post('https://dev.dumba.com.br/api/v1/token', {
      var req = $http.post('http://192.168.0.6:3000/api/v1/token', {
        'grant_type': 'refresh_token',
        'client_id': 'dumba.labs',
        'client_secret': 'dumb4.l4b$.m0b1l3.s3cr3t',
        'refresh_token': refreshToken
      });

      req.then(function (res) {
        var data = res.data;
        storage.set('authenticated', true);

        self.setAccessToken(data.access_token);
        self.setRefreshToken(data.refresh_token);
        self.setTokenExpirationDate(data.expires_in);

        self.userInfo();
        self.redirectToAttemptedUrl();
      }, function (err) {
        $rootScope.$broadcast('auth.error', err);
        self.reset();
      });
      
      return req;
    },
    logout: function () {
      this.reset();
    },
    userInfo: function () {
      var self = this;
      var defered = $q.defer();

      if (!self.user) {
        // $http.get('https://dev.dumba.com.br/api/v1/me')
        $http.get('http://192.168.0.6:3000/api/v1/me')
          .then(function (res) {
            var user = res.data;
            self.user = user;
            $rootScope.$broadcast('auth.user_info', user);
            defered.resolve(user);
          }, function (err) {
            self.reset();
            $rootScope.$broadcast('auth.error', err);
            defered.reject(err);
          });
      } else {
        defered.resolve(self.user);
      }

      return defered.promise;
    },
    setAccessToken: function (token) {
      storage.set('token.access_token', token);
    },
    setTokenExpirationDate: function (expires_in) {
      var expires_at = new Date();
      
      if (this.getAccessToken()) {
        expires_at = expires_at.setSeconds(expires_at.getSeconds() + parseInt(expires_in) - 60);
      }

      storage.set('token.expires_at', expires_at);
      
      return expires_at;
    },
    getTokenExpirationDate: function (expires_in) {
      return storage.get('token.expires_at');
    },
    setRefreshToken: function (refresh_token) {
      storage.set('token.refresh_token', refresh_token);
    },
    getAccessToken: function () {
      return storage.get('token.access_token');
    },
    getRefreshToken: function () {
      return storage.get('token.refresh_token');
    },
    isTokenExpired: function () {
      var expires_at = this.getTokenExpirationDate();
      return expires_at && new Date(expires_at) < new Date();
    },
    saveAttemptUrl: function () {
      if (!$state.includes('root.connect')) {
        console.log('Nao está logado, tentando ir para:', $state.current.name);
        this.redirectToUrlAfterLogin = $state.current.name;
      } else {
        this.redirectToUrlAfterLogin = 'root.dashboard';
      }
    },
    redirectToAttemptedUrl: function () {
      console.log('Agora está logado, pode ir para para:', this.redirectToUrlAfterLogin);
      if (this.redirectToUrlAfterLogin) {
        $state.transitionTo(this.redirectToUrlAfterLogin);
      }
    }
  };
})

.factory('auth_ExpiredInterceptor', function ($rootScope, $q, $injector) {
  return {
    request: function (config) {
      var auth = $injector.get('auth');
      var token = auth.getAccessToken();

      if (auth.isTokenExpired()) {
        console.log('EXPIROU', config);
        $rootScope.$broadcast('auth.expired', token);
      }

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config || $q.when(config);
    }
  };
})

.factory('auth_UnauthorizedInterceptor', function ($rootScope, $q, $injector) {
  return {
    responseError: function (config) {
      var auth = $injector.get('auth');
      var $state = $injector.get('$state');

      if (config.status === 401) {
        auth.reset();
        auth.saveAttemptUrl();
        $rootScope.$broadcast('auth.unauthorized', config);
        $state.transitionTo('login');
      }

      return $q.reject(config);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('auth_ExpiredInterceptor');
  $httpProvider.interceptors.push('auth_UnauthorizedInterceptor');
})

// .run(function ($rootScope, auth) {
//   $rootScope.$on('auth.expired', function () {
//     auth.refreshToken().then(function () {
//       console.log('RENOVOU', arguments)
//     }, function () {
//       console.log('NAO RENOVOU', arguments)
//     });
//   });
// })


// https://github.com/andreareginato/oauth-ng
// http://aleksandrov.ws/2013/09/12/restful-api-with-nodejs-plus-mongodb/
// curl --header "Accept: application/json" --header "Content-Type: application/json" -X POST -d '{"grant_type":"password","client_id":"dumba.labs","client_secret":"dumb4.l4b$.m0b1l3.s3cr3t","username":"joaopintoneto","password":"dumba123"}' http://localhost:3000/api/v1/token
// curl --header "Accept: application/json" --header "Content-Type: application/json" -X POST -d '{"grant_type":"refresh_token","client_id":"dumba.labs","client_secret":"dumb4.l4b$.m0b1l3.s3cr3t","refresh_token":"oY+BAVoSjflvKp2KVG+TqIEwKLXz9L9xsrJ8t5Y5PFk="}' http://localhost:3000/api/v1/token

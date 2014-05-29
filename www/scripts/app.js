angular.module('app.root', [
  'app.app-ctrl'
]);

angular.module('app.dashboard', [
  'app.dashboard.dashboard-ctrl'
]);

angular.module('app', [
  'ui.router'
  'app.root',
  'app.dashboard'
]);

document.addEventListener('deviceready', function () {
  angular.bootstrap(document, ['app']);
}, false);

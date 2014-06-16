angular.module('app.open-url', [])

.directive('openUrl', function () {
  return function (scope, element, attrs) {
    var target = attrs.target || '_blank';
    element.bind('click', function () {
      window.open(attrs.openUrl, target, 'location=yes');
    });
  };
})
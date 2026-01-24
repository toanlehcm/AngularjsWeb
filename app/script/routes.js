angular.module("AngularJSWeb").config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/pages/home.html",
      })
      .when("/home", {
        templateUrl: "app/pages/home.html",
      })
      .when("/phones", {
        template: "<phone-list-component></phone-list-component>",
      })
      .when("/phones/:phoneId", {
        template: "<phone-detail></phone-detail>",
      })
      .when("/tutorial", {
        templateUrl: "app/pages/tutorial-content.html",
      })
      .otherwise("/home");
  },
]);

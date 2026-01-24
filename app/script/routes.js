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
      .when("/basic-info", {
        templateUrl: "app/pages/basic-info.html",
      })
      .when("/trial-info", {
        templateUrl: "app/pages/trial-info.html",
      })
      .when("/subscription", {
        templateUrl: "app/pages/subscription.html",
      })
      .when("/merchant", {
        templateUrl: "app/pages/merchant.html",
      })
      .when("/patients", {
        templateUrl: "app/pages/patients.html",
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

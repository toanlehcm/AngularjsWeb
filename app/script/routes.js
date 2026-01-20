// Init AngularJS module
angular.module("AngularJSWeb", ["ngRoute", "ngResource", "core"]).config([
    "$routeProvider",
    "$locationProvider",
    function ($routeProvider, $locationProvider) {
        $routeProvider
        .when("/phones", {
            // templateUrl: "app/views/phone-list.html",
            template: '<phone-list-component></phone-list-component>',
        })
        .when("/phones/:phoneId", {
            template: '<phone-detail></phone-detail>',
        })
        .when("/tutorial", {
            templateUrl: "app/pages/tutorial-content.html",
        })
        .otherwise("/phones")
    }
]);

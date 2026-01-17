angular.module("AngularJSWeb").controller("PhoneListController", function PhoneListController($scope) {
  $scope.phones = [
    {
      name: "Nexus S-step 2 controller",
      snippet: "Fast just got faster with Nexus S.",
    },
    {
      name: "Motorola XOOM™ with Wi-Fi-step 2 controller",
      snippet: "The Next, Next Generation tablet.",
    },
    {
      name: "MOTOROLA XOOM-step 2™ controller",
      snippet: "The Next, Next Generation tablet.",
    },
  ];
});

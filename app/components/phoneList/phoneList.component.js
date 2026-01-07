angular.module("AngularJSWeb").component("phoneList", {
  // template: "<ul>" + '  <li ng-repeat="phone in $ctrl.phones">' + "    <span>{{phone.name}}</span>" + "    <p>{{phone.snippet}}</p>" + "  </li>" + "</ul>",
  templateUrl: "app/components/phoneList/phoneList.template.html",
  controller: function PhoneListController() {
    this.phones = [
      {
        name: "Nexus S",
        snippet: "Fast just got faster with Nexus S.",
      },
      {
        name: "Motorola XOOM™ with Wi-Fi",
        snippet: "The Next, Next Generation tablet.",
      },
      {
        name: "MOTOROLA XOOM™",
        snippet: "The Next, Next Generation tablet.",
      },
    ];
  },
});

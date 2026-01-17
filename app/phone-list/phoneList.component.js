angular.module("AngularJSWeb").component("phoneListComponent", {
  // template: "<ul>" + '  <li ng-repeat="phone in $ctrl.phones">' + "    <span>{{phone.name}}</span>" + "    <p>{{phone.snippet}}</p>" + "  </li>" + "</ul>",
  templateUrl: "app/phone-list/phoneList.template.html",
  controller: function PhoneListComponentController() {
    this.phones = [
      {
        name: "Iphone 5",
        snippet: "Fast just got faster with Iphone 5.",
        age: 1,
      },
      {
        name: "Iphone 6 with Wi-Fi",
        snippet: "The Next, Next Generation tablet.",
        age: 2,
      },
      {
        name: "Iphone 7",
        snippet: "The Next, Next Generation tablet.",
        age: 3,
      },
    ];
    this.orderProp = "age";
    // this.querySearch = ""; // no need because querySearch can undefined when init.
  },
});

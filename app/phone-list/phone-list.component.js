angular.module("AngularJSWeb").component("phoneListComponent", {
  // template: "<ul>" + '  <li ng-repeat="phone in $ctrl.phones">' + "    <span>{{phone.name}}</span>" + "    <p>{{phone.snippet}}</p>" + "  </li>" + "</ul>",
  templateUrl: "app/phone-list/phone-list.template.html",

  /*------- Lesson 5 and 6 -------*/
  // controller: function PhoneListComponentController($http) {
  // this.phones = [
  //   {
  //     name: "Iphone 5",
  //     snippet: "Fast just got faster with Iphone 5.",
  //     age: 1,
  //   },
  //   {
  //     name: "Iphone 6 with Wi-Fi",
  //     snippet: "The Next, Next Generation tablet.",
  //     age: 2,
  //   },
  //   {
  //     name: "Iphone 7",
  //     snippet: "The Next, Next Generation tablet.",
  //     age: 3,
  //   },
  // ];
  // this.orderProp = "age";
  // this.querySearch = ""; // no need because querySearch can undefined when init.
  // },

  /*------- Lesson 7 -------*/
  // controller: function PhoneListComponentController($http) {
  //   var self = this; // Lưu lại this của controller để sử dụng trong hàm callback.
  //   self.orderProp = "age";

  //   $http.get("app/phones/phones.json").then(function (response) {
  //     self.phones = response.data;
  //   });
  // },
  
  /*------- Lesson 9 -------*/
  // controller: [
  //   "$http",
  //   function PhoneListController($http) {
  //     var self = this;
  //     self.orderProp = "age";

  //     $http.get("app/phones/phones.json").then(function (response) {
  //       self.phones = response.data;
  //     });
  //   },
  // ],

  /*------- Lesson 11: using Phone Service -------*/
  controller: ["PhoneService", function PhoneListController(PhoneService) {
    var self = this;
    self.orderProp = "age";
    self.phones = PhoneService.query();
  }]
});

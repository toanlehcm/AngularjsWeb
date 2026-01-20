angular.module("AngularJSWeb").component("phoneDetail", {
    templateUrl: "app/phone-detail/phone-detail.template.html",
    // controller: function PhoneDetailController($routeParams, $http) {
    //     console.log('$routeParams',$routeParams);
    //     var self = this; // Lưu lại this của controller để sử dụng trong hàm callback.
    //     self.orderProp = "age";

    //     $http.get("app/phones/phones.json").then(function (response) {
    //     self.phones = response.data;
    //     });
    // },
    
    // -------- Using http ----------
    // controller: ["$routeParams", "$http",
    //     function PhoneDetailController($routeParams, $http) {
    //         var self = this;
    //         self.phoneId = $routeParams.phoneId;

    //         $http.get("app/phones/" + $routeParams.phoneId + '.json').then(function (response) {
    //             self.phone = response.data;

    //             // Set default image.
    //             self.setImage(self.phone.images[0]);

    //             // Find phone by id.
    //             // self.phone = response.data.find(function (p) {
    //             //     return p.id === self.phoneId;
    //             // });
    //         });

    //         self.setImage = function setImage(imageUrl) {
    //             self.mainImageUrl = imageUrl;
    //         };
    //     }
    // ]
    
    // -------- Using Phone Service ----------
    controller: ["$routeParams", "PhoneService",
        function PhoneDetailController($routeParams, PhoneService) {
            var self = this;
            self.phoneId = $routeParams.phoneId;

            // Using Phone service replace to $http.
            self.phone = PhoneService.get({ phoneId: $routeParams.phoneId }, function (phone) {
                self.setImage(phone.images[0]);
            });

            self.setImage = function setImage(imageUrl) {
                self.mainImageUrl = imageUrl;
            };
        },
    ],
});
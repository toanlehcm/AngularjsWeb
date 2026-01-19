angular.module("AngularJSWeb").component("phoneDetail", {
    templateUrl: "app/phone-detail/phone-detail.template.html",
    controller: [
        "$routeParams",
        "$http",
        function PhoneDetailController($routeParams, $http) {
            // console.log('$routeParams',JSON.stringify($routeParams));
            
            var self = this;
            self.phoneId = $routeParams.phoneId;

            $http.get("app/phones/phones.json").then(function (response) {
                var phones = response.data;
                
                // Find phone by id.
                self.phone = phones.find(function (p) {
                    return p.id === self.phoneId;
                });
            });
        }
    ]
    // ------------------
    // controller: function PhoneDetailController($routeParams, $http) {
    //     console.log('$routeParams',$routeParams);
    //     var self = this; // Lưu lại this của controller để sử dụng trong hàm callback.
    //     self.orderProp = "age";

    //     $http.get("app/phones/phones.json").then(function (response) {
    //     self.phones = response.data;
    //     });
    // },
});
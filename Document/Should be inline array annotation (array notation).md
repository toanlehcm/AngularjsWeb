Đúng, **PhoneListController** cũng nên viết theo kiểu **inline array annotation** (array notation) để **an toàn khi minify** và theo chuẩn production AngularJS.

## Cách viết chuẩn:

```javascript
angular.module("AngularJSWeb")
  .controller("PhoneListController", [
    "$scope",
    function PhoneListController($scope) {
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
    }
  ]);
```

**Lý do:**  
- Đảm bảo dependency injection không bị lỗi khi minify code.
- Đây là best practice cho mọi controller, service, directive, component trong AngularJS.

**Tóm lại:**  
Luôn dùng array annotation cho mọi khai báo controller, service, directive, component trong AngularJS!
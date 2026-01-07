# AngularJS Tutorial Step 02 - Hướng dẫn chi tiết

## Nội dung chính của Step 02

Step 02 giới thiệu **AngularJS Templates, Controllers và Scope** để tạo danh sách động thay vì danh sách tĩnh như Step 01.

## Hướng dẫn code từng bước

### Bước 1: Tạo Controller cho Phone List

```javascript
angular.module("AngularJSWeb").controller("PhoneListController", function PhoneListController($scope) {
  $scope.phones = [
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
});
```

### Bước 2: Cập nhật HTML với ng-controller và ng-repeat

```html
<!DOCTYPE html>
<html ng-app="AngularJSWeb">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AngularJS Learning</title>
    <link rel="stylesheet" href="app/css/app.css" />
  </head>
  <body>
    <div ng-controller="MainController">
      <h1>{{ title }}</h1>

      <div>
        <label>Name:</label>
        <input type="text" ng-model="name" placeholder="Enter a name here" />
        <h2>Hello {{name}}!</h2>
      </div>

      <hr />

      <p>Nothing here {{'yet' + '!'}}</p>

      <div>
        <h2>Danh sách Todo:</h2>
        <input type="text" ng-model="newTodo" placeholder="Thêm todo mới" />
        <button ng-click="addTodo()">Thêm</button>

        <ul>
          <li ng-repeat="todo in todos">
            {{ todo }}
            <button ng-click="removeTodo($index)">Xóa</button>
          </li>
        </ul>
      </div>
    </div>

    <hr />

    <h1>Phone Catalog - Step 02</h1>

    <!-- Danh sách điện thoại ĐỘNG với Controller -->
    <div ng-controller="PhoneListController">
      <ul>
        <li ng-repeat="phone in phones">
          <span>{{phone.name}}</span>
          <p>{{phone.snippet}}</p>
        </li>
      </ul>
    </div>

    <!-- AngularJS Library -->
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-route/angular-route.min.js"></script>

    <!-- App Files -->
    <script src="app/script/app.js"></script>
    <script src="app/controllers/main.controller.js"></script>
    <script src="app/controllers/phone-list.controller.js"></script>
  </body>
</html>
```

### Bước 3: Test trong browser

Mở index.html trong trình duyệt và kiểm tra danh sách điện thoại hiển thị động từ Controller.

---

## Tóm gọn 20% cốt lõi

**3 khái niệm quan trọng:**

1. **Controller**: Chứa logic và dữ liệu cho view

   ```javascript
   .controller('PhoneListController', function($scope) {
     $scope.phones = [...]; // Dữ liệu
   });
   ```

2. **$scope**: Cầu nối giữa Controller và View, chứa model data

3. **ng-repeat**: Directive lặp qua mảng để tạo HTML động
   ```html
   <li ng-repeat="phone in phones">{{phone.name}}</li>
   ```

**Ý nghĩa**: Thay vì hard-code HTML tĩnh, bạn dùng Controller + $scope + ng-repeat để render dữ liệu động. Khi thay đổi `$scope.phones`, giao diện tự động cập nhật.

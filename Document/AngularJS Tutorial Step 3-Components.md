# AngularJS Tutorial Step 03 - Hướng dẫn chi tiết

## Nội dung chính của Step 03

Step 03 giới thiệu **Component-based Architecture** - thay thế Controller bằng Component (cách tiếp cận hiện đại hơn trong AngularJS 1.5+).

## Hướng dẫn code từng bước

### Bước 1: Tạo Phone List Component

```javascript
angular.module("AngularJSWeb").component("phoneList", {
  template: "<ul>" + '  <li ng-repeat="phone in $ctrl.phones">' + "    <span>{{phone.name}}</span>" + "    <p>{{phone.snippet}}</p>" + "  </li>" + "</ul>",
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
```

### Bước 2: Hoặc tách template ra file riêng

```html
oanle/Documents/DEV/FE/AngularJS/AngularjsWeb/app/components/phone-list/phone-list.template.html -->
<ul>
  <li ng-repeat="phone in $ctrl.phones">
    <span>{{phone.name}}</span>
    <p>{{phone.snippet}}</p>
  </li>
</ul>
```

```javascript
angular.module("AngularJSWeb").component("phoneList", {
  templateUrl: "app/components/phone-list/phone-list.template.html",
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
```

### Bước 3: Cập nhật HTML - Dùng component thay vì ng-controller

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

    <h1>Phone Catalog - Step 03 (Component)</h1>

    <!-- Sử dụng component thay vì controller -->
    <phone-list></phone-list>

    <!-- AngularJS Library -->
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-route/angular-route.min.js"></script>

    <!-- App Files -->
    <script src="app/script/app.js"></script>
    <script src="app/controllers/main.controller.js"></script>
    <script src="app/components/phone-list/phone-list.component.js"></script>
  </body>
</html>
```

### Bước 4: Tạo cấu trúc thư mục

```
app/
├── components/
│   └── phone-list/
│       ├── phone-list.component.js
│       └── phone-list.template.html
```

---

## Tóm gọn 20% cốt lõi

**3 điểm khác biệt Component vs Controller:**

1. **Component = Template + Controller + Isolate Scope**

   ```javascript
   .component('phoneList', {
     templateUrl: 'path/to/template.html',
     controller: function() { this.data = [...]; }
   });
   ```

2. **Dùng `$ctrl` thay vì `$scope`**

   - Controller: `$scope.phones`
   - Component: `this.phones` → View dùng `$ctrl.phones`

3. **HTML đơn giản hơn**
   ```html
   <!-- Trước: -->
   <div ng-controller="PhoneListController">
     <!-- Sau:  -->
     <phone-list></phone-list>
   </div>
   ```

**Ý nghĩa**: Component giúp code dễ tái sử dụng, dễ test và chuẩn bị cho việc migrate sang Angular 2+. Đây là best practice từ AngularJS 1.5 trở đi.

Similar code found with 2 license types

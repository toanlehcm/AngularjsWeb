# AngularJS Tutorial Step 9 - Routing & Multiple Views

## Nội dung chính

Step 9 hướng dẫn cách tạo **Single Page Application (SPA)** với nhiều views sử dụng **ngRoute** module.

## Hướng dẫn chi tiết từng bước

### Bước 1: Cài đặt angular-route

```bash
npm install angular-route --save
```

### Bước 2: Thêm ngRoute vào HTML

````html
<!DOCTYPE html>
<html ng-app="phonecatApp">
  <head>
    <meta charset="utf-8" />
    <title>Phone Catalog</title>
    <link rel="stylesheet" href="css/app.css" />
    <link rel="stylesheet" href="css/bootstrap.min.css" />
  </head>
  <body>
    <!-- View container -->
    <div ng-view></div>

    <!-- AngularJS Libraries -->
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-route/angular-route.min.js"></script>

    <!-- App Files -->
    <script src="app.js"></script>
    <script src="phone-list/phone-list.component.js"></script>
    <script src="phone-detail/phone-detail.component.js"></script>
  </body>
</html>
````

### Bước 3: Cấu hình routing trong app.js

````javascript
angular.module("phonecatApp", ["ngRoute"]).config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/phones", {
        template: "<phone-list></phone-list>",
      })
      .when("/phones/:phoneId", {
        template: "<phone-detail></phone-detail>",
      })
      .otherwise("/phones");
  },
]);
````

### Bước 4: Tạo phone-list component

````javascript
angular.module("phonecatApp").component("phoneList", {
  templateUrl: "phone-list/phone-list.template.html",
  controller: [
    "$http",
    function PhoneListController($http) {
      var self = this;
      self.orderProp = "age";

      $http.get("phones/phones.json").then(function (response) {
        self.phones = response.data;
      });
    },
  ],
});
````

### Bước 5: Tạo phone-list template

````html
<div class="container-fluid">
  <div class="row">
    <div class="col-md-2">
      <!--Sidebar content-->
      <p>
        Search:
        <input ng-model="$ctrl.query" />
      </p>
      <p>
        Sort by:
        <select ng-model="$ctrl.orderProp">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    </div>

    <div class="col-md-10">
      <!--Body content-->
      <ul class="phones">
        <li
          ng-repeat="phone in $ctrl.phones | filter:$ctrl.query | orderBy:$ctrl.orderProp"
          class="thumbnail"
        >
          <a href="#!/phones/{{phone.id}}" class="thumb">
            <img ng-src="{{phone.imageUrl}}" alt="{{phone.name}}" />
          </a>
          <a href="#!/phones/{{phone.id}}">{{phone.name}}</a>
          <p>{{phone.snippet}}</p>
        </li>
      </ul>
    </div>
  </div>
</div>
````

### Bước 6: Tạo phone-detail component

````javascript
// filepath: app/phone-detail/phone-detail.component.js
angular.module("phonecatApp").component("phoneDetail", {
  templateUrl: "phone-detail/phone-detail.template.html",
  controller: [
    "$routeParams",
    "$http",
    function PhoneDetailController($routeParams, $http) {
      var self = this;
      self.phoneId = $routeParams.phoneId;

      $http.get("phones/" + $routeParams.phoneId + ".json").then(function (response) {
        self.phone = response.data;
      });
    },
  ],
});
````

### Bước 7: Tạo phone-detail template

````html
<div class="phone-images">
  <img ng-src="{{$ctrl.phone.images[0]}}" class="phone" />
</div>

<h1>{{$ctrl.phone.name}}</h1>

<p>{{$ctrl.phone.description}}</p>

<ul class="phone-thumbs">
  <li ng-repeat="img in $ctrl.phone.images">
    <img ng-src="{{img}}" />
  </li>
</ul>

<ul class="specs">
  <li>
    <span>Availability and Networks</span>
    <dl>
      <dt>Availability</dt>
      <dd ng-repeat="availability in $ctrl.phone.availability">{{availability}}</dd>
    </dl>
  </li>
  <li>
    <span>Battery</span>
    <dl>
      <dt>Type</dt>
      <dd>{{$ctrl.phone.battery.type}}</dd>
      <dt>Talk Time</dt>
      <dd>{{$ctrl.phone.battery.talkTime}}</dd>
      <dt>Standby time (max)</dt>
      <dd>{{$ctrl.phone.battery.standbyTime}}</dd>
    </dl>
  </li>
  <li>
    <span>Storage and Memory</span>
    <dl>
      <dt>RAM</dt>
      <dd>{{$ctrl.phone.storage.ram}}</dd>
      <dt>Internal Storage</dt>
      <dd>{{$ctrl.phone.storage.flash}}</dd>
    </dl>
  </li>
  <li>
    <span>Connectivity</span>
    <dl>
      <dt>Network Support</dt>
      <dd>{{$ctrl.phone.connectivity.cell}}</dd>
      <dt>WiFi</dt>
      <dd>{{$ctrl.phone.connectivity.wifi}}</dd>
      <dt>Bluetooth</dt>
      <dd>{{$ctrl.phone.connectivity.bluetooth}}</dd>
      <dt>Infrared</dt>
      <dd>{{$ctrl.phone.connectivity.infrared}}</dd>
      <dt>GPS</dt>
      <dd>{{$ctrl.phone.connectivity.gps}}</dd>
    </dl>
  </li>
</ul>
````

### Bước 8: Tạo file JSON data

````json
[
  {
    "age": 0,
    "id": "motorola-xoom-with-wi-fi",
    "imageUrl": "img/phones/motorola-xoom-with-wi-fi.0.jpg",
    "name": "Motorola XOOM™ with Wi-Fi",
    "snippet": "The Next, Next Generation tablet."
  },
  {
    "age": 1,
    "id": "motorola-xoom",
    "imageUrl": "img/phones/motorola-xoom.0.jpg",
    "name": "MOTOROLA XOOM™",
    "snippet": "The Next, Next Generation tablet."
  }
]
````

### Bước 9: Chạy ứng dụng

```bash
npm start
```

Truy cập:
- `http://127.0.0.1:3000/#!/phones` - Danh sách điện thoại
- `http://127.0.0.1:3000/#!/phones/nexus-s` - Chi tiết điện thoại

---

## 20% Cốt lõi (Tóm tắt)

### 🎯 4 Khái niệm Quan Trọng:

#### 1. **ngRoute Module**
```javascript
angular.module("phonecatApp", ["ngRoute"])
```
- Module để xử lý routing
- Phải khai báo dependency

#### 2. **$routeProvider Config**
```javascript
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/phones', { template: '<phone-list></phone-list>' })
    .when('/phones/:phoneId', { template: '<phone-detail></phone-detail>' })
    .otherwise('/phones');
}])
```
- `.when()`: Định nghĩa route
- `:phoneId`: Route parameter
- `.otherwise()`: Default route

#### 3. **ng-view Directive**
```html
<div ng-view></div>
```
- Container để hiển thị view động
- AngularJS tự động inject template vào đây

#### 4. **$routeParams Service**
```javascript
controller: ['$routeParams', function($routeParams) {
  this.phoneId = $routeParams.phoneId;
}]
```
- Lấy parameter từ URL
- VD: `/phones/nexus-s` → `phoneId = "nexus-s"`

### 📝 Code tối giản demo:

````javascript
// app.js
angular.module('myApp', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/list', { template: '<h1>List Page</h1>' })
      .when('/detail/:id', { template: '<h1>Detail {{$ctrl.id}}</h1>' })
      .otherwise('/list');
  }]);
````

````html
<!-- index.html -->
<html ng-app="myApp">
  <body>
    <a href="#!/list">List</a>
    <a href="#!/detail/123">Detail</a>
    <div ng-view></div>
    
    <script src="angular.min.js"></script>
    <script src="angular-route.min.js"></script>
    <script src="app.js"></script>
  </body>
</html>
````

### 💡 Giải thích cho người khác:

> "Step 9 dạy cách tạo SPA với nhiều trang:
> 1. Thêm `ngRoute` module
> 2. Dùng `$routeProvider` để định nghĩa URL và template
> 3. Đặt `<div ng-view></div>` để hiển thị nội dung
> 4. Dùng `$routeParams` để lấy parameter từ URL
> 
> Khi click link, AngularJS tự động đổi view mà không reload trang!"- Lấy parameter từ URL
- VD: `/phones/nexus-s` → `phoneId = "nexus-s"`

### 📝 Code tối giản demo:

````javascript
// app.js
angular.module('myApp', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/list', { template: '<h1>List Page</h1>' })
      .when('/detail/:id', { template: '<h1>Detail {{$ctrl.id}}</h1>' })
      .otherwise('/list');
  }]);
````

````html
<!-- index.html -->
<html ng-app="myApp">
  <body>
    <a href="#!/list">List</a>
    <a href="#!/detail/123">Detail</a>
    <div ng-view></div>
    
    <script src="angular.min.js"></script>
    <script src="angular-route.min.js"></script>
    <script src="app.js"></script>
  </body>
</html>
````

### 💡 Giải thích cho người khác:

> "Step 9 dạy cách tạo SPA với nhiều trang:
> 1. Thêm `ngRoute` module
> 2. Dùng `$routeProvider` để định nghĩa URL và template
> 3. Đặt `<div ng-view></div>` để hiển thị nội dung
> 4. Dùng `$routeParams` để lấy parameter từ URL
> 
> Khi click link, AngularJS tự động đổi view mà không reload trang!"

Similar code found with 2 license types
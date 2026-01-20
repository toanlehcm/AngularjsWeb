# AngularJS Tutorial Step 11 - REST and Custom Services

## Nội dung chính Step 11

Step 11 dạy cách:
1. Tạo **custom service** để tái sử dụng code
2. Sử dụng **ngResource** module để gọi RESTful API
3. Refactor code từ `$http` sang `$resource`

---

## Hướng dẫn chi tiết từng bước

### Bước 1: Cài đặt angular-resource

```bash
npm install angular-resource --save
```

### Bước 2: Thêm ngResource vào index.html

````html
<!DOCTYPE html>
<html ng-app="AngularJSWeb">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AngularJS Learning</title>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="app/styles/app.css" />
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#!/phones">📱 Phone Catalog</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#!/phones">Phone List</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#!/tutorial">Tutorial</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <div ng-view></div>
    </div>

    <!-- AngularJS Library -->
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-route/angular-route.min.js"></script>
    <script src="node_modules/angular-resource/angular-resource.min.js"></script>

    <!-- Bootstrap Bundle -->
    <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- App Files -->
    <script src="app/script/routes.js"></script>
    
    <!-- Services -->
    <script src="app/services/phone.service.js"></script>
    
    <!-- Components -->
    <script src="app/phone-list/phone-list.component.js"></script>
    <script src="app/phone-detail/phone-detail.component.js"></script>
    
    <!-- Filters -->
    <script src="app/filters/checkmark.filter.js"></script>
  </body>
</html>
````

### Bước 3: Thêm ngResource vào app module

````javascript
angular.module("AngularJSWeb", ["ngRoute", "ngResource"]).config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/phones", {
        template: "<phone-list-component></phone-list-component>",
      })
      .when("/phones/:phoneId", {
        template: "<phone-detail></phone-detail>",
      })
      .otherwise("/phones");
  },
]);
````

### Bước 4: Tạo Phone Service

````javascript
angular.module("AngularJSWeb").factory("Phone", [
  "$resource",
  function ($resource) {
    return $resource(
      "app/phones/:phoneId.json",
      {},
      {
        query: {
          method: "GET",
          params: { phoneId: "phones" },
          isArray: true,
        },
      }
    );
  },
]);
````

### Bước 5: Refactor phone-list.component.js

**Trước (dùng $http):**

````javascript
angular.module("AngularJSWeb").component("phoneListComponent", {
  templateUrl: "app/phone-list/phone-list.template.html",
  controller: [
    "$http",
    function PhoneListController($http) {
      var self = this;
      self.orderProp = "age";

      $http.get("app/phones/phones.json").then(function (response) {
        self.phones = response.data;
      });
    },
  ],
});
````

**Sau (dùng Phone service):**

````javascript
angular.module("AngularJSWeb").component("phoneListComponent", {
  templateUrl: "app/phone-list/phone-list.template.html",
  controller: [
    "Phone",
    function PhoneListController(Phone) {
      var self = this;
      self.orderProp = "age";
      
      // Sử dụng Phone service thay vì $http
      self.phones = Phone.query();
    },
  ],
});
````

### Bước 6: Refactor phone-detail.component.js

**Trước (dùng $http):**

````javascript
angular.module("AngularJSWeb").component("phoneDetail", {
  templateUrl: "app/phone-detail/phone-detail.template.html",
  controller: [
    "$routeParams",
    "$http",
    function PhoneDetailController($routeParams, $http) {
      var self = this;
      self.phoneId = $routeParams.phoneId;

      $http.get("app/phones/" + $routeParams.phoneId + ".json").then(function (response) {
        self.phone = response.data;
        self.setImage(self.phone.images[0]);
      });

      self.setImage = function setImage(imageUrl) {
        self.mainImageUrl = imageUrl;
      };
    },
  ],
});
````

**Sau (dùng Phone service):**

````javascript
angular.module("AngularJSWeb").component("phoneDetail", {
  templateUrl: "app/phone-detail/phone-detail.template.html",
  controller: [
    "$routeParams",
    "Phone",
    function PhoneDetailController($routeParams, Phone) {
      var self = this;
      self.phoneId = $routeParams.phoneId;

      // Sử dụng Phone service thay vì $http
      self.phone = Phone.get({ phoneId: $routeParams.phoneId }, function (phone) {
        self.setImage(phone.images[0]);
      });

      self.setImage = function setImage(imageUrl) {
        self.mainImageUrl = imageUrl;
      };
    },
  ],
});
````

### Bước 7: Chạy ứng dụng

```bash
npm start
```

---

## 20% Cốt lõi (Tóm tắt)

### 🎯 3 Khái niệm Quan Trọng:

#### 1. **$resource Service**
```javascript
$resource(url, [paramDefaults], [actions])
```
- Abstraction layer trên `$http`
- Tự động parse JSON
- Cung cấp methods: `get()`, `query()`, `save()`, `delete()`

#### 2. **Custom Service (Factory)**
```javascript
angular.module("app").factory("Phone", ["$resource", function($resource) {
  return $resource("phones/:phoneId.json", {}, {
    query: {
      method: "GET",
      params: { phoneId: "phones" },
      isArray: true
    }
  });
}]);
```
- Tạo service tái sử dụng
- Inject vào components
- Centralize API calls

#### 3. **Dependency Injection**
```javascript
controller: ["Phone", function(Phone) {
  this.phones = Phone.query();
}]
```
- Inject service vào controller
- Code ngắn gọn hơn
- Dễ test hơn

### 💡 So sánh $http vs $resource:

| Feature | $http | $resource |
|---------|-------|-----------|
| **Code** | Dài hơn | Ngắn gọn |
| **Promise** | `.then()` | Callback hoặc `$promise` |
| **CRUD** | Phải viết từng method | Built-in `get/query/save/delete` |
| **Caching** | Tự implement | Built-in support |

### 📝 Code so sánh:

**$http:**
```javascript
$http.get("phones/phones.json").then(function(response) {
  self.phones = response.data;
});
```

**$resource:**
```javascript
self.phones = Phone.query();
```

### 💬 Giải thích cho người khác:

> "Step 11 dạy tạo service để tái sử dụng code:
> 1. Dùng `$resource` thay vì `$http` (ngắn gọn hơn)
> 2. Tạo `Phone` service để centralize API calls
> 3. Inject `Phone` vào components
> 4. Code ngắn hơn: `Phone.query()` thay vì `$http.get().then()`
> 
> Lợi ích: Code sạch hơn, dễ maintain, dễ test!"

---

## Cấu trúc thư mục sau Step 11

```
d:\Sources\AngularjsWeb\
└── app\
    ├── services\
    │   └── phone.service.js     ← MỚI
    ├── phone-list\
    │   ├── phone-list.component.js (refactored)
    │   └── phone-list.template.html
    ├── phone-detail\
    │   ├── phone-detail.component.js (refactored)
    │   └── phone-detail.template.html
    ├── filters\
    │   └── checkmark.filter.js
    ├── script\
    │   └── routes.js (updated)
    └── index.html (updated)
```

---

## Lưu ý quan trọng

### ⚠️ $resource.query() returns array immediately

```javascript
// KHÔNG cần .then()
self.phones = Phone.query();

// Data sẽ được populate khi request hoàn thành
// AngularJS tự động update view
```

### ⚠️ $resource.get() with callback

```javascript
self.phone = Phone.get({ phoneId: id }, function(phone) {
  // Callback chạy khi data đã load
  self.setImage(phone.images[0]);
});
```

### ⚠️ Nếu cần promise

```javascript
Phone.query().$promise.then(function(phones) {
  self.phones = phones;
});
```

---

## Testing với Phone service

````javascript
// Ví dụ unit test
describe("Phone service", function() {
  beforeEach(module("AngularJSWeb"));

  it("should fetch phones data", inject(function(Phone, $httpBackend) {
    $httpBackend.expectGET("app/phones/phones.json")
      .respond([{ name: "Phone 1" }, { name: "Phone 2" }]);

    var phones = Phone.query();
    expect(phones).toEqual([]);

    $httpBackend.flush();
    expect(phones.length).toBe(2);
    expect(phones[0].name).toBe("Phone 1");
  }));
});
````

---

## Tóm tắt

**Step 11 = Refactor to use Services:**

- ✅ Install `angular-resource`
- ✅ Create `Phone` service
- ✅ Refactor components to use service
- ✅ Simpler code, easier to maintain

**Benefits:**
- 🎯 Code reusability
- 🧪 Easier testing
- 🔧 Centralized API logic
- 📦 Less boilerplate code
# So sánh 2 cách khai báo Controller trong AngularJS

```
cách 1:
controller: [
"$routeParams",
"$http",
function PhoneDetailController($routeParams, $http) {
console.log('$routeParams',JSON.stringify($routeParams));
        var self = this;
        self.phoneId = $routeParams.phoneId;

        $http.get("phones" + $routeParams.phoneId + ".json").then(function (response) {
            self.phone = response.data;
        });
    }
]
cách 2:
controller: function PhoneDetailController($routeParams, $http) {
        console.log('$routeParams',$routeParams);
        var self = this; // Lưu lại this của controller để sử dụng trong hàm callback.
        self.orderProp = "age";

        $http.get("app/phones/phones.json").then(function (response) {
        self.phones = response.data;
        });
    },
```

## Phân tích

### ✅ **Cách 1: Array Annotation (Inline Array Annotation)**
```javascript
controller: [
    "$routeParams",
    "$http",
    function PhoneDetailController($routeParams, $http) {
        var self = this;
        self.phoneId = $routeParams.phoneId;
        
        $http.get("phones/" + $routeParams.phoneId + ".json").then(function (response) {
            self.phone = response.data;
        });
    }
]
```

### ❌ **Cách 2: Implicit Annotation**
```javascript
controller: function PhoneDetailController($routeParams, $http) {
    var self = this;
    self.orderProp = "age";
    
    $http.get("app/phones/phones.json").then(function (response) {
        self.phones = response.data;
    });
}
```

---

## Cách nào là chuẩn Production?

### ✅ **Cách 1 (Array Annotation) - CHUẨN PRODUCTION**

**Lý do:**

#### 1. **Minification-Safe (An toàn khi minify)**

Khi build production, code JS sẽ được minify:

**Cách 2 (Implicit) - SAI khi minify:**
```javascript
// Before minify
function PhoneDetailController($routeParams, $http) {...}

// After minify - TÊN THAM SỐ BỊ ĐỔI
function PhoneDetailController(a, b) {...}
// AngularJS không biết 'a' và 'b' là gì → LỖI!
```

**Cách 1 (Array) - ĐÚNG khi minify:**
```javascript
// Before minify
["$routeParams", "$http", function PhoneDetailController($routeParams, $http) {...}]

// After minify - VẪN HOẠT ĐỘNG
["$routeParams", "$http", function PhoneDetailController(a, b) {...}]
// AngularJS đọc string "$routeParams", "$http" → inject đúng!
```

#### 2. **Best Practice của AngularJS**

Theo [AngularJS Style Guide (John Papa)](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y091):

> **Rule of 1:** Define 1 component per file, with explicit dependency injection using array notation.

#### 3. **Tránh lỗi runtime**

```javascript
// Cách 2 - LỖI khi minify
angular.module('app').controller('MyCtrl', function($scope, $http) {
    // Production build → $scope, $http → a, b → CRASH!
});

// Cách 1 - AN TOÀN
angular.module('app').controller('MyCtrl', ['$scope', '$http', function($scope, $http) {
    // Production build → vẫn hoạt động ✅
}]);
```

---

## Khi nào dùng cách nào?

### ✅ **Cách 1 (Array Annotation) - Luôn luôn dùng trong:**

1. **Production code** (BẮT BUỘC)
2. **Shared libraries**
3. **Open source projects**
4. **Team projects**
5. **Code cần build/minify**

### ⚠️ **Cách 2 (Implicit) - CHỈ dùng khi:**

1. **Prototype/Demo nhanh** (không build)
2. **Learning/Tutorial** (code đơn giản)
3. **Development environment** (không minify)
4. **Code test nội bộ**

**Lưu ý:** Ngay cả khi dev, nên dùng Cách 1 để tránh quên khi deploy production!

---

## Code chuẩn Production

### ✅ **Đúng - phone-detail.component.js:**

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
      });
    },
  ],
});
````

### ✅ **Đúng - phone-list.component.js:**

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

### ✅ **Đúng - app.js:**

````javascript
angular.module("AngularJSWeb", ["ngRoute"]).config([
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

---

## Các cách khác (tham khảo)

### **Cách 3: $inject Property Annotation**

```javascript
var PhoneDetailController = function($routeParams, $http) {
    var self = this;
    self.phoneId = $routeParams.phoneId;
};

PhoneDetailController.$inject = ['$routeParams', '$http'];

angular.module("AngularJSWeb").component("phoneDetail", {
  templateUrl: "app/phone-detail/phone-detail.template.html",
  controller: PhoneDetailController
});
```

**Ưu điểm:**
- Minification-safe
- Dễ đọc với function riêng biệt

**Nhược điểm:**
- Nhiều dòng code hơn
- Phải maintain 2 nơi (function + $inject)

---

## Tóm tắt

| Tiêu chí | Cách 1 (Array) | Cách 2 (Implicit) |
|----------|----------------|-------------------|
| **Minification-Safe** | ✅ Có | ❌ Không |
| **Production Ready** | ✅ Có | ❌ Không |
| **Best Practice** | ✅ Có | ❌ Không |
| **Dùng khi nào** | Luôn luôn | Chỉ prototype |
| **Code ngắn gọn** | ⚠️ Dài hơn | ✅ Ngắn hơn |

### 💡 Kết luận:

**LUÔN LUÔN dùng Cách 1 (Array Annotation) trong production code!**

Cách 2 chỉ phù hợp cho tutorial/demo, nhưng khi làm dự án thực tế, **BẮT BUỘC** phải dùng Cách 1 để tránh lỗi khi minify code.**Ưu điểm:**
- Minification-safe
- Dễ đọc với function riêng biệt

**Nhược điểm:**
- Nhiều dòng code hơn
- Phải maintain 2 nơi (function + $inject)

---

## Tóm tắt

| Tiêu chí | Cách 1 (Array) | Cách 2 (Implicit) |
|----------|----------------|-------------------|
| **Minification-Safe** | ✅ Có | ❌ Không |
| **Production Ready** | ✅ Có | ❌ Không |
| **Best Practice** | ✅ Có | ❌ Không |
| **Dùng khi nào** | Luôn luôn | Chỉ prototype |
| **Code ngắn gọn** | ⚠️ Dài hơn | ✅ Ngắn hơn |

### 💡 Kết luận:

**LUÔN LUÔN dùng Cách 1 (Array Annotation) trong production code!**

Cách 2 chỉ phù hợp cho tutorial/demo, nhưng khi làm dự án thực tế, **BẮT BUỘC** phải dùng Cách 1 để tránh lỗi khi minify code.
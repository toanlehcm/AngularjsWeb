# Phân tích lỗi - Phone Detail không load data

## Nguyên nhân chính

**Tên service không khớp!**

### ❌ Lỗi:

**File service:**
```javascript
.factory("PhoneService", ...)
```

**Component inject:**
```javascript
controller: ["$routeParams", "Phone", ...]
                            ^^^^^^
```

→ `"Phone"` !== `"PhoneService"` → AngularJS không tìm thấy provider!

---

## Phân tích Flow hoạt động hiện tại

### 1️⃣ **User truy cập URL**
```
http://127.0.0.1:3000/#!/phones/motorola-xoom-with-wi-fi
```

### 2️⃣ **Angular Router match route**
```javascript
.when("/phones/:phoneId", {
  template: "<phone-detail></phone-detail>",
})
```

### 3️⃣ **Component được khởi tạo**
```javascript
angular.module("AngularJSWeb").component("phoneDetail", {
  controller: ["$routeParams", "Phone", function(...) {...}]
                              ^^^^^^
})
```

### 4️⃣ **Angular Injector tìm kiếm "Phone" provider**
```
❌ KHÔNG TÌM THẤY!
Tìm: "Phone"
Có sẵn: "PhoneService"
```

### 5️⃣ **Throw error**
```
Error: [$injector:unpr]
Unknown provider: PhoneProvider <- Phone
```

### 6️⃣ **Component không render**
→ Page trắng, không có data

---

## Giải pháp

### ✅ **Cách 1: Đổi tên service thành "Phone"** (Khuyên dùng - theo tutorial)

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
  }
]);
````

**Không cần sửa component** - giữ nguyên:
```javascript
controller: ["$routeParams", "Phone", ...]
```

---

### ✅ **Cách 2: Đổi inject name trong components**

**Giữ nguyên service:**
```javascript
.factory("PhoneService", ...)
```

**Sửa phone-detail.component.js:**
````javascript
angular.module("AngularJSWeb").component("phoneDetail", {
    templateUrl: "app/phone-detail/phone-detail.template.html",
    controller: ["$routeParams", "PhoneService",
        function PhoneDetailController($routeParams, PhoneService) {
            var self = this;
            self.phoneId = $routeParams.phoneId;

            self.phone = PhoneService.get({ phoneId: $routeParams.phoneId }, function (phone) {
                console.log('phone', phone);
                self.setImage(phone.images[0]);
            });

            self.setImage = function setImage(imageUrl) {
                self.mainImageUrl = imageUrl;
            };
        }
    ]
});
````

**Sửa phone-list.component.js:**
````javascript
angular.module("AngularJSWeb").component("phoneListComponent", {
  templateUrl: "app/phone-list/phone-list.template.html",
  controller: [
    "PhoneService",
    function PhoneListController(PhoneService) {
      var self = this;
      self.orderProp = "age";
      
      self.phones = PhoneService.query();
    },
  ],
});
````

---

## So sánh 2 cách

| Tiêu chí | Cách 1: Đổi service → "Phone" | Cách 2: Đổi inject → "PhoneService" |
|----------|-------------------------------|-------------------------------------|
| **Theo tutorial gốc** | ✅ Đúng | ❌ Sai |
| **Convention** | ✅ Ngắn gọn | ⚠️ Dài hơn |
| **Số file sửa** | 1 file | 2 files |
| **Khuyên dùng** | ✅ | ❌ |

---

## Code đầy đủ (Cách 1 - Khuyên dùng)

### phone.service.js (Sửa tên)

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
  }
]);
````

### phone-detail.component.js (Giữ nguyên)

````javascript
angular.module("AngularJSWeb").component("phoneDetail", {
    templateUrl: "app/phone-detail/phone-detail.template.html",
    controller: ["$routeParams", "Phone",
        function PhoneDetailController($routeParams, Phone) {
            var self = this;
            self.phoneId = $routeParams.phoneId;

            self.phone = Phone.get({ phoneId: $routeParams.phoneId }, function (phone) {
                console.log('phone', phone);
                self.setImage(phone.images[0]);
            });

            self.setImage = function setImage(imageUrl) {
                self.mainImageUrl = imageUrl;
            };
        }
    ]
});
````

### phone-list.component.js (Giữ nguyên)

````javascript
angular.module("AngularJSWeb").component("phoneListComponent", {
  templateUrl: "app/phone-list/phone-list.template.html",
  controller: [
    "Phone",
    function PhoneListController(Phone) {
      var self = this;
      self.orderProp = "age";
      
      self.phones = Phone.query();
    },
  ],
});
````

---

## Flow hoạt động sau khi fix

### 1️⃣ **User truy cập URL**
```
http://127.0.0.1:3000/#!/phones/motorola-xoom-with-wi-fi
```

### 2️⃣ **Angular Router match route**
```javascript
.when("/phones/:phoneId", {
  template: "<phone-detail></phone-detail>",
})
```

### 3️⃣ **Component được khởi tạo**
```javascript
controller: ["$routeParams", "Phone", function(...) {...}]
```

### 4️⃣ **Angular Injector tìm "Phone" provider**
```
✅ TÌM THẤY!
Factory: "Phone"
```

### 5️⃣ **Gọi Phone.get()**
```javascript
Phone.get({ phoneId: "motorola-xoom-with-wi-fi" }, callback)
```

### 6️⃣ **$resource gọi API**
```
GET app/phones/motorola-xoom-with-wi-fi.json
```

### 7️⃣ **Server trả về JSON**
```json
{
  "id": "motorola-xoom-with-wi-fi",
  "name": "Motorola XOOM™ with Wi-Fi",
  "images": ["img1.jpg", "img2.jpg"],
  ...
}
```

### 8️⃣ **Callback được gọi**
```javascript
function (phone) {
  self.setImage(phone.images[0]); // Set ảnh mặc định
}
```

### 9️⃣ **AngularJS update view**
```html
<h1>{{$ctrl.phone.name}}</h1>
<!-- → "Motorola XOOM™ with Wi-Fi" -->
```

### 🔟 **Page render thành công!**

---

## Debug checklist

### ✅ Kiểm tra service name:
```javascript
.factory("Phone", ...) // ← Phải là "Phone"
```

### ✅ Kiểm tra inject name:
```javascript
controller: ["Phone", ...] // ← Phải trùng với factory name
```

### ✅ Kiểm tra file có được load:
```html
<script src="app/core/phone/phone.service.js"></script>
```

### ✅ Kiểm tra ngResource module:
```javascript
angular.module("AngularJSWeb", ["ngRoute", "ngResource"])
```

### ✅ Kiểm tra Console errors:
```
F12 → Console → Xem lỗi [$injector:unpr]
```

---

## Tóm tắt

**Bug:** Service tên `"PhoneService"` nhưng inject `"Phone"`.

**Fix:** Đổi tên service thành `"Phone"` trong file phone.service.js.

**Kết quả:** Phone detail page sẽ load data thành công!
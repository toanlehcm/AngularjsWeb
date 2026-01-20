# Giải thích chi tiết Phone Service

## Code đầy đủ với chú thích

````javascript
// 1. Lấy module "AngularJSWeb" đã được định nghĩa trước đó
angular.module("AngularJSWeb")

// 2. Đăng ký một factory service với tên "PhoneService"
.factory("PhoneService", [
    
    // 3. Khai báo dependency injection cho $resource service
    "$resource",
    
    // 4. Function định nghĩa service, nhận $resource làm tham số
    function ($resource) {
        
        // 5. Trả về một $resource object
        return $resource(
            // 6. URL template cho RESTful API
            // :phoneId là placeholder, sẽ được thay thế runtime
            "app/phones/:phoneId.json",
            
            // 7. Default parameters (rỗng trong trường hợp này)
            {},
            
            // 8. Custom actions (methods) cho resource
            {
                // 9. Định nghĩa method "query"
                query: {
                    // 10. HTTP method là GET
                    method: "GET",
                    
                    // 11. Tham số mặc định: phoneId = "phones"
                    // URL sẽ thành: app/phones/phones.json
                    params: { phoneId: "phones" },
                    
                    // 12. Response là array, không phải single object
                    isArray: true,
                },
            }
        );
    }
]);
````

---

## Giải thích từng phần chi tiết

### **Dòng 1: `angular.module("AngularJSWeb")`**

```javascript
angular.module("AngularJSWeb")
```

**Mục đích:** Lấy reference đến module đã tồn tại.

**Giải thích:**
- `angular.module("name")` **CHỈ CÓ 1 THAM SỐ** → Getter (lấy module đã tồn tại)
- `angular.module("name", [])` **CÓ 2 THAM SỐ** → Setter (tạo module mới)

**Ví dụ:**
```javascript
// Tạo module (trong routes.js)
angular.module("AngularJSWeb", ["ngRoute", "ngResource"])

// Lấy module (trong phone.service.js)
angular.module("AngularJSWeb") // ← Không có [], chỉ lấy
```

---

### **Dòng 2: `.factory("PhoneService", [...])`**

```javascript
.factory("PhoneService", [...])
```

**Mục đích:** Đăng ký một **singleton service** với tên `"PhoneService"`.

**Giải thích:**
- **Factory** là một design pattern để tạo objects
- Service được tạo **CHỈ 1 LẦN** (singleton)
- Có thể inject vào bất kỳ component nào

**Khác biệt Factory vs Service:**

```javascript
// Factory - Trả về object
.factory("Phone", function() {
  return { /* API */ };
})

// Service - Constructor function
.service("Phone", function() {
  this.method = function() {};
})

// Provider - Configurable
.provider("Phone", function() {
  this.$get = function() {
    return { /* API */ };
  };
})
```

---

### **Dòng 3-4: Dependency Injection**

```javascript
.factory("PhoneService", [
    "$resource",
    function ($resource) { ... }
])
```

**Mục đích:** Inject `$resource` service vào factory.

**Giải thích:**
- Array notation để **minification-safe**
- String `"$resource"` → tên service cần inject
- Function parameter `$resource` → nhận service instance

**Minification example:**

```javascript
// Before minify
["$resource", function ($resource) { ... }]

// After minify (vẫn hoạt động)
["$resource", function (a) { ... }]
// AngularJS đọc string "$resource" → inject đúng service
```

---

### **Dòng 5-6: `return $resource(...)`**

```javascript
return $resource(
    "app/phones/:phoneId.json",
    {},
    { ... }
)
```

**Mục đích:** Tạo và trả về một RESTful resource object.

**$resource syntax:**
```javascript
$resource(url, [paramDefaults], [actions], [options])
```

**Tham số:**
1. **url:** URL template
2. **paramDefaults:** Default parameters
3. **actions:** Custom HTTP methods
4. **options:** Advanced config

---

### **Dòng 6: URL Template**

```javascript
"app/phones/:phoneId.json"
```

**Mục đích:** Định nghĩa URL pattern cho API endpoint.

**Giải thích:**
- `:phoneId` là **placeholder** (dynamic parameter)
- Runtime sẽ thay thế bằng giá trị thực

**Ví dụ sử dụng:**

```javascript
// Get single phone
Phone.get({ phoneId: "nexus-s" })
// → GET app/phones/nexus-s.json

// Query all phones
Phone.query()
// → GET app/phones/phones.json (vì có default param)

// Custom phoneId
Phone.get({ phoneId: "motorola-xoom" })
// → GET app/phones/motorola-xoom.json
```

---

### **Dòng 7: Default Parameters**

```javascript
{}
```

**Mục đích:** Định nghĩa parameters mặc định cho tất cả requests.

**Giải thích:**
- Rỗng `{}` = không có default
- Có thể set giá trị mặc định

**Ví dụ:**

```javascript
// Với default params
$resource("api/:version/phones/:id", { version: "v1" })

// Sử dụng
Phone.get({ id: "123" })
// → GET api/v1/phones/123

// Override default
Phone.get({ id: "123", version: "v2" })
// → GET api/v2/phones/123
```

---

### **Dòng 8-12: Custom Actions**

```javascript
{
    query: {
        method: "GET",
        params: { phoneId: "phones" },
        isArray: true,
    },
}
```

**Mục đích:** Định nghĩa custom HTTP method `query()`.

**Giải thích:**

#### **Built-in methods** (không cần định nghĩa):
- `get()` → GET single resource
- `save()` → POST (create)
- `remove()` → DELETE
- `delete()` → DELETE

#### **Custom method `query()`:**
- Override default behavior
- Thêm config đặc biệt

---

### **Dòng 9: `query: { ... }`**

```javascript
query: {
    method: "GET",
    params: { phoneId: "phones" },
    isArray: true,
}
```

**Mục đích:** Cấu hình method `query()` để fetch array of phones.

**Chi tiết:**

#### **1. `method: "GET"`**
- HTTP method là GET
- Dùng để fetch data

#### **2. `params: { phoneId: "phones" }`**
- Set default value cho `:phoneId` placeholder
- Khi gọi `Phone.query()` → URL thành phones.json

**Flow:**
```javascript
Phone.query()
↓
URL template: "app/phones/:phoneId.json"
↓
Apply default param: phoneId = "phones"
↓
Final URL: "app/phones/phones.json"
↓
GET request → fetch phones array
```

#### **3. `isArray: true`**
- Cho AngularJS biết response là **array**, không phải object
- Quan trọng cho việc parse JSON đúng cách

**Ví dụ:**

```javascript
// isArray: true
Phone.query()
// Response: [{ id: 1 }, { id: 2 }]
// → Trả về array

// isArray: false (default)
Phone.get({ phoneId: "nexus-s" })
// Response: { id: "nexus-s", name: "..." }
// → Trả về object
```

---

## Cách sử dụng PhoneService

### **1. Inject vào component**

```javascript
angular.module("AngularJSWeb").component("phoneList", {
    controller: ["PhoneService", function(PhoneService) {
        // Sử dụng service
    }]
});
```

### **2. Gọi methods**

```javascript
// Query all phones
var phones = PhoneService.query();
// → GET app/phones/phones.json
// → phones = [{ id: 1 }, { id: 2 }, ...]

// Get single phone
var phone = PhoneService.get({ phoneId: "nexus-s" });
// → GET app/phones/nexus-s.json
// → phone = { id: "nexus-s", name: "...", ... }

// With callback
var phone = PhoneService.get(
    { phoneId: "nexus-s" },
    function(data) {
        console.log("Loaded:", data);
    }
);

// With promise
PhoneService.query().$promise.then(function(phones) {
    console.log("Phones:", phones);
});
```

---

## So sánh với $http

### **Dùng $http (Cũ):**

```javascript
$http.get("app/phones/phones.json").then(function(response) {
    self.phones = response.data;
});

$http.get("app/phones/nexus-s.json").then(function(response) {
    self.phone = response.data;
});
```

**Nhược điểm:**
- ❌ Nhiều boilerplate code
- ❌ Phải viết `.then()` mỗi lần
- ❌ Phải truy cập `response.data`
- ❌ Không có caching

### **Dùng $resource (Mới):**

```javascript
self.phones = PhoneService.query();

self.phone = PhoneService.get({ phoneId: "nexus-s" });
```

**Ưu điểm:**
- ✅ Code ngắn gọn
- ✅ Không cần `.then()` (optional)
- ✅ Tự động parse JSON
- ✅ Built-in caching
- ✅ RESTful convention

---

## Tóm tắt hoạt động

### **Flow đầy đủ:**

```
1. Define service
   ↓
   .factory("PhoneService", ["$resource", function($resource) {
     return $resource("app/phones/:phoneId.json", {}, {...});
   }])

2. Inject vào component
   ↓
   controller: ["PhoneService", function(PhoneService) { ... }]

3. Gọi method
   ↓
   PhoneService.query()

4. $resource xử lý
   ↓
   - Replace :phoneId với "phones"
   - Tạo URL: "app/phones/phones.json"
   - Send GET request

5. Server response
   ↓
   [{ id: 1, name: "..." }, { id: 2, name: "..." }]

6. $resource parse JSON
   ↓
   Return array to component

7. AngularJS update view
   ↓
   ng-repeat render phones
```

---

## Lưu ý quan trọng

### ⚠️ **Tên service phải khớp với inject name:**

```javascript
// ❌ SAI
.factory("PhoneService", ...)
controller: ["Phone", ...] // ← Không khớp!

// ✅ ĐÚNG
.factory("Phone", ...)
controller: ["Phone", ...] // ← Khớp!
```

### ⚠️ **isArray quan trọng:**

```javascript
// isArray: true → Response là array
query: { isArray: true } // [1, 2, 3]

// isArray: false (default) → Response là object
get: { isArray: false } // { id: 1 }
```

### ⚠️ **$resource trả về ngay lập tức:**

```javascript
var phones = PhoneService.query();
console.log(phones); // → [] (empty array)

// Sau vài milliseconds
console.log(phones); // → [{ ... }, { ... }] (populated)
```

**Giải pháp:**
```javascript
// Dùng callback
PhoneService.query(function(phones) {
    console.log(phones); // → Đã có data
});

// Hoặc promise
PhoneService.query().$promise.then(function(phones) {
    console.log(phones); // → Đã có data
});

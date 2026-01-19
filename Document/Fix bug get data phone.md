## Phân tích bug

### Hiện tượng
- `response.data` là **string HTML** thay vì **object JSON**.
- Mong muốn: lấy dữ liệu từ file phones.json (kiểu mảng object).

### Nguyên nhân

**Đường dẫn API bị sai!**

```javascript
$http.get("phones" + $routeParams.phoneId + ".json")
```
- Khi truy cập: `/phones/motorola-xoom-with-wi-fi`
- Đường dẫn thực tế: `phonesmotorola-xoom-with-wi-fi.json` (KHÔNG TỒN TẠI)
- Server trả về trang lỗi HTML (404), nên `response.data` là string HTML.

### Mong muốn

- Đọc dữ liệu từ: phones.json
- Tìm object có `id` trùng với `$routeParams.phoneId`

---

## Cách fix

### 1. Đọc đúng file JSON

```javascript
$http.get("app/phones/phones.json").then(function (response) {
    var phones = response.data;
    // Tìm phone theo id
    self.phone = phones.find(function (p) {
        return p.id === self.phoneId;
    });
});
```

### 2. Sửa controller đầy đủ

````javascript
angular.module("AngularJSWeb").component("phoneDetail", {
    templateUrl: "app/phone-detail/phone-detail.template.html",
    controller: [
        "$routeParams",
        "$http",
        function PhoneDetailController($routeParams, $http) {
            var self = this;
            self.phoneId = $routeParams.phoneId;

            $http.get("app/phones/phones.json").then(function (response) {
                var phones = response.data;
                self.phone = phones.find(function (p) {
                    return p.id === self.phoneId;
                });
            });
        }
    ]
});
````

---

## Tóm tắt

- **Bug:** Đường dẫn file bị sai, server trả về HTML lỗi.
- **Fix:** Đọc đúng file JSON, lọc object theo id.

**Kết quả:** `self.phone` sẽ là object mong muốn từ phones.json.
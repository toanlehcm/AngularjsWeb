Chắc chắn rồi! Step 7 là một bước rất quan trọng, nó chuyển ứng dụng của bạn từ một "bản demo" với dữ liệu giả sang một ứng dụng web thực thụ có thể giao tiếp với server.

Dựa trên code hiện tại của bạn, chúng ta sẽ sửa đổi phoneList.component.js để lấy dữ liệu từ một file JSON bên ngoài thay vì hard-code trong controller.

### AngularJS Tutorial - Step 7: XHR & Dependency Injection

**Nội dung chính:**

- **XHR (Asynchronous Request):** Thay vì hard-code dữ liệu (mảng `phones`) trực tiếp trong controller, chúng ta sẽ sử dụng service `$http` của AngularJS để tải dữ liệu này từ một file JSON trên server. Đây là cách các ứng dụng thực tế hoạt động.
- **Dependency Injection (DI):** Giới thiệu về cơ chế "tiêm phụ thuộc" của AngularJS. Để sử dụng một service có sẵn như `$http`, chúng ta chỉ cần khai báo nó như một tham số trong hàm controller. AngularJS sẽ tự động "tiêm" (cung cấp) service đó cho chúng ta sử dụng.
- **Promises:** Vì việc tải dữ liệu từ server cần thời gian (bất đồng bộ), `$http.get()` sẽ trả về một "promise". Chúng ta sẽ định nghĩa một hàm callback (sử dụng `.then()`) để xử lý dữ liệu ngay khi nó được tải về thành công.

**Hướng dẫn code từng bước cụ thể:**

1.  **Tạo file dữ liệu `phones.json`:**
    Tạo một thư mục `phones` bên trong app, và tạo file `phones.json` bên trong đó. File này sẽ đóng vai trò là API server của chúng ta.

    ```json
    // filepath: app/phones/phones.json
    [
      {
        "age": 0,
        "id": "motorola-xoom-with-wi-fi",
        "imageUrl": "img/phones/motorola-xoom-with-wi-fi.0.jpg",
        "name": "Motorola XOOM\u2122 with Wi-Fi",
        "snippet": "The Next, Next Generation tablet."
      },
      {
        "age": 1,
        "id": "motorola-xoom",
        "imageUrl": "img/phones/motorola-xoom.0.jpg",
        "name": "MOTOROLA XOOM\u2122",
        "snippet": "The Next, Next Generation tablet."
      },
      {
        "age": 2,
        "id": "motorola-atrix-4g",
        "imageUrl": "img/phones/motorola-atrix-4g.0.jpg",
        "name": "MOTOROLA ATRIX\u2122 4G",
        "snippet": "MOTOROLA ATRIX 4G the world's most powerful smartphone."
      },
      {
        "age": 3,
        "id": "dell-streak-7",
        "imageUrl": "img/phones/dell-streak-7.0.jpg",
        "name": "Dell Streak 7",
        "snippet": "Introducing Dell\u2122 Streak 7. Share photos, videos, listen to music, and connect to people and news your way. It's the perfect tool for staying in touch."
      }
    ]
    ```

2.  **Cập nhật phoneList.component.js:**
    - **Inject `$http`:** Thêm `$http` vào danh sách tham số của controller.
    - **Xóa dữ liệu hard-code:** Xóa mảng `this.phones` hiện tại.
    - **Gọi `$http.get()`:** Sử dụng `$http.get('app/phones/phones.json')` để yêu cầu dữ liệu.
    - **Xử lý Promise:** Dùng `.then(response => { ... })` để gán dữ liệu trả về (`response.data`) cho `this.phones`.

    ```javascript
    // filepath: /Users/toanle/Documents/DEV/FE/AngularJS/AngularjsWeb/app/phone-list/phoneList.component.js
    angular.module("AngularJSWeb").component("phoneListComponent", {
      // template: "<ul>" + '  <li ng-repeat="phone in $ctrl.phones">' + "    <span>{{phone.name}}</span>" + "    <p>{{phone.snippet}}</p>" + "  </li>" + "</ul>",
      templateUrl: "app/phone-list/phoneList.template.html",
      controller: function PhoneListComponentController($http) {
        var self = this; // Lưu lại 'this' của controller
        self.orderProp = "age";

        $http.get("app/phones/phones.json").then(function (response) {
          self.phones = response.data;
        });
      },
    });
    ```

    _Lưu ý:_ Bên trong hàm callback của `.then()`, `this` có thể không còn là controller nữa. Một cách an toàn là lưu `this` vào một biến (ví dụ `self`) bên ngoài và sử dụng nó bên trong callback.

3.  **Cập nhật phoneList.template.html (Tùy chọn nhưng nên làm):**
    Dữ liệu mới có thêm thuộc tính `imageUrl`. Hãy hiển thị nó.

    ```html
    // filepath: /Users/toanle/Documents/DEV/FE/AngularJS/AngularjsWeb/app/phone-list/phoneList.template.html // ...existing code...
    <li
      ng-repeat="phone in $ctrl.phones 
            | filter:$ctrl.querySearch 
            | orderBy:$ctrl.orderProp"
    >
      <a href="#!/phones/{{phone.id}}" class="thumb">
        <img ng-src="{{phone.imageUrl}}" alt="{{phone.name}}" />
      </a>
      <a href="#!/phones/{{phone.id}}">{{phone.name}}</a>
      <p>{{phone.snippet}}</p>
    </li>
    // ...existing code...
    ```

**Tóm gọn 20% cốt lõi để giải thích:**

> Cốt lõi của bước này là **tách dữ liệu ra khỏi code**. Thay vì viết chết dữ liệu trong controller, chúng ta dùng service `$http` để **gửi một yêu cầu (request) tới server** và lấy về file JSON. AngularJS giúp việc này rất đơn giản thông qua **Dependency Injection**: chỉ cần hỏi xin `$http`, AngularJS sẽ đưa nó cho bạn. Vì mạng có độ trễ, `$http` trả về một "lời hứa" (promise) và chúng ta chỉ việc định nghĩa "khi nào có dữ liệu thì làm gì".

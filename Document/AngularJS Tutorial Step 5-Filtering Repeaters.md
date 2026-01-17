Chào bạn, tôi đã xem qua các file bạn cung cấp. Để thực hiện Step 5, chúng ta sẽ thêm chức năng tìm kiếm vào `phone-list-component` của bạn.

Dưới đây là hướng dẫn chi tiết và code cần thiết.

### AngularJS Tutorial - Step 5: Filtering Repeaters

**Nội dung chính:**

- Thêm một ô tìm kiếm (search box) để lọc danh sách điện thoại.
- Sử dụng `ng-model` để tạo liên kết dữ liệu hai chiều (two-way data-binding) giữa ô tìm kiếm và một thuộc tính trên controller.
- Sử dụng `filter` của AngularJS trong `ng-repeat` để lọc danh sách dựa trên dữ liệu người dùng nhập vào.

**Hướng dẫn code từng bước cụ thể:**

1.  **Tạo/Cập nhật file template `phoneList.template.html`:**
    Component của bạn đang tham chiếu đến phoneList.template.html. Chúng ta sẽ thêm ô tìm kiếm và áp dụng bộ lọc vào file này.
    - Thêm một thẻ `<p>` chứa ô `<input>`.
    - Sử dụng `ng-model="$ctrl.query"` để liên kết giá trị của ô input với thuộc tính `query` trên controller của component.
    - Trong `ng-repeat`, thêm `| filter:$ctrl.query` để lọc danh sách `phones` dựa trên giá trị của `query`.

2.  **Cập nhật Controller phoneList.component.js:**
    - Thêm một thuộc tính `orderProp` để chuẩn bị cho bước sắp xếp ở các bài sau.

**Tóm gọn 20% cốt lõi để giải thích:**

> Cốt lõi của bước này là **lọc dữ liệu động**. Chúng ta dùng `ng-model` để tạo một **liên kết hai chiều** giữa ô tìm kiếm và một biến (`$ctrl.query`). Khi người dùng gõ, biến đó tự động cập nhật. Sau đó, chúng ta dùng `filter` của AngularJS ngay trong HTML để lọc danh sách (`ng-repeat`) dựa trên giá trị của biến đó. Tất cả diễn ra tự động, rất nhanh và chỉ cần vài dòng code.

---

**Áp dụng vào code của bạn:**

Đầu tiên, hãy tạo file template cho component của bạn.

```html
<div class="container-fluid">
  <div class="row">
    <div class="col-md-2">
      <!--Sidebar content-->
      <p>Search: <input ng-model="$ctrl.query" /></p>
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
        <li ng-repeat="phone in $ctrl.phones | filter:$ctrl.query | orderBy:$ctrl.orderProp">
          <span>{{phone.name}}</span>
          <p>{{phone.snippet}}</p>
        </li>
      </ul>
    </div>
  </div>
</div>
```

Tiếp theo, cập nhật file component của bạn để thêm thuộc tính `orderProp`.

```javascript
// ...existing code...
  // template: "<ul>" + '  <li ng-repeat="phone in $ctrl.phones">' + "    <span>{{phone.name}}</span>" + "    <p>{{phone.snippet}}</p>" + "  </li>" + "</ul>",
  templateUrl: "app/phone-list/phoneList.template.html",
  controller: function PhoneListComponentController() {
    this.phones = [
      {
        name: "Iphone 5",
        snippet: "Fast just got faster with Iphone 5.",
        age: 1
      },
      {
        name: "Iphone 6 with Wi-Fi",
        snippet: "The Next, Next Generation tablet.",
        age: 2
      },
      {
        name: "Iphone 7",
        snippet: "The Next, Next Generation tablet.",
        age: 3
      },
    ];
    this.orderProp = 'age';
  },
});
```

Sau khi thêm các thay đổi này, bạn hãy mở file index.html trong trình duyệt. Bạn sẽ thấy một ô tìm kiếm và một menu dropdown để sắp xếp bên cạnh danh sách điện thoại. Khi bạn gõ vào ô tìm kiếm, danh sách sẽ được lọc ngay lập tức.

---

Tuyệt vời! Đây là một câu hỏi rất hay và cho thấy bạn đang suy nghĩ sâu về cách AngularJS hoạt động. Sự khác biệt này nằm ở cách `ng-model` và `orderBy` filter hoạt động và mục đích của từng thuộc tính.

Hãy cùng phân tích:

### 1. Tại sao `$ctrl.query` không cần khởi tạo?

- **Ai tạo ra nó?** `ng-model` trên thẻ `<input>` là người chịu trách nhiệm.
- **Cơ chế:** Khi bạn dùng `ng-model="$ctrl.query"`, bạn đang nói với AngularJS: "Hãy tạo một liên kết hai chiều giữa ô input này và thuộc tính `query` của controller (`$ctrl`)".
- **Điểm mấu chốt:** Một tính năng đặc biệt của `ng-model` là nếu thuộc tính (`query` trong trường hợp này) chưa tồn tại trên controller, `ng-model` sẽ **tự động tạo ra nó** cho bạn ngay khi người dùng bắt đầu nhập liệu. Ban đầu, nó sẽ là `undefined`, và bộ lọc `filter` sẽ bỏ qua nó (không lọc gì cả), đó chính là hành vi chúng ta muốn.

### 2. Tại sao `$ctrl.orderProp` CẦN khởi tạo?

- **Mục đích:** Thuộc tính này dùng để xác định **thứ tự sắp xếp mặc định** cho danh sách ngay khi trang vừa tải xong.
- **Ai sử dụng nó?** Bộ lọc `orderBy:$ctrl.orderProp` và thẻ `<select ng-model="$ctrl.orderProp">`.
- **Cơ chế:**
  - Trong controller, `this.orderProp = 'age';` đặt giá trị mặc định.
  - Khi component được tải, bộ lọc `orderBy` ngay lập tức tìm giá trị của `$ctrl.orderProp` và thấy nó là `'age'`. Nó liền sắp xếp danh sách điện thoại theo thuộc tính `age` (mới nhất lên đầu).
  - Đồng thời, `ng-model` trên thẻ `<select>` cũng thấy giá trị là `'age'` và tự động chọn `<option>` tương ứng ("Newest").

**Nếu bạn không khởi tạo `this.orderProp` trong controller:**

1.  Khi trang tải, `$ctrl.orderProp` sẽ là `undefined`.
2.  Bộ lọc `orderBy` sẽ không biết sắp xếp theo tiêu chí nào, và danh sách sẽ giữ nguyên thứ tự gốc từ mảng `phones`.
3.  Thẻ `<select>` sẽ không có lựa chọn nào được chọn sẵn.

### Tóm lại

| Thuộc tính            | Mục đích                                                              | Tại sao không cần khởi tạo                                                                   | Tại sao CẦN khởi tạo                                                                       |
| :-------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| **`$ctrl.query`**     | Nhận dữ liệu **đầu vào** từ người dùng để lọc.                        | `ng-model` sẽ tự động tạo ra nó khi người dùng bắt đầu gõ. Ban đầu không có giá trị là đúng. |                                                                                            |
| **`$ctrl.orderProp`** | Thiết lập trạng thái **mặc định** cho việc sắp xếp và cho `<select>`. |                                                                                              | Cần có giá trị ban đầu để `orderBy` và `<select>` biết phải làm gì ngay khi trang vừa tải. |

Nói một cách đơn giản:

- `query` là một thuộc tính "chờ" người dùng hành động.
- `orderProp` là một thuộc tính "cấu hình" cần có giá trị ngay từ đầu để ứng dụng có một trạng thái mặc định hợp lý.

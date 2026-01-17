...existing code...
tóm gọn lại 20% cốt lõi để t giải thích cho người khác dễ hiểu

---

### AngularJS Tutorial - Step 4: Directory and File Organization

**Nội dung chính:**

- Tổ chức lại cấu trúc thư mục và file của ứng dụng để dễ dàng quản lý, bảo trì và mở rộng.
- Chuyển từ việc nhóm file theo loại (controllers, filters) sang nhóm file theo tính năng (feature).
- Di chuyển các file JavaScript, HTML, CSS và test vào các thư mục con hợp lý.

**Hướng dẫn code từng bước cụ thể:**

1.  **Tạo cấu trúc thư mục mới:**
    - Tạo thư mục `app/` làm thư mục gốc cho mã nguồn ứng dụng.
    - Bên trong `app/`, tạo các thư mục con:
      - `core/`: Cho các module và thành phần cốt lõi, dùng chung.
      - `phone-detail/`: Cho các file liên quan đến tính năng chi tiết điện thoại.
      - `phone-list/`: Cho các file liên quan đến tính năng danh sách điện thoại.
      - `img/`: Để chứa hình ảnh.

2.  **Di chuyển và tạo file:**
    - Di chuyển `app.css`, `app.js`, `index.html` và thư mục `bower_components` vào trong `app/`.
    - Di chuyển `phones/` (chứa file JSON) và hình ảnh vào `app/phones/` và `app/img/`.
    - Tách `phone-list.component.js` và `phone-list.template.html` vào thư mục `app/phone-list/`.
    - Tạo các file module riêng cho từng tính năng, ví dụ: `app/phone-list/phone-list.module.js`.
    - Module chính `app.module.js` sẽ khai báo phụ thuộc vào các module tính năng (ví dụ: `phoneList`).

3.  **Cập nhật đường dẫn:**
    - Trong `index.html`: Cập nhật lại tất cả các đường dẫn đến file CSS, JS, và template cho đúng với cấu trúc thư mục mới.
    - Trong `karma.conf.js` (file cấu hình test): Cập nhật đường dẫn đến các file mã nguồn và file test.
    - Trong các file component (ví dụ: `phone-list.component.js`): Cập nhật `templateUrl` để trỏ đến vị trí mới của file template.

4.  **Kiểm tra:**
    - Chạy lại ứng dụng trên trình duyệt để đảm bảo mọi thứ vẫn hoạt động bình thường.
    - Chạy lại unit test để xác nhận không có gì bị lỗi sau khi thay đổi cấu trúc.

**Tóm gọn 20% cốt lõi để giải thích:**

> Cốt lõi của bước này là **tái cấu trúc project**. Thay vì để tất cả các file lộn xộn, chúng ta sắp xếp chúng vào các thư mục riêng biệt theo từng **tính năng** (ví dụ: danh sách điện thoại, chi tiết điện thoại). Việc này giúp code trở nên sạch sẽ, dễ tìm kiếm, dễ bảo trì và dễ dàng phát triển thêm các tính năng mới sau này mà không làm ảnh hưởng đến các phần khác.

# AngularJS Tutorial Step 10 - Event Handlers

## Nội dung chính Step 10

Step 10 dạy cách xử lý **user events** (click chuột) để thay đổi hình ảnh hiển thị trên trang phone detail.

---

## Kiểm tra code của bạn

### ❌ **CHƯA ĐẦY ĐỦ** - Thiếu các phần sau:

#### 1. **Thiếu method `setImage()` trong controller**

````javascript
angular.module("AngularJSWeb").component("phoneDetail", {
    templateUrl: "app/phone-detail/phone-detail.template.html",
    controller: ["$routeParams", "$http",
        function PhoneDetailController($routeParams, $http) {
            var self = this;
            self.phoneId = $routeParams.phoneId;

            $http.get("app/phones/" + $routeParams.phoneId + '.json').then(function (response) {
                self.phone = response.data;
                
                // ❌ THIẾU: Set ảnh mặc định
                self.setImage(self.phone.images[0]);
            });
            
            // ❌ THIẾU: Method setImage
            self.setImage = function setImage(imageUrl) {
                self.mainImageUrl = imageUrl;
            };
        }
    ]
});
````

#### 2. **Thiếu CSS cho selected image**

````scss
.phone-detail-page {
  h1 {
    border-bottom: 1px solid gray;
    margin-top: 0;
  }

  .phone {
    background-color: white;
    display: none; // ❌ Ẩn tất cả ảnh
    float: left;
    height: 400px;
    margin-bottom: 2em;
    margin-right: 3em;
    padding: 2em;
    width: 400px;
  }

  // ✅ CÓ RỒI nhưng cần thay đổi selector
  .phone:first-child {
    display: block;
  }
  
  // ❌ THIẾU: CSS cho ảnh được chọn
  .phone.selected {
    display: block;
  }

  .phone-images {
    float: left;
    height: 450px;
    overflow: hidden;
    position: relative;
    width: 450px;
  }

  .phone-thumbs {
    list-style: none;
    margin: 0;
  }

  .phone-thumbs img {
    height: 100px;
    padding: 1em;
    width: 100px;
  }

  .phone-thumbs li {
    background-color: white;
    border: 1px solid black;
    cursor: pointer;
    display: inline-block;
    margin: 1em;
  }

  .specs {
    clear: both;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .specs dt {
    font-weight: bold;
  }

  .specs > li {
    display: inline-block;
    vertical-align: top;
    width: 200px;
  }

  .specs > li > span {
    font-size: 1.2em;
    font-weight: bold;
  }
}
````

---

## Code đầy đủ theo Step 10

### 1. **Controller - phone-detail.component.js**

````javascript
\AngularjsWeb\app\phone-detail\phone-detail.component.js
angular.module("AngularJSWeb").component("phoneDetail", {
    templateUrl: "app/phone-detail/phone-detail.template.html",
    controller: ["$routeParams", "$http",
        function PhoneDetailController($routeParams, $http) {
            var self = this;
            self.phoneId = $routeParams.phoneId;

            $http.get("app/phones/" + $routeParams.phoneId + '.json').then(function (response) {
                self.phone = response.data;
                
                // Set ảnh mặc định (ảnh đầu tiên)
                self.setImage(self.phone.images[0]);
            });
            
            // Method để thay đổi ảnh hiển thị
            self.setImage = function setImage(imageUrl) {
                self.mainImageUrl = imageUrl;
            };
        }
    ]
});
````

### 2. **Template - phone-detail.template.html** (Đã đúng ✅)

````html
<div class="phone-detail-page">
  <div class="phone-images">
    <!-- Hiển thị tất cả ảnh, chỉ show ảnh có class 'selected' -->
    <img ng-src="{{img}}" class="phone"
        ng-class="{selected: img === $ctrl.mainImageUrl}"
        ng-repeat="img in $ctrl.phone.images" />
  </div>

  <h1>{{$ctrl.phone.name}}</h1>

  <p>{{$ctrl.phone.description}}</p>

  <!-- Thumbnails - Click để thay đổi ảnh -->
  <ul class="phone-thumbs">
    <li ng-repeat="img in $ctrl.phone.images">
      <img ng-src="{{img}}" ng-click="$ctrl.setImage(img)"/>
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
    <li>
      <span>Android</span>
      <dl>
        <dt>OS Version</dt>
        <dd>{{$ctrl.phone.android.os}}</dd>
        <dt>UI</dt>
        <dd>{{$ctrl.phone.android.ui}}</dd>
      </dl>
    </li>
    <li>
      <span>Size and Weight</span>
      <dl>
        <dt>Dimensions</dt>
        <dd ng-repeat="dim in $ctrl.phone.sizeAndWeight.dimensions">{{dim}}</dd>
        <dt>Weight</dt>
        <dd>{{$ctrl.phone.sizeAndWeight.weight}}</dd>
      </dl>
    </li>
    <li>
      <span>Display</span>
      <dl>
        <dt>Screen size</dt>
        <dd>{{$ctrl.phone.display.screenSize}}</dd>
        <dt>Screen resolution</dt>
        <dd>{{$ctrl.phone.display.screenResolution}}</dd>
        <dt>Touch screen</dt>
        <dd>{{$ctrl.phone.display.touchScreen}}</dd>
      </dl>
    </li>
    <li>
      <span>Hardware</span>
      <dl>
        <dt>CPU</dt>
        <dd>{{$ctrl.phone.hardware.cpu}}</dd>
        <dt>USB</dt>
        <dd>{{$ctrl.phone.hardware.usb}}</dd>
        <dt>Audio / headphone jack</dt>
        <dd>{{$ctrl.phone.hardware.audioJack}}</dd>
        <dt>FM Radio</dt>
        <dd>{{$ctrl.phone.hardware.fmRadio}}</dd>
        <dt>Accelerometer</dt>
        <dd>{{$ctrl.phone.hardware.accelerometer}}</dd>
      </dl>
    </li>
    <li>
      <span>Camera</span>
      <dl>
        <dt>Primary</dt>
        <dd>{{$ctrl.phone.camera.primary}}</dd>
        <dt>Features</dt>
        <dd>{{$ctrl.phone.camera.features.join(', ')}}</dd>
      </dl>
    </li>
    <li>
      <span>Additional Features</span>
      <dd>{{$ctrl.phone.additionalFeatures}}</dd>
    </li>
  </ul>
</div>
````

### 3. **CSS - phone-detail.scss**

````scss
// filepath: d:\Sources\AngularjsWeb\app\styles\phone-detail\phone-detail.scss
.phone-detail-page {
  h1 {
    border-bottom: 1px solid gray;
    margin-top: 0;
  }

  .phone {
    background-color: white;
    display: none; // Ẩn tất cả ảnh mặc định
    float: left;
    height: 400px;
    margin-bottom: 2em;
    margin-right: 3em;
    padding: 2em;
    width: 400px;
  }

  // Chỉ hiển thị ảnh được chọn
  .phone.selected {
    display: block;
  }

  .phone-images {
    float: left;
    height: 450px;
    overflow: hidden;
    position: relative;
    width: 450px;
  }

  .phone-thumbs {
    list-style: none;
    margin: 0;
  }

  .phone-thumbs img {
    height: 100px;
    padding: 1em;
    width: 100px;
    cursor: pointer; // Thêm cursor pointer
    
    &:hover {
      opacity: 0.7; // Hiệu ứng hover
    }
  }

  .phone-thumbs li {
    background-color: white;
    border: 1px solid black;
    cursor: pointer;
    display: inline-block;
    margin: 1em;
    
    &:hover {
      border-color: #007bff; // Hiệu ứng hover
    }
  }

  .specs {
    clear: both;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .specs dt {
    font-weight: bold;
  }

  .specs > li {
    display: inline-block;
    vertical-align: top;
    width: 200px;
  }

  .specs > li > span {
    font-size: 1.2em;
    font-weight: bold;
  }
}
````

---

## 20% Cốt lõi (Tóm tắt)

### 🎯 3 Khái niệm Quan Trọng:

#### 1. **ng-click Directive**
```html
<img ng-src="{{img}}" ng-click="$ctrl.setImage(img)"/>
```
- Xử lý sự kiện click
- Gọi method của controller
- Truyền parameter (imageUrl)

#### 2. **ng-class Directive**
```html
<img ng-class="{selected: img === $ctrl.mainImageUrl}"/>
```
- Thêm class động dựa trên điều kiện
- `selected` class được thêm khi `img === $ctrl.mainImageUrl`
- Kết hợp với CSS để show/hide

#### 3. **Controller Method**
```javascript
self.setImage = function setImage(imageUrl) {
    self.mainImageUrl = imageUrl;
};
```
- Lưu URL ảnh hiện tại vào `mainImageUrl`
- Khi `mainImageUrl` thay đổi → ng-class tự động update
- AngularJS tự động re-render view

### 💡 Flow hoạt động:

```
1. User click thumbnail
   ↓
2. ng-click gọi $ctrl.setImage(img)
   ↓
3. Controller update $ctrl.mainImageUrl
   ↓
4. ng-class kiểm tra img === $ctrl.mainImageUrl
   ↓
5. CSS .selected {display: block} hiển thị ảnh
```

### 📝 Code tối giản demo:

````javascript
// Controller
self.mainImageUrl = null;
self.setImage = function(url) {
    self.mainImageUrl = url;
};
````

````html
<!-- Template -->
<img ng-click="$ctrl.setImage(img)" ng-repeat="img in images"/>
<img ng-class="{selected: img === $ctrl.mainImageUrl}"/>
````

````css
/* CSS */
.phone { display: none; }
.phone.selected { display: block; }
````

### 💬 Giải thích cho người khác:

> "Step 10 dạy cách xử lý click event:
> 1. Dùng `ng-click` để bắt sự kiện click
> 2. Gọi method `setImage()` để lưu URL ảnh
> 3. Dùng `ng-class` để thêm class `selected`
> 4. CSS chỉ hiển thị ảnh có class `selected`
> 
> Khi click thumbnail → ảnh lớn tự động đổi!"

---

## Tóm tắt checklist

- ✅ Template có `ng-click` và `ng-class`
- ❌ **Controller thiếu `setImage()` method**
- ❌ **Controller thiếu set ảnh mặc định**
- ⚠️ **CSS cần sửa `.phone.selected`**

**→ Cần bổ sung code controller và CSS để hoàn thiện Step 10!**

Similar code found with 2 license types
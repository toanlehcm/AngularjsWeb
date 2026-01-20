# Workflow của Checkmark Filter Module

## 1. Kiến trúc tổng quan

```
User navigates to phone detail page
         ↓
   Phone data loaded
         ↓
   Template rendering
         ↓
   {{value | checkmark}} encountered
         ↓
   AngularJS $filter service
         ↓
   Checkmark filter function
         ↓
   Convert boolean → Unicode character
         ↓
   Display ✓ or ✘ on UI
```

---

## 2. Flow chi tiết từng bước

### **Bước 1: Module Registration**

````javascript
angular.module('core', []);
````

**Giải thích:**
- Tạo module `'core'` làm container cho shared features
- Module này được register vào app chính

---

### **Bước 2: Filter Definition**

````javascript
'use strict';

angular.
  module('core').              // ← Lấy module 'core' đã tồn tại
  filter('checkmark', function() {  // ← Đăng ký filter với tên 'checkmark'
    return function(input) {   // ← Function xử lý transformation
      return input ? '\u2713' : '\u2718';  // ← Logic convert
    };
  });
````

**Giải thích:**
- `module('core')` - Lấy core module (1 tham số = getter)
- `.filter('checkmark', ...)` - Register filter với tên `'checkmark'`
- Return **factory function** nhận `input` parameter
- Logic: `input` truthy → `\u2713` (✓), falsy → `\u2718` (✘)

---

### **Bước 3: Module Dependency**

````javascript
angular.module("AngularJSWeb", [
  "ngRoute",
  "ngResource",
  "core"  // ← Inject 'core' module vào app
])
````

**Giải thích:**
- App module `AngularJSWeb` depend on `core` module
- AngularJS sẽ load tất cả filters trong `core` module
- Filter `checkmark` trở thành available globally

---

### **Bước 4: Script Loading trong HTML**

````html
<!-- Core Module -->
<script src="app/core/core.module.js"></script>
<script src="app/core/checkmark/checkmark.filter.js"></script>
````

**Thứ tự quan trọng:**
1. Load core.module.js trước (định nghĩa module)
2. Load checkmark.filter.js sau (register filter vào module)

---

### **Bước 5: Data Flow - Phone Detail Component**

````javascript
angular.module("AngularJSWeb").component("phoneDetail", {
    controller: ["$routeParams", "Phone",
        function PhoneDetailController($routeParams, Phone) {
            var self = this;
            
            // Fetch phone data từ JSON
            self.phone = Phone.get({ phoneId: $routeParams.phoneId }, function (phone) {
                // phone.connectivity.infrared = true
                // phone.connectivity.gps = true
                // phone.display.touchScreen = true
                // phone.hardware.fmRadio = false
                // phone.hardware.accelerometer = true
            });
        }
    ]
});
````

**Data example (từ JSON):**
```json
{
  "connectivity": {
    "infrared": true,
    "gps": true,
    "bluetooth": "Bluetooth 2.1"
  },
  "display": {
    "touchScreen": true
  },
  "hardware": {
    "fmRadio": false,
    "accelerometer": true
  }
}
```

---

### **Bước 6: Template Rendering với Filter**

````html
<dt>Infrared</dt>
<dd>{{$ctrl.phone.connectivity.infrared | checkmark}}</dd>
<!-- $ctrl.phone.connectivity.infrared = true -->

<dt>GPS</dt>
<dd>{{$ctrl.phone.connectivity.gps | checkmark}}</dd>
<!-- $ctrl.phone.connectivity.gps = true -->

<dt>Touch screen</dt>
<dd>{{$ctrl.phone.display.touchScreen | checkmark}}</dd>
<!-- $ctrl.phone.display.touchScreen = true -->

<dt>FM Radio</dt>
<dd>{{$ctrl.phone.hardware.fmRadio | checkmark}}</dd>
<!-- $ctrl.phone.hardware.fmRadio = false -->

<dt>Accelerometer</dt>
<dd>{{$ctrl.phone.hardware.accelerometer | checkmark}}</dd>
<!-- $ctrl.phone.hardware.accelerometer = true -->
````

---

### **Bước 7: AngularJS Filter Pipeline**

```
Expression: {{$ctrl.phone.connectivity.infrared | checkmark}}
                                    ↓
Step 1: Evaluate expression
        $ctrl.phone.connectivity.infrared → true
                                    ↓
Step 2: Apply filter 'checkmark'
        $filter('checkmark')(true)
                                    ↓
Step 3: Filter function executes
        input = true
        return input ? '\u2713' : '\u2718'
        → return '\u2713'
                                    ↓
Step 4: Render result
        Display: ✓
```

---

## 3. Chi tiết cách Filter nhận data

### **Filter KHÔNG lấy data trực tiếp!**

Filter chỉ là **pure function** nhận input và transform output:

```javascript
function(input) {
  return input ? '\u2713' : '\u2718';
}
```

### **Data flow:**

```
JSON file (phones/motorola-xoom.json)
         ↓
Phone.get() API call
         ↓
Controller: self.phone = {...}
         ↓
Template expression: {{$ctrl.phone.connectivity.gps}}
         ↓
Value passed to filter: true/false
         ↓
Filter transforms: true → ✓, false → ✘
         ↓
Rendered on UI
```

---

## 4. Ví dụ cụ thể với data thực tế

### **Input data (từ JSON):**

```json
{
  "connectivity": {
    "infrared": true,
    "gps": true
  },
  "hardware": {
    "fmRadio": false,
    "accelerometer": true
  }
}
```

### **Template expressions:**

```html
{{$ctrl.phone.connectivity.infrared | checkmark}}
{{$ctrl.phone.connectivity.gps | checkmark}}
{{$ctrl.phone.hardware.fmRadio | checkmark}}
{{$ctrl.phone.hardware.accelerometer | checkmark}}
```

### **Filter execution:**

| Expression | Input Value | Filter Logic | Output | UI Display |
|------------|-------------|--------------|--------|------------|
| `infrared \| checkmark` | `true` | `true ? '\u2713' : '\u2718'` | `'\u2713'` | ✓ |
| `gps \| checkmark` | `true` | `true ? '\u2713' : '\u2718'` | `'\u2713'` | ✓ |
| `fmRadio \| checkmark` | `false` | `false ? '\u2713' : '\u2718'` | `'\u2718'` | ✘ |
| `accelerometer \| checkmark` | `true` | `true ? '\u2713' : '\u2718'` | `'\u2713'` | ✓ |

---

## 5. Tại sao hiển thị ✓/✘ thay vì true/false?

### **JavaScript Unicode Characters:**

```javascript
'\u2713' // → ✓ (CHECK MARK - Unicode U+2713)
'\u2718' // → ✘ (HEAVY BALLOT X - Unicode U+2718)
```

### **Browser rendering:**

```html
<!-- Without filter -->
<dd>{{true}}</dd>  → displays: "true"
<dd>{{false}}</dd> → displays: "false"

<!-- With checkmark filter -->
<dd>{{true | checkmark}}</dd>  → displays: "✓"
<dd>{{false | checkmark}}</dd> → displays: "✘"
```

---

## 6. AngularJS $filter Service internals

### **Cách AngularJS resolve filter:**

````javascript
// Khi gặp: {{value | checkmark}}
// AngularJS thực thi:

var $filter = $injector.get('$filter');
var checkmarkFilter = $filter('checkmark');
var result = checkmarkFilter(value);
// result được render ra DOM
````

### **Filter registration:**

```javascript
angular.module('core').filter('checkmark', function() {
  // Factory function - được gọi 1 lần khi module load
  return function(input) {
    // Transform function - được gọi mỗi lần filter execute
    return input ? '\u2713' : '\u2718';
  };
});
```

**2-tier function:**
1. **Outer function** (factory): Chạy 1 lần khi module bootstrap
2. **Inner function** (transformer): Chạy mỗi khi filter được apply

---

## 7. Debug workflow

### **Test filter trong Console:**

```javascript
// Get injector
var injector = angular.element(document.body).injector();

// Get $filter service
var $filter = injector.get('$filter');

// Get checkmark filter
var checkmark = $filter('checkmark');

// Test
checkmark(true);   // → "✓"
checkmark(false);  // → "✘"
checkmark(1);      // → "✓" (truthy)
checkmark(0);      // → "✘" (falsy)
checkmark("yes");  // → "✓" (truthy)
checkmark("");     // → "✘" (falsy)
```

---

## 8. Sequence Diagram

```
User
  │
  │ Navigate to /phones/nexus-s
  ↓
Router
  │
  │ Match route → load <phone-detail>
  ↓
PhoneDetailController
  │
  │ Phone.get({ phoneId: "nexus-s" })
  ↓
Phone Service
  │
  │ $http GET nexus-s.json
  ↓
Server
  │
  │ Return JSON: { connectivity: { gps: true }, ... }
  ↓
PhoneDetailController
  │
  │ self.phone = response data
  ↓
Template (phone-detail.template.html)
  │
  │ {{$ctrl.phone.connectivity.gps | checkmark}}
  ↓
AngularJS $interpolate
  │
  │ Evaluate: $ctrl.phone.connectivity.gps → true
  ↓
AngularJS $filter
  │
  │ Apply filter 'checkmark'
  ↓
Checkmark Filter Function
  │
  │ input = true
  │ return '\u2713'
  ↓
DOM Rendering
  │
  │ Display: ✓
  ↓
User sees checkmark on screen
```

---

## 9. Tóm tắt

### **Checkmark Filter Workflow:**

1. **Module setup**: `core` module chứa filter
2. **Filter registration**: `.filter('checkmark', ...)` đăng ký transformation function
3. **App dependency**: `AngularJSWeb` module depend on `core`
4. **Data loading**: Controller fetch phone data từ JSON
5. **Template expression**: `{{value | checkmark}}` trigger filter
6. **Filter execution**: 
   - Input: `true`/`false` boolean value
   - Process: Ternary operator `input ? '\u2713' : '\u2718'`
   - Output: Unicode character `✓` hoặc `✘`
7. **UI rendering**: Browser hiển thị symbol thay vì text

### **Key Points:**

- ✅ Filter là **pure function** - không có side effects
- ✅ Filter **nhận data từ expression**, không tự fetch
- ✅ Filter chỉ **transform input → output**
- ✅ Unicode characters (`\u2713`, `\u2718`) render thành symbols
- ✅ Filter được cache và reuse cho performance---

## 9. Tóm tắt

### **Checkmark Filter Workflow:**

1. **Module setup**: `core` module chứa filter
2. **Filter registration**: `.filter('checkmark', ...)` đăng ký transformation function
3. **App dependency**: `AngularJSWeb` module depend on `core`
4. **Data loading**: Controller fetch phone data từ JSON
5. **Template expression**: `{{value | checkmark}}` trigger filter
6. **Filter execution**: 
   - Input: `true`/`false` boolean value
   - Process: Ternary operator `input ? '\u2713' : '\u2718'`
   - Output: Unicode character `✓` hoặc `✘`
7. **UI rendering**: Browser hiển thị symbol thay vì text

### **Key Points:**

- ✅ Filter là **pure function** - không có side effects
- ✅ Filter **nhận data từ expression**, không tự fetch
- ✅ Filter chỉ **transform input → output**
- ✅ Unicode characters (`\u2713`, `\u2718`) render thành symbols
- ✅ Filter được cache và reuse cho performance
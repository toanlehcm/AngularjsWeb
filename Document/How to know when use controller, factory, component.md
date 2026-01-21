@workspace /explain 
khi nào nên dùng 3 loại sau cho đúng chuẩn product code angularjs: factory, component, controller?
- làm sao nhận biết khi nào nên dùng loại nào?
- nếu có design pattern angularjs thì cho t link, website, blog tham khảo, 
- cho t link github source code để nghiên cứu chuẩn product code angularjs

# AngularJS: Factory vs Component vs Controller

## Khi nào nên dùng từng loại?

### 1. **Factory** (Service Layer)
**Mục đích:** Xử lý business logic, data access, API calls

**Khi nào dùng:**
- ✅ Gọi API/HTTP requests
- ✅ Chia sẻ data giữa các components
- ✅ Business logic có thể tái sử dụng
- ✅ Utility functions

**Ví dụ trong code của bạn:**
```javascript
// PhoneService.js - Đúng cách sử dụng Factory
// Chỉ lo việc lấy data từ API
angular.module("core.phone").factory("PhoneService", [
    "$resource",
    function ($resource) {
        return $resource("app/phones/:phoneId.json", {}, {
            query: {
                method: "GET",
                params: { phoneId: "phones" },
                isArray: true,
            },
        });
    }
]);
```

### 2. **Component** (UI Component - Recommend từ AngularJS 1.5+)
**Mục đích:** Tạo reusable UI components

**Khi nào dùng:**
- ✅ Tạo UI components có thể tái sử dụng
- ✅ Component-based architecture (chuẩn bị migrate lên Angular 2+)
- ✅ Có template và controller riêng
- ✅ Isolated scope (bindings)

**Ví dụ trong code của bạn:**
```javascript
// phone-detail.component.js - Đúng cách!
angular.module("AngularJSWeb").component("phoneDetail", {
    templateUrl: "app/phone-detail/phone-detail.template.html",
    controller: ["$routeParams", "PhoneService",
        function PhoneDetailController($routeParams, PhoneService) {
            var self = this;
            self.phoneId = $routeParams.phoneId;
            
            // Component CHỈ lo việc UI logic
            // Gọi Service để lấy data
            self.phone = PhoneService.get(
                { phoneId: $routeParams.phoneId }, 
                function (phone) {
                    self.setImage(phone.images[0]);
                }
            );

            self.setImage = function setImage(imageUrl) {
                self.mainImageUrl = imageUrl;
            };
        }
    ]
});
```

### 3. **Controller** (Legacy - Không recommend cho code mới)
**Khi nào dùng:**
- ⚠️ Legacy code (AngularJS < 1.5)
- ⚠️ Routing với ng-route/ui-router (khi chưa migrate sang component)
- ❌ **KHÔNG nên dùng cho code mới** - Hãy dùng Component thay thế

**Code của bạn nên refactor:**
```javascript
// ❌ BAD: Dùng Controller trực tiếp
// phone-list.controller.js
angular.module("AngularJSWeb").controller("PhoneListController", [...]);

// ✅ GOOD: Refactor thành Component
angular.module("AngularJSWeb").component("phoneList", {
    templateUrl: "app/phone-list/phone-list.template.html",
    controller: function PhoneListController() {
        var self = this;
        // Logic here
    }
});
```

## Cách nhận biết nhanh

```
User tương tác với UI
        ↓
    COMPONENT (UI Logic)
        ↓
    FACTORY/SERVICE (Business Logic & Data)
        ↓
    Backend API
```

**Nguyên tắc vàng:**
- **Component** = "What user sees" (UI + presentation logic)
- **Factory/Service** = "How it works" (data + business logic)
- **Controller** = Legacy, tránh dùng

## Design Patterns & Best Practices

### 📚 Official Resources:
1. **AngularJS Style Guide (John Papa)**
   - https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md
   - ⭐ Best practices chuẩn industry

2. **Official AngularJS Docs**
   - https://docs.angularjs.org/guide/component
   - Component-based architecture

3. **Todd Motto's Style Guide**
   - https://github.com/toddmotto/angularjs-styleguide
   - Modern AngularJS patterns

### 🔥 Production-Ready GitHub Repos:

1. **Angular PhoneCat (Official Tutorial)**
   - https://github.com/angular/angular-phonecat
   - Best practices từ Angular team

2. **MEAN Stack Examples**
   - https://github.com/linnovate/mean
   - Full production stack

3. **Angular Seed (Component-based)**
   - https://github.com/mgechev/angular-seed
   - Modern architecture

4. **Real World AngularJS**
   - https://github.com/GoThinkster/angularjs-realworld-example-app
   - RealWorld app spec

## Refactor Suggestions cho code của bạn

````javascript
// ✅ Refactor phone-list.controller.js thành component
angular.module("AngularJSWeb").component("phoneList", {
    templateUrl: "app/phone-list/phone-list.template.html",
    controller: ["PhoneService", function PhoneListController(PhoneService) {
        var self = this;
        
        // Lấy data từ service, không hard-code
        self.phones = PhoneService.query();
        self.orderProp = "age";
    }]
});
````

**Key Takeaway:** Component-based > Controller-based. Factory cho data/logic, Component cho UI! 🚀
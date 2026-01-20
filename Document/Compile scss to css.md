# Sửa npm scripts để compile toàn bộ SCSS files

## Vấn đề hiện tại

Script hiện tại chỉ compile 1 file cụ thể:
```json
"sass": "sass app/style app/style/tutorial/tutorial.css"
```

## Giải pháp

````json
{
  "name": "angularjsweb",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "live-server --port=3000 --entry-file=app/index.html",
    "sass": "sass app/style:app/style --no-source-map",
    "sass:watch": "sass --watch app/style:app/style --no-source-map",
    "dev": "npm run sass:watch & npm start",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/toanlehcm/AngularjsWeb.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/toanlehcm/AngularjsWeb/issues"
  },
  "homepage": "https://github.com/toanlehcm/AngularjsWeb#readme",
  "description": "",
  "dependencies": {
    "angular": "^1.8.2",
    "angular-route": "^1.8.2",
    "bootstrap": "^5.3.8"
  },
  "devDependencies": {
    "live-server": "^1.2.2",
    "sass": "^1.97.2"
  }
}
````

## Cách hoạt động

### Syntax: `sass <input>:<output>`

```bash
sass app/style:app/style
```

- **Input folder:** style (chứa `.scss` files)
- **Output folder:** style (tạo `.css` files cùng thư mục)

### Kết quả:

```
app/style/
├── app.scss          → app.css
├── tutorial.scss     → tutorial.css
├── phone-list/
│   └── phone-list.scss → phone-list.css
└── phone-detail/
    └── phone-detail.scss → phone-detail.css
```

## Tùy chọn thêm

### Nếu muốn output vào folder khác:

```json
"sass": "sass app/style:app/css --no-source-map"
```

### Nếu muốn compressed (minified):

```json
"sass": "sass app/style:app/style --style=compressed --no-source-map"
```

### Nếu muốn source map (để debug):

```json
"sass": "sass app/style:app/style"
```

## Chạy scripts

```bash
# Compile 1 lần
npm run sass

# Watch mode (tự động compile khi save)
npm run sass:watch

# Chạy cả watch + server
npm run dev
```

## Lưu ý

### Thêm vào .gitignore:

```
# Compiled CSS
app/style/**/*.css
app/style/**/*.css.map

# Exclude specific CSS if needed
!app/style/vendor/*.css
```
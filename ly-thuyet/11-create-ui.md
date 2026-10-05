# Tự Học NodeJS & Express & MongoDB #14 - Create UI

## 1. Tổ chức lại cấu trúc thư mục views
**Công dụng:** Phân chia các file template `.ejs` vào từng thư mục con tương ứng với từng module để tránh xung đột tên file khi dự án mở rộng.

```plaintext
views/
├── products/
│   ├── index.ejs    <-- Giao diện danh sách sản phẩm
│   └── create.ejs   <-- Giao diện form thêm mới sản phẩm
└── index.ejs        <-- Giao diện trang chủ gốc (/)
```

- **`views/products/create.ejs`**: File template mới chứa mã HTML của biểu mẫu (form) tạo sản phẩm.
- **`views/products/index.ejs`**: Di chuyển mã HTML hiển thị danh sách sản phẩm từ file `views/index.ejs` cũ vào bên trong thư mục con `products`.
- **`views/index.ejs`**: Giữ lại ở cấp ngoài cùng để làm giao diện cho trang chủ gốc (`/`), hiển thị nội dung tĩnh "Welcome to Ninedev".

## 2. Cập nhật `modules/products/product.controller.js`
**Công dụng:** Điều chỉnh đường dẫn trỏ tới các file template trong thư mục con `views/products`.

```javascript
exports.getAllProducts = (req, res) => {
    res.render('products/index', { title: "NodeJS Ninedev 2024", products });
};

exports.createProduct = (req, res) => {
    res.render('products/create');
};
```
**Thuật ngữ & Cú pháp:**
- `res.render('products/index', ...)`: Chỉ định Express tìm file `index.ejs` nằm bên trong thư mục con `views/products/`, sau đó biên dịch cùng dữ liệu truyền vào thành HTML.
- `res.render('products/create')`: Biên dịch file `views/products/create.ejs` thành mã HTML và gửi về trình duyệt.

## 3. Cập nhật `index.js` (Route Trang chủ gốc)
**Công dụng:** Định nghĩa thêm route riêng cho đường dẫn gốc `/` vì `productRouter` đã sử dụng tiền tố `/products`.

```javascript
app.get('/', (req, res) => {
    res.render('index');
});
```
**Thuật ngữ & Cú pháp:**
- `app.get('/', ...)`: Đăng ký một route trực tiếp trên instance app để lắng nghe phương thức HTTP GET tại đường dẫn gốc (`/`).
- `res.render('index')`: Biên dịch file `views/index.ejs` ở cấp ngoài cùng và trả về trình duyệt.
- **Lưu ý xử lý lỗi:** Vì lệnh `res.render('index')` ở đây không truyền kèm biến `title`, bạn phải đổi thẻ `<title><%= title %></title>` trong file `views/index.ejs` thành chuỗi tĩnh `<title>Trang chủ</title>` để tránh lỗi biến không tồn tại.

## 4. Đồng bộ điều hướng (href) trong các file `.ejs`
**Công dụng:** Liên kết các trang HTML với nhau thông qua thẻ `<a>` trên thanh điều hướng (Header) ở các file EJS.

```html
<a href="/">Logo Ninedev (Trang chủ)</a>
<a href="/products">Home (Danh sách sản phẩm)</a>
<a href="/products/create">Create (Tạo sản phẩm)</a>
```
**Thuật ngữ & Cú pháp:**
- `href="/"`: Gửi HTTP Request GET `/`, kích hoạt route gốc và render `views/index.ejs`.
- `href="/products"`: Gửi HTTP Request GET `/products`, kích hoạt hàm `getAllProducts` và render `views/products/index.ejs`.
- `href="/products/create"`: Gửi HTTP Request GET `/products/create`, kích hoạt hàm trả về giao diện form.

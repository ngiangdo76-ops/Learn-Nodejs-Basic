# Lý thuyết: View và View Engine (EJS) là gì?

Trong các bài trước, server chỉ trả về dữ liệu thô (dạng chữ hoặc JSON) thông qua `res.send()` hoặc `res.json()`. Tuy nhiên, để người dùng cuối có thể nhìn thấy một trang web hoàn chỉnh (có bố cục, màu sắc, nút bấm...), server cần trả về mã HTML, CSS, và JavaScript.

- **Nhiệm vụ của View:** Chứa code giao diện (HTML, CSS, JS) để hiển thị cho người dùng.
- **Nhiệm vụ của Controller:** Tiếp nhận yêu cầu từ người dùng, xử lý logic và quyết định sẽ gọi (render) file View nào ra màn hình.

Để giúp Node.js có thể đọc, xử lý và xuất các file giao diện HTML ra trình duyệt một cách linh hoạt, chúng ta cần sử dụng một công cụ gọi là **View Engine** (hay Template Engine). Trong bài này, chúng ta sử dụng thư viện **EJS** (Embedded JavaScript).

---

## Các bước thực hiện

### Bước 1: Cài đặt thư viện EJS
Chạy lệnh sau trong terminal để cài đặt package `ejs` vào dự án:
```bash
npm install ejs
```

### Bước 2: Cấu hình View Engine trong file Server chính (`index.js`)
Khai báo cho Express biết rằng bạn đang sử dụng `ejs` làm công cụ hiển thị giao diện và chỉ định thư mục chứa các file giao diện đó:
```javascript
// 1. Khai báo sử dụng ejs làm view engine
app.set('view engine', 'ejs');

// 2. Chỉ định thư mục chứa các file giao diện là thư mục 'views'
app.set('views', './views');
```

### Bước 3: Tạo thư mục và file giao diện (`index.ejs`)
Tạo một thư mục tên là `views`. Bên trong đó, tạo một file tên là `index.ejs` (đóng vai trò là giao diện trang chủ).
Cú pháp bên trong file `.ejs` hoàn toàn giống với một file `.html` bình thường:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>NodeJS Basic 2024</title>
</head>
<body>
    <h1>Hello Ninedev 2024</h1>
    <h2>Welcome to Ninedev</h2>
</body>
</html>
```

### Bước 4: Gọi giao diện từ Controller (Render View)
Thay vì dùng `res.send()`, bạn đổi sang dùng hàm `res.render()` ở đường dẫn trang chủ `/` để trả về file giao diện:

```javascript
app.get('/', (req, res) => {
    // Tự động tìm vào thư mục './views' và lấy file 'index.ejs' ra hiển thị
    res.render('index');
});
```
*Lưu ý:* Truyền tên file là `'index'` (không cầ n đuôi `.ejs` hay đường dẫn thư mục), vì Express đã tự hiểu dựa vào phần cấu hình `app.set` ở Bước 2.

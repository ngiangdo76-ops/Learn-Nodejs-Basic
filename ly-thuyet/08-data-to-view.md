# Truyền dữ liệu động từ Controller sang View (EJS)

## 1. Lý thuyết: Static Value và Dynamic Value là gì?
- **Static Value (Giá trị tĩnh / Hardcode):** Là những nội dung bạn gõ chết (cố định) trực tiếp vào trong file giao diện HTML. Ví dụ: bạn viết thẳng chữ "Hello Ninedev" vào thẻ tiêu đề. Dù ai truy cập hay dữ liệu trong database có thay đổi thế nào, dòng chữ đó vẫn đứng im không đổi.
- **Dynamic Value (Giá trị động):** Là những dữ liệu được tính toán, xử lý ở phía Backend (dựa vào điều kiện đầu vào hoặc lấy từ Database ra), sau đó mới truyền sang View để hiển thị. Đầu vào thay đổi thì kết quả hiển thị trên giao diện (đầu ra) cũng tự động cập nhật theo.
*(Liên hệ: Cách hoạt động này khá giống với việc bạn truyền props từ Component cha xuống Component con trong React, nhưng ở đây là truyền từ hàm xử lý của Express xuống file giao diện .ejs).*

---

## 2. Cách thực hiện (2 bước)

### Bước 1: Gửi dữ liệu từ Controller (`index.js`)
Thay vì chỉ gọi `res.render('index')`, bạn cần truyền thêm tham số thứ 2 là dữ liệu.
**Lưu ý:** Dữ liệu truyền đi bắt buộc phải được đóng gói trong một `Object` (dạng `{ key: value }`).

```javascript
app.get('/', (req, res) => {
  // 1. Chuẩn bị Object dữ liệu
  const data = {
    title: "NodeJS Ninedev 2024",
    message: "Welcome to my website",
    sum: 2 + 3 // Truyền cả một phép tính hoặc mảng/chuỗi bất kỳ
  };

  // 2. Gọi file 'index.ejs' và thả Object data vào trong đó
  res.render('index', data);
});
```

### Bước 2: Nhận và in dữ liệu bên file View (`index.ejs`)
Để lấy được các giá trị trong `data` in ra thành HTML, bạn sử dụng cú pháp đặc trưng của EJS là `<%= tên_biến %>`.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <!-- In biến title lên tên Tab trình duyệt -->
    <title><%= title %></title>
</head>
<body>
    <!-- In biến message ra thành chữ lớn -->
    <h1><%= message %></h1>
    
    <!-- Sẽ in ra: Kết quả tính toán: 5 -->
    <p>Kết quả tính toán: <%= sum %></p>
</body>
</html>
```

**⚠️ Bắt lỗi thường gặp:** Tên biến nằm trong `<%= ... %>` phải ghi giống y hệt chữ (đúng viết hoa/viết thường) với cái `key` bạn đã khai báo bên Controller. Nếu sai, EJS sẽ báo lỗi **is not defined** và trang web sẽ bị sập.

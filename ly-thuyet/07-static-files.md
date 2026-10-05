# Asset Static (Tài nguyên tĩnh)

**Asset Static** là các file như hình ảnh, CSS, JavaScript được lưu trực tiếp trên Server.
Mặc định, Express chặn người dùng bên ngoài truy cập vào các file này. Để cho phép truy cập, ta cần tạo một thư mục công khai (ví dụ: `public`) và cấu hình.

---

## 1. Cấu hình thư mục tĩnh (`index.js`)
Sử dụng middleware `express.static` để mở quyền truy cập cho thư mục `public`:
```javascript
app.use(express.static('public'));
```

## 2. Cách truy cập file tĩnh
Bất kỳ file nào đặt trong thư mục `public` đều có thể xem qua URL.
**⚠️ Lưu ý quan trọng: Express mặc định `public` là thư mục gốc nên tuyệt đối KHÔNG gõ chữ `/public` vào URL.**

- **File trực tiếp:** Cấu trúc `public/slide1.jpg`
  👉 Truy cập: `http://localhost:3000/slide1.jpg`
- **File trong thư mục con:** Cấu trúc `public/image/slide2.jpg`
  👉 Truy cập: `http://localhost:3000/image/slide2.jpg`

## 3. Chèn vào giao diện (EJS)
Trong file `index.ejs`, chỉ cần gọi đường dẫn bắt đầu từ sau thư mục `public`:
```html
<img src="/image/slide2.jpg" alt="Hình ảnh minh họa" />
```

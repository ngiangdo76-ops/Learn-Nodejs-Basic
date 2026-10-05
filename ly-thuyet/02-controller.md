# Lý thuyết về Controller và Routing trong Express.js

## 1. Controller là gì?
Trong mô hình MVC (Model-View-Controller) hoặc kiến trúc cơ bản của Express, Controller là phần chịu trách nhiệm:
- **Tiếp nhận thông tin** từ người dùng khi họ truy cập vào một đường dẫn (URL) nào đó.
- **Nhận thông tin request (`req`)** từ phía client gửi lên (ví dụ: dữ liệu người dùng nhập, tham số URL...).
- Xử lý các logic cần thiết và **phản hồi thông tin response (`res`)** trả về cho phía client.

## 2. Định nghĩa URL cho đường dẫn Controller
Để gắn một controller với một đường dẫn cụ thể, chúng ta sử dụng các hàm tương ứng với các phương thức HTTP (GET, POST, PUT, DELETE...).

Cú pháp chung: `app.METHOD(PATH, HANDLER)`
- `app`: Đối tượng express.
- `METHOD`: Tên phương thức HTTP dạng chữ thường (get, post, put, delete).
- `PATH`: Đường dẫn trên server (ví dụ: `/`, `/create`).
- `HANDLER`: Hàm thực thi (controller) nhận vào 2 tham số chính là `req` và `res`.

## 3. Ví dụ minh họa các phương thức cơ bản

### GET - Lấy dữ liệu
Thường dùng để đọc hoặc lấy thông tin từ server.
```javascript
app.get('/', (req, res) => {
    // req: chứa thông tin client gửi lên
    // res: dùng để trả về kết quả
    res.json('Ninedev 2024');
});
```

### POST - Tạo mới dữ liệu
Thường dùng để gửi dữ liệu từ form hoặc client lên server để tạo mới.
```javascript
app.post('/create', (req, res) => {
    res.json('Create');
});
```

### PUT - Cập nhật dữ liệu
Thường dùng khi muốn sửa đổi toàn bộ thông tin của một đối tượng đã có.
```javascript
app.put('/update', (req, res) => {
    res.json('Update');
});
```

### DELETE - Xóa dữ liệu
Thường dùng khi muốn xóa một đối tượng nào đó trên server.
```javascript
app.delete('/delete', (req, res) => {
    res.json('Delete');
});
```

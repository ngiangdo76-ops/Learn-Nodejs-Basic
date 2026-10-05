# Lý thuyết: Body & Body Parser là gì?

Khi bạn làm việc với các chức năng như Đăng nhập, Đăng ký, hoặc Thêm mới sản phẩm (thường dùng các phương thức `POST`, `PUT`, `PATCH`), bạn không thể truyền dữ liệu nhạy cảm (như mật khẩu) hoặc một lượng dữ liệu lớn lên thanh URL (qua Params hay Query) được.

Lúc này, phía Frontend sẽ đóng gói dữ liệu thành một Object (thường ở định dạng JSON) và giấu vào phần thân của Request, gọi là **Body**.

Trong Express, bạn có thể dễ dàng lấy dữ liệu này ra thông qua đối tượng `req.body`.

---

## Phân tích Code

Ở các phiên bản Express.js mới hiện nay (từ bản 4.16 trở lên), Express đã tích hợp sẵn luôn `body-parser` vào trong chính nó. Bạn chỉ cần gọi:

```javascript
// Giúp server đọc được dữ liệu định dạng JSON (phổ biến nhất khi gọi API)
app.use(express.json()); 

// Giúp server đọc được dữ liệu từ các thẻ <form> HTML truyền thống
app.use(express.urlencoded({ extended: true }));
```

### Cách nhận dữ liệu trong Route
Bên trong route `app.post('/create', ...)`, bạn chỉ việc lấy `req.body` ra sử dụng:

```javascript
app.post('/create', (req, res) => {
    // req.body sẽ chứa toàn bộ Object mà Client gửi lên
    const data = req.body;
    console.log("Dữ liệu nhận được:", data);
    
    // Phản hồi lại đúng dữ liệu vừa nhận về cho Client kiểm tra
    res.send(data);
});
```

### Giả lập gửi dữ liệu từ Client
Bạn có thể dùng công cụ như Postman, chuyển sang phương thức `POST`, chọn phần Body -> raw -> định dạng JSON và gửi dữ liệu lên URL `/create`:
```json
{
  "username": "ninedev",
  "password": "123"
}
```
Lúc này trên terminal server sẽ in ra đúng cục dữ liệu đó nhờ dòng `console.log`, và Postman cũng sẽ nhận lại đúng kết quả tương tự.

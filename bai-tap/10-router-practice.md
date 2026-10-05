# Bài Tập Thực Hành: Cấu Hình Router Cho User

**Mục tiêu:** Áp dụng kiến trúc Controller & Router (chia module) để tạo API cho đối tượng Người dùng (User).  
**Yêu cầu:** Khi truy cập vào `http://localhost:3001/users`, màn hình sẽ hiển thị ra một danh sách người dùng (dạng JSON).

---

## Các bước thực hiện

### Bước 1: Tạo Controller cho User (`user.controller.js`)
1. Tạo một thư mục con là `users` bên trong thư mục `modules` hiện có.
2. Tạo file `user.controller.js` bên trong thư mục `modules/users/`.
3. Trong file này, khai báo một mảng dữ liệu người dùng ảo (ví dụ có `id`, `name`, `email`).
4. Viết một hàm tên là `getAllUsers` nhận vào `req` và `res`. Bên trong hàm, dùng `res.json()` để trả về mảng dữ liệu vừa tạo.
5. Xuất hàm này ra bằng từ khóa `exports`.

```javascript
// Gợi ý cấu trúc file user.controller.js
const users = [
    { id: 1, name: "Nguyen Van A", email: "a@gmail.com" },
    { id: 2, name: "Tran Thi B", email: "b@gmail.com" }
];

exports.getAllUsers = (req, res) => {
    // Viết code trả về mảng users dưới định dạng JSON ở đây
};
```

### Bước 2: Tạo Router cho User (`user.router.js`)
1. Tạo file `user.router.js` nằm cùng thư mục với file Controller ở trên (`modules/users/`).
2. Khởi tạo `express.Router()`.
3. Import file `user.controller.js` vào file router này.
4. Định nghĩa một đường dẫn `GET` với tiền tố là `/users` và móc nối nó với hàm `getAllUsers` vừa viết ở Bước 1.
5. Dùng `module.exports = router;` để xuất Router này ra.

```javascript
// Gợi ý cấu trúc file user.router.js
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

const prefix = '/users';

// Định nghĩa router GET ở đây
// router.get(prefix, ...);

module.exports = router;
```

### Bước 3: Đăng ký Router mới vào file gốc (`index.js`)
1. Mở file `index.js` (file gốc nằm ngoài cùng của dự án).
2. Dùng lệnh `require` để import file `user.router.js` vừa tạo. (Ví dụ: đặt tên biến là `userRouter`).
3. Dùng lệnh `app.use()` để gắn router đó vào ứng dụng với đường dẫn gốc `/`.

```javascript
// Gợi ý cấu trúc trong file index.js
const userRouter = require('./modules/users/user.router');

// ... (phía dưới các cấu hình app.use khác)
app.use('/', userRouter);
```

### Bước 4: Chạy thử và Kiểm tra
1. Đảm bảo server đang chạy (chạy `npm start` nếu server đang tắt).
2. Mở trình duyệt và truy cập địa chỉ: **`http://localhost:3001/users`**
3. Nếu trình duyệt hiển thị ra đoạn dữ liệu JSON chứa thông tin những người dùng mà bạn đã tạo ở Bước 1, nghĩa là bạn đã thiết lập Router thành công!

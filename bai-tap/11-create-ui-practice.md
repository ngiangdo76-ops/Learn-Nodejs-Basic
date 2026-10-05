# Bài Tập Thực Hành: Tổ Chức Lại Giao Diện (Create UI)

**Mục tiêu:** Áp dụng kiến trúc chia thư mục giao diện cho View Engine (EJS), cập nhật lại Controller và điều hướng URL thông qua Header.

---

## Các bước thực hiện

### Bước 1: Tổ chức lại thư mục `views`
1. Tạo một thư mục con tên là `products` bên trong thư mục `views` hiện có.
2. Sao chép (Copy) hoặc di chuyển file `views/index.ejs` hiện tại vào bên trong thư mục `views/products/`. File này sẽ tiếp tục đóng vai trò hiển thị danh sách sản phẩm.
3. Tạo mới một file tên là `create.ejs` bên trong `views/products/`. Tạm thời chỉ cần viết thẻ HTML cơ bản và một thẻ `<h1>Đây là trang Tạo Sản Phẩm</h1>` vào file này.
4. Ở thư mục `views` gốc (cấp ngoài cùng), hãy tạo một file `index.ejs` mới. Code một giao diện tĩnh cơ bản có thẻ `<h1>Welcome to Ninedev Trang Chủ</h1>` và lưu ý sử dụng thẻ tĩnh `<title>Trang Chủ</title>`.

### Bước 2: Cập nhật file Controller
1. Mở file `modules/products/product.controller.js`.
2. Tìm hàm `getAllProducts`, sửa đường dẫn render từ `res.render('index', ...)` thành `res.render('products/index', ...)`.
3. Tìm hàm `createProduct` (nếu đã có thì sửa lại, nếu chưa thì thêm mới), bên trong gọi `res.render('products/create')`. Không dùng `res.send()` nữa.

### Bước 3: Cấu hình Router và file gốc `index.js`
1. Mở file `modules/products/product.router.js`. Hãy định nghĩa một route `GET` với đường dẫn là `/products/create` và móc vào hàm `createProduct` vừa cập nhật ở Bước 2. *(Lưu ý: Khi viết route trong Express, bạn cần truyền đường dẫn tương đối so với tiền tố `prefix`. Vì tiền tố đã là `/products`, bạn chỉ cần khai báo đường dẫn phụ là `/create`)*.
2. Mở file `index.js` (ngoài cùng). Tạo một route mới bằng `app.get('/', ...)` dành cho trang chủ. Bên trong gọi `res.render('index')` để kết xuất file `views/index.ejs` ở cấp ngoài cùng.

### Bước 4: Đồng bộ Header (Điều hướng)
Hãy mở cả 3 file EJS (bao gồm `views/index.ejs`, `views/products/index.ejs`, `views/products/create.ejs`) và cập nhật lại thanh điều hướng (các thẻ điều hướng) sao cho:
- Nút Logo trỏ về: `href="/"`
- Nút Home (Danh sách) trỏ về: `href="/products"`
- Nút Create trỏ về: `href="/products/create"`

*(Nếu dùng thẻ `div` như code hiện tại, bạn có thể bọc thẻ `<a>` xung quanh, hoặc đổi thẻ `div` thành thẻ `a`)*.

### Bước 5: Chạy thử và Kiểm tra
1. Truy cập `http://localhost:3001/` ➡️ Hiện trang chủ tĩnh "Welcome to Ninedev".
2. Truy cập `http://localhost:3001/products` ➡️ Hiện trang danh sách sản phẩm y như lúc trước.
3. Truy cập `http://localhost:3001/products/create` ➡️ Hiện trang Tạo Sản Phẩm.
4. Click thử các nút điều hướng trên Header xem có chuyển trang mượt mà không.

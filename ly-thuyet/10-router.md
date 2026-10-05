# Tự Học NodeJS & Express & MongoDB #13 - Router

## 1. Lý thuyết: Tại sao phải dùng Router và tách file?
**Vấn đề khi viết chung một file:** 
Ở các bài trước, mọi đường dẫn (`app.get`, `app.post`, `app.put`, `app.delete`) đều viết chung trong file `index.js`. Nếu một dự án thực tế có hàng chục đối tượng (Sản phẩm, Người dùng, Đơn hàng...) và mỗi hàm xử lý dài khoảng 100 dòng code, file `index.js` sẽ phình to lên hàng ngàn dòng, cực kỳ rối và không thể bảo trì.

**Giải pháp phân tách nhiệm vụ:**
- **Controller (`product.controller.js`):** Chỉ chứa các hàm (functions) xử lý logic và dữ liệu.
- **Router (`product.router.js`):** Là bộ định tuyến, quyết định đường dẫn URL nào và phương thức nào (GET, POST, PUT, DELETE) sẽ gọi tới hàm nào bên trong Controller.
- **File gốc (`index.js`):** Chỉ làm nhiệm vụ khởi chạy server và nhúng (import) các Router vào sử dụng.

## 2. Cấu trúc thư mục mới (Theo phong cách NestJS)
Tạo một thư mục `modules` để gom nhóm các đối tượng nghiệp vụ lại với nhau:
```plaintext
Learn-Nodejs-Basic/
├── modules/
│   ├── products/
│   │   ├── product.controller.js  <-- Chứa các hàm xử lý logic của Product
│   │   └── product.router.js      <-- Chứa các đường dẫn URL của Product
│   └── users/                     <-- (Tương tự cho User sau này)
├── public/
├── views/
└── index.js                       <-- File chạy chính (bây giờ rất gọn)
```

## 3. Phân tích Code theo 3 bước

### Bước 1: Tạo Controller (`modules/products/product.controller.js`)
Cắt toàn bộ mảng dữ liệu `products` và các hàm xử lý từ `index.js` đem qua file này. Thay vì gắn trực tiếp vào `app.get()`, ta dùng `exports.<tên_hàm>` để xuất từng hàm ra ngoài cho file khác sử dụng:
```javascript
// Dữ liệu giả lập
const products = [
    { id: 1, name: "Giày 1", description: "Mô tả 1", image: "/image/s1.jpg" },
    // ... các sản phẩm khác
];

// 1. Hàm lấy danh sách sản phẩm (hiển thị ra View)
exports.getAllProducts = (req, res) => {
    res.render('index', { title: "NodeJS Ninedev 2024", products });
};

// 2. Hàm lấy chi tiết sản phẩm theo ID (Params)
exports.getProductById = (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(item => item.id == id);
    res.json(products[index]);
};

// 3. Các hàm thêm, sửa, xóa
exports.createProduct = (req, res) => {
    res.send(req.body);
};
exports.updateProduct = (req, res) => {
    res.send("Updated");
};
exports.deleteProduct = (req, res) => {
    res.send("Deleted");
};
```

### Bước 2: Tạo Router (`modules/products/product.router.js`)
File này sử dụng `express.Router()` để định nghĩa các đường dẫn, sau đó nối chúng với các hàm tương ứng đã viết ở Bước 1:
```javascript
const express = require('express');
const router = express.Router();

// Import toàn bộ các hàm từ file product.controller.js vào
const productController = require('./product.controller');

// Tạo biến prefix (tiền tố đường dẫn chung cho module sản phẩm)
const prefix = '/products';

// Định nghĩa các đường dẫn và gắn hàm xử lý tương ứng
router.get(prefix, productController.getAllProducts);             // GET: /products
router.get(`${prefix}/detail/:id`, productController.getProductById); // GET: /products/detail/:id
router.post(prefix, productController.createProduct);             // POST: /products
router.put(prefix, productController.updateProduct);              // PUT: /products
router.delete(prefix, productController.deleteProduct);           // DELETE: /products

// Xuất router này ra để file index.js có thể sử dụng
module.exports = router;
```
*Giải thích:* Biến `prefix = '/products'` giúp đánh dấu toàn bộ các API trong file này đều thuộc về nhánh `/products`.

### Bước 3: Nhúng Router vào file chính (`index.js`)
Sau khi đã chuyển hết logic sang 2 file trên, file `index.js` giờ cực kỳ gọn gàng. Chỉ cần `require` cái `productRouter` vào và đăng ký bằng `app.use()`:
```javascript
const express = require('express');
const app = express();

// Import router của product
const productRouter = require('./modules/products/product.router');

// Các cấu hình cơ bản (Body Parser, View Engine, Static folder)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// Đăng ký sử dụng productRouter từ đường dẫn gốc '/'
app.use('/', productRouter);

app.listen(3000, () => {
    console.log("Server đang chạy tại port 3000");
});
```

**Lưu ý khi chạy trên trình duyệt:**
Vì trong `product.router.js` đã gắn `prefix = '/products'`, nên lúc này để xem giao diện danh sách sản phẩm như bài trước, bạn phải truy cập vào đường dẫn: `http://localhost:3000/products` (thay vì `localhost:3000/` như cũ).

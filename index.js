const express = require('express');
const app = express();
const port = 3000;

// Import router của product
const productRouter = require('./modules/products/product.router');
// Import router của user
const userRouter = require('./modules/users/user.router');

// Cấu hình Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Cấu hình View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Đăng ký sử dụng productRouter từ đường dẫn gốc '/'
app.use('/', productRouter);
// Đăng ký sử dụng userRouter
app.use('/', userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
});

# Lý thuyết Node.js & Express căn bản

## 1. Node.js là gì?
- Node.js là một môi trường runtime chạy JavaScript phía server, được xây dựng dựa trên V8 engine của Chrome.
- Giúp chúng ta viết code backend bằng ngôn ngữ JavaScript.

## 2. Express.js là gì?
- Express là một framework siêu nhẹ dành cho Node.js, giúp việc xây dựng web server và API trở nên dễ dàng và nhanh chóng hơn rất nhiều so với việc dùng module `http` mặc định của Node.js.

## 3. Các thành phần cơ bản trong ứng dụng Express
- **App**: `const app = express()` tạo ra ứng dụng chính.
- **Port**: Cổng mà server sẽ lắng nghe (ví dụ 3000, 8080).
- **Route**: Các đường dẫn (URL) mà người dùng truy cập. Ví dụ: `app.get('/', ...)`
- **Request (req)**: Đối tượng chứa các thông tin mà người dùng gửi lên server (param, body, header...).
- **Response (res)**: Đối tượng dùng để gửi dữ liệu trả về cho người dùng (JSON, file HTML...).

## 4. Middleware
- Là các hàm được chạy ở giữa quá trình nhận Request và trả về Response.
- Ví dụ: `body-parser` giúp đọc dữ liệu JSON gửi từ client.

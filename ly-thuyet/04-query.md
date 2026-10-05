# Lý thuyết: Query String là gì?

Nếu **Params** dùng để xác định một đối tượng cụ thể (ví dụ: `/:id`), thì **Query** (chuỗi truy vấn) là các thông số bổ sung nằm ở cuối đường dẫn URL, bắt đầu bằng dấu chấm hỏi `?`.
Nếu có nhiều tham số truyền vào, chúng sẽ được nối với nhau bằng dấu và `&`.

**Ví dụ URL:** `/course?name=react&page=1`
- `name=react` và `page=1` chính là các query.

**Mục đích:** Thường được sử dụng để lọc dữ liệu (filter), tìm kiếm (search), hoặc phân trang (pagination).

Để lấy được các giá trị này trong Express.js, bạn sẽ sử dụng đối tượng `req.query` thay vì `req.params`.

---

## Phân tích Code

Đoạn code dưới đây kết hợp cả Params và Query trên cùng một đường dẫn:

```javascript
// Định nghĩa route kết hợp cả Params (:id) và Query
// Khách hàng sẽ gọi URL dạng: /course/5?name=123&page=10
app.get('/course/:id', (req, res) => {
    // 1. Lấy ID từ req.params (Đại diện cho số 5 trong URL)
    const { id } = req.params;
    
    // 2. Lấy thông tin name và page từ req.query (Đại diện cho phần sau dấu ?)
    const { name, page } = req.query;
    
    // 3. Phản hồi dữ liệu lại cho trình duyệt / client
    res.json({ course_id: id, query_name: name, query_page: page });
});
```

### Giải thích từng bước:

Khi người dùng truy cập URL: `/course/5?name=123&page=10`

1. **Xử lý Params:** Express thấy phần `/course/5` khớp với route `/course/:id`, nên nó gán giá trị `5` vào `req.params.id`. Sử dụng destructuring `const { id } = req.params`, ta lấy ra được số `5`.
2. **Xử lý Query:** Phần còn lại sau dấu chấm hỏi `?name=123&page=10` sẽ được Express tự động gom thành một object lưu trong `req.query`. Sử dụng destructuring, ta dễ dàng tách ra được biến `name` (là `"123"`) và biến `page` (là `"10"`).
3. Cuối cùng, hàm `res.json()` sẽ trả về kết quả tổng hợp cho người dùng thấy.

---

## Tổng kết: Params vs Query

Để bạn dễ hình dung khi nào dùng cái nào, đây là bảng so sánh nhanh:

| Đặc điểm | Params (`req.params`) | Query (`req.query`) |
| :--- | :--- | :--- |
| **Nhận diện trên URL** | Nằm lẫn trong các xuyệt (`/course/5`) | Nằm sau dấu chấm hỏi (`/course?page=5`) |
| **Khai báo ở Route** | Bắt buộc phải khai báo (`/course/:id`) | Không cần khai báo trong Route (`/course`) |
| **Mục đích chính** | Xác định một tài nguyên cụ thể (VD: Lấy chi tiết user id 5, bài viết id 10). | Lọc, tìm kiếm, phân trang trên một danh sách (VD: Lấy danh sách user ở trang 2). |

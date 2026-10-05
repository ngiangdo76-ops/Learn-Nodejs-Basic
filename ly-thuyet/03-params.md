# Lý thuyết: Params trong Express là gì?

Khi bạn xây dựng một website hoặc API, thông thường bạn sẽ cần lấy thông tin cụ thể của một đối tượng. Ví dụ:
- Website của bạn có danh sách khóa học.
- Khi người dùng click vào khóa học React, đường dẫn (URL) có thể là `/course/2`.
- Khi click vào khóa học NodeJS, đường dẫn có thể là `/course/1`.

Làm sao để backend biết người dùng đang muốn xem khóa học số 1 hay số 2? Đó là lúc ta sử dụng **Params** (viết tắt của Parameters - Tham số).

Trong Express, bạn có thể định nghĩa các tham số động ngay trên URL bằng cách sử dụng dấu hai chấm `:` trước tên tham số.

**Ví dụ:** `/detail/:id`. Khi đó, số `1` hay `2` người dùng truyền vào sẽ được gán vào biến `id`. Để lấy được giá trị này trong code, bạn sử dụng đối tượng `req.params` (request parameters).

---

## Phân tích Code

Dưới đây là đoạn code để lấy thông tin chi tiết dựa vào ID:

```javascript
// Giả lập một mảng dữ liệu (database)
const Hello = [
    { id: 1, name: "nadp" },
    { id: 2, name: "2024" }
];

// Định nghĩa route với param động là :id
app.get('/detail/:id', (req, res) => {
    // 1. Lấy id từ URL thông qua req.params
    // Sử dụng destructuring để lấy biến id
    const { id } = req.params;
    
    // Kiểm tra xem đã lấy đúng id chưa
    console.log("ID người dùng truyền vào:", id);
    
    // 2. Xử lý dữ liệu: Tìm vị trí (index) của phần tử trong mảng Hello
    // có id trùng với id nhận được từ URL
    const index = Hello.findIndex(item => item.id == id);
    
    // 3. Trả về kết quả
    // Trả về vị trí index tìm được
    res.json({ message: "n dep 2024", id: id, position_index: index });
});
```

### Giải thích từng bước:

1. **`app.get('/detail/:id', ...)`**: Route này sẽ khớp với các đường dẫn như `/detail/1`, `/detail/2`, `/detail/abc`... Phần tử sau `/detail/` sẽ được xem là biến `id`.
2. **`const { id } = req.params;`**: Lấy giá trị của tham số `id` từ đối tượng `req.params` bằng cú pháp Object Destructuring của JavaScript ES6. Nếu URL là `/detail/1`, thì `id` sẽ có giá trị là chuỗi `"1"`.
3. **`Hello.findIndex(...)`**: Đây là hàm có sẵn của mảng trong JavaScript dùng để tìm vị trí của phần tử đầu tiên thỏa mãn điều kiện.
   - Điều kiện ở đây là `item.id == id`. (Chú ý dùng `==` thay vì `===` vì `id` lấy từ URL thường là chuỗi (string), trong khi `id` trong mảng là số (number)).
4. Khi bạn chạy ứng dụng và truy cập `/detail/1`, kết quả sẽ trả về `index` là `0`. Nếu truy cập `/detail/2`, `index` sẽ là `1`.

**Tóm lại:** Params là cách để bạn truyền dữ liệu (thường là ID) trực tiếp trên đường dẫn URL, giúp backend xác định được chính xác đối tượng mà client muốn tương tác.

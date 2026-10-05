# Tự Học NodeJS & Express & MongoDB #12 - List Render

## 1. Lý thuyết: List Render là gì?
- **Khái niệm:** List Render là kỹ thuật hiển thị một danh sách dữ liệu (chẳng hạn như danh sách các sản phẩm) lên màn hình giao diện View.
- **Giải quyết vấn đề Hardcode:** Ở giao diện mẫu ban đầu, nếu có 4 sản phẩm thì người lập trình phải copy-paste 4 khối mã HTML giống hệt nhau (gọi là hardcode). Với List Render, ta chỉ cần giữ lại 1 khối HTML duy nhất làm khung mẫu, sau đó dùng vòng lặp kết hợp với dữ liệu động (Dynamic Value) truyền từ Controller sang để tự động nhân bản giao diện theo số lượng phần tử thực tế trong mảng.

## 2. Phân tích Code & Các bước thực hiện

### Bước 1: Chuẩn bị mảng dữ liệu và truyền từ Controller
Ở phía Server (Controller), chúng ta tạo một mảng chứa thông tin của 4 sản phẩm giày, mỗi sản phẩm là một Object gồm 4 thuộc tính: `id`, `name`, `description`, và `image`.

```javascript
app.get('/', (req, res) => {
    // 1. Khai báo mảng danh sách sản phẩm
    const products = [
        { id: 1, name: "Giày Nike 1", description: "Mô tả sản phẩm 1", image: "/image/shoe1.jpg" },
        { id: 2, name: "Giày Nike 2", description: "Mô tả sản phẩm 2", image: "/image/shoe2.jpg" },
        { id: 3, name: "Giày Nike 3", description: "Mô tả sản phẩm 3", image: "/image/shoe3.jpg" },
        { id: 4, name: "Giày Nike 4", description: "Mô tả sản phẩm 4", image: "/image/shoe4.jpg" }
    ];

    // 2. Truyền cả title và mảng products sang file view 'index.ejs'
    res.render('index', { 
        title: "NodeJS Ninedev 2024", 
        products // Viết tắt của products: products trong ES6
    });
});
```

*Cú pháp viết tắt (Shorthand Property):* Khi truyền biến `products` vào bên trong Object của hàm `res.render()`, thay vì phải viết đầy đủ là `{ products: products }`, bạn chỉ cần ghi ngắn gọn là `{ products }` thì JavaScript vẫn tự động hiểu cả tên thuộc tính (key) và giá trị (value) đều là `products`.

### Bước 2: Dùng vòng lặp forEach hiển thị ngoài View (views/index.ejs)
Bên trong file giao diện `index.ejs`, xóa bớt các khối HTML sản phẩm bị lặp, giữ lại 1 khối duy nhất rồi bọc nó trong vòng lặp `forEach` của mảng `products`:

```html
<div class="product-list">
    <!-- Mở vòng lặp duyệt qua mảng products (KHÔNG có dấu bằng) -->
    <% products.forEach(item => { %>
        
        <div class="product-item">
            <!-- In đường dẫn ảnh của từng phần tử (CÓ dấu bằng) -->
            <img src="<%= item.image %>" alt="<%= item.name %>" />
            
            <!-- In tên sản phẩm -->
            <h3><%= item.name %></h3>
            
            <!-- In mô tả sản phẩm -->
            <p><%= item.description %></p>
        </div>

    <!-- Đóng vòng lặp (KHÔNG có dấu bằng) -->
    <% }) %>
</div>
```

## 3. Lưu ý quan trọng về cú pháp EJS (Rất dễ gặp lỗi)
Cần phân biệt rõ 2 cú pháp sau trong EJS:

1. **Thẻ `<% ... %>` (Không có dấu bằng):** 
   Dùng khi viết logic điều khiển hoặc vòng lặp (như `products.forEach(...)`, `if/else`, hoặc dấu đóng ngoặc `})`). Vì đây là câu lệnh thực thi ngầm để duyệt mảng chứ không phải chuỗi văn bản cần in trực tiếp ra màn hình.
   
2. **Thẻ `<%= ... %>` (Có dấu bằng):** 
   Dùng khi muốn xuất giá trị của một biến hoặc thuộc tính ra ngoài giao diện HTML (như `<%= item.name %>`, `<%= item.image %>`, `<%= item.description %>`).

const express = require('express');
const router = express.Router();

const productController = require('./product.controller');

const prefix = '/products';

// Định nghĩa các đường dẫn và gắn hàm xử lý tương ứng
router.get(prefix, productController.getAllProducts);
router.get(`${prefix}/detail/:id`, productController.getProductById);
router.post(prefix, productController.createProduct);
router.put(prefix, productController.updateProduct);
router.delete(prefix, productController.deleteProduct);

module.exports = router;

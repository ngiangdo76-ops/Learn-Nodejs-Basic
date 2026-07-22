const express = require("express");
const router = express.Router();
const productController = require('./product.controller');
const prefix = '/products';

router.get(prefix, productController.getAllProducts);
router.get(`${prefix}/create`, productController.createProduct);
router.post(`${prefix}/create`, productController.postCreateProduct);

router.get(`${prefix}/detail/:id`, productController.getDetailProduct);

router.delete(`${prefix}/detail/:id`, productController.deleteProduct);

module.exports = router; 
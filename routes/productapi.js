const express = require ('express');
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
    windowMs: 1000*60*3,
    max: 5,
    message : 'Too many requests, please try again after 3 minute!'
});
const router = express.Router();
const productController = require('../controllers/products'); // เปลี่ยนเป็น products

// กำหนดเส้นทางสำหรับการดำเนินการต่างๆ กับ products โดยใช้ rate limiter กับแต่ละเส้นทาง
router.post('/products', apiLimiter, productController.createProduct);
router.put('/products', apiLimiter, productController.updateProduct);
router.delete('/products/:id', apiLimiter, productController.deleteProduct);
router.get('/products/:id', apiLimiter, productController.getProduct);
router.get('/products/q/:term', apiLimiter, productController.getProductsByTerm);
router.get('/products', apiLimiter, productController.getProducts);

module.exports = router;
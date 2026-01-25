const express = require('express');
const router = express.Router();

// const { fetchallproducts } = require('../../controllers/client_products_controller/client_products.jsx');
// const { authMiddleware } = require('../../controllers/auth/authcontroller');
const {authMiddleware}=require('../../controllers/auth/authcontroller')
const { addToCart,addToCartHome } = require('../../controllers/cart/cart_controller');
const{fetch_all_filtered_products}=require('../../controllers/client_products_controller/client_products')
const { product_details } = require('../../controllers/client_products_controller/client_products');    
router.get('/product_details/:id', product_details);
router.get('/fetchallfilterproducts', fetch_all_filtered_products);
router.post("/product_details/:productId/add", authMiddleware, addToCart);
router.post("/home/:productId/add", authMiddleware, addToCartHome);


module.exports = router;
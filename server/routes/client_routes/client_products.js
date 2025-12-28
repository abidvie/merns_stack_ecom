const express = require('express');
const router = express.Router();

// const { fetchallproducts } = require('../../controllers/client_products_controller/client_products.jsx');

const{fetch_all_filtered_products}=require('../../controllers/client_products_controller/client_products')
router.get('/fetchallfilterproducts', fetch_all_filtered_products);

module.exports = router;
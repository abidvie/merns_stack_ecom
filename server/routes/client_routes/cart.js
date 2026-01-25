// routes/shop/cart.routes.js
const router = require("express").Router();
const { addToCart, updateQuantity, removeItem, getCart, clearCart } = require("../../controllers/cart/cart_controller");
//  require("../../controllers/shop/cart.controller");
// const authMiddleware = 
// require("../../middleware/auth"); // whatever you use
const {  authMiddleware } = require('../../controllers/auth/authcontroller');
router.get("/cart", authMiddleware, getCart);
// router.post("/cart/add", authMiddleware, addToCart);
router.patch("/cart/update", authMiddleware, updateQuantity);
router.delete("/cart/remove/:productId", authMiddleware, removeItem);
router.delete("/cart/clear", authMiddleware, clearCart);

module.exports = router;

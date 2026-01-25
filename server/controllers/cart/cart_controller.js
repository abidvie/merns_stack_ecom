// controllers/shop/cart.controller.js
const mongoose = require("mongoose");
// const Cart = require("../../models/Cart"); // adjust path if different
// const { Product } = require("../../models/Products"); // adjust to your Product export
const Cart=require("../../models/Cart_model")
// const Product=require("../../models/Products")
const { Product } = require('../../models/Products')

// -------------------- helpers --------------------
const calcTotals = (items = []) => {
  const totalItems = items.reduce((acc, it) => acc + (Number(it.quantity) || 0), 0);
  const subtotal = items.reduce(
    (acc, it) => acc + (Number(it.price) || 0) * (Number(it.quantity) || 0),
    0
  );
  return { subtotal, totalItems };
};

const normalizeQty = (q) => {
  const n = Number(q);
  if (!Number.isFinite(n)) return null;
  return Math.floor(n);
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ==================== 1) ADD TO CART ====================
// POST /api/shop/cart/add
// body: { productId, quantity? }
const addToCart = async (req, res) => {
  // console.log("addToCart", req.body)
  try {
    const userId = req.user?.id; // assumes auth middleware sets req.user
    const { productId, quantity } = req.body;
    console.log("productid",productId);
     console.log("User ID:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!productId || !isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }

    const qty = normalizeQty(quantity ?? 1);
    if (!qty || qty < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be >= 1" });
    }

    // Get product (for snapshot + stock validation)
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (Number(product.totalstock) <= 0) {
      return res.status(400).json({ success: false, message: "Out of stock" });
    }

    // final price: use saleprice if valid else price
    const basePrice = Number(product.price) || 0;
    const salePrice = Number(product.saleprice) || 0;
    const finalPrice =
      salePrice > 0 && salePrice < basePrice ? salePrice : basePrice;

    // find user's cart or create new
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
        subtotal: 0,
        totalItems: 0,
      });
    }

    // check if item exists already
    const existingIndex = cart.items.findIndex(
      (it) => String(it.productId) === String(productId)
    );

    if (existingIndex > -1) {
      // increment quantity but clamp to stock
      const newQty = cart.items[existingIndex].quantity + qty;
      cart.items[existingIndex].quantity = Math.min(newQty, Number(product.totalstock));
      // update snapshot (optional)
      cart.items[existingIndex].price = finalPrice;
      cart.items[existingIndex].title = product.title;
      cart.items[existingIndex].image = product.image;
      cart.items[existingIndex].brand = product.brand;
      cart.items[existingIndex].category = product.category;
    } else {
      // add new item, clamp qty to stock
      cart.items.push({
        productId: product._id,
        quantity: Math.min(qty, Number(product.totalstock)),
        price: finalPrice,
        title: product.title,
        image: product.image,
        brand: product.brand,
        category: product.category,
      });
    }

    // recalc totals
    const { subtotal, totalItems } = calcTotals(cart.items);
    cart.subtotal = subtotal;
    cart.totalItems = totalItems;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Added to cart",
      data: cart,
    });
  } catch (error) {
    console.log("addToCart error:", error);
    return res.status(500).json({ success: false, message: "Serverssssssssssssssssss error" });
  }
};










// add to cart for home

const addToCartHome = async (req, res) => {
  // console.log("addToCart", req.body)
  try {
    const userId = req.user?.id; // assumes auth middleware sets req.user
    const { productId, quantity } = req.body;
    console.log("productid",productId);
     console.log("User ID:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!productId || !isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }

    const qty = normalizeQty(quantity ?? 1);
    if (!qty || qty < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be >= 1" });
    }

    // Get product (for snapshot + stock validation)
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (Number(product.totalstock) <= 0) {
      return res.status(400).json({ success: false, message: "Out of stock" });
    }

    // final price: use saleprice if valid else price
    const basePrice = Number(product.price) || 0;
    const salePrice = Number(product.saleprice) || 0;
    const finalPrice =
      salePrice > 0 && salePrice < basePrice ? salePrice : basePrice;

    // find user's cart or create new
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
        subtotal: 0,
        totalItems: 0,
      });
    }

    // check if item exists already
    const existingIndex = cart.items.findIndex(
      (it) => String(it.productId) === String(productId)
    );

    if (existingIndex > -1) {
      // increment quantity but clamp to stock
      const newQty = cart.items[existingIndex].quantity + qty;
      cart.items[existingIndex].quantity = Math.min(newQty, Number(product.totalstock));
      // update snapshot (optional)
      cart.items[existingIndex].price = finalPrice;
      cart.items[existingIndex].title = product.title;
      cart.items[existingIndex].image = product.image;
      cart.items[existingIndex].brand = product.brand;
      cart.items[existingIndex].category = product.category;
    } else {
      // add new item, clamp qty to stock
      cart.items.push({
        productId: product._id,
        quantity: Math.min(qty, Number(product.totalstock)),
        price: finalPrice,
        title: product.title,
        image: product.image,
        brand: product.brand,
        category: product.category,
      });
    }

    // recalc totals
    const { subtotal, totalItems } = calcTotals(cart.items);
    cart.subtotal = subtotal;
    cart.totalItems = totalItems;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Added to cart",
      data: cart,
    });
  } catch (error) {
    console.log("addToCart error:", error);
    return res.status(500).json({ success: false, message: "Serverssssssssssssssssss error" });
  }
};

// ==================== 2) UPDATE QUANTITY ====================
// PATCH /api/shop/cart/update
// body: { productId, quantity }
const updateQuantity = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;
    console.log("productid", productId);
    console.log("User ID:", userId);
    console.log("Quantity:", quantity);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!productId || !isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }

    const qty = normalizeQty(quantity);
    if (qty === null) {
      return res.status(400).json({ success: false, message: "Quantity is required" });
    }

    // If qty <= 0, remove item
    if (qty <= 0) {
      return removeItem(req, res);
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const idx = cart.items.findIndex((it) => String(it.productId) === String(productId));
    if (idx === -1) {
      return res.status(404).json({ success: false, message: "Item not in cart" });
    }

    // validate stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const stock = Number(product.totalstock) || 0;
    if (stock <= 0) {
      // remove if out of stock
      cart.items = cart.items.filter((it) => String(it.productId) !== String(productId));
    } else {
      cart.items[idx].quantity = Math.min(qty, stock);

      // refresh snapshot (optional but recommended)
      const basePrice = Number(product.price) || 0;
      const salePrice = Number(product.saleprice) || 0;
      const finalPrice =
        salePrice > 0 && salePrice < basePrice ? salePrice : basePrice;

      cart.items[idx].price = finalPrice;
      cart.items[idx].title = product.title;
      cart.items[idx].image = product.image;
      cart.items[idx].brand = product.brand;
      cart.items[idx].category = product.category;
    }

    const { subtotal, totalItems } = calcTotals(cart.items);
    cart.subtotal = subtotal;
    cart.totalItems = totalItems;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Quantity updated",
      data: cart,
    });
  } catch (error) {
    console.log("updateQuantity error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==================== 3) REMOVE ITEM ====================
// DELETE /api/shop/cart/remove/:productId
// OR body: { productId } (if you prefer)
const removeItem = async (req, res) => {
  try {
    const userId = req.user?.id;
    const productId = req.params.productId || req.body.productId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!productId || !isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const before = cart.items.length;
    cart.items = cart.items.filter((it) => String(it.productId) !== String(productId));

    if (cart.items.length === before) {
      return res.status(404).json({ success: false, message: "Item not in cart" });
    }

    const { subtotal, totalItems } = calcTotals(cart.items);
    cart.subtotal = subtotal;
    cart.totalItems = totalItems;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed",
      data: cart,
    });
  } catch (error) {
    console.log("removeItem error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==================== 4) GET CART ====================
// GET /api/shop/cart
const getCart = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
        subtotal: 0,
        totalItems: 0,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart fetched",
      data: cart,
    });
  } catch (error) {
    console.log("getCart error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==================== 5) CLEAR CART ====================
// DELETE /api/shop/cart/clear
const clearCart = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart already empty",
        data: null,
      });
    }

    cart.items = [];
    cart.subtotal = 0;
    cart.totalItems = 0;
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: cart,
    });
  } catch (error) {
    console.log("clearCart error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addToCart,
  updateQuantity,
  removeItem,
  getCart,
  clearCart,
  addToCartHome,
};

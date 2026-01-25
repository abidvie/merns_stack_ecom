// models/Cart.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1, default: 1 },

    // Snapshot fields (optional but useful to keep cart stable if product changes)
    price: { type: Number, required: true }, // store final price used (sale or regular)
    title: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String },
    category: { type: String },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one cart per user
      index: true,
    },
    items: { type: [cartItemSchema], default: [] },

    // totals (optional; you can compute on the fly instead)
    subtotal: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Helpful index for faster lookups inside items
cartSchema.index({ userId: 1, "items.productId": 1 });

module.exports = mongoose.model("Cart", cartSchema);

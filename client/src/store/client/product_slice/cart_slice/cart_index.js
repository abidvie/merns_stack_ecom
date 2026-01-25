// src/store/cart/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// IMPORTANT: cookies must be sent
axios.defaults.withCredentials = true;

/* ============================
   ASYNC THUNKS
============================ */

// 1️⃣ Get cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/shop/cart");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
  }
);

// 2️⃣ Add to cart
export const addToCart = createAsyncThunk(
  "product_details/${productId}/add",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
   console.log("addToCart called with productId:", productId, "and quantity:", quantity);
    try {
      
      const res = await axios.post(`http://localhost:5000/api/shop/product_details/${productId}/add`
        //  `http://localhost:5000/api/shop/listing/fetchallfilterproducts?${queryString}
         , {
        productId,
        quantity,
      });
       console.log("addToCart called with productId:", productId, "and quantity:", quantity);
      console.log("addToCart response:", res);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add to cart");
    }
  }
);




// 2️⃣ Add to cart home
export const addToCart_home = createAsyncThunk(
  "${productId}/add",
  async ({ productId,quantity = 1 }, { rejectWithValue }) => {
   console.log("addToCart called with productId: home", productId, "and quantity:", quantity);
    try {
      
      const res = await axios.post(`http://localhost:5000/api/shop/home/${productId}/add`
       
         , {
        productId,
        quantity,
      });
       console.log("addToCart called with productId:", productId, "and quantity:", quantity);
      console.log("addToCart response:", res);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add to cart");
    }
  }
);

// 3️⃣ Update quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    console.log("updateCartQuantity called with productId:", productId, "and quantity:", quantity);
    try {
      const res = await axios.patch("http://localhost:5000/api/shop/cart/update", {
        productId,
        quantity,
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update quantity");
    }
  }
);

// 4️⃣ Remove item
export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/shop/cart/remove/${productId}`);
      
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove item");
    }
  }
);

// 5️⃣ Clear cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete("http://localhost:5000/api/shop/cart/clear");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to clear cart");
    }
  }
);

/* ============================
   SLICE
============================ */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,          // full cart object from backend
    items: [],           // shortcut for cart.items
    subtotal: 0,
    totalItems: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ---------- FETCH CART ----------
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------- ADD TO CART ----------
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



          // ---------- ADD TO CART from home ----------
      .addCase(addToCart_home.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart_home.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(addToCart_home.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------- UPDATE QUANTITY ----------
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------- REMOVE ITEM ----------
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------- CLEAR CART ----------
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
        state.items = [];
        state.subtotal = 0;
        state.totalItems = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;

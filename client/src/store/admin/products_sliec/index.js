




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Corrected axios import

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

// Add new products
export const addNewProducts = createAsyncThunk(
  'products/addProducts',
  async (formData) => {
    const response = await axios.post(
      'http://localhost:5000/api/admin/products/addproducts',
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('addNewProducts:', response.data);
    return response.data;
  }
);


// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const response = await axios.get(
      'http://localhost:5000/api/admin/products/fetchAllProducts'
    );
    console.log('fetchAllProducts:', response.data);
    return response.data;
  }
);

// Edit a product
export const editAProduct = createAsyncThunk(
  'products/editproduct',
  async ({ id, formData } ) => {
    const response = await axios.put(
      // `http://localhost:5000/api/admin/products/editproduct/${id}`,
       `http://localhost:5000/api/admin/products/editproduct/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('editProduct:', response.data);
    return response.data;
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/admin/products/deleteProduct/${id}`
    );
    console.log('deleteProduct:', response.data);
    return response.data;
  }
);

const adminProductSlice = createSlice({
  name: 'adminProductSlice', // Corrected name of the slice
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log('fetchAllProducts on extra reducer payload:', action.payload.data);
        state.isLoading = false;
        state.products = action.payload.data || "ksjdhf"; // Handle both cases
        console.log("state.products after fetch:", state.products);
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addNewProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally add new product to the existing products list
        state.products.push(action.payload);
      })
      .addCase(addNewProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Edited product payload:", action.payload);
        // Optionally update the product in the list
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(editAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove deleted product from the list
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts, setLoading, setError } = adminProductSlice.actions;
export default adminProductSlice.reducer;

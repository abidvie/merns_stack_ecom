




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Corrected axios import

const initialState = {
  filter_products: [],
  isLoading: false,
  error: null,
};


export const fetch_All_filter_Products = createAsyncThunk(
  'products/fetchAllfilterProducts',
  async (searchQueryObject) => {
    console.log("searchQueryObject in fetchAllfilterProducts", searchQueryObject);

    // Convert the object into a query string
    const queryString = new URLSearchParams(searchQueryObject).toString();

    console.log("this is in the frontend async thunk",queryString)

    // Send the GET request with query parameters
    const response = await axios.get(
      `http://localhost:5000/api/shop/listing/fetchallfilterproducts?${queryString}`
    );

    console.log('fetchAll filtered Products:', response.data);
    return response.data;
  }
);



const clientProductSlice = createSlice({
  name: 'clientProductSlice', // Corrected name of the slice
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
      .addCase(fetch_All_filter_Products.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetch_All_filter_Products.fulfilled, (state, action) => {
        console.log('fetchAll filtered Products on extra reducer payload:', action.payload.data);
        state.isLoading = false;
        state.filter_products = action.payload.data || "ksjdhf"; // Handle both cases
        console.log("state.products after fetch:", state.filter_products);
      })
      .addCase(fetch_All_filter_Products.rejected, (state, action) => {
        
        state.isLoading = false;
        state.error = action.payload;
      })
    //   .addCase(addNewProducts.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(addNewProducts.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     // Optionally add new product to the existing products list
    //     state.products.push(action.payload);
    //   })
    //   .addCase(addNewProducts.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   })
    //   .addCase(editAProduct.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(editAProduct.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     console.log("Edited product payload:", action.payload);
    //     // Optionally update the product in the list
    //     const index = state.products.findIndex(
    //       (product) => product._id === action.payload._id
    //     );
    //     if (index !== -1) {
    //       state.products[index] = action.payload;
    //     }
    //   })
    //   .addCase(editAProduct.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   })
    //   .addCase(deleteProduct.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(deleteProduct.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     // Remove deleted product from the list
    //     state.products = state.products.filter(
    //       (product) => product._id !== action.payload._id
    //     );
    //   })
    //   .addCase(deleteProduct.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   });
  },
});

export const { setProducts, setLoading, setError } = clientProductSlice.actions;
export default clientProductSlice.reducer;

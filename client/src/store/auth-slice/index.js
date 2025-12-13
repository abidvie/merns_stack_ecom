// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from 'axios';
// import { use } from 'react'

// const initialState = {
//     isAuthenticated: false,
//      isLoading: false,
//     user: null,};

//     // export const registeruser=createAsyncThunk('/auth/register',
//     //   async(formdata)=>{
//     //     const response=await fetch('http://localhost:5000/api/auth/register',formdata{
//     //       withCredentials:'include',
//     //   })
//     //   return response.data;
//     //   }
//     // );

//     export const registerUser = createAsyncThunk( // Fixed camelCase naming
//     'auth/register',
//     async (formData) => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/register',
//                 formData,
//                 { withCredentials: true }
//             );
//             return response.data;
//         } catch (error) {
//             throw error.response.data;
//         }
//     }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers:
//   {
//     setUser:(state, action) => {

//     },

//   },
//       extraReducers: (builder) => {
//         builder
//             .addCase(registerUser.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.user = action.payload;
//                 state.isAuthenticated = true;
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.error.message;
//             });
//     }

// })

// export const { setUser } = authSlice.actions;
// export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Missing axios import

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null, // Added error state
  username:null,
  email:null
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
);

export const LoginUser = createAsyncThunk("auth/login", async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      { withCredentials: true }
    );

    console.log('LoginUser response:', response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
});


export const checkauth = createAsyncThunk(
  "auth/checkauth",
  async () => {
  
    const response = await axios.get(
      "http://localhost:5000/api/auth/checkauth",
     
      { withCredentials: true,
        headers: {
          'Cache-Control': 'no-store,no-cache,must-revalidate,proxy-revalidate ',
          
        },  
       }
    );
    // console.log('checkauth response:', response.data);
    return response.data;

});



export const logoutuser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log('logoutuser response:', response.data); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);





const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
      })

      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
       // console.log('LoginUser.fulfilled action.payload:', action.payload.user);
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.success;
        state.error = null;
        state.username =  action.payload.user.name;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
      })



      .addCase(checkauth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkauth.fulfilled, (state, action) => {
         console.log('LoginUser.fulfilled action.payload in the auth part:', action.payload.user);
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.success;
        state.error = null;
        state.username =  action.payload.user.name;
        state.email =  action.payload.user.email;
      })
      .addCase(checkauth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
      })





      .addCase(logoutuser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutuser.fulfilled, (state, action) => {
        //  console.log('LoginUser.fulfilled action.payload:', action.payload.user);
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = !action.payload.success;
        state.error = null;
      })
      .addCase(logoutuser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
      });

      



      
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

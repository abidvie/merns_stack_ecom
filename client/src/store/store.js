import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth-slice/index.js' 
import adminProductSlice from './admin/products_sliec/index.js'
import clientProductSlice from './client/product_slice/index.js'
import cartSlice from './client/product_slice/cart_slice/cart_index.js'



const store=configureStore({
    reducer:{
        auth:authReducer,  
        AdminProducts:adminProductSlice,
        clientProductSlice:clientProductSlice,
        cartSlice:cartSlice,
        
    }
})

export default store;
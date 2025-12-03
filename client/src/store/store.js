import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth-slice/index.js' 
import adminProductSlice from './admin/products_sliec/index.js'




const store=configureStore({
    reducer:{
        auth:authReducer,  
        AdminProducts:adminProductSlice,
        
    }
})

export default store;
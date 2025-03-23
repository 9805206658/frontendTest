import { configureStore } from "@reduxjs/toolkit";
import authReducer from './redux/userSlice';
import productReducer from './redux/productSlice';
const store = configureStore({
    reducer:{ auth:authReducer,product:productReducer }
});

export default store;

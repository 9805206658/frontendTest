import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";
const searchQuery = createAsyncThunk(`product/search`,async(searchInfo,thunkApi)=>{
    try{
         const res = await axiosClient.post('search',searchInfo);
          

    }
    catch(err)
    {
        console.log(err);

    }
})

const initialState = {
    isSearch:false,
    productList:[],
}
const productSlice = createSlice(
    {
        name:"product",
        initialState,
        reducers:{
            search:(state)=>{
                state.isSearch = true;
            }
        },
        extraReducers:(builder)=>{

        }
    
    }
)
export const {search} = productSlice.actions;
export default productSlice.reducer;

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";
 export const searchQuery = createAsyncThunk(`product/search`,async(searchInfo,thunkApi)=>{
    try{
         const res = await axiosClient.get(`search/${searchInfo}`);
         return res.data;
         
      }
    catch(err)
    {  console.log(err);}
})

const initialState = {
    isSearch:false,
    productList:[],
}
const productSlice = createSlice(
    {
        name:"product",
        initialState,
        extraReducers:(builder)=>{
            builder.addCase(searchQuery.fulfilled,(state,action)=>{
                state.productList=(action.payload.message);
                state.isSearch = true;
            })
            builder.addCase(searchQuery.pending,(state,action)=>{
                state.isSearch = false;
            })
            builder.addCase(searchQuery.rejected,(state,action)=>{
                state.isSearch = false ;
            })

        }
    
    }
)
export default productSlice.reducer;

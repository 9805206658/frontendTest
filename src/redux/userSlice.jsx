import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import createNotification from "../notification/notification";
import axiosClient from "../api/axiosClient";
export const loginUser = createAsyncThunk(`auth/loginUser}`,async(userInfo,thunkAPI)=>{
  try{
    console.log("the data is"+habitInfo);
    const res = await axiosClient.post(api,userInfo);
    if(res.status === 200)
    {
      createNotification({
        isSuccess:true,
        description:res.data.message,
        placement:"topRight",
        duration:3,
      });
      return res.data;
    }   
  }
  catch(error)
  {
    return thunkAPI.rejectWithValue(error.response?.data || "failed to fetch profile");
  }
});

const initialState={
  isLogin:false,
  status:null,
  userName:null,
  phone:null,
  
}
const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:(state)=>{
    state.isLogin = false;
    state.status = null;
    state.userName = null;
    state.phone = null
    // here clearing local storage 
    localStorage.clear();
  },
  extraReducers:(builder)=>{
    builder.addCase(loginUser.fulfilled,(state)=>{
      state.isLogin = true;
      state.status = "succeeded"
    });
    builder.addCase(loginUser.rejected,(state)=>{
      state.isLogin = false;
      state.status = 'failed';
    });
    builder.addCase(loginUser.pending,(state)=>{
      state.isLogin = false;
      state.status = "pending";
    })

  }

})
export const {logout} = authSlice.actions;
export default authSlice.reducer;
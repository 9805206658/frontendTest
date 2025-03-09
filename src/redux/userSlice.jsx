import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import createNotification from "../notification/notification";
import axiosClient from "../api/axiosClient";
// 
const createAsyncThunkPost=(url)=>{
 return (createAsyncThunk(`auth/${url}`,async(userInfo,thunkAPI)=>{
  try{
    const res = await axiosClient.post(url,userInfo);
    console.log("the response data is");
    console.log(res.data); 
    if(res.status == 200 && res.data.payload)
    {  localStorage.setItem("phone", res.data.payload.phone);
      localStorage.setItem("userName", res.data.payload.userName);
      localStorage.setItem("id", res.data.payload._id);
    }  
    if(res.data.token)
      {
        localStorage.setItem("token", res.data.token) ;
      }
    if(res.status == 200) 
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
}));
};
export const loginUser  = createAsyncThunkPost("loginUser");
export const createUser = createAsyncThunkPost("createUser");
const initialState={
  isLogin:false,
  status:null,
  userName:null,
  userType:null,
  phone:null, 
}
const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    logout: (state) => {
      state.isLogin = false;
      state.isLoginOpen =  false;
      state.status = null;
      state.userName = null;
      state.userType = null;
      state.phone = null;

      localStorage.clear();
    }
  },
  
  extraReducers:(builder)=>{

    builder.addCase(loginUser.rejected,(state,action)=>{
     
      state.isLogin = false;
      state.status = 'failed';
    });
    builder.addCase(loginUser.fulfilled,(state,action)=>{
   
      state.isLogin = true;

      state.status = "succeeded";
    });
    builder.addCase(loginUser.pending,(state)=>{
     
      state.isLogin = false;
      state.status = "pending";
    })

    builder.addCase(createUser.fulfilled,(state)=>{
      state.status = "succeeded";
      state.isLoginOpen = true;
    });
    builder.addCase(createUser.pending,(state)=>{
      state.status="pending";
    });
    builder.addCase(createUser.rejected,(state)=>{
      state.status = "rejected";
    })

  }

})
export const {logout} = authSlice.actions;
export default authSlice.reducer;
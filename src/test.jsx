import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createNotification from '../notification/notification';
import axiosClient from '../api/axiosClient';

// Define types
interface UserInfo {
  userName: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    contactNumber: string;
    userName: string;
  };
  message: string;
}

interface HabitInfo {
  name: string;
}

interface HabitResponse {
  message: string;
}

// Create async thunks
const habitAsyncThunkPost = (api: string) =>
  createAsyncThunk<HabitResponse, HabitInfo>(
    `auth/${api}`,
    async (habitInfo, thunkAPI) => {
      try {
        console.log("The data is:", habitInfo);
        const res = await axiosClient.post(api, habitInfo);

        if (res.status === 200) {
          createNotification({
            isSuccess: true,
            description: res.data.message,
            placement: "topRight",
            duration: 3,
          });
        }
        return res.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Failed to fetch profile"
        );
      }
    }
  );

const habitAsyncThunkDel = (api: string) =>
  createAsyncThunk<HabitResponse, number>(
    `auth/${api}`,
    async (habitId, thunkAPI) => {
      try {
        console.log(habitId);
        const res = await axiosClient.delete(`${api}/${habitId}`);

        if (res.status === 200) {
          createNotification({
            isSuccess: true,
            description: res.data.message,
            placement: "topRight",
            duration: 3,
          });
        }
        return res.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Failed to delete habit"
        );
      }
    }
  );

const userAsyncThunkPost = (api: string) =>
  createAsyncThunk<LoginResponse, UserInfo>(
    `auth/${api}`,
    async (userInfo, thunkAPI) => {
      try {
        const res = await axiosClient.post(api, userInfo);

        if (res.status === 200 && res.data.token) {
          const user = res.data.user;
          localStorage.setItem("contactNumber", user.contactNumber);
          localStorage.setItem("userName", user.userName);
          localStorage.setItem("id", user.id.toString());
          localStorage.setItem("Token", res.data.token);

          createNotification({
            isSuccess: true,
            description: res.data.message,
            placement: "topRight",
            duration: 3,
          });
        }
        return res.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Failed to fetch profile"
        );
      }
    }
  );

const userAsyncThunkGet = (api: string) =>
  createAsyncThunk(
    `auth/${api}`,
    async (_, thunkAPI) => {
      try {
        const res = await axiosClient.get(api);
        return res.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Failed to fetch profile"
        );
      }
    }
  );

// Export async thunks
export const loginUser = userAsyncThunkPost("loginUser");
export const tokenChecker = userAsyncThunkGet("tokenChecker");
export const createHabit = habitAsyncThunkPost("createHabit");
export const deleteHabit = habitAsyncThunkDel("deleteHabit/habitId");
export const updateNote=habitAsyncThunkPost("updateNote");
// here making the async thukn for the achivement 

 
// Define the state
interface AuthState {
  isLogin: boolean;
  status: null | string;
  userName: string | null;
  contactNumber: string | null;
  isDeleteHabit: boolean;
  isNoteUpdate:boolean;
}

const initialState: AuthState = {
  isLogin: false,
  status: null,
  userName: null,
  contactNumber: null,
  isDeleteHabit: false,
  isNoteUpdate:false
};

// Utility for pending and rejected cases
const casePenRejUser = (builder: any, asyncThunk: any) => {
  builder.addCase(asyncThunk.rejected, (state:any) => {
    state.status = "failed";
    state.status =false
  });
  builder.addCase(asyncThunk.pending, (state:any) => {
    state.status = "pending";
    state.status =false;
  });
};

// Utility for fulfilled cases
const caseFulfillUser = (builder: any, asyncThunk: any) => {
  builder.addCase(asyncThunk.fulfilled, (state:any) => {
   state.isLogin = true;
    state.status = "succeeded";
  });
};

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.status = null;
      state.userName = null;
      state.contactNumber = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    casePenRejUser(builder, loginUser);
    caseFulfillUser(builder, tokenChecker);
    caseFulfillUser(builder, loginUser);
    casePenRejUser(builder, tokenChecker);

    builder.addCase(deleteHabit.fulfilled, (state) => {
      state.isDeleteHabit = true;
      state.status = "succeeded";
    });
    builder.addCase(deleteHabit.rejected, (state) => {
      state.isDeleteHabit = false;
      state.status = "failed";
    });
    builder.addCase(deleteHabit.pending, (state) => {
      state.isDeleteHabit = false;
      state.status = "pending";
    });

    builder.addCase(updateNote.fulfilled, (state) => {
      state.isNoteUpdate = !state.isNoteUpdate;
      state.status = "succeeded";
    });
    builder.addCase(updateNote.rejected, (state) => {
      state.isNoteUpdate = false;
      state.status = "failed";
    });
    builder.addCase(updateNote.pending, (state) => {
      state.isNoteUpdate = false;
      state.status = "pending";
    });
   

  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;

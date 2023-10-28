import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/axios/api";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/user/delete");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put("/user/update", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const confirmEmailSwap = createAsyncThunk(
  "user/confirmEmailSwap",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/confirmEmailSwap/${token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const usersSlice = createSlice({
  name: "user",
  initialState: {
    status: "",
    error: "",
    currentUser: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = "success";
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.accessToken = "";
        state.refreshToken = "";
        state.status = "success";
        state.currentUser = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = "success";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(confirmEmailSwap.pending, (state) => {
        state.status = "loading";
      })
      .addCase(confirmEmailSwap.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(confirmEmailSwap.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentUser } = usersSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;
export default usersSlice.reducer;

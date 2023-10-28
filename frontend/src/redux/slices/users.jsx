import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/axios/api";

const initialState = {
  status: "",
  error: "",
  currentUser: null,
};

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

const asyncActionHandlers = {
  [getUserData.pending.type]: { status: "loading" },
  [getUserData.fulfilled.type]: (state, action) => {
    state.user = action.payload;
    state.status = "success";
  },
  [getUserData.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },

  [deleteUser.pending.type]: { status: "loading" },
  [deleteUser.fulfilled.type]: (state, action) => {
    state.isAuthenticated = false;
    state.accessToken = "";
    state.refreshToken = "";
    state.status = "success";
    state.user = null;
  },
  [deleteUser.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },

  [updateUser.pending.type]: { status: "loading" },
  [updateUser.fulfilled.type]: (state, action) => {
    state.user = action.payload;
    state.status = "success";
  },
  [updateUser.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },

  [confirmEmailSwap.pending.type]: { status: "loading" },
  [confirmEmailSwap.fulfilled.type]: (state, action) => {
    state.status = "success";
  },
  [confirmEmailSwap.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    Object.entries(asyncActionHandlers).forEach(([type, handler]) => {
      builder.addCase(type, (state, action) => {
        if (typeof handler === "function") {
          handler(state, action);
        } else {
          const options = handler;
          state.status = options.status;

          if (options.resultProp) {
            state[options.resultProp] = action.payload;
          }

          if (options.errorProp) {
            state.error = action.error.message || null;
          }
        }
      });
    });
  },
});

export const { setCurrentUser } = usersSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;
export default usersSlice.reducer;

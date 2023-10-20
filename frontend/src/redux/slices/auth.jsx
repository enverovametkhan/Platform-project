import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/axios/api";

const initialState = {
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  status: "",
  error: "",
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/user/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/user/signup", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user/verifyEmail/${token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/user/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const refreshAuthToken = createAsyncThunk(
  "auth/refreshAuthToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/user/refreshAuthToken");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const asyncActionHandlers = {
  [loginUser.pending.type]: { status: "loading" },
  [loginUser.fulfilled.type]: (state, action) => {
    state.isAuthenticated = true;
    state.accessToken = action.payload.accessToken;
    state.refreshToken = action.payload.refreshToken;
    state.status = "success";
    state.user = action.payload.user;
  },
  [loginUser.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [signupUser.pending.type]: { status: "loading" },
  [signupUser.fulfilled.type]: (state, action) => {
    state.isAuthenticated = true;
    state.accessToken = action.payload.accessToken;
    state.refreshToken = action.payload.refreshToken;
    state.status = "success";
    state.user = action.payload.user;
  },
  [signupUser.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [verifyEmail.pending.type]: { status: "loading" },
  [verifyEmail.fulfilled.type]: (state, action) => {
    state.status = "success";
  },
  [verifyEmail.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [logoutUser.pending.type]: { status: "loading" },
  [logoutUser.fulfilled.type]: (state, action) => {
    state.isAuthenticated = false;
    state.accessToken = "";
    state.refreshToken = "";
    state.status = "success";
    state.user = null;
  },
  [logoutUser.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [refreshAuthToken.pending.type]: { status: "loading" },
  [refreshAuthToken.fulfilled.type]: (state, action) => {
    state.accessToken = action.payload.accessToken;
    state.refreshToken = action.payload.refreshToken;
    state.status = "success";
  },
  [refreshAuthToken.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
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

export const { setCurrentUser } = userSlice.actions;
export const selectCurrentUser = (state) => state.user;
export default userSlice.reducer;

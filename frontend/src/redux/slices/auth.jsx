import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/axios/api";

const initialState = {
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  status: "",
  error: "",
  forcedLogout: false,
  clearState: false,
};

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async (credential, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/googleSignIn", { credential });
      return response.data.processedResponse;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/login", userData);
      return response.data.processedResponse;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/signup", userData);
      return response.data.processedResponse;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.get(`user/verifyEmail/${token}`);
      return response.data.processedResponse;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("user/logout");
      return response.data.processedResponse;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/refreshAccessToken/${token}`);
      return response.data.processedResponse;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const asyncActionHandlers = {
  [googleSignIn.pending.type]: { status: "loading" },
  [googleSignIn.fulfilled.type]: (state, action) => {
    state.isAuthenticated = true;
    state.accessToken = action.payload.accessToken;
    state.refreshToken = action.payload.refreshToken;
    state.status = "success";
  },
  [googleSignIn.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [loginUser.pending.type]: { status: "loading" },
  [loginUser.fulfilled.type]: (state, action) => {
    state.isAuthenticated = true;
    state.accessToken = action.payload.accessToken;
    state.refreshToken = action.payload.refreshToken;
    state.status = "success";
  },
  [loginUser.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [signupUser.pending.type]: { status: "loading" },
  [signupUser.fulfilled.type]: (state, action) => {
    state.status = "success";
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
    state.forcedLogout = false;
    state.status = "success";
    state.clearState = "true";
  },

  [logoutUser.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [refreshAccessToken.pending.type]: { status: "loading" },
  [refreshAccessToken.fulfilled.type]: (state, action) => {
    state.accessToken = action.payload.accessToken;
    state.refreshToken = action.payload.refreshToken;
    state.isAuthenticated = true;
    state.status = "success";
  },

  [refreshAccessToken.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setForcedLogout(state, action) {
      state.forcedLogout = action.payload;
    },
    updateTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setClearState(state, action) {
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
      state.forcedLogout = false;
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

export const {
  setIsAuthenticated,
  setForcedLogout,
  updateTokens,
  setClearState,
} = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectClearState = (state) => state.auth.clearState;
export const selectForcedLogout = (state) => state.auth.forcedLogout;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectAccessToken = (state) => state.auth.accessToken;
export default authSlice.reducer;

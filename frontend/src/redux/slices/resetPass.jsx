import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/axios/api";

const initialState = {
  status: "",
  error: "",
};

export const resetPasswordReq = createAsyncThunk(
  "user/resetPasswordReq",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.get(`user/resetPasswordReq/${email}`);
      return response.data.proccessedResponse;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const checkResetPasswordToken = createAsyncThunk(
  "user/checkResetPasswordToken",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.get(`user/checkResetPasswordToken/${token}`);
      return response.data.proccessedResponse;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put(`user/resetPassword/${payload.token}`, {
        passwordData: payload.passwordData,
      });
      return response.data.proccessedResponse;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const asyncActionHandlers = {
  [resetPasswordReq.pending.type]: { status: "loading" },
  [resetPasswordReq.fulfilled.type]: (state, action) => {
    state.status = "success";
  },
  [resetPasswordReq.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },

  [checkResetPasswordToken.pending.type]: { status: "loading" },
  [checkResetPasswordToken.fulfilled.type]: (state, action) => {
    state.status = "success";
  },
  [checkResetPasswordToken.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },

  [resetPassword.pending.type]: { status: "loading" },
  [resetPassword.fulfilled.type]: (state, action) => {
    state.status = "success";
  },
  [resetPassword.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
};

export const resetPassSlice = createSlice({
  name: "resetPass",
  initialState,
  reducers: {},
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

export default resetPassSlice.reducer;

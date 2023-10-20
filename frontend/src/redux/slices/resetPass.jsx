import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/axios/api";

const initialState = {
  status: "",
  error: "",
};

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user/resetPassword/${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const checkResetPasswordToken = createAsyncThunk(
  "user/checkResetPasswordToken",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/user/checkResetPasswordToken/${token}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (newPasswordData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        "/api/user/changePassword",
        newPasswordData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const asyncActionHandlers = {
  [resetPassword.pending.type]: { status: "loading" },
  [resetPassword.fulfilled.type]: (state, action) => {
    state.status = "success";
  },
  [resetPassword.rejected.type]: (state, action) => {
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

  [changePassword.pending.type]: { status: "loading" },
  [changePassword.fulfilled.type]: (state, action) => {
    state.status = "success";
  },
  [changePassword.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
};

export const resetPassSlice = createSlice({
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

export const { setCurrentUser } = resetPassSlice.actions;
export const selectCurrentUser = (state) => state.user;
export default resetPassSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "src/axios/api";

const initialState = {
  currentCategory: "",
  blogs: [],
  currentBlog: {},
  status: "",
  error: "",
  isAuthneticated: false,
  test: "",
};

export const getBlogsInCategory = createAsyncThunk(
  "get/blogs",
  async (category) => {
    const response = api.get(`blog/category/${category}`);

    return response.data;
  }
);

const asyncActionHandlers = {
  [getBlogsInCategory.pending.type]: { status: "loading" },
  [getBlogsInCategory.fulfilled.type]: (state, action) => {
    state.blogs = action.payload;
    state.status = "success";
  },
  [getBlogsInCategory.rejected.type]: { status: "failed" },
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setCurrentBlog(state, action) {
      state.currentBlog = action.payload;
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

export default blogsSlice.reducer;

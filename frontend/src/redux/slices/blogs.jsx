import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/axios/api";

const initialState = {
  currentCategory: "",
  blogs: [],
  currentBlog: {},
  status: "",
  error: "",
};

export const getBlogsInCategory = createAsyncThunk(
  "get/blogs",
  async (category) => {
    const response = await api.get(`blog/category/${category}`);

    return response.data;
  }
);
export const getBlog = createAsyncThunk("get/blog", async (id) => {
  const response = await api.get(`blog/id/${id}`);

  return response.data;
});

export const getUserBlogsInCategory = createAsyncThunk(
  "get/blogcategory",
  async (userId, category) => {
    const response = await api.get(`blog/user/${(userId, category)}`);

    return response.data;
  }
);
export const updateBlog = createAsyncThunk("put/blog", async (id) => {
  const response = await api.put(`blog/id/${id}`);

  return response.data;
});
export const deleteBlog = createAsyncThunk("delete/blog", async (id) => {
  const response = await api.delete(`blog/id/${id}`);

  return response.data;
});
export const createBlog = createAsyncThunk("post/blog", async () => {
  const response = await api.post(`blog`);

  return response.data;
});

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
    setCurrentCategory(state, action) {
      state.currentCategory = action.payload;
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
export const { setCurrentCategory } = blogsSlice.actions;
export const selectCurrentCategory = (state) => state.currentCategory;
export default blogsSlice.reducer;

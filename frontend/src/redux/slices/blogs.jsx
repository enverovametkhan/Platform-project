import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/axios/api";

const initialState = {
  status: "",
  error: "",
};

export const getBlog = createAsyncThunk(
  "blogs/getBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`blog/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getBlogsInCategory = createAsyncThunk(
  "blogs/getBlogsInCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await api.get(`blog/category/${category}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getUserBlogsInCategory = createAsyncThunk(
  "blogs/getUserBlogsInCategory",
  async ({ userId, category }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `blog/user/${userId}/category/${category}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, updatedBlog }, { rejectWithValue }) => {
    try {
      const response = await api.put(`blog/id/${id}`, updatedBlog);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`blog/id/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (newBlog, { rejectWithValue }) => {
    try {
      const response = await api.post(`blog`, newBlog);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const asyncActionHandlers = {
  [getBlog.pending.type]: { status: "loading" },
  [getBlog.fulfilled.type]: (state, action) => {
    state.blog = action.payload;
    state.status = "success";
  },
  [getBlog.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [getBlogsInCategory.pending.type]: { status: "loading" },
  [getBlogsInCategory.fulfilled.type]: (state, action) => {
    state.blogs = action.payload;
    state.status = "success";
  },
  [getBlogsInCategory.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [getUserBlogsInCategory.pending.type]: { status: "loading" },
  [getUserBlogsInCategory.fulfilled.type]: (state, action) => {
    state.userBlogs = action.payload;
    state.status = "success";
  },
  [getUserBlogsInCategory.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [updateBlog.pending.type]: { status: "loading" },
  [updateBlog.fulfilled.type]: (state, action) => {
    state.blog = action.payload;
    state.status = "success";
  },
  [updateBlog.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [deleteBlog.pending.type]: { status: "loading" },
  [deleteBlog.fulfilled.type]: (state, action) => {
    state.status = "success";
  },
  [deleteBlog.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
  [createBlog.pending.type]: { status: "loading" },
  [createBlog.fulfilled.type]: (state, action) => {
    state.blog = action.payload;
    state.status = "success";
  },
  [createBlog.rejected.type]: (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
  },
};

export const blogsSlice = createSlice({
  name: "blogs",
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

export const selectCurrentCategory = (state) => state.blogs.currentCategory;
export default blogsSlice.reducer;

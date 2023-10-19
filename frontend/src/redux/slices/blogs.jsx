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
  "blogs/getByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await api.get(`blog/category/${category}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBlog = createAsyncThunk(
  "blog/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`blog/id/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserBlogsInCategory = createAsyncThunk(
  "blogs/getByUserAndCategory",
  async ({ userId, category }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `blog/user/${userId}/category/${category}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/update",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(`blog/id/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`blog/id/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/create",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await api.post(`blog`, blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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

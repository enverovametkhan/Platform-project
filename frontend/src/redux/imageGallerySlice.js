import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchImages = createAsyncThunk(
  "imageGallery/fetchImages",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/public/blog/category/UX-UI"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const imageGallerySlice = createSlice({
  name: "imageGallery",
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default imageGallerySlice.reducer;

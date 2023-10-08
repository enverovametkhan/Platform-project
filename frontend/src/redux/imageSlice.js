import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",

  initialState: {
    selectedCategory: "myblog",
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategory } = imageSlice.actions;

export const selectCategory = (state) => state.image.selectedCategory;

export default imageSlice.reducer;

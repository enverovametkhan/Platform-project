import { configureStore } from "@reduxjs/toolkit";
import imageGalleryReducer from "./imageGallerySlice";

const store = configureStore({
  reducer: {
    imageGallery: imageGalleryReducer,
  },
});

export default store;

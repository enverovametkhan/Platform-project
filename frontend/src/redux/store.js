import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "src/redux/slice";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
});

export default store;

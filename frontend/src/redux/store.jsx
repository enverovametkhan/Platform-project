import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { blogsSlice } from "src/redux/slices/blogs";

const blogsRelated = {
  key: "blogs",
  version: 2,
  storage,
  whitelist: ["currentCategory"],
};

const rootReducer = {
  blogs: persistReducer(blogsRelated, blogsSlice.reducer),
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { blogsSlice } from "src/redux/slices/blogs";
import { authSlice } from "src/redux/slices/auth";
import { resetPassSlice } from "src/redux/slices/resetPass";
import { usersSlice } from "src/redux/slices/users";

const blogsRelated = {
  key: "blogs",
  version: 2,
  storage,
};

const rootReducer = {
  blogs: persistReducer(blogsRelated, blogsSlice.reducer),
  auth: authSlice.reducer,
  resetPass: resetPassSlice.reducer,
  users: usersSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export default store;

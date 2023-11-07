import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { blogsSlice } from "src/redux/slices/blogs";
import { authSlice } from "src/redux/slices/auth";
import { resetPassSlice } from "src/redux/slices/resetPass";
import { usersSlice } from "src/redux/slices/users";

const authRelated = {
  key: "auth",
  version: 2,
  storage,
  whitelist: ["refreshToken", "accessToken", "isAuthenticated", "forcedLogout"],
};

const userRelated = {
  key: "users",
  version: 2,
  storage,
  whitelist: ["currentUser"],
};

const rootReducer = {
  blogs: blogsSlice.reducer,
  auth: persistReducer(authRelated, authSlice.reducer),
  resetPass: resetPassSlice.reducer,
  users: persistReducer(userRelated, usersSlice.reducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

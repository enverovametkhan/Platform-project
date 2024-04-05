import axios from "axios";
import { store } from "src/redux/store";
import { updateTokens, setForcedLogout } from "src/redux/slices/auth";

export const api = axios.create({
  baseURL:
    `${process.env.REACT_APP_BASE_URL}/api` || "http://localhost:4004/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { accessToken, refreshToken } = store.getState().auth;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers.refreshtoken = `Bearer ${refreshToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.refreshData) {
      console.log(response.data.refreshData);
      store.dispatch(updateTokens(response.data.refreshData));
    }
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response.data.message === "Unauthorized") {
      store.dispatch(setForcedLogout(true));
    }
    return Promise.reject(error);
  }
);

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import "./index.css";
import App from "src/App";

const root = createRoot(document.getElementById("root"));
console.log(process.env.REACT_APP_BASE_URL);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

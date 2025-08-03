import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import store from "./app/store";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ToastContainer position="top-right" autoClose={2000} />
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("❌ No root element found!");
}

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../redux/authSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"], // only persist the user object
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // recommended with redux-persist
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export default store;

import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";

const store = configureStore({
  reducer: {
    username: adminReducer,
    searchUser: adminReducer,
  },
});

export default store;

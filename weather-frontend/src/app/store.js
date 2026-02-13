// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/auth/authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer
//   }
// });

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import weatherReducer from "../features/auth/weatherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
  },
});

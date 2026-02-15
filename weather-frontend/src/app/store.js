// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/auth/authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer
//   }
// });

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import weatherReducer from "../features/weather/weatherSlice";
import citiesReducer from "../features/city/citiesSlice"; 
import notificationReducer from "../features/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
    cities: citiesReducer,
    notifications: notificationReducer,
  },
});

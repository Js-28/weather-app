import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    city: null,
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.unshift(action.payload);
    },
    setSubscribedCity: (state, action) => {
      state.city = action.payload;
    },
    clearNotifications: (state) => {
      state.list = [];
    },
    removeNotification: (state, action) => {
      state.list.splice(action.payload, 1);
    },
  },
});

export const { addNotification, setSubscribedCity, clearNotifications, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

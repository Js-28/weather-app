import { createSlice } from "@reduxjs/toolkit";
import { loginUser, fetchMe, logoutUser } from "./authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    checkingAuth: true,
    isAuthenticated: false,
    error: null
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
  state.isAuthenticated = true;
  state.checkingAuth = false;
})
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CHECK SESSION
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.checkingAuth = false;   // IMPORTANT
      })

      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.checkingAuth = false;   // IMPORTANT
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

export default authSlice.reducer;
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", data);
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/auth/me");
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    await API.post("/auth/logout");
  }
);
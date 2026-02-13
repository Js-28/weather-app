import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// Async thunk for current weather
export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrent",
  async ({ city }, { rejectWithValue }) => {
    try {
      const res = await API.get(`/weather/current?city=${city}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// Async thunk for hourly forecast
export const fetchHourlyForecast = createAsyncThunk(
  "weather/fetchHourly",
  async ({ city }, { rejectWithValue }) => {
    try {
      const res = await API.get(`/weather/hourly?city=${city}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: null,
    hourly: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Current Weather
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Hourly Forecast
      .addCase(fetchHourlyForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.hourly = action.payload.list || []; // OpenWeather returns `list` for forecast
      })
      .addCase(fetchHourlyForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default weatherSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../../api/axios";

// // Async thunk for current weather
// export const fetchCurrentWeather = createAsyncThunk(
//   "weather/fetchCurrent",
//   async ({ city }, { rejectWithValue }) => {
//     try {
//       const res = await API.get(`/weather/current?city=${city}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || { message: err.message });
//     }
//   }
// );

// // Async thunk for hourly forecast
// export const fetchHourlyForecast = createAsyncThunk(
//   "weather/fetchHourly",
//   async ({ city }, { rejectWithValue }) => {
//     try {
//       const res = await API.get(`/weather/hourly?city=${city}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || { message: err.message });
//     }
//   }
// );

// const weatherSlice = createSlice({
//   name: "weather",
//   initialState: {
//     current: null,
//     hourly: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Current Weather
//       .addCase(fetchCurrentWeather.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
//         state.loading = false;
//         state.current = action.payload;
//       })
//       .addCase(fetchCurrentWeather.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       })

//       // Hourly Forecast
//       .addCase(fetchHourlyForecast.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
//         state.loading = false;
//         state.hourly = action.payload.list || []; // OpenWeather returns `list` for forecast
//       })
//       .addCase(fetchHourlyForecast.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       });
//   },
// });

// export default weatherSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../../api/axios";

// // Fetch weather using city or coordinates
// export const fetchCurrentWeather = createAsyncThunk(
//   "weather/fetchCurrent",
//   async ({ city, lat, lon }, thunkAPI) => {
//     try {
//       const query = new URLSearchParams({ city, lat, lon }).toString();
//       const res = await API.get(`/weather/current?${query}`);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message);
//     }
//   }
// );

// export const fetchHourlyForecast = createAsyncThunk(
//   "weather/fetchHourly",
//   async ({ city, lat, lon }, thunkAPI) => {
//     try {
//       const query = new URLSearchParams({ city, lat, lon }).toString();
//       const res = await API.get(`/weather/hourly?${query}`);
//       return res.data.list; // OpenWeatherMap returns list for forecast
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message);
//     }
//   }
// );

// const weatherSlice = createSlice({
//   name: "weather",
//   initialState: {
//     current: null,
//     hourly: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCurrentWeather.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
//         state.loading = false;
//         state.current = action.payload;
//       })
//       .addCase(fetchCurrentWeather.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchHourlyForecast.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
//         state.loading = false;
//         state.hourly = action.payload;
//       })
//       .addCase(fetchHourlyForecast.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default weatherSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrent",
  async ({ city, lat, lon }, thunkAPI) => {
    try {
      const queryObj = {};
      if (city) queryObj.city = city;
      if (lat != null && lon != null) {
        queryObj.lat = lat;
        queryObj.lon = lon;
      }
      if (Object.keys(queryObj).length === 0) throw new Error("City or coordinates required");

      const query = new URLSearchParams(queryObj).toString();
      const res = await API.get(`/weather/current?${query}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// export const fetchHourlyForecast = createAsyncThunk(
//   "weather/fetchHourly",
//   async ({ city, lat, lon }, thunkAPI) => {
//     try {
//       const queryObj = {};
//       if (city) queryObj.city = city;
//       if (lat != null && lon != null) {
//         queryObj.lat = lat;
//         queryObj.lon = lon;
//       }
//       if (Object.keys(queryObj).length === 0) throw new Error("City or coordinates required");

//       const query = new URLSearchParams(queryObj).toString();
//       const res = await API.get(`/weather/hourly?${query}`);
//       return res.data.list;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );


export const fetchHourlyForecast = createAsyncThunk(
  "weather/fetchHourly",
  async ({ city, lat, lon }, thunkAPI) => {
    try {
      const queryObj = {};
      if (city) queryObj.city = city;
      if (lat != null && lon != null) {
        queryObj.lat = lat;
        queryObj.lon = lon;
      }
      if (Object.keys(queryObj).length === 0) throw new Error("City or coordinates required");

      const query = new URLSearchParams(queryObj).toString();
      const res = await API.get(`/weather/hourly?${query}`);
      return res.data; // already only 1 hour
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
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
  reducers: {
    resetWeather: (state) => {
      state.current = null;
      state.hourly = [];
      state.loading = false;
      state.error = null;
    },
},
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload;
      })
      .addCase(fetchHourlyForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.hourly = action.payload;
      })
      .addCase(fetchHourlyForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetWeather } = weatherSlice.actions;
export default weatherSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../../api/axios";

// export const fetchCities = createAsyncThunk(
//   "cities/fetchCities",
//   async (search = "", thunkAPI) => {
//     try {
//       const res = await API.get(`/cities?search=${search}`);
//       return res.data.cities;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || err.message
//       );
//     }
//   }
// );

// const citiesSlice = createSlice({
//   name: "cities",
//   initialState: {
//     list: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCities.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCities.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchCities.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default citiesSlice.reducer;


// features/city/citiesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (search = "", thunkAPI) => {
    try {
      const res = await API.get(`/cities?search=${search}`);
      return res.data.cities;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const citiesSlice = createSlice({
  name: "cities",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => { state.loading = true; })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default citiesSlice.reducer;

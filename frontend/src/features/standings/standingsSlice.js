import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  standingsTable: [],
  error: null,
};

export const fetchStandings = createAsyncThunk(
  "standings/fetchStandings",
  async () => {
    try {
      const response = await axios.get(
        "https://basketapi1.p.rapidapi.com/api/basketball/tournament/132/season/45096/standings/total",
        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "basketapi1.p.rapidapi.com",
          },
        }
      );

      return response.data.standings;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const standingsSlice = createSlice({
  name: "standings",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStandings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStandings.fulfilled, (state, action) => {
      state.loading = false;
      state.standingsTable = action.payload;
    });
    builder.addCase(fetchStandings.rejected, (state, action) => {
      state.loading = true;
      state.standingsTable = [];
      state.error = action.payload;
    });
  },
});

export default standingsSlice.reducer;

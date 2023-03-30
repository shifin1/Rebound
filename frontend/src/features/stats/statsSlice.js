import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  teamStats: {},
  playersStats: {},
  error: null,
};

export const fetchTeamStats = createAsyncThunk(
  "stats/fetchTeamStats",
  async () => {
    try {
      const response = await axios.get(
        "https://sofascores.p.rapidapi.com/v1/seasons/teams-statistics/result?seasons_id=45096&seasons_statistics_type=regularSeason&unique_tournament_id=132",
        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "sofascores.p.rapidapi.com",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const fetchPlayersStats = createAsyncThunk(
  "stats/fetchPlayersStats",
  async () => {
    try {
      const response = await axios.get(
        "https://sofascores.p.rapidapi.com/v1/seasons/players-statistics/result?seasons_id=45096&seasons_statistics_type=regularSeason&unique_tournament_id=132",
        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "sofascores.p.rapidapi.com",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTeamStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeamStats.fulfilled, (state, action) => {
      state.loading = false;
      state.teamStats = action.payload;
    });
    builder.addCase(fetchTeamStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchPlayersStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlayersStats.fulfilled, (state, action) => {
      state.loading = false;
      state.playersStats = action.payload;
    });
    builder.addCase(fetchPlayersStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default statsSlice.reducer;

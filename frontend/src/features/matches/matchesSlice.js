import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  matchesList: [],
  loading: false,
  error: "",
};

export const getMatchesByDate = createAsyncThunk(
  "matches/getMatchesByDate",
  async (date) => {
    try {
      const response = await axios.get(
        `https://apiv2.allsportsapi.com/basketball/?met=Fixtures&APIkey=${process.env.REACT_APP_ALL_SPORTS_API_KEY}&from=${date}&to=${date}&timezone=Asia/Kolkata&leagueId=766`
      );
      if (!response.data.result) {
        return [];
      } else {
        return response.data.result;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const matchesSlice = createSlice({
  name: "matches",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMatchesByDate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMatchesByDate.fulfilled, (state, action) => {
      state.loading = false;
      state.matchesList = action.payload;
    });
    builder.addCase(getMatchesByDate.rejected, (state, action) => {
      state.matchesList = [];
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default matchesSlice.reducer;

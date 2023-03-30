import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTeamInfo,
  fetchTeamMedia,
  fetchTeamPlayers,
  fetchTeamTransfers,
  fetchTeamMatches,
  fetchAllTeams,
  addTeamReview,
} from "./teamActions";

const initialState = {
  loading: false,
  teamInfo: {},
  error: null,
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  extraReducers: (builder) => {
    // FETCH ALL TEAMS

    builder.addCase(fetchAllTeams.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = action.payload;
    });
    builder.addCase(fetchAllTeams.rejected, (state, action) => {
      state.loading = false;
      state.teams = [];
      state.error = action.payload;
    });

    // TEAM DATA

    builder.addCase(fetchTeamInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeamInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.teamInfo = action.payload;
    });
    builder.addCase(fetchTeamInfo.rejected, (state, action) => {
      state.loading = true;
      state.teamInfo = {};
      state.error = action.payload;
    });

    //  TEAM LOGO

    //  PLAYERS OF THE TEAM

    builder.addCase(fetchTeamPlayers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeamPlayers.fulfilled, (state, action) => {
      state.loading = false;
      state.players = action.payload;
    });
    builder.addCase(fetchTeamPlayers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // LATEST VIDEOS

    builder.addCase(fetchTeamMedia.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeamMedia.fulfilled, (state, action) => {
      state.loading = false;
      state.media = action.payload;
    });
    builder.addCase(fetchTeamMedia.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // TRANSFERS

    builder.addCase(fetchTeamTransfers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeamTransfers.fulfilled, (state, action) => {
      state.loading = false;
      state.transfers = action.payload;
    });
    builder.addCase(fetchTeamTransfers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //  NEXT MATCHES

    builder.addCase(fetchTeamMatches.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeamMatches.fulfilled, (state, action) => {
      state.loading = false;
      state.matches = action.payload;
    });
    builder.addCase(fetchTeamMatches.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // CREATE REVIEW

    builder.addCase(addTeamReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTeamReview.fulfilled, (state, action) => {
      state.loading = false;
      state.reviewSuccess = true;
    });
    builder.addCase(addTeamReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.reviewError = true;
    });
  },
});

export default teamSlice.reducer;

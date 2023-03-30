import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPlayerImage,
  fetchPlayerInfo,
  fetchPlayerStats,
  fetchPlayerTransfers,
} from "./playerActions";

const initialState = {
  loading: false,
  playerInfo: {},
  error: null,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  extraReducers: (builder) => {
    // FETCH PLAYER INFO

    builder.addCase(fetchPlayerInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlayerInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.playerInfo = action.payload;
    });
    builder.addCase(fetchPlayerInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // FETCH PLAYER IMAGE

    builder.addCase(fetchPlayerImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlayerImage.fulfilled, (state, action) => {
      state.loading = false;
      state.image = action.payload;
    });
    builder.addCase(fetchPlayerImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //PLAYER TRANSFER HISTORY

    builder.addCase(fetchPlayerTransfers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlayerTransfers.fulfilled, (state, action) => {
      state.loading = false;
      state.transferHistory = action.payload;
    });
    builder.addCase(fetchPlayerTransfers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // PLAYER STATS

    builder.addCase(fetchPlayerStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlayerStats.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    });
    builder.addCase(fetchPlayerStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default playerSlice.reducer;

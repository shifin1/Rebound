import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ************  PLAYER INFO *********************

export const fetchPlayerInfo = createAsyncThunk(
  "player/fetchPlayerInfo",
  async (playerId) => {
    try {
      const response = await axios.get(
        `https://basketapi1.p.rapidapi.com/api/basketball/player/${playerId}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "basketapi1.p.rapidapi.com",
          },
        }
      );
      return response.data.player;
    } catch (error) {
      console.log(error);
    }
  }
);

// ************  PLAYER PHOTO *********************

export const fetchPlayerImage = createAsyncThunk(
  "player/fetchPlayerImage",
  async (playerId) => {
    try {
      const response = await axios.get(
        `https://basketapi1.p.rapidapi.com/api/basketball/player/${playerId}/image`,

        {
          responseType: "arraybuffer",
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "basketapi1.p.rapidapi.com",
          },
        }
      );

      let blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      let image = URL.createObjectURL(blob);
      return image;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

//   PLAYER TRANSFER HISTORY

export const fetchPlayerTransfers = createAsyncThunk(
  "player/fetchPlayerTransfers",
  async (playerId) => {
    try {
      const response = await axios.get(
        `https://basketapi1.p.rapidapi.com/api/basketball/player/${playerId}/transfers`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "basketapi1.p.rapidapi.com",
          },
        }
      );
      return response.data.transferHistory;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

// FETCH PLAYER STATISTICS

export const fetchPlayerStats = createAsyncThunk(
  "player/fetchPlayerStats",
  async (playerId) => {
    try {
      const response = await axios.get(
        `https://basketapi1.p.rapidapi.com/api/basketball/player/${playerId}/tournament/132/season/45096/statistics/regularseason`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "basketapi1.p.rapidapi.com",
          },
        }
      );
      return response.data.statistics;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

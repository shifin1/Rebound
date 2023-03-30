import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  newsList: [],
  error: "",
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  try {
    const response = await axios.get(
      "https://nba-latest-news.p.rapidapi.com/articles?limit=50",
      {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": "nba-latest-news.p.rapidapi.com",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.loading = false;
      state.newsList = action.payload;
      state.error = "";
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.loading = false;
      state.newsList = [];
      state.error = action.error.message;
    });
  },
});

export default newsSlice.reducer;

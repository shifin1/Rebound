import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeamInfo = createAsyncThunk(
  "team/fetchTeamInfo",
  async (teamId) => {
    try {
      const response = await axios.get(
        `https://basketapi1.p.rapidapi.com/api/basketball/team/${teamId}`,

        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,

            "X-RapidAPI-Host": "basketapi1.p.rapidapi.com",
          },
        }
      );

      return response.data.team;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const fetchAllTeams = createAsyncThunk(
  "team/fetchAllTeams",
  async () => {
    try {
      const response = await axios.get("/api/teams");
      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const fetchTeamPlayers = createAsyncThunk(
  "team/fetchTeamPlayers",
  async (teamId) => {
    try {
      const response = await axios.get(
        `https://basketapi1.p.rapidapi.com/api/basketball/team/${teamId}/players`,

        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "basketapi1.p.rapidapi.com",
          },
        }
      );

      return response.data.players;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const fetchTeamMedia = createAsyncThunk(
  "team/fetchTeamMedia",
  async (teamId) => {
    try {
      const response = await axios.get(
        `https://sofasport.p.rapidapi.com/v1/teams/latest-media?team_id=${teamId}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "sofasport.p.rapidapi.com",
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const fetchTeamTransfers = createAsyncThunk(
  "team/fetchTeamTransfers",
  async (teamId) => {
    try {
      const response = await axios.get(
        ` https://basketapi1.p.rapidapi.com/api/basketball/team/${teamId}/transfers`,

        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "basketapi1.p.rapidapi.com",
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const fetchTeamMatches = createAsyncThunk(
  "team/fetchTeamMatches",
  async (teamId) => {
    try {
      const response = await axios.get(
        `https://basketapi1.p.rapidapi.com/api/basketball/team/${teamId}/matches/next/0`,

        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            "X-RapidAPI-Host": "basketapi1.p.rapidapi.com",
          },
        }
      );

      return response.data.events;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const addTeamReview = createAsyncThunk(
  "team/addTeamReview",
  async (obj, { getState }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const { teamId, comment } = obj;

    try {
      await axios.post(
        `/api/teams/${teamId}/review`,
        { comment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
    } catch (error) {
      return error.response.data.message;
    }
  }
);

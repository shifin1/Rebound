import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/news/newsSlice";
import userLoginReducer from "../features/users/userSlice";
import userRegisterReducer from "../features/users/userRegisterSlice";
import matchesReducer from "../features/matches/matchesSlice";
import standingsReducer from "../features/standings/standingsSlice";
import statsReducer from "../features/stats/statsSlice";
import teamReducer from "../features/team/teamSlice";
import playerReducer from "../features/player/playerSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    matches: matchesReducer,
    standings: standingsReducer,
    stats: statsReducer,
    team: teamReducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;

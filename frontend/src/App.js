import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import HomeScreen from "./screens/Homescreen";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NewsScreen from "./screens/NewsScreen";
import MatchesScreen from "./screens/MatchesScreen";
import MatchScreen from "./screens/MatchScreen";
import StandingsScreen from "./screens/StandingsScreen";
import StatsScreen from "./screens/StatsScreen";
import TeamScreen from "./screens/TeamScreen";
import PlayerScreen from "./screens/PlayerScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route
              path="/"
              element={<HomeScreen />}
              exact
            />
            <Route
              path="/login"
              element={<LoginScreen />}
            />
            <Route
              path="/register"
              element={<RegisterScreen />}
            />
            <Route
              path="/news"
              element={<NewsScreen />}
            />
            <Route
              path="/matches"
              element={<MatchesScreen />}
            />
            <Route
              path="/matches/:key"
              element={<MatchScreen />}
            />
            <Route
              path="/standings"
              element={<StandingsScreen />}
            />
            <Route
              path="/stats"
              element={<StatsScreen />}
            />
            <Route
              path="/teams/:id"
              element={<TeamScreen />}
            />
            <Route
              path="/players/:id"
              element={<PlayerScreen />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./statsScreen.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTeamStats,
  fetchPlayersStats,
} from "../features/stats/statsSlice";
import StatSection from "../components/StatSection";
import Loader from "../components/Loader";
import { Error } from "../components/Message";

const StatsScreen = () => {
  const dispatch = useDispatch();

  const stats = useSelector((state) => state.stats);
  const { loading, teamStats, playersStats, error } = stats;

  const [section, setSection] = useState("team");

  useEffect(() => {
    dispatch(fetchTeamStats());
    dispatch(fetchPlayersStats());
  }, [dispatch]);

  return (
    <Container>
      <h1>Stats</h1>
      <div className="toggle__stats ">
        <button
          className={
            section === "team" ? "team__button active__section" : "team__button"
          }
          type="button"
          onClick={() => {
            setSection("team");
          }}
        >
          Teams
        </button>
        <button
          className={
            section === "players"
              ? "players__button active__section"
              : "players__button"
          }
          type="button"
          onClick={() => setSection("players")}
        >
          Players
        </button>
      </div>

      {section === "team" && (
        <div className="team__stats__container">
          {loading && <Loader />}
          {error && <Error text={error} />}

          {Object.keys(teamStats).map((stat, i) => (
            <StatSection
              key={i}
              name={
                stat
                  .replace(/([A-Z])/g, " $1")
                  .charAt(0)
                  .toUpperCase() + stat.replace(/([A-Z])/g, " $1").slice(1)
              }
              statArray={teamStats[stat]}
              stat={stat}
              section={section}
            />
          ))}
        </div>
      )}

      {section === "players" && (
        <div className="team__stats__container">
          {loading && <Loader />}
          {error && <Error text={error} />}

          {Object.keys(playersStats).map((stat, i) => (
            <StatSection
              key={i}
              name={
                stat
                  .replace(/([A-Z])/g, " $1")
                  .charAt(0)
                  .toUpperCase() + stat.replace(/([A-Z])/g, " $1").slice(1)
              }
              statArray={playersStats[stat]}
              stat={stat}
              section={section}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default StatsScreen;

import React from "react";
import "./matchComponent.css";
import { useNavigate } from "react-router-dom";

const MatchComponent = ({ match, team }) => {
  const date = new Date(match.startTimestamp * 1000);
  const navigate = useNavigate();

  const time = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/kolkata",
  }).format(date);

  return (
    <div className="match__box">
      <div className="match_time">
        <p>{time.slice(0, 10)}</p>
        <p>{time.slice(10, 19)}</p>
      </div>
      <div className="teams_name">
        <div
          onClick={() => navigate(`/teams/${match.homeTeam.id}`)}
          className={match.homeTeam.name === team ? "" : "blur"}
        >
          {match.homeTeam.name}
        </div>
        <div
          onClick={() => navigate(`/teams/${match.awayTeam.id}`)}
          className={match.awayTeam.name === team ? "" : "blur"}
        >
          {match.awayTeam.name}
        </div>
      </div>
    </div>
  );
};

export default MatchComponent;

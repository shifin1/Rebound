import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./matchCard.css";

const MatchCard = ({ match }) => {
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  const toggle = () => {
    setIsClicked(!isClicked);
  };

  const toMatchPage = (key) => {
    navigate(`/matches/${key}`);
  };

  return (
    <div
      onClick={toggle}
      className="match__card"
    >
      <div className="home__team team">
        <img
          src={match.event_home_team_logo}
          alt={match.event_home_team}
        />
        <p>{match.event_home_team}</p>
      </div>

      <div className="score">
        <h6>{match.event_final_result}</h6>
        <p>
          {match.event_status === "Finished"
            ? "finished"
            : match.event_status === "After Over Time"
            ? "finished"
            : match.event_quarter
            ? match.event_quarter
            : match.event_time}
        </p>
      </div>

      <div className="away__team team">
        <p>{match.event_away_team}</p>
        <img
          src={match.event_away_team_logo}
          alt={match.event_away_team}
        />
      </div>
      <div>
        <button
          className="details__button"
          type="button"
          onClick={() => toMatchPage(match.event_key)}
        >
          <i className="fa-solid fa-circle-info"></i>
        </button>
      </div>
    </div>
  );
};

export default MatchCard;

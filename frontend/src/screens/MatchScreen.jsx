import React, { useEffect, useState } from "react";
import "./matchScreen.css";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMatchesByDate } from "../features/matches/matchesSlice";
import getDate from "../functions/getDate";
import Loader from "../components/Loader";

const MatchScreen = () => {
  const { key } = useParams();
  const dispatch = useDispatch();
  const date = getDate();

  const [section, setSection] = useState("lineup");
  const [quarter, setQuarter] = useState("Q1");

  const matches = useSelector((state) => state.matches);
  const { matchesList } = matches;

  useEffect(() => {
    if (matchesList.length < 1) {
      dispatch(getMatchesByDate(date));
    }
  }, [dispatch, date, matchesList]);

  const match = matchesList.filter((m) => m.event_key === Number(key))[0];

  return (
    <Container>
      {matchesList.length === 0 ? (
        <Loader />
      ) : (
        <div className="match__container">
          <div className="teams__header">
            <div className="home__team__details">
              <p>{match.event_home_team}</p>
              <img
                src={match.event_home_team_logo}
                alt="home-team-logo"
              />
            </div>
            <div className="vs">
              <p>vs</p>
            </div>

            <div className="away__team__details">
              <p>{match.event_away_team}</p>
              <img
                src={match.event_away_team_logo}
                alt="away-team-logo"
              />
            </div>
          </div>
          <div className="sections">
            <button
              type="button"
              className={section === "lineup" ? "active_section" : ""}
              onClick={() => setSection("lineup")}
            >
              Lineup
            </button>
            <button
              type="button"
              className={section === "boxScore" ? "active_section" : ""}
              onClick={() => setSection("boxScore")}
            >
              Box score
            </button>

            <button
              type="button"
              className={section === "details" ? "active_section" : ""}
              onClick={() => setSection("details")}
            >
              Details
            </button>
          </div>
          {section === "lineup" && (
            <div className="lineup">
              <div className="home_team_lineup">
                <div className="starters">
                  <p>Starters</p>
                  {match.lineups.home_team.starting_lineups
                    ? match.lineups.home_team.starting_lineups.map((player) => (
                        <li key={player.player_id}>{player.player}</li>
                      ))
                    : "lineup not available"}
                </div>
                <div className="subs">
                  <p>Substitutes</p>
                  {match.lineups.home_team.substitutes
                    ? match.lineups.home_team.substitutes.map((player) => (
                        <li key={player.player_id}>{player.player}</li>
                      ))
                    : "lineup not available"}
                </div>
              </div>
              <div className="away_team_lineup">
                <div className="starters">
                  <p>Starters</p>
                  {match.lineups.away_team.starting_lineups
                    ? match.lineups.away_team.starting_lineups.map((player) => (
                        <li key={player.player_id}>{player.player}</li>
                      ))
                    : "lineup not available"}
                </div>
                <div className="subs">
                  <p>Substitutes</p>
                  {match.lineups.away_team.substitutes
                    ? match.lineups.away_team.substitutes.map((player) => (
                        <li key={player.player_id}>{player.player}</li>
                      ))
                    : "lineup not available"}
                </div>
              </div>
            </div>
          )}

          {section === "boxScore" && (
            <div className="boxScore">
              <div className="box_score_th">
                <div className="box_score_player_name">Name</div>
                <p>PTS</p>
                <p>AST</p>
                <p>REB</p>
              </div>
              <div className="boxscore_team">
                <img
                  src={match.event_home_team_logo}
                  alt="hometeam"
                />
                <p>{match.event_home_team}</p>
              </div>
              <div className="home_box_score">
                {match.player_statistics.home_team
                  ? match.player_statistics.home_team.map((player) => (
                      <div
                        key={player.player_id}
                        className="player_box_score "
                      >
                        <p>
                          {player.player}({player.player_position})
                        </p>
                        <p>{player.player_points}</p>
                        <p>
                          {Number(player.player_defense_rebounds) +
                            Number(player.player_offence_rebounds)}
                        </p>
                        <p>{player.player_assists}</p>
                      </div>
                    ))
                  : "Box Score not available right now !"}
              </div>
              <div className="boxscore_team">
                <img
                  src={match.event_away_team_logo}
                  alt="awayteam"
                />
                <p>{match.event_away_team}</p>
              </div>
              <div className="away_box_score">
                {match.player_statistics.away_team
                  ? match.player_statistics.away_team.map((player) => (
                      <div
                        key={player.player_id}
                        className="player_box_score "
                      >
                        <p>
                          {player.player}({player.player_position})
                        </p>
                        <p>{player.player_points}</p>
                        <p>
                          {Number(player.player_defense_rebounds) +
                            Number(player.player_offence_rebounds)}
                        </p>
                        <p>{player.player_assists}</p>
                      </div>
                    ))
                  : "Box Score not available right now !"}
              </div>
            </div>
          )}

          {section === "details" && (
            <div className="details">
              <div className="quarters">
                <button
                  className={quarter === "ALL" ? "active__quarter" : ""}
                  type="button"
                  onClick={() => setQuarter("ALL")}
                >
                  ALL
                </button>
                <button
                  className={quarter === "Q1" ? "active__quarter" : ""}
                  type="button"
                  onClick={() => setQuarter("Q1")}
                >
                  Q1
                </button>
                <button
                  className={quarter === "Q2" ? "active__quarter" : ""}
                  type="button"
                  onClick={() => setQuarter("Q2")}
                >
                  Q2
                </button>
                <button
                  className={quarter === "Q3" ? "active__quarter" : ""}
                  type="button"
                  onClick={() => setQuarter("Q3")}
                >
                  Q3
                </button>
                <button
                  className={quarter === "Q4" ? "active__quarter" : ""}
                  type="button"
                  onClick={() => setQuarter("Q4")}
                >
                  Q4
                </button>
              </div>
              {quarter === "ALL" && (
                <div className="quarter__details all">
                  <p
                    style={{ fontSize: "12px", color: "black" }}
                  >{` Basketball, USA, NBA, ${match.league_season}`}</p>
                  {match.event_live === "0" ? (
                    <p>
                      Match Status:{" "}
                      <span style={{ color: "red" }}>Finished</span>{" "}
                    </p>
                  ) : (
                    <p>
                      Match Status: <span style={{ color: "green" }}>Live</span>
                    </p>
                  )}
                  <p>{`Final Score : ${match.event_final_result}`}</p>
                </div>
              )}
              {quarter === "Q1" && (
                <div className="quarter__details q1">
                  <p>{`${match.event_home_team} : ${match.scores["1stQuarter"][0].score_home}`}</p>
                  <p>{`${match.event_away_team} : ${match.scores["1stQuarter"][0].score_away}`}</p>
                </div>
              )}
              {quarter === "Q2" && (
                <div className="quarter__details q2">
                  <p>{`${match.event_home_team} : ${match.scores["2ndQuarter"][0].score_home}`}</p>
                  <p>{`${match.event_away_team} : ${match.scores["2ndQuarter"][0].score_away}`}</p>
                </div>
              )}
              {quarter === "Q3" && (
                <div className="quarter__details q3">
                  <p>{`${match.event_home_team} : ${match.scores["3rdQuarter"][0].score_home}`}</p>
                  <p>{`${match.event_away_team} : ${match.scores["3rdQuarter"][0].score_away}`}</p>
                </div>
              )}
              {quarter === "Q4" && (
                <div className="quarter__details q4">
                  <p>{`${match.event_home_team} : ${match.scores["4thQuarter"][0].score_home}`}</p>
                  <p>{`${match.event_away_team} : ${match.scores["4thQuarter"][0].score_away}`}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default MatchScreen;

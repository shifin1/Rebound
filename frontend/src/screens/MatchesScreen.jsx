import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./matchesScreen.css";
import { getMatchesByDate } from "../features/matches/matchesSlice";
import { Container } from "react-bootstrap";
import getDate from "../functions/getDate";
import Loader from "../components/Loader";
import { Error, Info } from "../components/Message";
import MatchCard from "../components/MatchCard";
import { useNavigate } from "react-router-dom";

const MatchesScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = getDate();

  const matches = useSelector((state) => state.matches);
  const { matchesList, loading, error } = matches;

  const firstMatch = matchesList.length < 1 ? "" : matchesList[0].event_key;

  const [selectedMatch, setSelectedMatch] = useState("");

  useEffect(() => {
    dispatch(getMatchesByDate(date));
    setSelectedMatch(firstMatch);
  }, [dispatch, date, firstMatch]);

  const toMatchPage = (key) => {
    navigate(`/matches/${key}`);
  };

  const statCountHome = (match, type) => {
    if (match.statistics.find((stat) => stat.type === type) === undefined) {
      return "-";
    } else {
      return match.statistics.find((stat) => stat.type === type).home;
    }
  };

  const statCountAway = (match, type) => {
    if (match.statistics.find((stat) => stat.type === type) === undefined) {
      return "-";
    } else {
      return match.statistics.find((stat) => stat.type === type).away;
    }
  };

  return (
    <Container>
      <h1 className="title">MATCHES</h1>

      <div className="container__matches">
        <div
          className={
            matchesList.length < 1
              ? "border__none matches__list__container "
              : "matches__list__container"
          }
        >
          {loading && <Loader />}
          {error && <Error />}
          {matchesList.length < 1 ? (
            <Info text="No matches today" />
          ) : (
            matchesList.map((match) => (
              <div
                key={match.event_key}
                className={
                  selectedMatch === match.event_key
                    ? "cards__container active__match"
                    : "cards__container"
                }
                onClick={() => setSelectedMatch(match.event_key)}
              >
                <MatchCard match={match} />
              </div>
            ))
          )}
        </div>

        {matchesList &&
          matchesList
            .filter((m) => m.event_key === selectedMatch)
            .map((match) => (
              <div
                key={match.event_key}
                className="match__details__container"
              >
                {match.statistics && match.statistics.length === 0 ? (
                  <div className="error__message">
                    <Error text="Not available at the moment" />
                  </div>
                ) : (
                  <>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src={match.event_home_team_logo}
                              alt="hdv"
                              className="team__logo"
                            />
                          </td>
                          <td>
                            <p>vs</p>
                          </td>
                          <td>
                            <img
                              src={match.event_away_team_logo}
                              alt="hdv"
                              className="team__logo"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {statCountHome(match, "Total Field Goals")} /
                            {statCountHome(match, "Attempts Field Goals")}
                          </td>
                          <td>Field goals</td>
                          {statCountAway(match, "Total Field Goals")} /
                          {statCountAway(match, "Attempts Field Goals")}
                        </tr>
                        <tr>
                          <td>
                            {statCountHome(match, "Total FreeThrows")} /
                            {statCountHome(match, "Attempts FreeThrows")}
                          </td>
                          <td>Free throws</td>
                          <td>
                            {statCountAway(match, "Total FreeThrows")} /
                            {statCountAway(match, "Attempts FreeThrows")}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {statCountHome(match, "Total Threepoint Goals")} /
                            {statCountHome(match, "Attempts Threepoint Goals")}
                          </td>
                          <td>3 pointers</td>
                          <td>
                            {statCountAway(match, "Total Threepoint Goals")} /
                            {statCountAway(match, "Attempts Threepoint Goals")}
                          </td>
                        </tr>
                        <tr>
                          <td>{statCountHome(match, "Total Rebounds")} </td>
                          <td>Rebounds</td>
                          <td>{statCountAway(match, "Total Rebounds")}</td>
                        </tr>
                        <tr>
                          <td>{statCountHome(match, "Defense Rebounds")}</td>
                          <td>Defensive rebounds</td>
                          <td>{statCountAway(match, "Defense Rebounds")}</td>
                        </tr>
                        <tr>
                          <td>{statCountHome(match, "Offence Rebounds")}</td>
                          <td>Offensive rebounds</td>
                          <td>{statCountAway(match, "Offence Rebounds")}</td>
                        </tr>
                        <tr>
                          <td>{statCountHome(match, "Total Assists")}</td>
                          <td>Assists</td>
                          <td>{statCountAway(match, "Total Assists")}</td>
                        </tr>
                        <tr>
                          <td>{statCountHome(match, "Total Turnovers")}</td>
                          <td>Turnovers</td>
                          <td>{statCountAway(match, "Total Turnovers")}</td>
                        </tr>
                        <tr>
                          <td>{statCountHome(match, "Total Steals")}</td>
                          <td>Steals</td>
                          <td>{statCountAway(match, "Total Steals")}</td>
                        </tr>
                        <tr>
                          <td>{statCountHome(match, "Total Blocks")}</td>
                          <td>Blocks</td>
                          <td>{statCountAway(match, "Total Blocks")}</td>
                        </tr>
                        <tr>
                          <td>
                            {statCountHome(match, "Total Personal Fouls")}
                          </td>
                          <td>Fouls</td>
                          <td>
                            {statCountAway(match, "Total Personal Fouls")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      className="match__details__button"
                      type="button"
                      onClick={() => toMatchPage(match.event_key)}
                    >
                      Click to see more
                    </button>
                  </>
                )}
              </div>
            ))}
      </div>
    </Container>
  );
};

export default MatchesScreen;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./standingsScreen.css";
import { fetchStandings } from "../features/standings/standingsSlice";
import { Container } from "react-bootstrap";
import { Error, Info } from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const StandingsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStandings());
  }, [dispatch]);

  const standings = useSelector((state) => state.standings);
  const { loading, standingsTable, error } = standings;

  const easternConference =
    typeof standingsTable !== "string" && standingsTable.length > 0
      ? standingsTable.filter(
          (tournament) => tournament.name === "Eastern Conference"
        )[0].rows
      : null;

  const westernConference =
    typeof standingsTable !== "string" && standingsTable.length > 0
      ? standingsTable.filter(
          (tournament) => tournament.name === "Western Conference"
        )[0].rows
      : null;

  return (
    <Container>
      <div className="standings__table__container">
        {loading && <Loader />}
        {error && <Error text={error} />}

        <div className="eastern__conf">
          <div className="table__head">
            <img
              src="https://andscape.com/wp-content/uploads/2017/06/nbalogo.jpg?w=700"
              alt="nba-logo"
            />
            <p>Eastern Conference</p>
          </div>
          <div className="standings__table">
            {easternConference === null ? (
              <Info text="Not available" />
            ) : (
              <>
                <div className="table__columns">
                  <p className="text__center rank">#</p>
                  <p>Team</p>
                  <p className="text__center">P</p>
                  <p className="text__center">W-L</p>
                  <p className="text__center">PCT</p>
                </div>
                {easternConference.map((team, i) => (
                  <div
                    key={team.id}
                    className="team__row"
                  >
                    <p
                      className={
                        i + 1 < 11
                          ? "qualify text__center rank"
                          : "text__center rank"
                      }
                    >
                      {i + 1}
                    </p>
                    <p
                      onClick={() => navigate(`/teams/${team.team.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {team.team.name}
                    </p>
                    <p className="text__center">{team.matches}</p>
                    <p className="text__center">
                      {team.wins}-{team.losses}
                    </p>
                    <p className="text__center"> {team.percentage} </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="western__conf">
          <div className="table__head">
            <img
              src="https://andscape.com/wp-content/uploads/2017/06/nbalogo.jpg?w=700"
              alt="nba-logo"
            />
            <p>Western Conference</p>
          </div>
          <div className="standings__table">
            {westernConference === null ? (
              <Info text="Not available" />
            ) : (
              <>
                <div className="table__columns">
                  <p className="text__center rank">#</p>
                  <p>Team</p>
                  <p className="text__center">P</p>
                  <p className="text__center">W-L</p>
                  <p className="text__center">PCT</p>
                </div>
                {westernConference.map((team, i) => (
                  <div
                    key={team.id}
                    className="team__row"
                  >
                    <p
                      className={
                        i + 1 < 11
                          ? "qualify text__center rank"
                          : "text__center rank"
                      }
                    >
                      {i + 1}
                    </p>
                    <p
                      onClick={() => navigate(`/teams/${team.team.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {team.team.name}
                    </p>
                    <p className="text__center">{team.matches}</p>
                    <p className="text__center">
                      {team.wins}-{team.losses}
                    </p>
                    <p className="text__center"> {team.percentage} </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default StandingsScreen;

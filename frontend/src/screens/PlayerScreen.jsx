import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./playerScreen.css";
import {
  fetchPlayerImage,
  fetchPlayerInfo,
  fetchPlayerStats,
  fetchPlayerTransfers,
} from "../features/player/playerActions";
import { fetchAllTeams } from "../features/team/teamActions";
import Loader from "../components/Loader";
import { Error } from "../components/Message";

const PlayerScreen = () => {
  const dispatch = useDispatch();
  const { id: playerId } = useParams();
  const navigate = useNavigate();

  const [section, setSection] = useState("details");

  const player = useSelector((state) => state.player);
  const { loading, playerInfo, error, image, transferHistory, stats } = player;
  const totalMatches = stats && stats.appearances;

  const team = useSelector((state) => state.team);
  const { teams } = team;

  useEffect(() => {
    if (!teams) {
      dispatch(fetchAllTeams());
    }
    dispatch(fetchPlayerImage(playerId));
    setTimeout(() => {
      dispatch(fetchPlayerInfo(playerId));
    }, 1000);

    setTimeout(() => {
      dispatch(fetchPlayerTransfers(playerId));
    }, 2000);
  }, [dispatch, playerId, teams]);

  const convertTime = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    const convertedDate = date.toLocaleString("en-IN");
    return convertedDate.slice(0, 10);
  };

  return (
    <Container>
      {loading && <Loader />}
      {error && <Error text={error} />}
      {playerInfo && (
        <>
          <div className="player__header">
            <p>{playerInfo.name}</p>
            <img
              className="player__image"
              src={image}
              alt="img"
            />

            <div className="player__sections">
              <button
                type="button"
                className={section === "details" ? "active_player_section" : ""}
                onClick={() => setSection("details")}
              >
                Details
              </button>
              <button
                type="button"
                className={section === "stats" ? "active_player_section" : ""}
                onClick={() => {
                  setSection("stats");
                  if (!stats) {
                    dispatch(fetchPlayerStats(playerId));
                  }
                }}
              >
                Statistics
              </button>
            </div>
          </div>
        </>
      )}

      {section === "details" && (
        <>
          <div
            className="player__team__name"
            onClick={() => navigate(`/teams/${playerInfo.team.id}`)}
          >
            <img
              src={
                teams !== undefined && playerInfo.team !== undefined
                  ? teams.find((team) => team.team_key === playerInfo.team.id)
                      .team_logo
                  : ""
              }
              alt={playerInfo.team !== undefined ? playerInfo.team.name : "img"}
            />
            <p>{playerInfo.team !== undefined ? playerInfo.team.name : "-"}</p>
          </div>
          <div className="player__details">
            <div className="player__info">
              <p className="info__1">nationality</p>
              <p className="info__2">
                {playerInfo.country !== undefined
                  ? playerInfo.country.name
                  : "-"}
              </p>
            </div>
            <div className="player__info">
              <p className="info__1">dob</p>
              <p className="info__2">
                {convertTime(playerInfo.dateOfBirthTimestamp)}
              </p>
            </div>
            <div className="player__info">
              <p className="info__1">height</p>
              <p className="info__2">{playerInfo.height} cm</p>
            </div>
            <div className="player__info">
              <p className="info__1">position</p>
              <p className="info__2">{playerInfo.position}</p>
            </div>
            <div className="player__info">
              <p className="info__1">shirt number</p>
              <p className="info__2">{playerInfo.shirtNumber}</p>
            </div>
          </div>
          <div className="transfer__history">
            <h5>Transfer history</h5>
            {transferHistory &&
              transferHistory.length !== 0 &&
              transferHistory.map((transfer) => (
                <div
                  className="transfer"
                  key={transfer.id}
                >
                  <div className="transfer_team_logo">
                    <img
                      src={
                        teams
                          ? teams.find(
                              (team) => team.team_key === transfer.transferTo.id
                            ).team_logo
                          : ""
                      }
                      alt="teamname"
                      onClick={() =>
                        navigate(`/teams/${transfer.transferTo.id}`)
                      }
                    />
                  </div>

                  <div
                    className="transfer__details"
                    onClick={() => navigate(`/teams/${transfer.transferTo.id}`)}
                  >
                    <p className="transfer_team">{transfer.transferTo.name}</p>
                    <p className="transfer_date">
                      {convertTime(transfer.transferDateTimestamp).slice(0, 9)}
                    </p>
                  </div>
                  <div
                    className="transfer__details"
                    style={{ fontSize: "14px", color: "green" }}
                  >
                    {transfer.type === 5
                      ? `Draft round ${transfer.round}, pick ${transfer.pick}`
                      : "-"}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
      {section === "stats" && stats !== undefined && (
        <>
          <div className="stat__div">
            <p className="category">Matches</p>
            <div className="stat">
              <p>Total Played</p>
              <p>{totalMatches}</p>
            </div>
            <div className="stat">
              <p>Minutes per game</p>
              <p>
                {stats.secondsPlayed
                  ? Math.round(stats.secondsPlayed / 60 / totalMatches)
                  : ""}
              </p>
            </div>
          </div>

          <div className="stat__div">
            <p className="category">Points (per game)</p>
            <div className="stat">
              <p>Points</p>
              <p>{(stats.points / totalMatches).toFixed(1)}</p>
            </div>
            <div className="stat">
              <p>Free throws</p>
              <p>
                {(stats.freeThrowsMade / totalMatches).toFixed(1)}(
                {Math.round(stats.freeThrowsPercentage)}%)
              </p>
            </div>
            <div className="stat">
              <p>2 pointers</p>
              <p>
                {(stats.twoPointsMade / totalMatches).toFixed(1)}(
                {Math.round(stats.twoPointsPercentage)}%)
              </p>
            </div>
            <div className="stat">
              <p>3 pointers</p>
              <p>
                {(stats.threePointsMade / totalMatches).toFixed(1)}(
                {Math.round(stats.threePointsPercentage)}%)
              </p>
            </div>
            <div className="stat">
              <p>Field Goals</p>
              <p>
                {" "}
                {(stats.fieldGoalsMade / totalMatches).toFixed(1)}(
                {Math.round(stats.fieldGoalsPercentage)}%)
              </p>
            </div>
          </div>

          <div className="stat__div">
            <p className="category">Rebounds (per game)</p>
            <div className="stat">
              <p>Rebounds</p>
              <p>{(stats.rebounds / totalMatches).toFixed(1)}</p>
            </div>
            <div className="stat">
              <p>Defensive rebounds</p>
              <p>{(stats.defensiveRebounds / totalMatches).toFixed(1)}</p>
            </div>
            <div className="stat">
              <p>Offensive rebounds</p>
              <p>{(stats.offensiveRebounds / totalMatches).toFixed(1)}</p>
            </div>
          </div>

          <div className="stat__div">
            <p className="category">Other (per game)</p>
            <div className="stat">
              <p>Assists</p>
              <p>{(stats.assists / totalMatches).toFixed(1)}</p>
            </div>
            <div className="stat">
              <p>Turnovers</p>
              <p>{(stats.turnovers / totalMatches).toFixed(1)}</p>
            </div>
            <div className="stat">
              <p>Steals</p>
              <p>{(stats.steals / totalMatches).toFixed(1)}</p>
            </div>
            <div className="stat">
              <p>Blocks</p>
              <p>{(stats.blocks / totalMatches).toFixed(1)}</p>
            </div>
            <div className="stat">
              <p>Personal fouls</p>
              <p>{(stats.personalFouls / totalMatches).toFixed(1)}</p>
            </div>
            <div className="stat">
              <p>+/-</p>
              <p>{(stats.plusMinus / totalMatches).toFixed(1)}</p>
            </div>
          </div>

          <div className="stat__div">
            <p className="category">Extra</p>
            <div className="stat">
              <p>Double doubles</p>
              <p>{stats.doubleDoubles}</p>
            </div>
            <div className="stat">
              <p>Triple doubles</p>
              <p>{stats.tripleDoubles}</p>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default PlayerScreen;

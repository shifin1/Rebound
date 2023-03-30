import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./teamScreen.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTeamInfo,
  fetchTeamPlayers,
  fetchTeamMedia,
  fetchTeamTransfers,
  fetchTeamMatches,
  fetchAllTeams,
  addTeamReview,
} from "../features/team/teamActions";
import Loader from "../components/Loader";
import { Error, Success } from "../components/Message";
import MatchComponent from "../components/MatchComponent";

const TeamScreen = () => {
  const dispatch = useDispatch();
  const { id: teamId } = useParams();
  const navigate = useNavigate();

  const [section, setSection] = useState("details");
  const [clicked, setClicked] = useState(false);
  const [comment, setComment] = useState("");

  const team = useSelector((state) => state.team);
  const {
    teamInfo,
    loading,
    error,
    matches,
    teams,
    transfers,
    reviewSuccess,
    players,
  } = team;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addComment = (e) => {
    e.preventDefault();

    dispatch(
      addTeamReview({
        teamId,
        comment,
      })
    );
    setComment("");
  };

  const currentTeam =
    teams !== undefined
      ? teams.find((team) => team.team_key === Number(teamId))
      : "";

  useEffect(() => {
    dispatch(fetchTeamInfo(teamId));
    dispatch(fetchTeamMatches(teamId));
    setTimeout(() => {
      dispatch(fetchTeamTransfers(teamId));
      dispatch(fetchTeamPlayers(teamId));
    }, 2000);

    if (!teams) {
      dispatch(fetchAllTeams());
    }
  }, [dispatch, teamId, teams, currentTeam]);

  const unixTimestamp = matches && matches[0].startTimestamp;
  const date = new Date(unixTimestamp * 1000);

  return (
    <Container>
      {loading && <Loader />}
      {error && <Error text={error} />}
      {teamInfo && (
        <>
          <div className="team__header">
            <p>{currentTeam.team_name}</p>
            <img
              src={currentTeam.team_logo}
              alt="img"
            />

            <div className="team__sections">
              <button
                type="button"
                className={section === "details" ? "active_team_section" : ""}
                onClick={() => setSection("details")}
              >
                Details
              </button>
              <button
                type="button"
                className={section === "matches" ? "active_team_section" : ""}
                onClick={() => setSection("matches")}
              >
                matches
              </button>

              <button
                type="button"
                className={section === "squad" ? "active_team_section" : ""}
                onClick={() => setSection("squad")}
              >
                squad
              </button>
            </div>
          </div>
        </>
      )}

      {/* DETAILS */}

      {/* *************************************************************************************** */}

      {section === "details" && (
        <>
          <div className="detail__box">
            <h5>Featured Match</h5>
            {matches && matches.length > 0 && (
              <div className="next_match_preview">
                <div className="home_team teams">
                  <p>{matches[0].homeTeam && matches[0].homeTeam.name}</p>
                  <img
                    src={
                      teams
                        ? teams.find(
                            (team) => team.team_key === matches[0].homeTeam.id
                          ).team_logo
                        : ""
                    }
                    alt={matches[0].homeTeam ? matches[0].homeTeam.name : ""}
                    onClick={() =>
                      navigate(
                        `/teams/${
                          matches[0].homeTeam && matches[0].homeTeam.id
                        }`
                      )
                    }
                  />
                </div>
                <div className="time">
                  <p>
                    {date &&
                      new Intl.DateTimeFormat("en-IN", {
                        dateStyle: "short",
                        timeStyle: "short",
                        timeZone: "Asia/kolkata",
                      }).format(date)}
                  </p>
                </div>
                <div className="away_team teams">
                  <p>{matches[0].awayTeam ? matches[0].awayTeam.name : ""}</p>
                  <img
                    src={
                      teams
                        ? teams.find(
                            (team) => team.team_key === matches[0].awayTeam.id
                          ).team_logo
                        : ""
                    }
                    alt={matches[0].awayTeam ? matches[0].awayTeam.name : ""}
                    onClick={() =>
                      navigate(
                        `/teams/${
                          matches[0].homeTeam && matches[0].awayTeam.id
                        }`
                      )
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* *************************************************************************************** */}

          {/* TRANSFERS */}
          <div className="detail__box">
            <h5>Latest transfers</h5>
            {transfers && (
              <div className="transfers_table">
                <div className="transfersIn">
                  <p className="transfer_type">
                    Arrivals {transfers.transfersIn.length}
                  </p>
                  {transfers.transfersIn.map((transfer) => (
                    <p
                      key={transfer.id}
                      className="transfer__player"
                      onClick={() => navigate(`/players/${transfer.player.id}`)}
                    >
                      {transfer.player.name}
                    </p>
                  ))}
                </div>
                <div className="transfersOut">
                  <p className="transfer_type">
                    Departures {transfers.transfersOut.length}
                  </p>
                  {transfers.transfersOut.map((transfer) => (
                    <p
                      key={transfer.id}
                      className="transfer__player"
                      onClick={() => navigate(`/players/${transfer.player.id}`)}
                    >
                      {transfer.player.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* *********************************************************************** */}

          {/* INFO */}

          <div className="detail__box">
            <h5>Info</h5>
            <div className="info coach">
              <p>Coach</p>
              <p>
                {teamInfo.manager !== undefined ? teamInfo.manager.name : "-"}
              </p>
            </div>
            <div className="info country">
              <p>Country</p>
              <p>
                <img
                  src="https://illustoon.com/photo/892.png  "
                  alt="country-logo"
                />{" "}
                USA
              </p>
            </div>
          </div>

          {/* *********************************************************************** */}

          {/* VENUE */}

          <div className="detail__box">
            <h5>Venue</h5>
            <div className="info stadium">
              <p>Stadium</p>
              <p>
                {teamInfo.venue !== undefined
                  ? teamInfo.venue.stadium.name
                  : "-"}
              </p>
            </div>
            <div className="info capacity">
              <p>Capacity</p>
              <p>
                {teamInfo.venue !== undefined
                  ? teamInfo.venue.stadium.capacity
                  : "-"}
              </p>
            </div>
            <div className="info city">
              <p>City</p>
              <p>
                {teamInfo.venue !== undefined ? teamInfo.venue.city.name : "-"}
              </p>
            </div>
          </div>
          {/* *********************************************************************** */}

          {/* COMMENTS */}

          <div className="comments">
            <h5>Comments</h5>
            {currentTeam.reviews !== undefined &&
              currentTeam.reviews.length > 0 &&
              currentTeam.reviews.map((review) => (
                <div
                  key={review._id}
                  className="comment"
                >
                  <p className="commented__user">
                    {review.name} <span>({review.createdAt.slice(0, 10)})</span>
                  </p>
                  <p className="comment__text">{review.comment}</p>
                </div>
              ))}
          </div>

          <div className="comment_input">
            {!userInfo && (
              <p>
                <span
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={() => navigate(`/login?redirect=/teams/${teamId}`)}
                >
                  Sign In
                </span>
                to add a comment on the team's performance so far this season
              </p>
            )}

            {userInfo && (
              <>
                <p className="input_title">
                  What do you think of {currentTeam.team_name}'s performance so
                  far?
                </p>
                {reviewSuccess && <Success text="Review Added Successfully" />}

                <form>
                  <div className="comment__input">
                    <div className="textArea">
                      <textarea
                        className="text_area"
                        onClick={() => setClicked(true)}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        rows={clicked ? 3 : 1}
                        value={comment}
                      ></textarea>
                    </div>
                    <div className="submit__button">
                      <button
                        onClick={addComment}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </>
      )}

      {/* *************************************************************************************** */}

      {section === "matches" && (
        <>
          {matches && (
            <div className="matches_list_container">
              {matches.map((match) => (
                <MatchComponent
                  key={match.id}
                  match={match}
                  team={currentTeam.team_name}
                />
              ))}
            </div>
          )}
        </>
      )}

      {section === "squad" && (
        <>
          <div className="players_list_container">
            <div className="coachName">
              <div className="playerName">
                {teamInfo.manager ? teamInfo.manager.name : ""}
              </div>
              <div className="playerInfo ">Coach</div>
            </div>
            {players !== undefined &&
              players.map((player) => (
                <div
                  key={player.player.id}
                  className="squad"
                >
                  <div
                    className="playerName"
                    onClick={() => navigate(`/players/${player.player.id}`)}
                  >
                    {player.player.name}
                  </div>
                  <div className="playerInfo">
                    <div>{player.player.jerseyNumber}</div>
                    <div> {player.player.height} cm</div>
                    <div>{player.player.position}</div>
                    <div>
                      {player.player.country !== undefined
                        ? player.player.country.name
                        : "-"}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default TeamScreen;

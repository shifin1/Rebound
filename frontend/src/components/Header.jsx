import "./header.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { logout } from "../features/users/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [isOpen, setIsOpen] = useState(false);

  // const searchHandler = (e) => {
  //   e.preventDefault();
  //   console.log("search");
  // };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Container>
      <header>
        <div className="nav-container">
          <div
            className="nav-brand"
            onClick={() => navigate("/")}
          >
            {/* <a href="/">REBOUND</a> */}
            REBOUND
          </div>
          <button
            aria-label="toggle menu"
            className="toggleButton"
            onClick={toggle}
          >
            {!isOpen && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="openIcon "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}

            {isOpen && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="closeIcon "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
          <div className={isOpen ? "nav-items-open " : "nav-items"}>
            <ul>
              <li onClick={() => navigate("/")}>
                {/* <a href="/">Home</a> */}
                Home
              </li>
              <li onClick={() => navigate("/matches")}>
                {/* <a href="/matches">Matches</a> */}
                Matches
              </li>
              <li onClick={() => navigate("/standings")}>
                {/* <a href="/standings">Standings</a> */}
                Standings
              </li>
              <li onClick={() => navigate("/stats")}>Statistics</li>
              <li onClick={() => navigate("/news")}>
                {/* <a href="/news">News</a> */}
                News
              </li>
              {userInfo ? (
                <li
                  className="logout-button"
                  onClick={logoutHandler}
                >{`Logout (${userInfo.name})`}</li>
              ) : (
                <li onClick={() => navigate("/login")}>
                  {/* <a href="/login">Sign In</a> */}
                  Sign In
                </li>
              )}

              {/* <div className="nav-searchbar">
                <li>
                  <form method="post">
                    <input
                      type="text"
                      placeholder="search"
                    ></input>
                    <button
                      type="submit"
                      onClick={searchHandler}
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </form>
                </li>
              </div> */}
            </ul>
          </div>
        </div>
      </header>
    </Container>
  );
};

export default Header;

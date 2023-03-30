import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./homeScreen.css";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../features/news/newsSlice";
import { fetchAllTeams } from "../features/team/teamActions";
import Loader from "../components/Loader";
import { Error } from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNews());
    dispatch(fetchAllTeams());
  }, [dispatch]);

  const news = useSelector((state) => state.news);
  const { loading: loadingNews, newsList, error: newsError } = news;

  const toNewsPage = () => {
    navigate("/news");
  };

  return (
    <div className="home-screen py-3">
      <Container>
        <div className="title">
          <h1>Welcome To Rebound...</h1>
        </div>

        <div className="para">
          <p>
            Keep up with the latest NBA results and check out your favourite
            players' and teams' stats for free with us.
            <a href="/login">Sign In</a> for free to add your reviews and rating
            on players and teams. Scroll down to explore trending nba news..!
          </p>
        </div>

        <div className="news-section">
          <h1>Latest News</h1>
          {loadingNews && <Loader />}
          {newsError && <Error text={newsError} />}
          {newsList.length > 0 &&
            Array(...newsList.slice(0, 5)).map((news, i) => (
              <div
                className="news-box"
                key={i}
              >
                <a
                  href={news.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h6>
                    {news.title.length > 100
                      ? news.title.substring(0, 100)
                      : news.title}
                    ...
                  </h6>
                  <p>{`Read More >>>`}</p>
                </a>
              </div>
            ))}
          <div className="news-page-button">
            <button
              onClick={toNewsPage}
              type="button"
            >
              Click to see more news
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomeScreen;

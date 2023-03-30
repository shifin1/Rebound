import React, { useEffect, useState } from "react";
import "./newsScreen.css";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../features/news/newsSlice";
import Loader from "../components/Loader";
import { Error } from "../components/Message";
import Pagination from "../components/Pagination";

const NewsScreen = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const news = useSelector((state) => state.news);
  const { loading: loadingNews, newsList, error: newsError } = news;

  useEffect(() => {
    if (newsList.length < 1) {
      dispatch(fetchNews());
    }
  }, [dispatch, newsList]);

  return (
    <div>
      <Container>
        <h1 className="title">NEWS</h1>

        {loadingNews && <Loader />}
        {newsError && <Error text={newsError} />}
        <div className="news__container">
          {newsList.slice(page * 10 - 10, page * 10).map((news, i) => (
            <a
              key={i}
              href={news.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="news__box">
                <div className="news-text">
                  <h6>{news.title.substring(0, 80)}</h6>
                </div>

                <div className="read-more">
                  <p>read more ➡️</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        <Pagination
          array={newsList}
          page={page}
          setPage={setPage}
        />
      </Container>
    </div>
  );
};

export default NewsScreen;

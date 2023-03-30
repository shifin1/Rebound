import React from 'react';
import './pagination.css';

const Pagination = ({ array, page, setPage }) => {
  const selectPage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= array.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
      console.log('page: ' + selectedPage);
    }
  };

  return (
    <div className="pagination">
      <span
        onClick={() => selectPage(page - 1)}
        className={page <= 1 ? 'disappear' : ''}
      >
        ◀️
      </span>
      {[...Array(array.length / 10)].map((_, i) => {
        return (
          <span
            className={page === i + 1 ? 'selected__page' : ''}
            key={i}
            onClick={() => selectPage(i + 1)}
          >
            {i + 1}
          </span>
        );
      })}
      <span
        onClick={() => selectPage(page + 1)}
        className={page >= array.length / 10 ? 'disappear' : ''}
      >
        ▶️
      </span>
    </div>
  );
};

export default Pagination;

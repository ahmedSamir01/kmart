import React from "react";
import Spinner from "shared/Spinner";

function Paginator({ pageNumber, setPageNumber, isFetching, data }) {
  const handlePagination = ({ type }) => {
    const newPage = type === "next" ? pageNumber + 1 : pageNumber - 1;
    window.history.pushState(null, null, `?page=${newPage}`);
    setPageNumber(newPage);
  };

  return (
    <div className="pagination-bar px-4 pb-4 mt-auto">
      <button
        className="btn btn-dark me-2"
        onClick={() => handlePagination({ type: "prev" })}
        disabled={pageNumber === 1}
      >
        Prev
      </button>
      <button
        className="btn btn-dark"
        onClick={() => handlePagination({ type: "next" })}
        disabled={!data?.length}
      >
        Next
      </button>{" "}
      {isFetching && <Spinner size="sm" />}
    </div>
  );
}

export default Paginator;

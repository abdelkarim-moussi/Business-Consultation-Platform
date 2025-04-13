import React from "react";

const Pagination = ({ currentPage, dataPerPage, totalData, handlePagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center my-8">
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-4 py-2 mx-1 rounded-md transition hover:bg-gray-200 ${
            currentPage === pageNumber ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => handlePagination(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

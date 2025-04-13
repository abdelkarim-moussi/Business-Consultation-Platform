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
          className={`px-3 py-1 mx-1 rounded-full transition ${
            currentPage === pageNumber ? "bg-[#19485F] text-white" : "bg-white"
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

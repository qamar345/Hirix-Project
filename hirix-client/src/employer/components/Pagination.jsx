import React from "react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (event, number) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    onPageChange?.(number);
  };
  return (
    <>
      <div className="container overflow-x-scroll">
        <nav>
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${currentPage === number ? "active" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={(event) => handlePageClick(event, number)}
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

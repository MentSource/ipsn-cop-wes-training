import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  recordsPerPage: number;
  setRecordsPerPage: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  recordsPerPage,
  setRecordsPerPage,
}) => (
  <div className="pagination">
    <span>Records per page</span>
    <select
      value={recordsPerPage}
      onChange={(e) => setRecordsPerPage(Number(e.target.value))}
    >
      <option>50</option>
      <option>25</option>
      <option>10</option>
    </select>
    <div className="page-links">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={i + 1 === currentPage ? "active" : ""}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  </div>
);

export default Pagination;

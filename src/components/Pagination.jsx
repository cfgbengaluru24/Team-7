// src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={handlePrevious}
        className={`px-4 py-2 rounded bg-gray-200 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2">{currentPage}</span>
      <button
        onClick={handleNext}
        className={`px-4 py-2 rounded bg-gray-200 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

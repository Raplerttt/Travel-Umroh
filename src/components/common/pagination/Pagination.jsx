import React from 'react';
import Button from '../button/Button';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>

        <div className="flex items-center space-x-1">
          {startPage > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                1
              </button>
              {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
            </>
          )}

          {pages.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                px-3 py-1 text-sm font-medium rounded-md transition-colors
                ${currentPage === page
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>

      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(start + 4, totalPages);

    if (end === totalPages) {
      start = Math.max(1, end - 4);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
      >
        {"<<"}
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
      >
        {"<"}
      </button>

      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded transition-colors ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
      >
        {">"}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
      >
        {">>"}
      </button>
    </div>
  );
};

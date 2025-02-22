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
        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-transparent"
      >
        {"<<"}
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-transparent"
      >
        {"<"}
      </button>

      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-transparent"
      >
        {">"}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-transparent"
      >
        {">>"}
      </button>
    </div>
  );
};

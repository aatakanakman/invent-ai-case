interface EmptyProps {
  message?: string;
}

export const Empty = ({ message = "No results found" }: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 mb-4 text-gray-600">
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <p className="text-gray-400 text-lg text-center">{message}</p>
    </div>
  );
};

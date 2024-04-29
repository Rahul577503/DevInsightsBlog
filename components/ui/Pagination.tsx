import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center my-4 p-2 shadow-md border mx-auto rounded-md max-w-[10rem] border-gray-100">
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded-md ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

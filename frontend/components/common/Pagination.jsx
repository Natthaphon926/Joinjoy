import { useEffect, useState } from "react";
import { ChevronLeft } from 'lucide-react';
import { cn } from "../../src/assets/ีutils/tw-merge";

export default function Pagination({ onPageChange, total, pageLimit }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(total / pageLimit);

  useEffect(() => {
    if (onPageChange) onPageChange(page);
  }, [page, onPageChange]);

  const getPaginationRange = (currentPage, delta = 1) => {
    const range = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);

    if (left > 2) {
      range.push("...");
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) {
      range.push("...");
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const next = () => {
    if (page < totalPages) {
      setPage((v) => v + 1);
    }
  };

  const previous = () => {
    if (page > 1) {
      setPage((v) => v - 1);
    }
  };

  const handlePaginationButtonClick = (item) => {
    if (typeof item === "number") {
      setPage(item);
    }
  };

  return (
    <div className="flex items-center space-x-3 text-sm">
      <button
        className="flex items-center justify-center bg-[#646C73] p-3 rounded-sm size-8"
        onClick={previous}
      >
        <ChevronLeft />
      </button>
      {getPaginationRange(page).map((item, i) => (
        <button
          key={i}
          onClick={() => handlePaginationButtonClick(item)}
          className={cn(
            "border-1 border-[#CBD0D5] flex items-center justify-center p-3 rounded-sm size-8 cursor-pointer",
            page === item ? "text-[#3C60BC] border-[#3C60BC]" : ""
          )}
        >
          {item}
        </button>
      ))}
      <button
        className="flex items-center justify-center bg-[#646C73] p-3 rounded-sm size-8"
        onClick={next}
      >
        <ChevronLeft className="-rotate-180" />
      </button>
    </div>
  );
}

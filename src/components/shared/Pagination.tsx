"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const generatePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      {/* Previous Page Arrow */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 w-10 rounded-2xl border-border/60 bg-background/80 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-muted/60 hover:text-foreground disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      {generatePages().map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-sm font-medium text-muted-foreground"
            >
              ...
            </span>
          );
        }

        const isCurrent = page === currentPage;

        return (
          <Button
            key={page}
            variant={isCurrent ? "default" : "outline"}
            onClick={() => onPageChange(page as number)}
            className={`h-10 w-10 rounded-2xl p-0 text-sm font-semibold transition-all duration-200 cursor-pointer ${
              isCurrent
                ? "border-none bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500 text-white shadow-lg shadow-emerald-500/20 dark:shadow-blue-500/20 hover:scale-105"
                : "border border-border bg-background text-muted-foreground backdrop-blur-sm hover:scale-105 hover:bg-muted/60 hover:text-foreground"
            }`}
          >
            {page}
          </Button>
        );
      })}

      {/* Next Page Arrow */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 w-10 rounded-2xl border-border/60 bg-background/80 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-muted/60 hover:text-foreground disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

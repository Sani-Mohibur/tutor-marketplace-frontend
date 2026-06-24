"use client";

import React, { useState } from "react";
import { SlidersHorizontal, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceSlider } from "./PriceSlider";
import { RatingFilter } from "./RatingFilter";
import { CategoryFilter } from "./CategoryFilter";

interface FilterState {
  searchName: string;
  priceRange: [number, number];
  minRating: number;
  selectedCategories: string[];
}

interface TutorsFilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableCategories: string[];
  onReset: () => void;
}

export function TutorsFilterSidebar({
  filters,
  setFilters,
  availableCategories,
  onReset,
}: TutorsFilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (value: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFilters((prev) => ({ ...prev, minRating: rating }));
  };

  const handleCategoryChange = (categories: string[]) => {
    setFilters((prev) => ({ ...prev, selectedCategories: categories }));
  };

  const filterContents = (
    <div className="space-y-6">
      <CategoryFilter
        categories={availableCategories}
        selectedCategories={filters.selectedCategories}
        onChange={handleCategoryChange}
      />
      <hr className="border-border/40" />
      <PriceSlider
        minPrice={0}
        maxPrice={150}
        value={filters.priceRange}
        onChange={handlePriceChange}
      />
      <hr className="border-border/40" />
      <RatingFilter value={filters.minRating} onChange={handleRatingChange} />
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Container Panel */}
      <aside className="hidden md:block w-72 shrink-0 h-fit bg-background/50 border border-border/60 rounded-2xl p-5 sticky top-24 shadow-xs backdrop-blur-xs">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-foreground font-bold text-sm">
            <SlidersHorizontal className="w-4 h-4 text-emerald-500 dark:text-blue-500" />
            <span>Search Filters</span>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] font-bold text-muted-foreground hover:text-destructive flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        </div>
        {filterContents}
      </aside>

      {/* Mobile Sticky Action Button Trigger */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 dark:from-blue-600 dark:to-cyan-600 dark:hover:from-blue-500 dark:hover:to-cyan-500 text-white px-6 h-11 flex items-center gap-2 border-none scale-100 hover:scale-105 active:scale-95 transition-transform"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter Mentors
          {(filters.selectedCategories.length > 0 || filters.minRating > 0) && (
            <span className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 text-emerald-600 dark:text-blue-400 text-[10px] flex items-center justify-center font-black">
              !
            </span>
          )}
        </Button>
      </div>

      {/* Mobile Drawer Slide-Out Drawer Layer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop Overlay Screen */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          {/* Side Sheet Drawer Drawer Container */}
          <div className="absolute top-0 left-0 bottom-0 w-[290px] max-w-[85vw] bg-background border-r border-border p-5 flex flex-col justify-between shadow-xl animate-slide-in-left">
            <div className="space-y-5 overflow-y-auto pr-1 h-full scrollbar-none">
              <div className="flex items-center justify-between pb-1">
                <span className="font-extrabold text-sm text-foreground">
                  Filters
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {filterContents}
            </div>

            <div className="pt-4 border-t border-border flex gap-2 shrink-0">
              <Button
                variant="outline"
                onClick={() => {
                  onReset();
                  setIsOpen(false);
                }}
                className="w-full text-xs font-bold rounded-xl h-10 border-border/80"
              >
                Reset
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full text-xs font-bold rounded-xl h-10 bg-emerald-500 dark:bg-blue-600 hover:bg-emerald-400 dark:hover:bg-blue-500 text-white border-none"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

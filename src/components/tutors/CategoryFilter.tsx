"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ChevronDown, ChevronUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onChange,
}: CategoryFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Local state to keep checkbox clicks responsive in production builds
  const [localSelected, setLocalSelected] =
    useState<string[]>(selectedCategories);

  // Keep local state in sync with external actions/resets
  useEffect(() => {
    setLocalSelected(selectedCategories);
  }, [selectedCategories]);

  // Filter categories based on the sub-search query
  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [categories, searchQuery]);

  // Determine which categories to show depending on show-more status
  const visibleCategories = useMemo(() => {
    if (isExpanded || searchQuery !== "") {
      return filteredCategories;
    }
    return filteredCategories.slice(0, 5);
  }, [filteredCategories, isExpanded, searchQuery]);

  const handleToggleCategory = (category: string) => {
    const nextSelection = localSelected.includes(category)
      ? localSelected.filter((item) => item !== category)
      : [...localSelected, category];

    setLocalSelected(nextSelection);
    onChange(nextSelection);
  };

  return (
    <div className="w-full space-y-3 p-1">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Categories
      </h3>

      {/* Internal Category Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/70" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-8 pl-8 pr-3 text-xs bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border/50 focus:border-emerald-500/50 dark:focus:border-blue-500/50 rounded-lg outline-hidden transition-all placeholder:text-muted-foreground/60"
        />
      </div>

      {/* Category Checkbox List */}
      <div className="flex flex-col gap-1 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
        {visibleCategories.length > 0 ? (
          visibleCategories.map((category) => {
            const isChecked = localSelected.includes(category);

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleToggleCategory(category)}
                className={cn(
                  "flex items-center gap-2.5 w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors group",
                  isChecked
                    ? "bg-emerald-500/5 dark:bg-blue-500/5 text-emerald-600 dark:text-blue-400"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                )}
              >
                {/* Custom Checkbox */}
                <div
                  className={cn(
                    "w-4 h-4 rounded-md border flex items-center justify-center transition-all duration-200 shrink-0",
                    isChecked
                      ? "border-emerald-600 bg-emerald-500 text-white dark:border-blue-500 dark:bg-blue-600"
                      : "border-neutral-400 dark:border-border/80 group-hover:border-neutral-600 dark:group-hover:border-muted-foreground/60 bg-background",
                  )}
                >
                  {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span className="truncate">{category}</span>
              </button>
            );
          })
        ) : (
          <span className="text-[11px] text-muted-foreground/70 text-center py-2">
            No categories match criteria.
          </span>
        )}
      </div>

      {/* Show More / Show Less Toggle Button */}
      {!searchQuery && filteredCategories.length > 5 && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-blue-400 hover:text-emerald-500 dark:hover:text-blue-500 cursor-pointer transition-colors pt-0.5"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              Show More ({categories.length - 5})
            </>
          )}
        </button>
      )}
    </div>
  );
}

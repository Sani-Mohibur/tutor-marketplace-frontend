"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingFilterProps {
  value: number;
  onChange: (rating: number) => void;
}

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  const ratingOptions = [4.5, 4.0, 3.5, 3.0];

  return (
    <div className="w-full space-y-3 p-1">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Minimum Rating
      </h3>

      <div className="flex flex-col gap-1.5">
        {ratingOptions.map((rating) => {
          const isSelected = value === rating;

          return (
            <button
              key={rating}
              type="button"
              onClick={() => onChange(isSelected ? 0 : rating)}
              className={cn(
                "flex items-center justify-between w-full text-left px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all duration-200 group",
                isSelected
                  ? "bg-emerald-500/5 border-emerald-500/30 dark:border-blue-500/30 text-emerald-600 dark:text-blue-400 shadow-xs"
                  : "bg-background border-border/50 text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/30",
              )}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    const isFullStar = starValue <= Math.floor(rating);
                    const isHalfStar =
                      !isFullStar && starValue - 0.5 === rating;

                    return (
                      <Star
                        key={i}
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110",
                          isFullStar || isHalfStar
                            ? "fill-amber-400 text-amber-400 drop-shadow-[0_1px_3px_rgba(251,191,36,0.2)]"
                            : "text-muted/40 dark:text-muted/20",
                        )}
                      />
                    );
                  })}
                </div>
                <span>{rating.toFixed(1)} & Up</span>
              </div>

              {/* Status Radio-Style Indicator */}
              <div
                className={cn(
                  "w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all",
                  isSelected
                    ? "border-emerald-600 bg-emerald-500 dark:border-blue-500 dark:bg-blue-600 shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                    : "border-neutral-400 dark:border-border/80 group-hover:border-neutral-600 dark:group-hover:border-muted-foreground/60 bg-background",
                )}
              >
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

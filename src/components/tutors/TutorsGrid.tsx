"use client";

import { GraduationCap } from "lucide-react";
import { TutorCard, Tutor } from "./TutorCard";
import { Pagination } from "@/components/shared/Pagination";

interface TutorsGridProps {
  tutors: Tutor[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function TutorsGrid({
  tutors,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: TutorsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="h-[220px] rounded-2xl border border-border/100 dark:border-border/40 bg-muted/30 dark:bg-muted/20 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (tutors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-background border border-dashed border-border/80 rounded-2xl w-full">
        <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center text-muted-foreground mb-4">
          <GraduationCap className="w-6 h-6 text-teal-500/80 dark:text-blue-500/80" />
        </div>
        <h3 className="text-sm font-bold text-foreground">
          No Tutors Match Filter Options
        </h3>
        <p className="text-xs text-muted-foreground max-w-xs mt-1 leading-relaxed">
          Try expanding your budget sliders, adding alternate categories, or
          adjusting your min-rating thresholds.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* Dynamic Main Tutor Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>

      {/* Shared Reusable Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

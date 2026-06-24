"use client";

import { ReviewCard, ReviewData } from "./ReviewCard";
import { Star } from "lucide-react";

interface MyReviewsListProps {
  reviews: ReviewData[];
  isLoading: boolean;
}

export function MyReviewsList({ reviews, isLoading }: MyReviewsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {[1, 2].map((n) => (
          <div key={n} className="h-28 bg-muted/60 rounded-xl" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border border-dashed border-border/60 rounded-xl bg-muted/10 text-center">
        <Star className="w-8 h-8 text-muted-foreground/50 mb-3" />
        <p className="text-xs font-semibold text-muted-foreground">
          You haven't submitted any reviews yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

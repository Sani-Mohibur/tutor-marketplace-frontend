"use client";

import { Star, Calendar } from "lucide-react";

export interface ReviewData {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  tutorProfile: {
    user: {
      name: string;
    };
  };
}

interface ReviewCardProps {
  review: ReviewData;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const tutorName = review.tutorProfile.user.name;
  const reviewDate = new Date(review.createdAt);

  return (
    <div className="border border-border/60 bg-gradient-to-br from-background to-muted/10 rounded-xl p-4 space-y-3 hover:border-border/80 transition-all duration-200 shadow-xs hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-foreground">
            Review for {tutorName}
          </h4>

          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`w-3.5 h-3.5 transition-colors ${
                  index < review.rating
                    ? "text-amber-500 fill-amber-500"
                    : "text-muted-foreground/40 fill-transparent stroke-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
          <Calendar className="w-3 h-3 text-muted-foreground/60" />
          <span>
            {reviewDate.toLocaleDateString(undefined, { dateStyle: "short" })}
          </span>
        </div>
      </div>

      {review.comment ? (
        <p className="text-xs text-foreground/80 leading-relaxed bg-muted/10 border border-border/30 rounded-lg p-2.5 italic">
          "{review.comment}"
        </p>
      ) : (
        <p className="text-xs text-muted-foreground/50 italic px-1">
          No written comments provided.
        </p>
      )}
    </div>
  );
}
